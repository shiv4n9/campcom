let users = JSON.parse(localStorage.getItem('users')) || [];

// Register form
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Check if email already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("Email is already registered!");
        return;
    }

    // Register the user
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    window.location.href = 'login.html';
});

// Login form
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Check if the user exists and the password matches
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert(`Welcome back, ${user.username}!`);
        // Redirect to the homepage (or a protected page)
        window.location.href = 'index.html';
    } else {
        alert("Invalid email or password.");
    }
});
