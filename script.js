/*shop page js*/
let products = [
    {name: "T-shirt", price: 120, image: "images/T-shirt.jpg"},
    {name: "iphone-12", price: 150, image: "images/iphone-12.jpg"},
    {name: "Hoodie", price: 90, image: "images/Hoodie.jpg"},
    {name: "Laptop-mac", price: 170, image: "images/Laptop-mac.jpg"},
    {name: "Shoes", price: 50, image: "images/shoes.jpg"},
    {name: "Watch", price: 100, image: "images/watch.jpg"},
    {name: "Cap", price: 15, image: "images/cap.jpg"},
    {name: "Jacket", price: 120, image: "images/jacket.jpg"},
    {name: "Bag", price: 20, image: "images/bag.jpg"},
    {name: "jeans", price: 80, image: "images/jeans.jpg"},
    {name: "sunglasses", price: 5, image: "images/sunglasses.jpg"},
    {name: "Headphones", price: 100, image: "images/Headphones.jpg"},
    {name: "Soundcore", price: 110, image: "images/Soundcore.jpg"},
    {name: "laptopstand", price: 20, image: "images/laptopstand.jpg"},
    {name: "cases", price: 15, image: "images/cases.jpg"},
];

let cartCount = 0;

let container = document.getElementById("products");
let cartText = document.getElementById("cartCount");

function showProducts() {
    for (let i = 0; i < products.length; i++) {
        container.innerHTML += `
        <div class="product">
            <img src="${products[i].image}">
            <h3>${products[i].name}</h3>
            <p>$${products[i].price}</p>
            <button onclick="addToCart()">Add to Cart</button>
        </div>
        `;
    }
}
// دالة تغيير الثيم وحفظه في الكوكي
function setTheme(theme) {
    document.body.className = theme;
    document.cookie = "userTheme=" + theme + ";max-age=" + (30*24*60*60) + ";path=/";
    }
window.onload = function() {
    let savedTheme = "light"; // الافتراضي لو مفيش كوكي
    
    let cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf("userTheme=") == 0) {
            savedTheme = c.substring(10); // سحب قيمة الثيم من الكوكي
        }
    }
     document.body.className = savedTheme;
};
function addToCart() {
    cartCount++;
    cartText.innerHTML = cartCount;
}
showProducts();
