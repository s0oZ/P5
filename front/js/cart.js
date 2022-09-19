let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
// definir le prix grace a l api
let content = "";
let contentprice = "";
let quantity = 0;
let totalprice = 0;
let targetQuantity = document.getElementById("totalQuantity");
let targetprice = document.getElementById("totalPrice");
let target = document.getElementById("cart__items");
let articles = [];

cart.map((article) => {
  fetch(`http://localhost:3000/api/products/${article.id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      articles.push({
        ...data,
      });
      console.log(articles);

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

      console.log(totalprice);
    })
    .then(() => {
      targetQuantity.innerHTML = quantity;
      targetprice.innerHTML = totalprice;
    });
});

let validEmail = function (inputEmail) {
  let emailRegEx = new RegExp(`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`);
  let testEmail = emailRegEx.test(inputEmail.value);
  return testEmail;
};

let validLastName = function (input) {
  let lastNameRegex = new RegExp(/^[a-zA-Z\-]+$/);
  let testLastName = lastNameRegex.test(input.value);
  return testLastName;
};

let suppBtn = document.querySelectorAll(".deleteItem");
console.log("suppBtn", suppBtn);
for (let btn of suppBtn) {
  btn.addEventListener("click", () => {
    let cardItem = btn.closest(".cart__item");
    console.log(" cardItem", cardItem);
    // let cardId = cardItem.dataset.id;
    // let cardColor = cardItem.dataset.color;
    cardItem.remove();
    cart = cart.filter((p) => p.id == cardId || p.color !== cardColor);
    saveCart(cart);
    console.log(cart);
  });
}
