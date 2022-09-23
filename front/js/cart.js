let cart = JSON.parse(localStorage.getItem("cart"));

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
  fetch(`http://localhost:3000/api/products/${article.id}`)
    .then((res) => res.json())
    .then((data) => {
      articles.push({
        ...data,
      });

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
    });
});

let validEmail = function (inputEmail) {
  let emailRegEx = new RegExp(`^[\w\.]+@([\w]+\.)+[\w]{2,4}$`);
  let testEmail = emailRegEx.test(inputEmail);
  return testEmail;
};
console.log(form);
let validName = function (input) {
  let lastNameRegex = new RegExp(/^[a-zA-Z-]+$/);
  console.log(lastNameRegex.test(input));
  return lastNameRegex.test(input);
};
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

  Object.keys(contact).map((key) => {
    switch (key) {
      case "firstName":
        if (
          validName(contact[key]) === false ||
          isNotEmpty(contact[key]) === false
        ) {
          isFormValid = false;
          document.getElementById("firstNameErrorMsg").innerHTML =
            "saisie incoorecte";
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
        }
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
    console.log(isFormValid);
  });
  //ajouter a contact les champs de ville et adresse  --  objet
  //creer le tableau de product qui ne reprends que les Id  -- tableau
  //faire un objet qui reprends le tableau et l objet puis faire comme ci dessous
};
//au click sur commander, l eventListener de type click , declenche la function manageCommand
form.addEventListener("submit", (e) => handleSubmit(e));

// // function validInput(input, regex) {
// //   let testInput = regex.test(input.value);
// //   let p = input.nextElementSibling;
// //   if (testInput) {
// //     p.textcontent = "Champ Valide";
// //     return true;
// //   } else {
// //     p.textcontent = "Champ non valide";
// //     return false;
// //   }
// //}

// let firstName = document.getElementById("firstName");
// let inputFirstName = firstName.addEventlistener("change", function () {
//   validInput(firstName, validName);
// });

//onblur ou onchange

// au click sur commander , recupere la valeur de chaque champ
// au click sur commander , verifier un par un si les champs sont valable
// si pas conrrect champ d erreur au niveau de l id
// si correct , ( effacer le message d erreur si affiché) stocker l info dans l objet contact
//creer le tableau de produit
//creer un objet qui contient contact et product
//faire l'appel Api en method POST (fin d url .../order)
//dans la reponse de l'appel , on trouve l order Id
//faire un console.log de cet order id
//puis faire un .then pour afficher la page confimartion en terminant l url par l order id
//page de confirmation : recuperer l order id dans l url (deja fait en  page product)
//afficher a l emplacement prevu l order Id
//vider le localStorage cart
