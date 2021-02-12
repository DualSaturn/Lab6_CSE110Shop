// product-item.js

class ProductItem extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({ mode:'open' });
    const wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'product');
    const imag = wrapper.appendChild(document.createElement('img'));
    imag.src = this.getAttribute('img');
    imag.alt = "Image could not be found. :(";
    imag.width = 200;
    
    const titl = wrapper.appendChild(document.createElement('p'));
    titl.setAttribute('class', 'title');
    titl.innerHTML = this.getAttribute('titl');

    const pric = wrapper.appendChild(document.createElement('p'));
    pric.setAttribute('class', 'price');
    pric.innerHTML = this.getAttribute('pric');

    let buttonfunction = (event) => {
      let cntr = document.getElementById('cart-count');
      let oldCount = cntr.innerHTML;
      let newCount;
      if (event.target.innerHTML === 'Add to Cart'){
        newCount = (parseInt(oldCount)+1).toString();
        event.target.innerHTML = 'Remove from Cart';
      } else if (event.target.innerHTML === 'Remove from Cart'){
        newCount = (parseInt(oldCount)-1).toString();
        event.target.innerHTML = 'Add to Cart';
      }
      
      cntr.innerHTML = newCount;
    }
    
    const butto = wrapper.appendChild(document.createElement('button'));
    butto.addEventListener('click', buttonfunction);
    butto.innerHTML = 'Add to Cart';

    const style = document.createElement('style');
    style.textContent = `.price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    this.shadowRoot.append(style, wrapper);
    /*
    <li class="product">
      <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
      <p class="title">Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops</p>
      <p class="price">$109.95</p>
      <button onclick="alert('Added to Cart!')">Add to Cart</button>
    </li>
    */
  }

  get img() {
    return this.getAttribute('img');
  }
  
  set img(x) {
    this.setAttribute('img', x);
  }

  get titl() {
    return this.getAttribute('titl');
  }
  
  set titl(x) {
    this.setAttribute('titl', x);
  }

  get pric() {
    return this.getAttribute('pric');
  }
  
  set pric(x) {
    this.setAttribute('pric', x);
  }

  static get observedAttributes() {
    return ['img', 'pric', 'titl'];
  }

  attributeChangedCallback(name, oldValue, newValue){
    if (name=='pric'){
      let x = this.shadowRoot.childNodes;
      x[1].children[2].innerHTML = newValue;
    } else if (name=='img'){
      let x = this.shadowRoot.childNodes;
      // console.log(x);
      x[1].children[0].src = newValue;
    } else if(name=='titl'){
      let x = this.shadowRoot.childNodes;
      x[1].children[1].innerHTML = newValue;
    }
  }
}

customElements.define('product-item', ProductItem);