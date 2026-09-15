"use strict";

// make sure HTML pages are ready

document.addEventListener("DOMContentLoaded", () => {
    setupFaq();
    setupGallery();
    setupContactForm();
    setupScrollReveal();
});


// this is the FAQ SECTION 
// clicking a question should show or hide the answer.

function setupFaq() {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((question) => {
        question.addEventListener("click", () => {
            const answerId = question.getAttribute("aria-controls");
            const answer = document.getElementById(answerId);
            const isOpen = question.getAttribute("aria-expanded") === "true";

            question.setAttribute("aria-expanded", String(!isOpen));
            answer.hidden = isOpen;

        });
    });
}

// Services and image gallery
// this will update img, alt text caption and gallery status
function setupGallery() {
    const galleryImage = document.getElementById("galleryImage");
    const galleryCaption = document.getElementById("galleryCaption");
    const galleryStatus = document.getElementById("galleryStatus");
    const previousButton = document.getElementById("previousImage");
    const nextButton = document.getElementById("nextImage");

    // this code is to only run on services page
    if (!galleryImage || !galleryCaption || !previousButton || !nextButton){
        return;
    }
    const galleryItems = [
        {
            src: "images/fresh-coffee.png",
            alt: "Steaming fresh coffee with roasted coffee beans",
            caption: "Fresh brewed coffee"
        },
        {
            src: "images/espresso.png",
            alt: "Espresso being poured from a coffee machine into a glass cup",
            caption:  "Espresso drinks"  
        },

        {
            src: "images/fresh-pastry.png",
            alt: "Fresh golden croissant on wooden board",
            caption:  "Fresh pastries"  
        },
        {
            src: "images/free-wifi.png",
            alt: "Laptop and coffee beside a free Wi-Fi sign",
            caption:  "Free Wi-Fi"  
        },
        {
            src: "images/takeout.png",
            alt: "Cup o' Joe takeaway cup and paper takeout bag",
            caption:  "Takeout orders"  
        }
    ];



// this is now the contact form validation
// this will prevent reload, checks fields, and give the DOM feedback

let currentIndex =0;

function updateGallery() {
    const item = galleryItems[currentIndex];

    galleryImage.src = item.src;
    galleryImage.alt = item.alt;
    galleryCaption.textContent = item.caption;
    galleryStatus.textContent = `${currentIndex + 1} of ${galleryItems.length}`; 
}

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateGallery();
});

previousButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;

    updateGallery();
});

}

//Contact form validation
// prevent reload check fields and DOM feedback.

function setupContactForm() {
    const form = document.getElementById("contactForm");

    // this code only runs on contact page

    if (!form){
        return;
    }


const nameInput = document.getElementById("name");
const emailInput= document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formFeedback = document.getElementById("formFeedback");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    clearErrors();

    let formIsValid = true;
    let firstInvalidField =null;

    if (nameInput.value.trim().length < 2) {
        showError(nameInput, nameError, "Please enter at least 2 characters for your name.");
        formIsValid = false;
        firstInvalidField = firstInvalidField || nameInput;
    }

    if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, emailError, "Please enter a valid email address");
        formIsValid = false;
        firstInvalidField = firstInvalidField || emailInput;
    }

    if (messageInput.value.trim().length < 10) {
        showError(messageInput, messageError, "Please enter a message with at least 10 characters.");
        formIsValid = false;
        firstInvalidField = firstInvalidField || messageInput;
    }

    if (!formIsValid) {
        formFeedback.textContent = "Please correct the highlighted fields before continuing.";
        formFeedback.className = "form-feedback error";
        firstInvalidField.focus();
        return;
    }

    formFeedback.textContent = "Thanks! your message passed validation and is ready to send.";
    formFeedback.className = "form-feedback success";
    form.reset();
});

function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formFeedback.textContent = "";
    formFeedback.className = "form-feedback";

    [nameInput, emailInput, messageInput].forEach((field) => {
        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");
    });
}

function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add("input-error");
    input.setAttribute("aria-invalid", "true");
}

function isValidEmail(email) {
    const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return basicEmailPattern.test(email);
}

}

function setupScrollReveal() {
    const items = document.querySelectorAll(".reveal-on-scroll");

    if (!items.length) {
        return;
    }

    // respecting the devices and browsers without IntersectObserver.

    if (!("IntersectionObserver" in window)) {
        items.forEach((item) => item.classList.add("visible"));
        return;
    }


const observer = new IntersectionObserver(
    (entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting){
                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

items.forEach((item) => observer.observe(item));
}