
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
