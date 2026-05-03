
/*shop page js*/

let cartCount = 0;

let cartText = document.getElementById("cartCount");


function setTheme(theme) {
  if(theme === 'dark') {
    document.body.classList.add('dark-mode');
   } else {
  document.body.classList.remove('dark-mode');
   }
    document.cookie = "userTheme=" + theme + ";max-age=" + (30*24*60*60) + ";path=/";
    }
window.onload = function() {
    let savedTheme = "light";
    let cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf("userTheme=") == 0) {
            savedTheme = c.substring(10);
       }
    }
     if(savedTheme === 'dark'){
     document.body.className = savedTheme;
}
};
function addToCart(name, price) {
    cartCount++;
    cartText.innerHTML = cartCount;
console.log(`Added: ${name} - $${price}`);
}


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