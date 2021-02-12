// Script.js

window.addEventListener('DOMContentLoaded', () => {
  let storedData = localStorage.getItem('shopData');
  if (storedData === null){
    fetch('https://fakestoreapi.com/products').then(response => response.json()).then(data => handleResponse(data));
  } else {
    let jsonData = JSON.parse(storedData);
    populateList(jsonData);
  }
});

function handleResponse(data){
  console.log(data);
  localStorage.setItem('shopData', JSON.stringify(data));
  populateList(data);
}

function populateList(produits){
  // console.log(produits);
  const listOfProducts = document.getElementById('product-list');
  let storedCart = localStorage.getItem('cart');
  if (storedCart!==null){
      var localCart = JSON.parse(storedCart);
  }
  for (i = 0; i < produits.length; i++){
    let x = document.createElement("product-item");
    x.img  = produits[i].image;
    x.titl = produits[i].title;
    x.pric = produits[i].price;
    if (storedCart!==null){
      for (let j = 0; j < localCart.length; j++){
        console.log(localCart[j]);
        console.log(produits[i].title);
        if (localCart[j] === produits[i].title || (produits[i].title === "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet" && localCart[j] === "John Hardy Women's Legends Naga Gold &amp; Silver Dragon Station Chain Bracelet")){
          let cntr = document.getElementById('cart-count');
          let oldCount = cntr.innerHTML;
          let newCount;
          newCount = (parseInt(oldCount)+1).toString();
          cntr.innerHTML = newCount;

          x.shadowRoot.childNodes[1].children[3].innerHTML = "Remove from Cart";
        }
      }
    }
    listOfProducts.appendChild(x);
  }
}