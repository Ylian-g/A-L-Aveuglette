

class VerticalMouseDrivenCarousel {
    constructor(options = {}) {
        const _defaults = {
            carousel: ".js-carousel",
            bgImg: ".js-carousel-bg-img",
            list: ".js-carousel-list",
            listItem: ".js-carousel-list-item"
        };
        this.posY = 0;
        this.defaults = Object.assign({}, _defaults, options);
        this.initCursor();
        this.init();
        this.bgImgController();
    }


    getBgImgs() {
        return document.querySelectorAll(this.defaults.bgImg);
    }

    getListItems() {
        return document.querySelectorAll(this.defaults.listItem);
    }

    getList() {
        return document.querySelector(this.defaults.list);
    }

    getCarousel() {
        return document.querySelector(this.defaults.carousel);
    }

    init() {
        TweenMax.set(this.getBgImgs(), {
            autoAlpha: 0,
            scale: 1.05
        });

        TweenMax.set(this.getBgImgs()[0], {
            autoAlpha: 1,
            scale: 1
        });

        this.listItems = this.getListItems().length - 1;
        this.listOpacityController(0);
    }

    initCursor() {
        const listHeight = this.getList().clientHeight;
        const carouselHeight = this.getCarousel().clientHeight;

        this.getCarousel().addEventListener(
            "mousemove",
            event => {
                this.posY = event.pageY - this.getCarousel().offsetTop;
                let offset = -this.posY / carouselHeight * listHeight;

                TweenMax.to(this.getList(), 0.3, {
                    y: offset,
                    ease: Power4.easeOut
                });
            },
            false
        );
    }

    bgImgController() {
        for (const link of this.getListItems()) {
            link.addEventListener("mouseenter", ev => {
                let currentId = ev.currentTarget.dataset.itemId;
                this.listOpacityController(currentId);

                TweenMax.to(ev.currentTarget, 0.3, {
                    autoAlpha: 1
                });

                TweenMax.to(".is-visible", 0.2, {
                    autoAlpha: 0,
                    scale: 1.05
                });

                if (!this.getBgImgs()[currentId].classList.contains("is-visible")) {
                    this.getBgImgs()[currentId].classList.add("is-visible");
                }

                TweenMax.to(this.getBgImgs()[currentId], 0.6, {
                    autoAlpha: 1,
                    scale: 1
                });
            });
        }
    }

    listOpacityController(id) {
        id = parseInt(id);
        let aboveCurrent = this.listItems - id;
        let belowCurrent = parseInt(id);

        if (aboveCurrent > 0) {
            for (let i = 1; i <= aboveCurrent; i++) {
                let opacity = 0.5 / i;
                let offset = 5 * i;

                TweenMax.to(this.getListItems()[id + i], 0.5, {
                    autoAlpha: opacity,
                    x: offset,
                    ease: Power3.easeOut
                });
            }
        }

        if (belowCurrent > 0) {
            for (let i = 0; i <= belowCurrent; i++) {
                let opacity = 0.5 / i;
                let offset = 5 * i;

                TweenMax.to(this.getListItems()[id - i], 0.5, {
                    autoAlpha: opacity,
                    x: offset,
                    ease: Power3.easeOut
                });
            }
        }
    }
}

// Initialiser le carrousel quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    new VerticalMouseDrivenCarousel();
});

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

    // Fonction pour passer à la diapositive suivante
    function nextSlide() {
        // Retirer la classe active de la diapositive actuelle
        slides[currentSlide].classList.remove('active');

        // Passer à la diapositive suivante (retour à 0 si on atteint la fin)
        currentSlide = (currentSlide + 1) % slides.length;

        // Ajouter la classe active à la nouvelle diapositive
        slides[currentSlide].classList.add('active');
    }

    // Changer de diapositive toutes les 5 secondes
    setInterval(nextSlide, 5000);
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
    }, 10);  // Le pourcentage augmente chaque 10ms
};

document.addEventListener("DOMContentLoaded", function() {
    // Utilitaires
    const wrap = (n, max) => (n + max) % max;
    const lerp = (a, b, t) => a + (b - a) * t;

    const isHTMLElement = (el) => el instanceof HTMLElement;

    const genId = (() => {
        let count = 0;
        return () => {
            return (count++).toString();
        };
    })();

    class Raf {
        constructor() {
            this.rafId = 0;
            this.raf = this.raf.bind(this);
            this.callbacks = [];

            this.start();
        }

        start() {
            this.raf();
        }

        stop() {
            cancelAnimationFrame(this.rafId);
        }

        raf() {
            this.callbacks.forEach(({ callback, id }) => callback({ id }));
            this.rafId = requestAnimationFrame(this.raf);
        }

        add(callback, id) {
            this.callbacks.push({ callback, id: id || genId() });
        }

        remove(id) {
            this.callbacks = this.callbacks.filter((callback) => callback.id !== id);
        }
    }

    class Vec2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }

        set(x, y) {
            this.x = x;
            this.y = y;
        }

        lerp(v, t) {
            this.x = lerp(this.x, v.x, t);
            this.y = lerp(this.y, v.y, t);
        }
    }

    const vec2 = (x = 0, y = 0) => new Vec2(x, y);

    function tilt(node, options) {
        let { trigger, target } = resolveOptions(node, options);

        let lerpAmount = 0.06;

        const rotDeg = { current: vec2(), target: vec2() };
        const bgPos = { current: vec2(), target: vec2() };

        const update = (newOptions) => {
            destroy();
            ({ trigger, target } = resolveOptions(node, newOptions));
            init();
        };

        let rafId;

        function ticker({ id }) {
            rafId = id;

            rotDeg.current.lerp(rotDeg.target, lerpAmount);
            bgPos.current.lerp(bgPos.target, lerpAmount);

            for (const el of target) {
                el.style.setProperty("--rotX", rotDeg.current.y.toFixed(2) + "deg");
                el.style.setProperty("--rotY", rotDeg.current.x.toFixed(2) + "deg");

                el.style.setProperty("--bgPosX", bgPos.current.x.toFixed(2) + "%");
                el.style.setProperty("--bgPosY", bgPos.current.y.toFixed(2) + "%");
            }
        }

        const onMouseMove = ({ offsetX, offsetY }) => {
            lerpAmount = 0.1;

            for (const el of target) {
                const ox = (offsetX - el.clientWidth * 0.5) / (Math.PI * 3);
                const oy = -(offsetY - el.clientHeight * 0.5) / (Math.PI * 4);

                rotDeg.target.set(ox, oy);
                bgPos.target.set(-ox * 0.3, oy * 0.3);
            }
        };

        const onMouseLeave = () => {
            lerpAmount = 0.06;

            rotDeg.target.set(0, 0);
            bgPos.target.set(0, 0);
        };

        const addListeners = () => {
            trigger.addEventListener("mousemove", onMouseMove);
            trigger.addEventListener("mouseleave", onMouseLeave);
        };

        const removeListeners = () => {
            trigger.removeEventListener("mousemove", onMouseMove);
            trigger.removeEventListener("mouseleave", onMouseLeave);
        };

        const init = () => {
            addListeners();
            raf.add(ticker);
        };

        const destroy = () => {
            removeListeners();
            raf.remove(rafId);
        };

        init();

        return { destroy, update };
    }

    function resolveOptions(node, options) {
        return {
            trigger: options?.trigger ?? node,
            target: options?.target
                ? Array.isArray(options.target)
                    ? options.target
                    : [options.target]
                : [node]
        };
    }

    // Instance globale
    const raf = new Raf();

    function init() {
        const loader = document.querySelector(".voyage-loader");

        const slides = [...document.querySelectorAll(".voyage-slide")];
        const slidesInfo = [...document.querySelectorAll(".voyage-slide-info")];

        const buttons = {
            prev: document.querySelector(".voyage-slider--btn__prev"),
            next: document.querySelector(".voyage-slider--btn__next")
        };

        loader.style.opacity = 0;
        loader.style.pointerEvents = "none";

        slides.forEach((slide, i) => {
            const slideInner = slide.querySelector(".voyage-slide__inner");
            const slideInfoInner = slidesInfo[i].querySelector(".voyage-slide-info__inner");

            tilt(slide, { target: [slideInner, slideInfoInner] });
        });

        buttons.prev.addEventListener("click", change(-1));
        buttons.next.addEventListener("click", change(1));
    }

    function setup() {
        const loaderText = document.querySelector(".voyage-loader__text");

        const images = [...document.querySelectorAll(".voyage-slide--image")];
        const totalImages = images.length;
        let loadedImages = 0;
        let progress = {
            current: 0,
            target: 0
        };

        // update progress target
        images.forEach((image) => {
            imagesLoaded(image, (instance) => {
                if (instance.isComplete) {
                    loadedImages++;
                    progress.target = loadedImages / totalImages;
                }
            });
        });

        // lerp progress current to progress target
        raf.add(({ id }) => {
            progress.current = lerp(progress.current, progress.target, 0.06);

            const progressPercent = Math.round(progress.current * 100);
            loaderText.textContent = `${progressPercent}%`;

            // hide loader when progress is 100%
            if (progressPercent === 100) {
                init();

                // remove raf callback when progress is 100%
                raf.remove(id);
            }
        });
    }

    function change(direction) {
        return () => {
            let current = {
                slide: document.querySelector(".voyage-slide[data-current]"),
                slideInfo: document.querySelector(".voyage-slide-info[data-current]"),
                slideBg: document.querySelector(".voyage-slide__bg[data-current]")
            };
            let previous = {
                slide: document.querySelector(".voyage-slide[data-previous]"),
                slideInfo: document.querySelector(".voyage-slide-info[data-previous]"),
                slideBg: document.querySelector(".voyage-slide__bg[data-previous]")
            };
            let next = {
                slide: document.querySelector(".voyage-slide[data-next]"),
                slideInfo: document.querySelector(".voyage-slide-info[data-next]"),
                slideBg: document.querySelector(".voyage-slide__bg[data-next]")
            };

            Object.values(current).map((el) => el.removeAttribute("data-current"));
            Object.values(previous).map((el) => el.removeAttribute("data-previous"));
            Object.values(next).map((el) => el.removeAttribute("data-next"));

            if (direction === 1) {
                let temp = current;
                current = next;
                next = previous;
                previous = temp;

                current.slide.style.zIndex = "20";
                previous.slide.style.zIndex = "30";
                next.slide.style.zIndex = "10";
            } else if (direction === -1) {
                let temp = current;
                current = previous;
                previous = next;
                next = temp;

                current.slide.style.zIndex = "20";
                previous.slide.style.zIndex = "10";
                next.slide.style.zIndex = "30";
            }

            Object.values(current).map((el) => el.setAttribute("data-current", ""));
            Object.values(previous).map((el) => el.setAttribute("data-previous", ""));
            Object.values(next).map((el) => el.setAttribute("data-next", ""));
        };
    }

    // Démarrer
    setup();
});

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
        formWrapper.addEventListener("click", function(event) {
            if (event.target === this) {
                closeContactForm();
            }
        });
    }


});document.addEventListener('DOMContentLoaded', function() {
    // Éléments du carrousel
    const cardsContainer = document.querySelector('.media-cards');
    const cards = document.querySelectorAll('.media-card');
    const prevBtn = document.querySelector('.media-carousel-btn-prev');
    const nextBtn = document.querySelector('.media-carousel-btn-next');

    // Configuration du carrousel
    const cardWidth = 330; // Largeur de carte + gap
    let currentIndex = 0;
    const totalCards = cards.length;

    // Initialiser le carrousel
    initCarousel();

    // Ajouter les écouteurs d'événements
    prevBtn.addEventListener('click', showPreviousCard);
    nextBtn.addEventListener('click', showNextCard);

    function initCarousel() {
        // Marquer la première carte comme active
        cards[0].classList.add('visible');
        updateCarousel();
    }

    function showPreviousCard() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    function showNextCard() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }

    function updateCarousel() {
        // Mettre à jour la classe visible
        cards.forEach((card, index) => {
            card.classList.remove('visible');
        });
        cards[currentIndex].classList.add('visible');

        // Calculer la position
        const centerOffset = (window.innerWidth - cardWidth) / 2;
        const translateX = -(currentIndex * cardWidth) + centerOffset - 165; // Ajustement pour centrer

        // Transition plus fluide
        cardsContainer.style.transform = `translateX(${translateX}px)`;
    }

    // Support tactile avec transition plus fluide
    let touchStartX = 0;
    let touchEndX = 0;

    cardsContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    cardsContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe gauche
            showNextCard();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe droit
            showPreviousCard();
        }
    }

    // Rotation automatique
    let autoRotateInterval = setInterval(showNextCard, 5000);

    // Arrêter la rotation au survol
    const mediaCarousel = document.querySelector('.media-carousel');
    mediaCarousel.addEventListener('mouseenter', function() {
        clearInterval(autoRotateInterval);
    });

    mediaCarousel.addEventListener('mouseleave', function() {
        autoRotateInterval = setInterval(showNextCard, 5000);
    });

    // Recalculer les positions lors du redimensionnement
    window.addEventListener('resize', updateCarousel);
});

    function scrollRight() {
        if (position < totalCards - visibleCards) {
            position++;
            updateCarousel();
        } else {
            // Boucler au début
            position = 0;
            updateCarousel();
        }
    }

    function updateCarousel() {
        // Déplacer le conteneur
        const translateX = -position * cardWidth;
        cardsContainer.style.transform = `translateX(${translateX}px)`;

        // Mettre à jour les cartes visibles
        updateVisibleCards();
    }

    function updateVisibleCards() {
        cards.forEach((card, index) => {
            // Supprimer toutes les classes de visibilité
            card.classList.remove('visible');

            // Ajouter visible aux cartes dans la plage visible
            if (index >= position && index < position + visibleCards) {
                card.classList.add('visible');
            }
        });
    }

    // Support tactile
    let touchStartX = 0;
    let touchEndX = 0;

    cardsContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    cardsContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe gauche
            scrollRight();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe droit
            scrollLeft();
        }
    }

    // Rotation automatique
    let autoRotateInterval = setInterval(scrollRight, 200);

    // Arrêter la rotation au survol
    const mediaCarousel = document.querySelector('.media-carousel');
    mediaCarousel.addEventListener('mouseenter', function() {
        clearInterval(autoRotateInterval);
    });

    mediaCarousel.addEventListener('mouseleave', function() {
        autoRotateInterval = setInterval(scrollRight, 5000);
    });
