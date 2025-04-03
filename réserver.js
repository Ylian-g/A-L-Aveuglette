
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
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.image-principal .slide');
    let currentSlide = 0;
});

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
    });
}
