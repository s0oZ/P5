let page = document.location.search; //déclaration des variable
let searchParams = new URLSearchParams(page);
let idPage = searchParams.get("orderId");
let orderID = document.getElementById("orderId");

orderID.insertAdjacentHTML("beforeend", idPage);

localStorage.removeItem("cart");
