fetch("http://localhost:3000/api/products") // appel de l api grace a la fonction fetch
  .then((res) => res.json())
  .then(function (data) {
    let target = document.getElementById("items"); //création des variables
    let content = "";
    //boucle permettant d afficher autant de canapé qu'il y en a dans l API
    for (let obokanap of data) {
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
      </a>`;
    }
    target.insertAdjacentHTML("beforeend", content);
  });
