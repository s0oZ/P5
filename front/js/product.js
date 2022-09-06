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
    cart.push(...JSON.parse(localStorage.getItem("cart")));
  }
  console.log(quantity.value);
  if (quantity.value == 0) return alert("faut au moins en prendre");
  if (quantity.value > 100) return alert("trop de canap");
  if (color.value === "") return alert("Selectionnez la couleur");
  console.log(color.value);
  let product = cart.find(function (item) {
    return item.id === idPage && item.color === color.value;
  });
  if (product) {
    product.quantity = parseInt(product.quantity) + parseInt(quantity.value);
  } else {
    cart.push({
      id: idPage,
      color: color.value,
      quantity: quantity.value,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
});

//json.stringify  envoi
//json.parse  recup
/*var o = {
  get dernier() {
    if (this.journal.length > 0) {
      return this.journal[this.journal.length - 1];
    }
    else {
      return null;
    }
  },
  journal: ["toto","actu"]
}
console.log(o.dernier); // "actu"*/

/*var obj = { 'France': 'Paris', 'England': 'London' };
for (let p of obj) { // TypeError: obj is not iterable*/

/*var obj = { 'France': 'Paris', 'England': 'London' };
// On parcourt les noms des propriétés
for (let country of Object.keys(obj)) {
    var capital = obj[country];
    console.log(country, capital);
}

for (const [country, capital] of Object.entries(obj))
    console.log(country, capital);*/

/*var paramsString = "q=URLUtils.searchParams&topic=api";
var searchParams = new URLSearchParams(paramsString);
for (var p of mySearchParams) / (var p of mySearchParams.entries()).*/
//searchParams.getAll("topic"); // ["api"]

/*// Let an <a id="myAnchor" href="/en-US/docs/Location.search?q=123"> element be in the document
const anchor = document.getElementById("myAnchor");
const queryString = anchor.search; // Returns:'?q=123'

// Further parsing:
const params = new URLSearchParams(queryString);
const q = parseInt(params.get("q")); // is the number 123*/

/*const myImage = document.querySelector('txt');
const myRequest = new Request('test.txt');

fetch(myRequest).then((response) => {
  console.log(response.url); // returns https://developer.mozilla.org/en-US/docs/Web/API/Response/flowers.jpg
  response.blob().then((myBlob) => {
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
});*/
