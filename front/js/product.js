let page = document.location.search;

let searchParams = new URLSearchParams(page);
let idPage =  searchParams.getAll("id");
console.log(idPage);
fetch(`http://localhost:3000/api/products/${idPage}`)
  .then(res => res.json())
  .then(function (data) {
    console.log(data); 
  let content = `<img src="${data.imageUrl} alt="${data.altTxt}">`;
  let target = document.getElementById('title');
  let target2 = document.getElementById('description');
  let target3 = document.getElementById('price');
  let target4 = document.getElementsByClassName("item__img");
  console.log(target4);
  console.log(target3);
  //target4.insertAdjacentHTML('beforeend' , content);
  target3.insertAdjacentHTML('beforeend' , data.price);
  target2.insertAdjacentHTML('beforeend' , data.description);
  target.insertAdjacentHTML('beforeend', data.name);
  })


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