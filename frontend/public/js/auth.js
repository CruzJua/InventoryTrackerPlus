/* auth.js – Login & Register client-side interactions */

// ── Reset form state on every page show (handles bfcache restores) ──────────
window.addEventListener('pageshow', () => {
    document.querySelectorAll('.form-message').forEach(el => {
        el.className = 'form-message';
        el.textContent = '';
    });
    document.querySelectorAll('.auth-form').forEach(form => form.reset());
});

// ── Password Visibility Toggles ─────────────────────────────────────────────
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

// ── Password Strength Meter (register page only) ─────────────────────────────
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

// ── Helper: show a message in a form-message element ────────────────────────
function showMsg(el, text, type) {
    el.className = `form-message ${type}`;
    el.textContent = text;
}

function setLoading(btn, loading) {
    btn.disabled = loading;
    btn.textContent = loading ? 'Please wait…' : btn.dataset.label;
}

// ── Login Form ───────────────────────────────────────────────────────────────
const loginForm    = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const loginBtn     = document.getElementById('loginBtn');

if (loginForm && loginBtn) {
    loginBtn.dataset.label = loginBtn.textContent;

    loginForm.addEventListener('submit', async e => {
        e.preventDefault();
        const email    = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        loginMessage.className = 'form-message';

        if (!email || !password) {
            showMsg(loginMessage, 'Please fill in all fields.', 'error');
            return;
        }

        setLoading(loginBtn, true);
        try {
            const res  = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (!res.ok) {
                showMsg(loginMessage, data.error || 'Login failed.', 'error');
            } else {
                showMsg(loginMessage, `Welcome back, ${data.name}! Redirecting…`, 'success');
                setTimeout(() => window.location.href = '/inventory', 1000);
            }
        } catch (err) {
            showMsg(loginMessage, 'Network error. Please try again.', 'error');
        } finally {
            setLoading(loginBtn, false);
        }
    });
}

// ── Register Form ────────────────────────────────────────────────────────────
const registerForm    = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');
const registerBtn     = document.getElementById('registerBtn');

if (registerForm && registerBtn) {
    registerBtn.dataset.label = registerBtn.textContent;

    registerForm.addEventListener('submit', async e => {
        e.preventDefault();
        const firstName    = document.getElementById('registerFirstName').value.trim();
        const lastName     = document.getElementById('registerLastName').value.trim();
        const businessName = document.getElementById('registerBusinessName').value.trim();
        const email        = document.getElementById('registerEmail').value.trim();
        const password     = document.getElementById('registerPassword').value;
        const confirm      = document.getElementById('registerConfirm').value;

        registerMessage.className = 'form-message';

        if (!firstName || !lastName || !businessName || !email || !password || !confirm) {
            showMsg(registerMessage, 'Please fill in all fields.', 'error');
            return;
        }
        if (password !== confirm) {
            showMsg(registerMessage, 'Passwords do not match.', 'error');
            return;
        }
        if (password.length < 8) {
            showMsg(registerMessage, 'Password must be at least 8 characters.', 'error');
            return;
        }

        setLoading(registerBtn, true);
        try {
            const res  = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, businessName, email, password })
            });
            const data = await res.json();

            if (!res.ok) {
                showMsg(registerMessage, data.error || 'Registration failed.', 'error');
            } else {
                showMsg(registerMessage, 'Account created! Redirecting to login…', 'success');
                setTimeout(() => window.location.href = '/login', 1200);
            }
        } catch (err) {
            showMsg(registerMessage, 'Network error. Please try again.', 'error');
        } finally {
            setLoading(registerBtn, false);
        }
    });
}
