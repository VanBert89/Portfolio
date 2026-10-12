console.log("Le script JS est bien chargé et actif !");

/* -------------------- MODE SOMBRE (PRIORITAIRE) -------------------- */
const themeToggleBtn = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark-mode');
        if (document.documentElement.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = "☀️";
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = "🌙";
        }
    });
}

/* -------------------- MODALES -------------------- */
function ouvrirModal(id) {
    document.getElementById(id).style.display = "flex";
}

function fermerModal(id) {
    document.getElementById(id).style.display = "none";
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
};


/* -------------------- PARTICULES -------------------- */
tsParticles.load("particles-js", {
    fpsLimit: 60,
    background: {
        color: {
            value: "transparent" // <-- C'est cette ligne qui manquait pour laisser voir à travers
        }
    },
    particles: {
        number: { value: 80, density: { enable: true, area: 800 } },
        color: { value: "#0044ff" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: 3, random: true },
        links: {
            enable: true,
            distance: 180,
            color: "#00ffcc",
            opacity: 0.5,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.0,
            outModes: { default: "bounce" }
        }
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: false }
        },
        modes: {
            grab: { distance: 180, links: { opacity: 0.8 } }
        }
    },
    detectRetina: true
});


const form = document.querySelector(".contact-form");
const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const messageInput = document.getElementById("message");
const messageCounter = document.getElementById("message-counter");

if (form) {

    /* ----------- Chargement sauvegarde ----------- */
    nameInput.value = localStorage.getItem("savedName") || "";
    email.value = localStorage.getItem("savedEmail") || "";
    messageInput.value = localStorage.getItem("savedMessage") || "";

    if (messageInput.value.length > 0) {
        messageCounter.textContent = `${messageInput.value.length} caractères`;
    }

    /* ----------- Validation du formulaire ----------- */
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // On bloque systématiquement l'envoi classique pour valider d'abord

        // Reset visuel
        nameInput.classList.remove("invalid");
        email.classList.remove("invalid");
        messageInput.classList.remove("invalid");

        // Validation nom
        if (nameInput.value.trim().length < 2) {
            nameInput.classList.add("invalid");
            showError("Votre nom doit contenir au moins 2 caractères.");
            return;
        }

        // Validation email stricte (exige le format texte + @ + domaine + extension type .com/.fr)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.classList.add("invalid");
            showError("Veuillez entrer une adresse email valide (avec '@' et '.').");
            return;
        }

        // Validation message
        if (messageInput.value.trim().length < 10) {
            messageInput.classList.add("invalid");
            showError("Votre message doit contenir au moins 10 caractères.");
            return;
        }

        // Si tout est valide, on affiche le loader et on envoie via Formspree
        const loader = document.createElement("div");
        loader.className = "loader";
        form.prepend(loader);

        const formData = new FormData(form);
        // Affiche dans la console les données exactes envoyées à Formspree
        for (let [key, value] of formData.entries()) {
            console.log(key, ':', value);
        }

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(async response => {
                loader.remove();
                if (response.ok) {
                    showSuccess("Votre message a bien été envoyé !");
                    form.reset();

                    // Effacer sauvegarde
                    localStorage.removeItem("savedName");
                    localStorage.removeItem("savedEmail");
                    localStorage.removeItem("savedMessage");

                    // Reset compteur
                    messageCounter.textContent = "0 caractères";
                    messageCounter.classList.remove("valid", "invalid");
                } else {
                    // Récupère et affiche l'erreur précise de Formspree dans la console (F12)
                    const data = await response.json();
                    console.error("Détail de l'erreur Formspree :", data);
                    showError("Erreur : " + (data.error || "Une erreur est survenue."));
                }
            })
            .catch(error => {
                loader.remove();
                console.error("Erreur réseau :", error);
                showError("Erreur réseau. Vérifiez votre connexion internet.");
            });
    });

    /* ----------- Suppression du rouge quand on corrige ----------- */
    nameInput.addEventListener("input", () => nameInput.classList.remove("invalid"));
    email.addEventListener("input", () => email.classList.remove("invalid"));
    messageInput.addEventListener("input", () => messageInput.classList.remove("invalid"));

    /* ----------- Sauvegarde automatique ----------- */
    nameInput.addEventListener("input", () => localStorage.setItem("savedName", nameInput.value));
    email.addEventListener("input", () => localStorage.setItem("savedEmail", email.value));
    messageInput.addEventListener("input", () => localStorage.setItem("savedMessage", messageInput.value));

    /* ----------- Compteur dynamique ----------- */
    messageInput.addEventListener("input", () => {
        const length = messageInput.value.length;
        messageCounter.textContent = `${length} caractères`;

        if (length < 10) {
            messageCounter.classList.add("invalid");
            messageCounter.classList.remove("valid");
        } else {
            messageCounter.classList.add("valid");
            messageCounter.classList.remove("invalid");
        }
    });

    /* ----------- Auto‑resize du textarea ----------- */
    messageInput.addEventListener("input", () => {
        messageInput.style.height = "auto";
        messageInput.style.height = messageInput.scrollHeight + "px";
    });
}


/* -------------------- MESSAGES -------------------- */
function showError(message) {
    const box = document.createElement("div");
    box.className = "form-error";
    box.textContent = message;
    form.prepend(box);
    setTimeout(() => box.remove(), 4000);
}

function showSuccess(message) {
    const box = document.createElement("div");
    box.className = "form-success";
    box.textContent = message;
    form.prepend(box);
    setTimeout(() => box.remove(), 4000);
}

function demanderValidationTelephone() {
    const confirmation = window.confirm("Voulez-vous vraiment afficher mon numéro de téléphone ? (Réservé aux professionnels et recruteurs)");

    if (confirmation) {
        const phoneContainer = document.getElementById("phone-container");
        phoneContainer.outerHTML = `
            <a href="tel:+33642817524" class="contact-btn phone-btn">
                <img src="../images/phone-icon.png" alt="Téléphone" class="contact-icon">
                <span>06 42 81 75 24</span>
            </a>
        `;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');
    const backBtn = document.getElementById('back-btn');
    const backText = document.getElementById('back-text');

    if (backBtn) {
        if (from === 'parcours') {
            backBtn.href = 'parcours-évo.html';
            if (backText) backText.textContent = " Retour au parcours";
        } else {
            backBtn.href = 'index.html';
            if (backText) backText.textContent = " Retour à l'index";
        }
    }
});