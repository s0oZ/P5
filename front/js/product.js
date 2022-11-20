let page = document.location.search; //Déclaration de toutes les variables
let searchParams = new URLSearchParams(page);
let idPage = searchParams.get("id");
let titre = document.getElementById("title");
let description = document.getElementById("description");
let prix = document.getElementById("price");
let img = document.getElementsByClassName("item__img");
let color = document.getElementById("colors");
let quantity = document.getElementById("quantity");

fetch(`http://localhost:3000/api/products/${idPage}`) //appel API grace a la methode Fetch
  .then((res) => res.json()) //trad de response en json
  .then(function (data) {
    let content = `<img src="${data.imageUrl}" alt="${data.altTxt}">`; //déclaration des variable utiles dans cette fonction
    let content2 = "";

    const firstElement = img[0]; //insersion des donnée de l API dans le DOM
    firstElement.insertAdjacentHTML("beforeend", content);
    titre.insertAdjacentHTML("beforeend", data.name);
    description.insertAdjacentHTML("beforeend", data.description);
    prix.insertAdjacentHTML("beforeend", data.price);

    for (let obocolor of data.colors) {
      //Boucle permettant l'affichage de plusieurs couleurs d un meme modele
      content2 += `<option value="${obocolor}">${obocolor}</option>`;
    }
    color.insertAdjacentHTML("beforeend", content2);
  });

let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", () => {
  //ajout d'un model aux paniers
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart.push(...JSON.parse(localStorage.getItem("cart")));
  }
  if (quantity.value == 0) return alert("Quantité insuffisante"); //differentes alertes au cas ou les conditions ne sons pas respecter
  if (quantity.value > 100) return alert("100 canapés maximum");
  if (color.value === "") return alert("Selectionnez la couleur");
  let productExist = cart.find(function (item) {
    return item.id === idPage && item.color === color.value;
  });
  if (productExist) {
    // push d un Kanap dans le panier si le modele n'existe pas dans le panier
    productExist.quantity =
      parseInt(productExist.quantity) + parseInt(quantity.value);
  } else {
    cart.push({
      // mise a jour de la quantity si le kanap est deja existant dans le panier avec la bonne couleur
      id: idPage,
      color: color.value,
      quantity: quantity.value,
    });
  }
  alert("Canapé aujouté au panier");

  localStorage.setItem("cart", JSON.stringify(cart));
});
