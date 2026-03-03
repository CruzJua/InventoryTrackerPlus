const form = document.getElementById('contactForm');
const msgBox = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Clear any previous message
    msgBox.className = 'form-message';
    msgBox.textContent = '';

    if (!name || !email || !message) {
        msgBox.classList.add('error');
        msgBox.textContent = 'Please fill in your name, email, and message before sending.';
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        msgBox.classList.add('error');
        msgBox.textContent = 'Please enter a valid email address.';
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const subject = document.getElementById('contactSubject').value.trim();

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await res.json();

        if (res.ok && data.code === 200) {
            msgBox.classList.add('success');
            msgBox.textContent = "✓ Message sent! We'll get back to you soon.";
            form.reset();
        } else {
            msgBox.classList.add('error');
            msgBox.textContent = data.error || 'Something went wrong. Please try again.';
        }
    } catch (err) {
        msgBox.classList.add('error');
        msgBox.textContent = 'Network error — please check your connection and try again.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});
