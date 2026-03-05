/* auth.js – Login & Register client-side interactions */

// ── Reset form state on every page show (handles bfcache restores) ─────────
// Without this, navigating back to the page can replay a previous success/error
// message because the browser restores the full DOM snapshot from its cache.
window.addEventListener('pageshow', () => {
    document.querySelectorAll('.form-message').forEach(el => {
        el.className = 'form-message';
        el.textContent = '';
    });
    // Also reset any form inputs that may have been auto-filled by previous JS
    document.querySelectorAll('.auth-form').forEach(form => form.reset());
});

// ── Password Visibility Toggles ────────────────────────
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        if (!input) return;

        const isHidden = input.type === 'password';
        input.type = isHidden ? 'text' : 'password';
        btn.textContent = isHidden ? '🙈' : '👁';
    });
});

// ── Password Strength Meter (register page only) ───────
const passwordInput = document.getElementById('registerPassword');
const strengthFill  = document.getElementById('strengthFill');
const strengthLabel = document.getElementById('strengthLabel');

if (passwordInput && strengthFill && strengthLabel) {
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        let score = 0;

        if (val.length >= 8)                         score++;
        if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
        if (/\d/.test(val))                          score++;
        if (/[^A-Za-z0-9]/.test(val))               score++;

        strengthFill.className = 'strength-fill';

        if (val.length === 0) {
            strengthLabel.textContent = '';
        } else if (score <= 1) {
            strengthFill.classList.add('weak');
            strengthLabel.textContent = 'Weak';
        } else if (score <= 2) {
            strengthFill.classList.add('fair');
            strengthLabel.textContent = 'Fair';
        } else {
            strengthFill.classList.add('strong');
            strengthLabel.textContent = 'Strong';
        }
    });
}

// ── Login Form (placeholder – no backend yet) ──────────
const loginForm    = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email    = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        loginMessage.className = 'form-message';

        if (!email || !password) {
            loginMessage.textContent = 'Please fill in all fields.';
            loginMessage.classList.add('error');
            return;
        }

        // Placeholder – replace with a real fetch() call when backend is ready
        loginMessage.textContent = '✔ Login functionality not connected yet. Stay tuned!';
        loginMessage.classList.add('success');
    });
}

// ── Register Form (placeholder – no backend yet) ───────
const registerForm    = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

if (registerForm) {
    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        const firstName = document.getElementById('registerFirstName').value.trim();
        const lastName  = document.getElementById('registerLastName').value.trim();
        const email     = document.getElementById('registerEmail').value.trim();
        const password  = document.getElementById('registerPassword').value;
        const confirm   = document.getElementById('registerConfirm').value;

        registerMessage.className = 'form-message';

        if (!firstName || !lastName || !email || !password || !confirm) {
            registerMessage.textContent = 'Please fill in all fields.';
            registerMessage.classList.add('error');
            return;
        }

        if (password !== confirm) {
            registerMessage.textContent = 'Passwords do not match.';
            registerMessage.classList.add('error');
            return;
        }

        if (password.length < 8) {
            registerMessage.textContent = 'Password must be at least 8 characters.';
            registerMessage.classList.add('error');
            return;
        }

        // Placeholder – replace with a real fetch() call when backend is ready
        registerMessage.textContent = '✔ Registration functionality not connected yet. Stay tuned!';
        registerMessage.classList.add('success');
    });
}
