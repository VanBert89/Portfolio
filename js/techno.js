/* -------------------- FRISE : REMPLISSAGE AU SCROLL -------------------- */
const container = document.querySelector('.timeline-container');
const progressBar = document.getElementById('progress-line');
const dots = document.querySelectorAll('.timeline-dot'); // Récupère bien tous les points
const revealItems = document.querySelectorAll('.timeline-item, .timeline-stage');

function updateTimeline() {
    if (!container || !progressBar) return;

    const rect = container.getBoundingClientRect();
    const vh = window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight - vh;
    const t = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 1;

    // Point de référence : 60% de l'écran, qui descend vers 100% en fin de page
    const trigger = vh * (0.6 + 0.4 * Math.pow(t, 3));

    let filled = trigger - rect.top;
    if (maxScroll - window.scrollY <= 2) filled = container.offsetHeight; // tout en bas : barre pleine
    filled = Math.max(0, Math.min(filled, container.offsetHeight));
    progressBar.style.height = filled + 'px';

    // C'EST ICI QUE LA MAGIE OPÈRE POUR LES POINTS :
    // On compare la position verticale de chaque point par rapport à la hauteur actuelle de la ligne bleue (filled)
    dots.forEach(dot => {
        const dotY = dot.getBoundingClientRect().top - rect.top + dot.offsetHeight / 2;
        dot.classList.toggle('active', dotY <= filled);
    });

    // Bloc "en cours"
    let closest = null;
    let minDist = Infinity;
    revealItems.forEach(el => {
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - trigger);
        if (dist < minDist) {
            minDist = dist;
            closest = el;
        }
    });
    revealItems.forEach(el => el.classList.toggle('current', el === closest && minDist < vh * 0.5));
}

window.addEventListener('scroll', updateTimeline, { passive: true });
window.addEventListener('resize', updateTimeline);
updateTimeline();

/* -------------------- APPARITION DES CARTES -------------------- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealItems.forEach(el => observer.observe(el));


/* -------------------- INITIALISATION DES PARTICULES -------------------- */
tsParticles.load("particles-js", {
    fpsLimit: 60,
    background: {
        color: {
            value: "transparent"
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


/* -------------------- GESTION DE LA MODALE IMAGE -------------------- */
function ouvrirModalTechno(event) {
    event.preventDefault();
    const modal = document.getElementById('modal-techno');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function fermerModalTechno() {
    const modal = document.getElementById('modal-techno');
    if (modal) {
        modal.style.display = 'none';
    }
}

window.addEventListener('click', function (event) {
    const modal = document.getElementById('modal-techno');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Dictionnaire des descriptions et des images pour chaque technologie / compétence
const descriptionsTech = {
    "Inventor": {
        titre: "Autodesk Inventor",
        desc: "Logiciel de conception assistée par ordinateur (CAO) 3D utilisé en STI2D pour concevoir, simuler et prototyper des pièces mécaniques de manière rigoureuse.",
        img: "../images/inventor.png"
    },
    "Modelisation": {
        titre: "Modélisation 3D",
        desc: "Art et technique de création d'une représentation mathématique tridimensionnelle d'un objet ou d'une forme, essentielle pour visualiser des projets industriels ou techniques."
    },
    "ITEC": {
        titre: "Innovation Technologique et Éco-Conception (ITEC)",
        desc: "Enseignement de spécialité axé sur l'analyse, la conception et l'optimisation des produits en tenant compte de leur cycle de vie et de leur impact environnemental."
    },
    "Energie": {
        titre: "Énergie & Environnement",
        desc: "Étude des flux énergétiques, de l'efficacité des systèmes et des solutions éco-responsables pour réduire l'empreinte carbone des installations techniques."
    },
    "Liaisons mécaniques": {
        titre: "Liaisons mécaniques",
        desc: "Étude des différentes façons dont les pièces d'un mécanisme sont liées entre elles pour permettre ou empêcher certains mouvements."
    },
    "Arduino": {
        titre: "Arduino",
        desc: "Plateforme de prototypage électronique open-source basée sur des cartes microcontrôleurs faciles à programmer. Utilisée pour piloter des capteurs, moteurs et faire interagir le code avec le monde physique.",
        img: "../images/arduino.png"
    },
    "Electronique": {
        titre: "Électronique",
        desc: "Branche de la physique et de l'ingénierie qui étudie et met en œuvre des circuits électriques utilisant des composants actifs et passifs."
    },
    "Python": {
        titre: "Python",
        desc: "Langage de programmation de haut niveau, interprété et orienté objet. Apprécié pour sa syntaxe claire et lisible, il est utilisé aussi bien pour des scripts d'automatisation que pour des projets complexes.",
        img: "../images/python.png"
    },
    "Java": {
        titre: "Java",
        desc: "Langage de programmation orienté objet robuste et sécurisé, largement utilisé pour le développement d'applications d'entreprise, logicielles et mobiles.",
        img: "../images/java.png"
    },
    "PHP": {
        titre: "PHP",
        desc: "Langage de script côté serveur conçu principalement pour le développement web dynamique et la gestion des interactions avec les bases de données.",
        img: "../images/php.png"
    },
    "Flask": {
        titre: "Flask",
        desc: "Micro-framework web minimaliste écrit en Python, idéal pour démarrer rapidement des applications web légères et des API.",
        img: "../images/flask.png"
    },
    "JSON": {
        titre: "JSON (JavaScript Object Notation)",
        desc: "Format de données textuel léger dérivé de la notation des objets JavaScript, très utilisé pour structurer et échanger des données entre un serveur et une application web."
    },
    "html": {
        titre: "HTML",
        desc: "Langage de balisage standard conçu pour représenter les pages web, structurant le contenu (textes, images, liens).",
        img: "../images/html.png"
    },
    "css": {
        titre: "CSS",
        desc: "Langage de style qui décrit la présentation des documents HTML (couleurs, mise en page, polices, design responsive).",
        img: "../images/css.png"
    },
    "JavaScript": {
        titre: "JavaScript",
        desc: "Langage de programmation incontournable du web, permettant de dynamiser les pages côté client et d'interagir avec l'utilisateur.",
        img: "../images/js.png"
    },
    "Linux": {
        titre: "Linux",
        desc: "Système d'exploitation open-source de type Unix, omniprésent sur les serveurs et les environnements de développement avancés.",
        img: "../images/linux.png"
    },
    "Bash": {
        titre: "Bash",
        desc: "Interpréteur de commandes et langage de script utilisé sous Unix/Linux pour automatiser des tâches répétitives et gérer le système."
    },
    "WSL": {
        titre: "WSL (Windows Subsystem for Linux)",
        desc: "Fonctionnalité Windows permettant d'exécuter un environnement Linux directement sous Windows."
    },
    "Cisco": {
        titre: "Réseaux Cisco",
        desc: "Apprentissage des architectures réseaux, du routage et de la commutation sur le matériel de référence mondial Cisco.",
        img: "../images/cisco.png"
    },
    "Stormshield": {
        titre: "Stormshield",
        desc: "Solutions de cybersécurité européennes de type pare-feu (firewall) nouvelle génération pour protéger les infrastructures réseaux."
    },
    "Broker": {
        titre: "Broker de messages",
        desc: "Logiciel intermédiaire permettant de gérer les flux de messages entre différents appareils connectés ou services de manière asynchrone."
    },
    "Reseaux": {
        titre: "Réseaux informatiques",
        desc: "Ensemble des protocoles, équipements et règles (TCP/IP, VLAN, DNS) permettant la communication sécurisée entre machines."
    },
    "SQL": {
        titre: "SQL",
        desc: "Langage standardisé universellement utilisé pour exploiter, interroger et administrer des bases de données relationnelles.",
    },
    "SGBD": {
        titre: "SGBD",
        desc: "Système de Gestion de Base de Données (logiciel permettant de manipuler et stocker les données en toute sécurité)."
    },
    "PostGreSQL": {
        titre: "PostgreSQL",
        desc: "SGBD relationnel puissant et open-source, reconnu pour sa robustesse et sa gestion de volumes complexes.",
        img: "../images/postgresql.png"
    },
    "MySQL": {
        titre: "MySQL",
        desc: "L'un des SGBD relationnels open-source les plus populaires au monde pour stocker les données applicatives.",
        img: "../images/mysql.png"
    },
    "Git": {
        titre: "Git",
        desc: "Système de contrôle de version décentralisé conçu pour suivre l'historique du code.",
        img: "../images/git.png"
    },
    "GitHub": {
        titre: "GitHub",
        desc: "Plateforme web d'hébergement et de gestion de code source basée sur Git.",
        img: "../images/github.png"
    },
    "TravailEquipe": {
        titre: "Travail en équipe",
        desc: "Méthodes et outils agiles permettant de synchroniser les efforts de plusieurs développeurs sur un même projet."
    },
    "API": {
        titre: "API",
        desc: "Interface de programmation permettant à différentes applications de communiquer entre elles."
    },
    "Frontend": {
        titre: "Développement Front-end",
        desc: "Conception de la partie visible d'une application web (interface, ergonomie)."
    },
    "Backend": {
        titre: "Développement Back-end",
        desc: "Gestion de la logique métier, des serveurs et des bases de données en arrière-plan."
    }
};

// Fonction d'ouverture de la modale techno avec gestion de l'image
function ouvrirModalTech(nomTech) {
    const modal = document.getElementById('modal-tech-desc');
    const titreElem = document.getElementById('modal-tech-title');
    const texteElem = document.getElementById('modal-tech-text');
    const imgElem = document.getElementById('modal-tech-img');

    if (descriptionsTech[nomTech]) {
        titreElem.textContent = descriptionsTech[nomTech].titre;
        texteElem.textContent = descriptionsTech[nomTech].desc;

        // Gestion de l'affichage de l'image si elle est définie dans l'objet
        if (descriptionsTech[nomTech].img) {
            imgElem.src = descriptionsTech[nomTech].img;
            imgElem.style.display = 'inline-block';
        } else {
            imgElem.style.display = 'none';
        }
    } else {
        titreElem.textContent = nomTech;
        texteElem.textContent = "Description en cours de rédaction pour cette technologie.";
        imgElem.style.display = 'none';
    }

    modal.style.display = 'block';
}

function fermerModalTech() {
    const modal = document.getElementById('modal-tech-desc');
    modal.style.display = 'none';
}

// Fermeture si on clique en dehors des modales
window.onclick = function(event) {
    const modalTech = document.getElementById('modal-tech-desc');
    const modalRob = document.getElementById('modal-techno');
    if (event.target === modalTech) {
        modalTech.style.display = 'none';
    }
    if (event.target === modalRob) {
        modalRob.style.display = 'none';
    }
}