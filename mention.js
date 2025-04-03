window.onload = function() {
    const loaderText = document.querySelector('.loader__text');
    let progress = 0;

    // Fonction pour incrémenter le pourcentage
    const interval = setInterval(() => {
        progress += 1;
        loaderText.textContent = progress + "%";  // Met à jour le texte avec le pourcentage

        // Lorsque le pourcentage atteint 100, on cache le loader
        if (progress === 100) {
            clearInterval(interval);
            document.querySelector('.loader').style.opacity = 0;  // Fait disparaître le loader
            setTimeout(() => {
                document.querySelector('.loader').style.display = 'none';  // Cache définitivement le loader après la transition
            }, 500);  // Attends la fin de la transition d'opacité avant de le cacher
        }
    }, 10);  // Le pourcentage augmente chaque 10ms
};



const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Effet de hover sur les liens
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.8)'; // Agrandir le curseur
        cursor.style.backgroundColor = '#f8c642'; // Changer de couleur
    });
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)'; // Revenir à la taille normale
        cursor.style.backgroundColor = '#ffc72c'; // Revenir à la couleur d'origine
    });
});

// Nouveau bouton de contact dans la navbar
let navContactBtn = document.getElementById("navContactBtn");
if (navContactBtn) {
    navContactBtn.addEventListener("click", openContactForm);
}

// Fermer le formulaire en cliquant à l'extérieur
let formWrapper = document.getElementById("formWrapper");
if (formWrapper) {
    formWrapper.addEventListener("click", function(event) {
        if (event.target === this) {
            closeContactForm();
        }
    });
}

// Code pour les boutons de contact
document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour ouvrir le formulaire
    function openContactForm() {
        let formWrapper = document.getElementById("formWrapper");
        let form = document.getElementById("contactForm");
        formWrapper.style.display = "flex";
        setTimeout(() => form.classList.add("active"), 10);
    }

    // Fonction pour fermer le formulaire
    function closeContactForm() {
        let formWrapper = document.getElementById("formWrapper");
        let form = document.getElementById("contactForm");
        form.classList.remove("active");
        setTimeout(() => formWrapper.style.display = "none", 500);
    }

    // Bouton de contact dans la section contact
    let contactButton = document.querySelector(".contact-button");
    if (contactButton) {
        contactButton.addEventListener("click", openContactForm);
    }

    // Nouveau bouton de contact dans la navbar
    let navContactBtn = document.getElementById("navContactBtn");
    if (navContactBtn) {
        navContactBtn.addEventListener("click", openContactForm);
    }

    // Fermer le formulaire en cliquant à l'extérieur
    let formWrapper = document.getElementById("formWrapper");
    if (formWrapper) {
        formWrapper.addEventListener("click", function (event) {
            if (event.target === this) {
                closeContactForm();
            }
        });
    }
});
