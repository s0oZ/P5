/*const img = document.querySelectorAll('article > img');
let k = 0;

fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {

    img.forEach(element => { 
        element.src = data[k].imageUrl;
        k++;
    })
})*/
fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(function(data) { 

let k = data.length;                                       // longueur du tableu
let node = document.getElementById('items').firstElementChild;                //recuperé la a 
/*let tab =[node];*/
for( let i = 0 ; i < k; i++ ){
    console.log(data[i].name)
};
/*tab.push(node.cloneNode());*/
let newnode = document.getElementById('items').appendChild(node.cloneNode(true));
newnode.getElementsByTagName('img')[0].src = data[1].imageUrl;
newnode.getElementsByTagName('h3')[0].innerHTML = data[1].name;
newnode.getElementsByTagName('p')[0].innerHTML = data[1].description;
let target = document.getElementById('items');
let kanap = data[1].name;
    })


// inserer kanap a l emplacement target ->  <h3 class="productName">kanap</h3>

let canape = `<a href="./product.html?id=42">
<article>
  <img src="" alt="Lorem ipsum dolor sit amet, Kanap name1">
  <h3 class="productName">${data[i].name}</h3>
  <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
</article>
</a>`

// inserer canape a l emplacement target -> 

