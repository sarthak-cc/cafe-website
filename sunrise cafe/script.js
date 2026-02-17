/* ========================================
   Sunrise Café - Main JavaScript File
   ======================================== */

// ==========================================
// Utility Functions
// ==========================================

/**
 * Set current year in footer
 */
function setFooterYear() {
    const yearElements = document.querySelectorAll('#year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

/**
 * Toggle password visibility in login form
 * @param {string} inputId - ID of password input
 * @param {string} iconId - ID of toggle icon
 */
function togglePassword(inputId = 'password', iconId = 'toggleIcon') {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = document.getElementById(iconId);
    
    if (!passwordInput || !toggleIcon) return;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('bi-eye');
        toggleIcon.classList.add('bi-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('bi-eye-slash');
        toggleIcon.classList.add('bi-eye');
    }
}

// ==========================================
// Authentication Functions
// ==========================================

/**
 * Handle login form submission
 * TODO: Replace with actual JDBC backend call
 * @param {Event} event - Form submit event
 */
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username')?.value?.trim();
    const password = document.getElementById('password')?.value?.trim();
    const rememberMe = document.getElementById('rememberMe')?.checked;
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    // Validation
    if (!username || !password) {
        if (errorText) errorText.textContent = 'Please enter both username and password';
        if (errorDiv) errorDiv.style.display = 'block';
        return;
    }
    
    // TODO: Replace with actual JDBC backend authentication
    // Example JDBC integration:
    /*
    try {
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                username: username, 
                password: password 
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Store session info
            if (rememberMe) {
                localStorage.setItem('sunriseCafeUser', username);
                localStorage.setItem('sunriseCafeToken', data.token);
            } else {
                sessionStorage.setItem('sunriseCafeUser', username);
                sessionStorage.setItem('sunriseCafeToken', data.token);
            }
            
            // Redirect to home
            window.location.href = 'home.html';
        } else {
            throw new Error(data.message || 'Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        if (errorText) errorText.textContent = error.message || 'Login failed. Please try again.';
        if (errorDiv) errorDiv.style.display = 'block';
    }
    */
    
    // Demo mode - accept any non-empty credentials
    console.log('Demo login:', { username, rememberMe });
    
    // Store login state
    if (rememberMe) {
        localStorage.setItem('sunriseCafeUser', username);
    }
    
    // Redirect to home page
    window.location.href = 'home.html';
}

/**
 * Handle logout
 * Clears session and redirects to login
 */
function logout() {
    // Clear all storage
    localStorage.removeItem('sunriseCafeUser');
    localStorage.removeItem('sunriseCafeToken');
    sessionStorage.removeItem('sunriseCafeUser');
    sessionStorage.removeItem('sunriseCafeToken');
    
    console.log('User logged out');
    // Redirect happens automatically via href in HTML
}

/**
 * Check if user is logged in
 * Optional: Auto-redirect if not authenticated
 */
function checkAuth() {
    const user = localStorage.getItem('sunriseCafeUser') || sessionStorage.getItem('sunriseCafeUser');
    
    if (!user) {
        // Uncomment to enforce login on protected pages
        // window.location.href = 'login.html';
        console.log('No active session found');
    } else {
        console.log('Active session:', user);
    }
    
    return user;
}

// ==========================================
// Menu & Modal Functions
// ==========================================

/**
 * Initialize menu item modal functionality
 */
function initMenuModal() {
    const itemModal = document.getElementById('itemModal');
    
    if (!itemModal) return;
    
    itemModal.addEventListener('show.bs.modal', function(event) {
        const trigger = event.relatedTarget;
        
        if (!trigger) return;
        
        const title = trigger.getAttribute('data-title') || 'Item';
        const desc = trigger.getAttribute('data-desc') || '';
        const price = trigger.getAttribute('data-price') || '';
        
        const modalTitle = itemModal.querySelector('.modal-title');
        const modalDesc = itemModal.querySelector('#itemDesc');
        const modalPrice = itemModal.querySelector('#itemPrice');
        
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalPrice) modalPrice.textContent = price;
    });
}

/**
 * Add item to cart (demo function)
 * @param {string} itemName - Name of the item
 * @param {string} price - Price of the item
 */
function addToCart(itemName, price) {
    console.log('Added to cart:', { itemName, price });
    
    // TODO: Implement cart functionality with backend
    // Store in localStorage or send to server
    
    // Show toast notification
    showToast(`Added ${itemName} to cart!`);
}

// ==========================================
// Feedback Functions
// ==========================================

/**
 * Handle feedback form submission
 * TODO: Replace with actual JDBC backend call
 * @param {Event} event - Form submit event
 */
async function handleFeedbackSubmit(event) {
    event.preventDefault();
    
    // Collect form data
    const serviceRating = document.querySelector('input[name="service"]:checked')?.value;
    const qualityRating = document.querySelector('input[name="quality"]:checked')?.value;
    const ambianceRating = document.querySelector('input[name="ambiance"]:checked')?.value;
    const recommendRating = document.querySelector('input[name="recommend"]:checked')?.value;
    const comments = document.getElementById('comments')?.value?.trim();
    const email = document.getElementById('email')?.value?.trim();
    
    // Validation
    if (!serviceRating || !qualityRating || !ambianceRating || !recommendRating) {
        showToast('Please answer all required questions', 'error');
        return;
    }
    
    const feedbackData = {
        service: parseInt(serviceRating),
        quality: parseInt(qualityRating),
        ambiance: parseInt(ambianceRating),
        recommend: parseInt(recommendRating),
        comments: comments,
        email: email,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    console.log('Feedback submitted:', feedbackData);
    
    // TODO: Replace with actual JDBC backend call
    /*
    try {
        const response = await fetch('http://localhost:8080/api/feedback', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('sunriseCafeToken') || ''}`
            },
            body: JSON.stringify(feedbackData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit feedback');
        }
        
        const result = await response.json();
        console.log('Server response:', result);
        
    } catch (error) {
        console.error('Feedback submission error:', error);
        showToast('Failed to submit feedback. Please try again.', 'error');
        return;
    }
    */
    
    // Show success message
    const form = document.getElementById('feedbackForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form) form.style.display = 'none';
    if (successMessage) successMessage.style.display = 'block';
    
    // Scroll to success message
    const feedbackCard = document.querySelector('.feedback-card');
    if (feedbackCard) {
        feedbackCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ==========================================
// Form Handling Functions
// ==========================================

/**
 * Handle contact form submission
 * @param {Event} event - Form submit event
 */
function handleContactSubmit(event) {
    event.preventDefault();
    
    // Demo alert - replace with backend integration
    alert('This is a demo form — hook up a backend to submit.');
    
    // TODO: Implement actual form submission to backend
}

/**
 * Handle reservation form submission
 * @param {Event} event - Form submit event
 */
function handleReservationSubmit(event) {
    event.preventDefault();
    
    // Demo alert - replace with backend integration
    alert('Reservation received (demo). Hook up backend to actually save.');
    
    // TODO: Implement actual reservation system with JDBC
    // Collect form data and send to Java backend
}

// ==========================================
// UI Helper Functions
// ==========================================

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type: 'success', 'error', 'info'
 */
function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'error' ? 'danger' : type === 'info' ? 'info' : 'success'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="bi bi-${type === 'error' ? 'exclamation-triangle' : type === 'info' ? 'info-circle' : 'check-circle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    // Add to container or create one
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    // Initialize and show Bootstrap toast
    const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
    bsToast.show();
    
    // Remove from DOM after hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

/**
 * Smooth scroll to section
 * @param {string} targetId - ID of target element
 */
function scrollToSection(targetId) {
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==========================================
// Initialization
// ==========================================

/**
 * Initialize all components when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sunrise Café JS Loaded');
    
    // Set footer year on all pages
    setFooterYear();
    
    // Initialize menu modal if present
    initMenuModal();
    
    // Check authentication status (optional)
    // checkAuth();
    
    // Page-specific initializations
    const currentPage = window.location.pathname.split('/').pop() || 'login.html';
    
    switch(currentPage) {
        case 'login.html':
            console.log('Login page initialized');
            // Check for saved credentials
            const savedUser = localStorage.getItem('sunriseCafeUser');
            if (savedUser) {
                const usernameInput = document.getElementById('username');
                if (usernameInput) {
                    usernameInput.value = savedUser;
                    document.getElementById('rememberMe')?.setAttribute('checked', 'true');
                }
            }
            break;
            
        case 'home.html':
            console.log('Home page initialized');
            // Add any home-specific init here
            break;
            
        case 'feedback.html':
            console.log('Feedback page initialized');
            // Add any feedback-specific init here
            break;
    }
});

// ==========================================
// Export functions for global access (if needed)
// ==========================================

// Make functions available globally for HTML onclick attributes
window.togglePassword = togglePassword;
window.handleLogin = handleLogin;
window.logout = logout;
window.handleFeedbackSubmit = handleFeedbackSubmit;
window.handleContactSubmit = handleContactSubmit;
window.handleReservationSubmit = handleReservationSubmit;
window.addToCart = addToCart;
window.scrollToSection = scrollToSection;