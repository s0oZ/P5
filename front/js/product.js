let page = document.location.search;
let searchParams = new URLSearchParams(page);
let idPage = searchParams.get("id");
let titre = document.getElementById("title");
let description = document.getElementById("description");
let prix = document.getElementById("price");
let img = document.getElementsByClassName("item__img");
let color = document.getElementById("colors");
let quantity = document.getElementById("quantity");

fetch(`http://localhost:3000/api/products/${idPage}`)
  .then((res) => res.json())
  .then(function (data) {
    let content = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    let content2 = "";

    const firstElement = img[0];
    firstElement.insertAdjacentHTML("beforeend", content);
    titre.insertAdjacentHTML("beforeend", data.name);
    description.insertAdjacentHTML("beforeend", data.description);
    prix.insertAdjacentHTML("beforeend", data.price);

    for (let obocolor of data.colors) {
      content2 += `<option value="${obocolor}">${obocolor}</option>`;
    }

    color.insertAdjacentHTML("beforeend", content2);
  });

let addToCartBtn = document.getElementById("addToCart");

addToCartBtn.addEventListener("click", () => {
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart.push(...JSON.parse(localStorage.getItem("cart"))); // a revoir
  }
  if (quantity.value == 0) return alert("faut au moins en prendre");
  if (quantity.value > 100) return alert("trop de canap");
  if (color.value === "") return alert("Selectionnez la couleur");
  let productExist = cart.find(function (item) {
    return item.id === idPage && item.color === color.value;
  });
  if (productExist) {
    productExist.quantity =
      parseInt(productExist.quantity) + parseInt(quantity.value);
    return alert("ajout au panier");
  } else {
    cart.push({
      id: idPage,
      color: color.value,
      quantity: quantity.value,
    });
    return alert("quantité mise à jour");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
});
//rajouter une fonction pour la validation de l'ajout d'un canapé
