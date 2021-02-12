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
  console.log(produits);
  const listOfProducts = document.getElementById('product-list');
  for (i = 0; i < produits.length; i++){
    let x = document.createElement("product-item");
    // console.log(produits[i].image);
    x.img  = produits[i].image;
    x.titl = produits[i].title;
    x.pric = produits[i].price;
    listOfProducts.appendChild(x);
  }
}