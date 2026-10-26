document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("mainSlider");
    const section1 = document.getElementById("section1");
    const section2 = document.getElementById("section2");

    const rightHint = document.getElementById("toRightHint");
    const leftHint = document.getElementById("toLeftHint");

    if (!slider || !section1 || !section2) return;

    // Navigation au clic
    rightHint?.addEventListener("click", () => {
        if (slider.dataset.dragged === "true") return;

        slider.scrollTo({
            left: section2.offsetLeft,
            behavior: "smooth"
        });
    });

    leftHint?.addEventListener("click", () => {
        if (slider.dataset.dragged === "true") return;

        slider.scrollTo({
            left: section1.offsetLeft,
            behavior: "smooth"
        });
    });

    // Glissement manuel à la souris
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let hasMoved = false;
    let activeHint = null;

    function commencerGlissement(e) {
        if (e.button !== 0) return;

        isDragging = true;
        hasMoved = false;
        activeHint = e.currentTarget;
        startX = e.clientX;
        startScrollLeft = slider.scrollLeft;

        slider.style.setProperty("scroll-snap-type", "none");
        slider.style.setProperty("scroll-behavior", "auto");

        document.body.style.userSelect = "none";
        e.preventDefault();
    }

    function deplacerGlissement(e) {
        if (!isDragging) return;

        const distance = e.clientX - startX;

        if (Math.abs(distance) > 3) {
            hasMoved = true;
        }

        if (hasMoved) {
            slider.scrollLeft = startScrollLeft - distance;
        }
    }

    function terminerGlissement() {
        if (!isDragging) return;

        isDragging = false;
        document.body.style.userSelect = "";

        slider.style.setProperty("scroll-snap-type", "x mandatory");
        slider.style.setProperty("scroll-behavior", "smooth");

        if (hasMoved) {
            slider.dataset.dragged = "true";

            const largeurPage = slider.clientWidth;
            const indexPage = Math.round(
                slider.scrollLeft / largeurPage
            );

            slider.scrollTo({
                left: indexPage * largeurPage,
                behavior: "smooth"
            });

            // Empêche le clic généré après le glissement
            setTimeout(() => {
                delete slider.dataset.dragged;
            }, 300);
        }

        activeHint = null;
    }

    [rightHint, leftHint].forEach((hint) => {
        if (!hint) return;

        hint.addEventListener("pointerdown", commencerGlissement);
    });

    document.addEventListener("pointermove", deplacerGlissement);
    document.addEventListener("pointerup", terminerGlissement);
    document.addEventListener("pointercancel", terminerGlissement);

    // Empêche le clic après un glissement
    [rightHint, leftHint].forEach((hint) => {
        if (!hint) return;

        hint.addEventListener("click", (e) => {
            if (slider.dataset.dragged === "true") {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }, true);
    });

    // Modale de prévisualisation du CV
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const cvModal = document.getElementById("cvModal");

    if (openModalBtn && closeModalBtn && cvModal) {
        openModalBtn.addEventListener("click", () => {
            cvModal.classList.add("active");
        });

        closeModalBtn.addEventListener("click", () => {
            cvModal.classList.remove("active");
        });

        cvModal.addEventListener("click", (e) => {
            if (e.target === cvModal) {
                cvModal.classList.remove("active");
            }
        });
    }
});
