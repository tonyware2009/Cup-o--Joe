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
            src: "images/takeou.png",
            alt: "Cup o' Joe takeaway cup and paper takeout bag",
            caption:  "Takeout orders"  
        }
    ];
}


// this is now the contact form validation
// this will prevent reload, checks fields, and give the DOM feedback


