
fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(function (data) {

    let target = document.getElementById('items');
    let content = "";

    for (let obokanap of data) {
      console.log(data);
      let name = obokanap.name;
      let para = obokanap.description;
      let img = obokanap.imageUrl;
      let altext = obokanap.altTxt;
      let iid = obokanap._id;
      content += `<a href="./product.html?id=${iid}">
  <article>
    <img src="${img}" alt="${altext}">
    <h3 class="productName">${name}</h3>
    <p class="productDescription">${para}</p>
  </article>
  </a>`
    }
    target.insertAdjacentHTML('beforeend', content);
  })

