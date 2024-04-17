const arr = [];

const loadProducts = (url) => {
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         arr.push(data);
         showProducts(data);
         
      });
};
//loadproducts link
loadProducts('https://fakestoreapi.com/products');

// show all product in UI
const showProducts = (products) => {
   setInnerText('total_products', products.length);

   document.getElementById("all-products").innerHTML = "";

   //const allProducts = products.slice(0, 10).map((pd) => pd);
   const allProducts = products.map((pd) => pd);
   console.log(allProducts)

   for (const product of allProducts) {

      const image = product.image;
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>

      <button onclick="showProductDetails(${product.id})" id="details-btn"   data-bs-toggle="modal"
      data-bs-target="#exampleModal" class="btn details-color mb-2 rounded-1 mt-1">Details</button>
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn add-btn-color border-0 w-100 rounded-0 bg-main py-2">Add to cart</button>
      `;
      document.getElementById('all-products').appendChild(div);
   }
};

//select item count
let count = 0;

const addToCart = (id,value)=> {
   count = count + 1;
   updatePrice('price',value);
   updateTaxAndCharge();
   updateTotal();
   document.getElementById('total-Products').innerText = count;
 
};

//show product details in modal
const showProductDetails = (product_id) => {

   fetch(`https://fakestoreapi.com/products/${product_id}`)
      .then((res) => res.json())
      .then((data) => showProductDetailsInModal(data));
};
//set product details such as id,title,rating and count  in modal
const showProductDetailsInModal = (product_details) => {
   
   setInnerText('productId', product_details.id);
   document.getElementById('exampleModalLabel').innerText = product_details.title;
   document.getElementById('modal_body').innerText= product_details.description;
   setInnerText('rating', product_details.rating.rate);
   setInnerText('counting', product_details.rating.count);
   
};

const getInputValue = (id) => {

   const element = document.getElementById(id).innerText;
   const converted = parseFloat(element);
   return converted;

};
 
// main price update function
const updatePrice = (id, value) => {
   const convertedOldPrice = getInputValue(id);
   const convertPrice = value;
   let total = convertedOldPrice + convertPrice;
   document.getElementById(id).innerText = parseFloat(total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
   document.getElementById(id).innerText = parseFloat(value.toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
   const priceConverted = getInputValue('price');
   if (priceConverted > 200) {
      setInnerText('delivery-charge', 30);
      setInnerText('total-tax', priceConverted * 0.2);
   }
   if (priceConverted > 400) {
      setInnerText('delivery-charge', 50);
      setInnerText('total-tax', priceConverted * 0.3);
   }
   if (priceConverted > 500) {
      setInnerText('delivery-charge', 60);
      setInnerText('total-tax', priceConverted * 0.4);
   }
};

//grandTotal update function
const updateTotal = () => {
   const grandTotal =
      getInputValue('price') +
      getInputValue('delivery-charge') +
      getInputValue('total-tax');
   document.getElementById('total').innerText = parseFloat(grandTotal.toFixed(2));
};

// search by category
document.getElementById("search-btn").addEventListener("click", function () {
   const inputField = document.getElementById("input-value").value;
   const searchedProduct = arr[0].find((p) =>
     p.category.startsWith(`${inputField}`)
   );
   showProducts(searchedProduct);
 });