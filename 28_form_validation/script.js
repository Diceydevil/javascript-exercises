// Select the email input and its error message span
const emailInput = document.getElementById('email');
const emailError = emailInput.nextElementSibling; // Gets the span right after the input

// Function to validate email and show custom errors
function validateEmail() {
    const validity = emailInput.validity;
    
    if (validity.valid) {
        // Clear any error
        emailError.textContent = '';
        emailInput.classList.remove('touched');
        return true;
    }
    
    // Show specific error based on what's wrong
    if (validity.valueMissing) {
        emailError.textContent = 'Email is required. Please enter your email address.';
    } else if (validity.typeMismatch) {
        emailError.textContent = 'Please enter a valid email address (e.g., user@example.com).';
    }
    
    // Add touched class for styling
    emailInput.classList.add('touched');
    return false;
}

// ============================================
// PASSWORD VALIDATION
// ============================================
const passwordInput = document.getElementById('password');
const passwordError = passwordInput.nextElementSibling;

function validatePassword() {
    const password = passwordInput.value;
    
    // Define requirements
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // Check each requirement and set appropriate error
    // Priority: empty > length > character requirements
    
    if (passwordInput.validity.valueMissing) {
        passwordError.textContent = 'Password is required.';
        passwordInput.setCustomValidity('Password is required.');
        passwordInput.classList.add('touched');
        return false;
    }
    
    if (password.length < minLength) {
        passwordError.textContent = `Password must be at least ${minLength} characters long.`;
        passwordInput.setCustomValidity(`Password must be at least ${minLength} characters long.`);
        passwordInput.classList.add('touched');
        return false;
    }
    
    if (!hasUpperCase) {
        passwordError.textContent = 'Password must contain at least one uppercase letter (A-Z).';
        passwordInput.setCustomValidity('Password must contain at least one uppercase letter.');
        passwordInput.classList.add('touched');
        return false;
    }
    
    if (!hasLowerCase) {
        passwordError.textContent = 'Password must contain at least one lowercase letter (a-z).';
        passwordInput.setCustomValidity('Password must contain at least one lowercase letter.');
        passwordInput.classList.add('touched');
        return false;
    }
    
    if (!hasNumber) {
        passwordError.textContent = 'Password must contain at least one number (0-9).';
        passwordInput.setCustomValidity('Password must contain at least one number.');
        passwordInput.classList.add('touched');
        return false;
    }
    
    if (!hasSpecialChar) {
        passwordError.textContent = 'Password must contain at least one special character (!@#$%^&*...).';
        passwordInput.setCustomValidity('Password must contain at least one special character.');
        passwordInput.classList.add('touched');
        return false;
    }
    
    // All requirements met!
    passwordError.textContent = '';
    passwordInput.setCustomValidity('');
    passwordInput.classList.remove('touched');
    return true;
}

// Attach event listeners
passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('input', validatePassword);

// Validate on blur (when user leaves the field)
emailInput.addEventListener('blur', validateEmail);

// Also validate on input (as they type)
emailInput.addEventListener('input', validateEmail);

// ============================================
// PASSWORD CONFIRMATION VALIDATION
// ============================================
const passwordConfirmInput = document.getElementById('password-confirm');
const passwordConfirmError = passwordConfirmInput.nextElementSibling;

function validatePasswordConfirmation() {
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;
    
    // First check if it's empty (required field)
    if (passwordConfirmInput.validity.valueMissing) {
        passwordConfirmError.textContent = 'Please confirm your password.';
        passwordConfirmInput.setCustomValidity('Please confirm your password.');
        passwordConfirmInput.classList.add('touched');
        return false;
    }
    
    // Check if passwords match
    if (password !== passwordConfirm) {
        passwordConfirmError.textContent = 'Passwords do not match.';
        passwordConfirmInput.setCustomValidity('Passwords do not match.');
        passwordConfirmInput.classList.add('touched');
        return false;
    }
    
    // Passwords match!
    passwordConfirmError.textContent = '';
    passwordConfirmInput.setCustomValidity('');
    passwordConfirmInput.classList.remove('touched');
    return true;
}

// Validate when user types in confirmation field
passwordConfirmInput.addEventListener('input', validatePasswordConfirmation);
passwordConfirmInput.addEventListener('blur', validatePasswordConfirmation);

// IMPORTANT: Also validate confirmation when original password changes!
passwordInput.addEventListener('input', function() {
    // If confirmation field has content, re-validate it
    if (passwordConfirmInput.value.length > 0) {
        validatePasswordConfirmation();
    }
});