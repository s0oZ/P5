let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
// definir le prix grace a l api
let content = "";
let quantity = 0;
let totalprice = 0;
let targetprice = document.getElementById("totalQuantity");
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
      totalprice = +Number(article.quantity) * Number(data.price);
    });
  return totalprice;
});
console.log(totalprice);

// price = totalprice.reduce((acc, currentPrice) => {
//   return (acc += currentPrice);
// });

/*async function getAllUrls(urls) {
    try {
        var data = await Promise.all(
            urls.map(
                url =>
                    fetch(url).then(
                        (response) => response.json()
                    )));

        return (data)*/
