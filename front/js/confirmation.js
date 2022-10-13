let page = document.location.search;
let searchParams = new URLSearchParams(page);
let idPage = searchParams.get("orderId");
let orderID = document.getElementById("orderId");

orderID.insertAdjacentHTML("beforeend", idPage);
console.log(orderID);
console.log(idPage);

localStorage.clear();
