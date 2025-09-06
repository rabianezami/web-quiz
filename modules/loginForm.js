export function renderAuth(container) {
    container.innerHTML = `
    <div class="auth-container">
        <!-- Login Form -->
        <form id="loginForm">
            <h3 class="text-center mb-4">Login</h3>
            <div class="mb-3">
                <label for="loginEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="loginEmail" required>
            </div>
            <div class="mb-3">
                <label for="loginPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="loginPassword" required>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <input type="checkbox" id="rememberMe">
                    <label for="rememberMe">Remember me</label>
                </div>
                <a href="#" class="auth-toggle">Sign Up</a>
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>

        <!-- Registration Form -->
        <form id="registerForm" class="d-none">
            <h3 class="text-center mb-4">Register</h3>
            <div class="mb-3">
                <label for="regName" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="regName" required>
            </div>
            <div class="mb-3">
                <label for="regEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="regEmail" required>
            </div>
            <div class="mb-3">
                <label for="regPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="regPassword" required>
            </div>
            <div class="mb-3">
                <label for="regConfirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="regConfirmPassword" required>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="auth-toggle">Login</span>
            </div>
            <button type="submit" class="btn btn-success w-100">Register</button>
        </form>
    </div>
    `;

    // --- Script logic ---
    const loginForm = container.querySelector('#loginForm');
    const registerForm = container.querySelector('#registerForm');
    const toggles = container.querySelectorAll('.auth-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            loginForm.classList.toggle('d-none');
            registerForm.classList.toggle('d-none');
        });
    });

    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = container.querySelector('#loginEmail').value;
        alert("Login submitted: " + email);
    });

    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = container.querySelector('#regEmail').value;
        alert("Registered: " + email);
    });
}
