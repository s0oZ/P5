let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
// definir le prix grace a l api
let content = "";
let quantity = 0;
let totalprice = 0;
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

      content += `<article class="cart__item" data-id="${data.id}" data-color="{product - color}">
              <div class="cart__item__img">
                <img src="${data.imageUrl}" alt="Photographie d'un canapé">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${data.name}</h2>
                  <p>${articles.price}</p>
                  <p>"${data.price}"</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>`;
      target.insertAdjacentHTML("beforeend", content);
    });
});

/*async function getAllUrls(urls) {
    try {
        var data = await Promise.all(
            urls.map(
                url =>
                    fetch(url).then(
                        (response) => response.json()
                    )));

        return (data)*/
