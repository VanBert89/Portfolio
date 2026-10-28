const slider = document.getElementById('bio-slider');
const slideButtons = document.querySelectorAll('[data-slide-to]');
const tabButtons = document.querySelectorAll('.bio-tabs [data-slide-to]');

const panels = slider ? [...slider.querySelectorAll('.bio-panel')] : [];

function allerVers(id) {
    const panel = document.getElementById(id);
    if (!slider || !panel) return;
    slider.scrollTo({ left: panel.offsetLeft - slider.offsetLeft, behavior: 'smooth' });

    // Remonte en haut des panneaux si on était descendu dans la biographie
    const top = slider.getBoundingClientRect().top;
    if (top < 0) window.scrollBy({ top: top - 160, behavior: 'smooth' });
}

function panneauActif() {
    return Math.round(slider.scrollLeft / slider.clientWidth);
}

// Met à jour les boutons « Biographie / Mon CV » et adapte la hauteur au panneau visible
function majOnglets() {
    const index = panneauActif();
    tabButtons.forEach((btn, i) => btn.setAttribute('aria-pressed', String(i === index)));
    if (panels[index]) slider.style.height = panels[index].offsetHeight + 'px';
}

if (slider) {
    slideButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (slider.dataset.dragged === 'true') return;
            allerVers(btn.dataset.slideTo);
        });
    });

    slider.addEventListener('scroll', majOnglets, { passive: true });
    window.addEventListener('resize', majOnglets);
    majOnglets();

    /* ----------- Glissement à la souris (le tactile est géré nativement) ----------- */
    let startX = 0;
    let startScroll = 0;
    let isDragging = false;
    let hasMoved = false;

    slider.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        if (e.target.closest('a, input, textarea, .cv-card')) return; // ne gêne pas les liens ni la sélection
        isDragging = true;
        hasMoved = false;
        startX = e.clientX;
        startScroll = slider.scrollLeft;
    });

    document.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const distance = e.clientX - startX;
        if (!hasMoved && Math.abs(distance) > 5) {
            hasMoved = true;
            slider.classList.add('is-dragging');
        }
        if (hasMoved) slider.scrollLeft = startScroll - distance;
    });

    function finGlissement() {
        if (!isDragging) return;
        isDragging = false;
        slider.classList.remove('is-dragging');
        if (!hasMoved) return;

        // Se cale sur le panneau le plus proche
        const index = Math.round(slider.scrollLeft / slider.clientWidth);
        slider.scrollTo({ left: index * slider.clientWidth, behavior: 'smooth' });

        // Empêche le clic déclenché juste après un glissement
        slider.dataset.dragged = 'true';
        setTimeout(() => delete slider.dataset.dragged, 300);
    }

    document.addEventListener('pointerup', finGlissement);
    document.addEventListener('pointercancel', finGlissement);
}
