let cart = JSON.parse(localStorage.getItem("cart")); //déclaration des variables
let content = "";
let contentprice = "";
let quantity = 0;
let totalprice = 0;
let targetQuantity = document.getElementById("totalQuantity");
let targetprice = document.getElementById("totalPrice");
let target = document.getElementById("cart__items");
// let articles = [];
let form = document.querySelector(".cart__order__form");

cart.map((article) => {
  //article ,localstorage
  fetch(`http://localhost:3000/api/products/${article.id}`) //recuperation des donnée de l API pour recupérer le prix
    .then((res) => res.json()) //traduction en Json
    .then((data) => {
      // data, API
      // articles.push({
      //   //boucle des données
      //   ...data,            // opérateur de décomposition/spread
      // });
      //partie HTML integré a la page
      content = `<article class="cart__item" data-id="${article.id}" data-color="${article.color}">    
              <div class="cart__item__img">
                <img src="${data.imageUrl}" alt="Photographie d'un canapé">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${data.name}</h2>
                  <p>${article.color}</p>
                  <p>${data.price}€</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>`;
      target.insertAdjacentHTML("beforeend", content);

      totalprice += parseInt(article.quantity) * parseInt(data.price);
      //fonctions pour mettre a jour le prix et la quantity
      quantity += parseInt(article.quantity);
    })
    .then(() => {
      let changeQuantity = document.querySelectorAll(".itemQuantity");
      console.log(changeQuantity);
      changeQuantity.forEach((input) => {
        input.addEventListener("change", (e) => {
          let cartItem = input.closest(".cart__item");
          let cartId = cartItem.getAttribute("data-id");
          let cartColor = cartItem.getAttribute("data-color");
          article.quantity = e.target.value;
          console.log(e.target.value);
          console.log(article.quantity);
          console.log(cartColor);
          function saveCart(cart) {
            localStorage.setItem("cart", JSON.stringify(cart));
            targetQuantity.innerHTML = e.target.value;
            targetprice.innerHTML = totalprice;
            window.location.reload();
          }
          saveCart(cart);
          localStorage.setItem("cart", JSON.stringify(cart));
          console.log(cart);

          // window.location.reload();
        });
      });
    })
    .then(() => {
      targetQuantity.innerHTML = quantity;
      targetprice.innerHTML = totalprice;
    })
    .then(() => {
      let suppBtn = document.getElementsByClassName("deleteItem");

      for (let btn of suppBtn) {
        btn.addEventListener("click", () => {
          let cartItem = btn.closest(".cart__item");
          let cartId = cartItem.getAttribute("data-id");
          let cartColor = cartItem.getAttribute("data-color");
          cartItem.remove();
          cart = cart.filter((p) => p.id !== cartId || p.color !== cartColor); // cheking de chaque canapé pour garder ceux qui ne correspondent pas aux deux critere differents
          function saveCart(cart) {
            localStorage.setItem("cart", JSON.stringify(cart));
            targetQuantity.innerHTML = quantity;
            targetprice.innerHTML = totalprice;
            window.location.reload();
          }
          saveCart(cart);
        });
      }
    })
    .catch((error) => {
      console.log(error);
      alert("problèmes de connexion");
    });
});

//deux regex pour le formulaire
let validEmail = function (inputEmail) {
  let emailRegEx = new RegExp(/^\w+([.-]?\w+)@\w+([.-]?\w+).(.\w{2,3})+$/);
  let testEmail = emailRegEx.test(inputEmail);
  return testEmail;
};
let validName = function (input) {
  let lastNameRegex = new RegExp(/^[a-zA-Z-]+$/);
  console.log(lastNameRegex.test(input));
  return lastNameRegex.test(input);
};
// fonction pour evité les champs vide
let isNotEmpty = function (input) {
  return input.length > 0;
};
let handleSubmit = function (e) {
  e.preventDefault();
  let isFormValid = true;
  let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  // sitcwh permettant  la verification de la saisie de l user , ainsi que d afficher un message d erreur si cela ne remplie pas les conditions
  Object.keys(contact).map((key) => {
    switch (key) {
      case "firstName":
        if (
          validName(contact[key]) === false ||
          isNotEmpty(contact[key]) === false
        ) {
          isFormValid = false;
          document.getElementById("firstNameErrorMsg").innerHTML =
            "saisie incorrecte";
        } else {
          document.getElementById("firstNameErrorMsg").innerHTML = "";
        }
        break;
      case "lastName":
        if (
          validName(contact[key]) === false ||
          isNotEmpty(contact[key]) === false
        ) {
          isFormValid = false;
          document.getElementById("lastNameErrorMsg").innerHTML =
            "saisie incorrecte";
        } else {
          document.getElementById("lastNameErrorMsg").innerHTML = "";
        } //else , emplacement ou mesage d erreur , innertHTML d un texte vide (pour effacer)
        break;
      case "address":
        if (isNotEmpty(contact[key]) === false) {
          isFormValid = false;
          document.getElementById("addressErrorMsg").innerHTML = "champs vide";
        } else {
          document.getElementById("addressErrorMsg").innerHTML = "";
        }
        break;
      case "city":
        if (isNotEmpty(contact[key]) === false) {
          isFormValid = false;
          document.getElementById("cityErrorMsg").innerHTML = " champ vide";
        } else {
          document.getElementById("cityErrorMsg").innerHTML = "";
        }
        break;
      case "email":
        if (
          validEmail(contact[key]) === false ||
          isNotEmpty(contact[key]) === false
        ) {
          isFormValid = false;
          document.getElementById("emailErrorMsg").innerHTML =
            "ceci n'est pas un email";
        } else {
          document.getElementById("emailErrorMsg").innerHTML = "";
        }
        break;
      default:
        break;
    }
  });
  // creation de l objet contact + productsId dans request body
  let productsId = [];
  cart.forEach((cursor) => {
    productsId.push(cursor.id);
  });
  let requestBody = {
    contact: contact,
    products: productsId,
  };
  if (!isFormValid) return; // si le formulaire ne corresponds pas le processus se stop et il n y a pas d'appel fetch
  fetch(`http://localhost:3000/api/products/order`, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    }) //transmition de l id dans l url
    .then((data) => {
      console.log(data);
      window.location.href = `/confirmation.html?orderId=${data.orderId}`;
    })
    .catch((error) => {
      console.log(error);
    });
};
console.log(localStorage.getItem("cart"));
//envoi du formulaire
form.addEventListener("submit", (e) => {
  handleSubmit(e);
});
