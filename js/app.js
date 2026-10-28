const root = document.documentElement;

/* -------------------- THÈME CLAIR / SOMBRE -------------------- */
// Le thème initial est appliqué dans le <head> (script inline) pour éviter le flash blanc.
const themeToggle = document.querySelector('.theme-toggle');

function updateThemeButton() {
    if (!themeToggle) return;
    const isDark = root.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Activer le thème clair' : 'Activer le thème sombre');
    themeToggle.setAttribute('aria-pressed', String(isDark));
}

function setTheme(theme) {
    root.dataset.theme = theme;
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        // stockage indisponible (navigation privée) : le thème reste valable pour la page en cours
    }
    updateThemeButton();
    loadParticles();
}

if (themeToggle) {
    updateThemeButton();
    themeToggle.addEventListener('click', () => {
        setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
}

/* -------------------- MENU MOBILE -------------------- */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('menu');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
            navLinks.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
        }
    });
}

/* -------------------- MODALES -------------------- */
// <button data-open-dialog="id-de-la-modale"> ouvre la modale correspondante.
document.querySelectorAll('[data-open-dialog]').forEach((btn) => {
    btn.addEventListener('click', () => {
        const dialog = document.getElementById(btn.dataset.openDialog);
        if (dialog) dialog.showModal();
    });
});

document.querySelectorAll('dialog.modal').forEach((dialog) => {
    dialog.querySelectorAll('[data-close-dialog]').forEach((btn) => {
        btn.addEventListener('click', () => dialog.close());
    });

    // Fermeture au clic sur le fond assombri
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
    });
});

/* -------------------- PARTICULES -------------------- */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function loadParticles() {
    if (typeof tsParticles === 'undefined' || !document.getElementById('particles-js')) return;

    // Couleurs lues dans les variables CSS : elles suivent automatiquement le thème
    const styles = getComputedStyle(root);
    const color = styles.getPropertyValue('--particle').trim();
    const linkColor = styles.getPropertyValue('--particle-link').trim();
    const isSmallScreen = window.innerWidth < 700;

    tsParticles.load('particles-js', {
        fpsLimit: 60,
        background: { color: { value: 'transparent' } },
        particles: {
            number: { value: isSmallScreen ? 30 : 60, density: { enable: true, area: 900 } },
            color: { value: color },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 } },
            links: { enable: true, distance: 160, color: linkColor, opacity: 0.35, width: 1 },
            move: { enable: !reduceMotion, speed: 0.8, outModes: { default: 'bounce' } }
        },
        interactivity: {
            events: { onHover: { enable: !isSmallScreen, mode: 'grab' }, onClick: { enable: false } },
            modes: { grab: { distance: 160, links: { opacity: 0.6 } } }
        },
        detectRetina: true
    });
}

loadParticles();
