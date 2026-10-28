/* -------------------- FORMULAIRE -------------------- */
const form = document.querySelector('.contact-form');

if (form) {
    const status = form.querySelector('.form-status');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const counter = document.getElementById('message-counter');
    const fields = [
        ['savedName', nameInput],
        ['savedEmail', emailInput],
        ['savedMessage', messageInput]
    ];

    const storage = {
        get(key) {
            try { return localStorage.getItem(key) || ''; } catch (e) { return ''; }
        },
        set(key, value) {
            try { localStorage.setItem(key, value); } catch (e) { /* stockage indisponible */ }
        },
        remove(key) {
            try { localStorage.removeItem(key); } catch (e) { /* stockage indisponible */ }
        }
    };

    function showStatus(message, type) {
        status.textContent = message;
        status.className = 'form-status is-' + type;
    }

    function updateCounter() {
        const length = messageInput.value.length;
        counter.textContent = `${length} caractère${length > 1 ? 's' : ''} (10 minimum)`;
        counter.classList.toggle('is-valid', length >= 10);
        counter.classList.toggle('is-invalid', length > 0 && length < 10);
    }

    function invalid(input, message) {
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        showStatus(message, 'error');
        return false;
    }

    function validate() {
        fields.forEach(([, input]) => input.removeAttribute('aria-invalid'));

        if (nameInput.value.trim().length < 2) {
            return invalid(nameInput, 'Votre nom doit contenir au moins 2 caractères.');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            return invalid(emailInput, 'Veuillez entrer une adresse email valide (exemple@domaine.fr).');
        }
        if (messageInput.value.trim().length < 10) {
            return invalid(messageInput, 'Votre message doit contenir au moins 10 caractères.');
        }
        return true;
    }

    // Restauration du brouillon + sauvegarde automatique
    fields.forEach(([key, input]) => {
        input.value = storage.get(key);
        input.addEventListener('input', () => {
            input.removeAttribute('aria-invalid');
            storage.set(key, input.value);
        });
    });

    messageInput.addEventListener('input', updateCounter);
    updateCounter();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn.disabled = true;
        showStatus('Envoi en cours…', 'success');

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                showStatus('Merci ! Votre message a bien été envoyé.', 'success');
                form.reset();
                fields.forEach(([key]) => storage.remove(key));
                updateCounter();
            } else {
                const data = await response.json().catch(() => ({}));
                showStatus('Erreur : ' + (data.error || 'une erreur est survenue, réessayez plus tard.'), 'error');
            }
        } catch (err) {
            showStatus('Erreur réseau. Vérifiez votre connexion internet.', 'error');
        } finally {
            submitBtn.disabled = false;
        }
    });
}
