/*shop page js*/

let cartCount = 0;
let cartText = document.getElementById("cartCount");

function addToCart(name, price) {
    cartCount++;
    cartText.innerHTML = cartCount;
console.log(`Added: ${name} - $${price}`);
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



/*--------------------log in form --------------------------------------*/
const container = document.querySelector('.container1');
const signbtn = document.querySelector('.btn.sign');
const loginbtn = document.querySelector('.btn.login');

signbtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginbtn.addEventListener('click', () => {
    container.classList.remove('active');
});

document.getElementById("signup").addEventListener
("submit", function (event){
        var Username = document.getElementById("Username").value;
        var Email = document.getElementById("Email").value;
        var password = document.getElementById("password").value;
        var Confirmpassword = document.getElementById("Confirmpassword").value;
if(password !== Confirmpassword){
        alert("Passwords do not match");
        return; }
const user = {
        Username : Username,
        Email : Email,
        password : password,};
localStorage.setItem(Username, JSON.stringify(user));
alert("Registration successful please login.");
window.location.href = "login.html";
});


document.getElementById("loginForm").addEventListener("submit", function(event){
event.preventDefault();
let loginEmail = document.getElementById("lemail").value;
let loginPassword = document.getElementById("lpassword").value;
let foundUser = null;
for(let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    let user = JSON.parse(localStorage.getItem(key));
          if(user.Email === loginEmail && user.password === loginPassword){
            foundUser = user;
            break;
        }
    }

    if(foundUser){
        localStorage.setItem("currentUser",JSON.stringify(foundUser));
        alert("Login successful");
        window.location.href = "index.html";

    } else {
        alert("Invalid email or password");
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