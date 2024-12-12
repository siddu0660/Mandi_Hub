document.addEventListener('DOMContentLoaded', function() {
    const toggleFormButton = document.getElementById('toggle-form');
    const formTitle = document.getElementById('form-title');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    toggleFormButton.addEventListener('click', () => {
        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            formTitle.textContent = 'Login';
            toggleFormButton.textContent = 'Switch to Sign up';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            formTitle.textContent = 'Signup';
            toggleFormButton.textContent = 'Switch to Login';
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const category = document.getElementById('signup-category').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const user = {
            name: name,
            email: email,
            category: category,
            password: password
        };

        localStorage.setItem('user', JSON.stringify(user));
        alert('Sign up successful! Redirecting to profile...');
        window.location.href = 'profile.html';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.email === email && user.password === password) {
            alert('Login successful! Redirecting to profile...');
            window.location.href = 'profile.html';
        } else {
            alert('Invalid email or password.');
        }
    });
});
