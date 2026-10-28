const filterButtons = document.querySelectorAll('.filter-btn');
const activityCards = document.querySelectorAll('.activity-card');
const filterStatus = document.getElementById('filter-status');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filtre = button.dataset.filter;

        filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', String(btn === button)));

        let visibles = 0;
        activityCards.forEach((card) => {
            const afficher = filtre === 'all' || card.dataset.category === filtre;
            card.hidden = !afficher;
            if (afficher) visibles++;
        });

        // Annonce le résultat aux lecteurs d'écran
        if (filterStatus) filterStatus.textContent = `${visibles} activité${visibles > 1 ? 's' : ''} affichée${visibles > 1 ? 's' : ''}`;
    });
});
