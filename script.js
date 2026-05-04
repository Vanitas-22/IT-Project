/*shop page js*/

let cartCount = 0;
let cartText = document.getElementById("cartCount");

function addToCart(name, price) {
    cartCount = cartCount + 1;
    cartText.innerHTML = cartCount;
}

function filterSection(category) {
    let electronics = document.getElementById('electronics-section');
    let fashion = document.getElementById('fashion-section');
    let accessories = document.getElementById('accessories-section');

    let buttons = document.querySelectorAll('.filter-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }

    event.target.classList.add('active');

    if (category == 'all') {
        electronics.style.display = 'block';
        fashion.style.display = 'block';
        accessories.style.display = 'block';
    } else if (category == 'electronics') {
        electronics.style.display = 'block';
        fashion.style.display = 'none';
        accessories.style.display = 'none';
    } else if (category == 'fashion') {
        electronics.style.display = 'none';
        fashion.style.display = 'block';
        accessories.style.display = 'none';
    } else if (category == 'accessories') {
        electronics.style.display = 'none';
        fashion.style.display = 'none';
        accessories.style.display = 'block';
    }
}

/* Theme Script */ 

function setCookie(name, value, days) {
    let expires = ""

    if(days) {
        const date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))

        expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + value + expires + "; path=/"
}

function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)

    if(parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

function loadTheme() {
    if(getCookie("theme") === "theme2") {
        document.documentElement.setAttribute("page-theme", "theme2")
        const icon = document.getElementById("theme-icon")
        
        if(icon) {
            icon.className = "fa-solid fa-sun"
        }
    }
}

function switchTheme() {
    const isTheme2 = document.documentElement.getAttribute("page-theme") === "theme2"
    const icon = document.getElementById("theme-icon")

    if(isTheme2) {
        document.documentElement.removeAttribute("page-theme")
        setCookie("theme", "default", 30)
        icon.className = "fa-solid fa-moon"
    } else {
        document.documentElement.setAttribute("page-theme", "theme2")
        setCookie("theme", "theme2", 30)
        icon.className = "fa-solid fa-sun"
    }
}

loadTheme()

/* navigation smart sticky script */ 
let lastScroll = 0
const header = document.querySelector("header")

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY

    if(currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add("hidden")
    } else {
        header.classList.remove("hidden")
    }

    lastScroll = currentScroll
})


/* Contact Script */

/* Submit Button */
function formSubmit() {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value
    const subject = document.getElementById("subject").value

    if (name === "" || email === "" || message === "" || subject === "") {
        alert("Please fill in all required fields")
        return;
    }

    const success = document.getElementById("submit-success")
    success.style.display = "flex"

    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("message").value = ""
    document.getElementById("subject").selectedIndex = 0

    document.querySelectorAll("#name, #email, #message, #subject").forEach(input => {
    input.addEventListener("input", () => {
        success.style.display = "none"
    })
})
}

/* FAQ buttons */
function openFaq(button) {
    const answer = button.nextElementSibling
    const isOpen = button.classList.contains("active")

    document.querySelectorAll(".faq-question").forEach(q => {
        q.classList.remove("active")
        q.nextElementSibling.style.display = "none"
    })

    if (!isOpen) {
        button.classList.add("active")
        answer.style.display = "block"
    }
}


/* Product Detail Script */

const productDescriptions = {
    "T-shirt": "Soft cotton t-shirt with a relaxed fit. Breathable fabric and a clean cut make it perfect for everyday wear, layering, or warm summer days.",
    "Iphone-12": "Apple iPhone 12 with the A14 Bionic chip, 5G connectivity, and a stunning Super Retina XDR display. Ceramic Shield front cover and dual-camera system.",
    "Hoodie": "Cozy fleece-lined hoodie with an adjustable drawstring hood and a roomy front kangaroo pocket. Soft inside, durable outside.",
    "Laptop-mac": "Sleek MacBook with Apple silicon performance, a brilliant Retina display, and all-day battery life. Built for work, study, and creativity.",
    "Shoes": "Lightweight running shoes with cushioned soles and a breathable mesh upper. Designed for all-day comfort and an active lifestyle.",
    "Watch": "Classic stainless-steel wristwatch with a clean minimalist dial and a water-resistant build. A timeless accessory for any occasion.",
    "Cap": "Adjustable cotton cap with a curved brim and embroidered detail. Lightweight, breathable, and ready for sunny days.",
    "Jacket": "Weather-resistant jacket with a soft inner lining and zippered pockets. Versatile enough for daily wear and outdoor escapes.",
    "Bag": "Spacious bag with multiple compartments, padded straps, and durable stitching. Built to handle daily commuting and weekend trips.",
    "Jeans": "Slim-fit denim jeans with a comfortable stretch and a versatile mid-wash finish. A modern staple for any wardrobe.",
    "Sunglasses": "UV-protective polarized sunglasses with a lightweight frame and a timeless silhouette. Stylish, comfortable, and built to last.",
    "Headphones": "Over-ear headphones with rich sound, deep bass, and plush memory-foam cushions. Long listening sessions never felt this good.",
    "Soundcore": "Soundcore portable speaker delivering deep bass, clear highs, and up to 24 hours of battery life. Take great audio anywhere.",
    "Laptopstand": "Adjustable aluminum laptop stand that improves posture, boosts airflow, and keeps your device cool while you work.",
    "Cases": "Protective phone case with shock-absorbing edges, raised camera lip, and a sleek minimalist finish. Daily protection without the bulk."
}

function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search)
    return params.get(key)
}

function loadProductDetail() {
    const section = document.querySelector(".product-detail-section")
    if (!section) return

    const name = getQueryParam("name")
    const price = getQueryParam("price")
    const img = getQueryParam("img")

    const titleEl = document.getElementById("pd-title")
    const priceEl = document.getElementById("pd-price")
    const descEl = document.getElementById("pd-description")
    const imageEl = document.getElementById("pd-image")

    if (!name || !price) {
        titleEl.textContent = "No product selected"
        descEl.textContent = "Please choose a product from the shop to view its details."
        document.querySelector(".product-actions").style.display = "none"
        document.querySelector(".product-options").style.display = "none"
        document.querySelector(".product-subtotal").style.display = "none"
        return
    }

    titleEl.textContent = name
    priceEl.textContent = price
    descEl.textContent = productDescriptions[name] || "Quality product from Xyra. Carefully selected for everyday use."

    if (img) {
        imageEl.src = "images/shop-images/" + img
        imageEl.alt = name
    }

    document.title = "Xyra - " + name
    updateSubtotal()
}

function changeQty(change) {
    const qtyEl = document.getElementById("pd-qty")
    let qty = parseInt(qtyEl.textContent)
    qty = qty + change
    if (qty < 1) qty = 1
    qtyEl.textContent = qty
    updateSubtotal()
}

function updateSubtotal() {
    const priceEl = document.getElementById("pd-price")
    const qtyEl = document.getElementById("pd-qty")
    const subEl = document.getElementById("pd-subtotal")
    if (!priceEl || !qtyEl || !subEl) return

    const price = parseFloat(priceEl.textContent) || 0
    const qty = parseInt(qtyEl.textContent) || 1
    subEl.textContent = (price * qty).toFixed(2)
}

function addToCartFromDetail() {
    const name = document.getElementById("pd-title").textContent
    const price = parseFloat(document.getElementById("pd-price").textContent) || 0
    const qty = parseInt(document.getElementById("pd-qty").textContent) || 1

    for (let i = 0; i < qty; i++) {
        cartCount++
        console.log(`Added: ${name} - $${price}`)
    }

    const navCart = document.getElementById("cart-count")
    if (navCart) {
        navCart.innerHTML = `<i class="fa-solid fa-cart-shopping" id="cart-icon"></i>${cartCount}`
    }

    const feedback = document.getElementById("pd-feedback")
    if (feedback) {
        feedback.classList.add("show")
        setTimeout(() => feedback.classList.remove("show"), 2000)
    }
}

window.addEventListener("load", loadProductDetail)
/*---------------------------login&sign up-----------------------*/
     /*--------------signup----------*/
document.addEventListener("DOMContentLoaded", function(){
    let signupForm = document.getElementById("signup");
    if(signupForm){
    signupForm.addEventListener("submit", function (event){
    event.preventDefault();
    var Username = document.getElementById("Username").value;
    var Email = document.getElementById("Email").value;
    var password = document.getElementById("password").value;
    var Confirmpassword = document.getElementById("Confirmpassword").value;
if(password !== Confirmpassword){
    alert("Passwords do not match");
 return;}
const user = {
Username: Username,
Email: Email,
password: password };
 localStorage.setItem(Username, JSON.stringify(user));
alert("Registration successful please login.");
window.location.href = "login.html";}); }
    /*--------------login---------------*/

let loginForm = document.getElementById("loginForm");
    if(loginForm){
        loginForm.addEventListener("submit", function(event){
            event.preventDefault();
            let loginEmail = document.getElementById("lemail").value;
            let loginPassword = document.getElementById("lpassword").value;
            let foundUser = null;
            for(let i = 0; i < localStorage.length; i++){
                let key = localStorage.key(i);
                if(key === "currentUser") continue;
                let user;
                try {
                    user = JSON.parse(localStorage.getItem(key));
                } catch {
                    continue; }
                if(user && user.Email === loginEmail && user.password === loginPassword){
                    foundUser = user;
                    break;
                }
            }
            if(foundUser){
                localStorage.setItem("currentUser", JSON.stringify(foundUser));
                alert("Login successful");
                window.location.href = "home.html";
            } else {
                alert("Invalid email or password");
            }
        });
    }

});


/* Cart script */
function calculatetotal() {
    var rows = document.getElementsByClassName("cart-row");
    var total = 0;

    for (var i = 0; i < rows.length; i++) {
        var price = parseFloat(rows[i].getElementsByClassName("price")[0].innerText);
        var qty = parseInt(rows[i].getElementsByClassName("qty-num")[0].innerText);

        var itemTotal = price * qty;
        rows[i].getElementsByClassName("item-total")[0].innerText = itemTotal;

        total += itemTotal;
    }
        ocument.getElementById("total").innerText = total;
}

function updateQty(button, change) {
    var qtyNum = button.parentElement.getElementsByClassName("qty-num")[0];
    var currentQty = parseInt(qtyNum.innerText);
    var newQty = currentQty + change;
            
    if (newQty < 1) newQty = 1;
            
    qtyNum.innerText = newQty;
    calculatetotal();
}

function removeItem(button) {
    var row = button.parentElement.parentElement;
    row.remove();
    calculatetotal();
}
