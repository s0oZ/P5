let cart = JSON.parse(localStorage.getItem("cart")); //déclaration des variables
let content = "";
let contentprice = "";
let quantity = 0;
let totalprice = 0;
let targetQuantity = document.getElementById("totalQuantity");
let targetprice = document.getElementById("totalPrice");
let target = document.getElementById("cart__items");
let articles = [];
let form = document.querySelector(".cart__order__form");

cart.map((article) => {
  fetch(`http://localhost:3000/api/products/${article.id}`) //recuperation des donnée de l AP
    .then((res) => res.json()) //traduction en Json
    .then((data) => {
      articles.push({
        //boucle des données
        ...data,
      });
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
          cart = cart.filter((p) => p.id !== cartId || p.color !== cartColor);
          function saveCart(cart) {
            localStorage.setItem("cart", JSON.stringify(cart));
            targetQuantity.innerHTML = quantity;
            targetprice.innerHTML = totalprice;
          }
          saveCart(cart);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
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
        }
        break;
      case "city":
        if (isNotEmpty(contact[key]) === false) {
          isFormValid = false;
          document.getElementById("cityErrorMsg").innerHTML = " champ vide";
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
        }
        break;
      default:
        break;
    }
  }); // creation du contact
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
      window.location.replace(
        `/front/html/confirmation.html?orderId=${data.orderId}`
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
//au click sur commander, l eventListener de type click , declenche la function manageCommand
console.log(localStorage.getItem("cart"));
form.addEventListener("submit", (e) => {
  handleSubmit(e);
});
