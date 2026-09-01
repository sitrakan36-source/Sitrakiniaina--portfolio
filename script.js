
// 1. MENU POPUP + FERMETURE EXTERIEUR

const menuBtn = document.querySelector('.menu-btn');
const menuPopup = document.querySelector('.menu-popup');
const closeBtn = document.querySelector('.close-btn');


const overlay = document.createElement('div');
overlay.classList.add('menu-overlay');
document.body.appendChild(overlay);


menuBtn.addEventListener('click', () => {
    menuPopup.classList.add('active');
    overlay.classList.add('active');
});


closeBtn.addEventListener('click', () => {
    menuPopup.classList.remove('active');
    overlay.classList.remove('active');
});


overlay.addEventListener('click', () => {
    menuPopup.classList.remove('active');
    overlay.classList.remove('active');
});


document.querySelectorAll('.menu-popup a').forEach(link => {
    link.addEventListener('click', () => {
        menuPopup.classList.remove('active');
        overlay.classList.remove('active');
    });
});


// 2. TYPEWRITER ANIMATION ACCUEIL

const text = "Développeur Web  & Programmeur en Informatique";
const typewriter = document.querySelector('.typewriter');
let i = 0;

function typing() {
    if (i < text.length) {
        typewriter.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 80);
    }
}

window.addEventListener('load', typing);


// 3. INITIALISATION AOS - ANIMATION AU SCROLL

AOS.init({
    duration: 1200,
    once: false,
    offset: 100
});


// 4. PARTICLES JS - ARRIERE PLAN

particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80
        },
        "size": {
            "value": 3
        },
        "color": {
            "value": "#A7C7E7"
        },
        "line_linked": {
            "enable": true,
            "color": "#A7C7E7",
            "opacity": 0.4
        }
    }
});

// 5. PROGRESS BAR - ANIMATION BARRE DE COMPETENCE

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress-bar div').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }
    });
}, {
    threshold: 0.5
});


document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card)
});


// 6. COMPTEUR - ANIMATION CHIFFRES

const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            let count = 0;
            
            const update = () => {
                if (count < target) {
                    count++;
                    counter.innerText = count;
                    setTimeout(update, 150);
                }
                else {
                    counter.innerText = target + '+';
                }
            }
            update();
            counterObserver.unobserve(counter);
        }
    });
});

counters.forEach(c => {
    counterObserver.observe(c)
});

// 7. FORMULAIRE DE CONTACT
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = new FormData(form);
    status.innerText = "Envoi en cours...";
    status.style.color = "var(--ice-blue)";
    
    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            status.innerText = "Message envoyé avec succès! ✅";
            form.reset();
        } else {
            const result = await response.json();
            status.innerText = result.errors ? result.errors.map(error => error.message).join(", ") : "Erreur lors de l'envoi. ❌";
            status.style.color = "red";
        }
    } catch (error) {
        status.innerText = "Problème de connexion. ❌";
        status.style.color = "red";
    }
});