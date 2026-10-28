const timeline = document.querySelector('.tl');
const progress = document.querySelector('.tl-progress');
const dots = document.querySelectorAll('.tl-dot');
const revealItems = document.querySelectorAll('.tl-item, .tl-stage');

function updateTimeline() {
    if (!timeline || !progress) return;

    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight - vh;
    const t = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 1;

    // Point de référence : 60 % de l'écran, qui descend vers 100 % en fin de page
    const trigger = vh * (0.6 + 0.4 * Math.pow(t, 3));

    let filled = trigger - rect.top;
    if (maxScroll - window.scrollY <= 2) filled = timeline.offsetHeight; // tout en bas : barre pleine
    filled = Math.max(0, Math.min(filled, timeline.offsetHeight));
    progress.style.height = filled + 'px';

    // Un point s'allume quand la barre l'atteint
    dots.forEach((dot) => {
        const dotY = dot.getBoundingClientRect().top - rect.top + dot.offsetHeight / 2;
        dot.classList.toggle('active', dotY <= filled);
    });

    // Bloc « en cours » = le plus proche du point de référence
    let closest = null;
    let minDist = Infinity;
    revealItems.forEach((el) => {
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - trigger);
        if (dist < minDist) {
            minDist = dist;
            closest = el;
        }
    });
    revealItems.forEach((el) => el.classList.toggle('current', el === closest && minDist < vh * 0.5));
}

window.addEventListener('scroll', updateTimeline, { passive: true });
window.addEventListener('resize', updateTimeline);
updateTimeline();

/* -------------------- APPARITION DES CARTES -------------------- */
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach((el) => observer.observe(el));
} else {
    revealItems.forEach((el) => el.classList.add('visible'));
}

/* -------------------- DESCRIPTIONS DES TECHNOLOGIES -------------------- */
const LOGOS = '../images/logos/';

const descriptionsTech = {
    Inventor: {
        titre: 'Autodesk Inventor',
        desc: 'Logiciel de conception assistée par ordinateur (CAO) 3D utilisé en STI2D pour concevoir, simuler et prototyper des pièces mécaniques de manière rigoureuse.',
        img: 'autodesk.svg'
    },
    Modelisation: {
        titre: 'Modélisation 3D',
        desc: "Technique de création d'une représentation tridimensionnelle d'un objet, essentielle pour visualiser des projets industriels ou techniques."
    },
    ITEC: {
        titre: 'Innovation Technologique et Éco-Conception (ITEC)',
        desc: "Enseignement de spécialité axé sur l'analyse, la conception et l'optimisation des produits en tenant compte de leur cycle de vie et de leur impact environnemental."
    },
    Energie: {
        titre: 'Énergie & Environnement',
        desc: "Étude des flux énergétiques, de l'efficacité des systèmes et des solutions éco-responsables pour réduire l'empreinte carbone des installations techniques."
    },
    Liaisons: {
        titre: 'Liaisons mécaniques',
        desc: "Étude des différentes façons dont les pièces d'un mécanisme sont liées entre elles pour permettre ou empêcher certains mouvements."
    },
    Arduino: {
        titre: 'Arduino',
        desc: 'Plateforme de prototypage électronique open-source basée sur des cartes à microcontrôleur faciles à programmer, pour piloter capteurs et moteurs.',
        img: 'arduino.svg'
    },
    Electronique: {
        titre: 'Électronique',
        desc: 'Discipline qui étudie et met en œuvre des circuits électriques utilisant des composants actifs et passifs.'
    },
    Python: {
        titre: 'Python',
        desc: "Langage de programmation de haut niveau, apprécié pour sa syntaxe claire. Il sert aussi bien pour des scripts d'automatisation que pour des projets complexes.",
        img: 'python.svg'
    },
    Java: {
        titre: 'Java',
        desc: "Langage orienté objet robuste, largement utilisé pour le développement d'applications d'entreprise, logicielles et mobiles.",
        img: 'java.svg'
    },
    PHP: {
        titre: 'PHP',
        desc: 'Langage de script côté serveur conçu pour le développement web dynamique et les échanges avec les bases de données.',
        img: 'php.svg'
    },
    Flask: {
        titre: 'Flask',
        desc: 'Micro-framework web minimaliste écrit en Python, idéal pour créer rapidement des applications web légères et des API.',
        img: 'flask.svg'
    },
    JSON: {
        titre: 'JSON (JavaScript Object Notation)',
        desc: 'Format de données textuel léger, très utilisé pour structurer et échanger des données entre un serveur et une application web.',
        img: 'json.svg'
    },
    HTML: {
        titre: 'HTML',
        desc: 'Langage de balisage standard qui structure le contenu des pages web (textes, images, liens).',
        img: 'html5.svg'
    },
    CSS: {
        titre: 'CSS',
        desc: 'Langage de style qui décrit la présentation des pages HTML : couleurs, mise en page, polices, design responsive.',
        img: 'css3.svg'
    },
    JavaScript: {
        titre: 'JavaScript',
        desc: "Langage incontournable du web, qui permet de dynamiser les pages côté client et d'interagir avec l'utilisateur.",
        img: 'javascript.svg'
    },
    Linux: {
        titre: 'Linux',
        desc: "Système d'exploitation open-source de type Unix, omniprésent sur les serveurs et les environnements de développement.",
        img: 'linux.svg'
    },
    Bash: {
        titre: 'Bash',
        desc: 'Interpréteur de commandes et langage de script Unix/Linux pour automatiser des tâches et administrer le système.',
        img: 'bash.svg'
    },
    WSL: {
        titre: 'WSL (Windows Subsystem for Linux)',
        desc: 'Fonctionnalité de Windows permettant d’exécuter un environnement Linux directement sous Windows.'
    },
    Cisco: {
        titre: 'Réseaux Cisco',
        desc: 'Apprentissage des architectures réseaux, du routage et de la commutation sur le matériel Cisco, référence du secteur.',
        img: 'cisco.svg'
    },
    Stormshield: {
        titre: 'Stormshield',
        desc: 'Solutions européennes de cybersécurité, notamment des pare-feu nouvelle génération pour protéger les infrastructures réseau.'
    },
    Broker: {
        titre: 'Broker de messages',
        desc: 'Logiciel intermédiaire qui gère les flux de messages entre appareils connectés ou services, de manière asynchrone.'
    },
    Reseaux: {
        titre: 'Réseaux informatiques',
        desc: 'Ensemble des protocoles, équipements et règles (TCP/IP, VLAN, DNS) permettant la communication sécurisée entre machines.'
    },
    SQL: {
        titre: 'SQL',
        desc: 'Langage standard pour interroger, exploiter et administrer des bases de données relationnelles.'
    },
    SGBD: {
        titre: 'SGBD',
        desc: 'Système de Gestion de Base de Données : logiciel qui permet de stocker et manipuler les données en toute sécurité.'
    },
    PostgreSQL: {
        titre: 'PostgreSQL',
        desc: 'SGBD relationnel open-source puissant, reconnu pour sa robustesse et sa gestion de volumes complexes.',
        img: 'postgresql.svg'
    },
    MySQL: {
        titre: 'MySQL',
        desc: "L'un des SGBD relationnels open-source les plus populaires au monde pour stocker les données applicatives.",
        img: 'mysql.svg'
    },
    Git: {
        titre: 'Git',
        desc: "Système de contrôle de version décentralisé conçu pour suivre l'historique du code.",
        img: 'git.svg'
    },
    GitHub: {
        titre: 'GitHub',
        desc: "Plateforme d'hébergement et de collaboration sur du code source basée sur Git.",
        img: 'github.svg'
    },
    Equipe: {
        titre: 'Travail en équipe',
        desc: 'Méthodes et outils (agilité, revues de code) permettant de synchroniser plusieurs développeurs sur un même projet.'
    },
    API: {
        titre: 'API',
        desc: 'Interface de programmation permettant à différentes applications de communiquer entre elles.'
    },
    Frontend: {
        titre: 'Développement front-end',
        desc: "Conception de la partie visible d'une application web : interface, ergonomie, accessibilité."
    },
    Backend: {
        titre: 'Développement back-end',
        desc: 'Gestion de la logique métier, des serveurs et des bases de données en arrière-plan.'
    }
};

/* -------------------- MODALE TECHNO -------------------- */
const modalTech = document.getElementById('modal-tech');
const modalTitle = document.getElementById('modal-tech-titre');
const modalText = document.getElementById('modal-tech-texte');
const modalImg = document.getElementById('modal-tech-img');

document.querySelectorAll('[data-tech]').forEach((btn) => {
    btn.addEventListener('click', () => {
        const tech = descriptionsTech[btn.dataset.tech];

        modalTitle.textContent = tech ? tech.titre : btn.textContent;
        modalText.textContent = tech ? tech.desc : 'Description en cours de rédaction pour cette technologie.';

        if (tech && tech.img) {
            modalImg.src = LOGOS + tech.img;
            modalImg.alt = 'Logo ' + tech.titre;
            modalImg.hidden = false;
        } else {
            modalImg.hidden = true;
        }

        modalTech.showModal();
    });
});
