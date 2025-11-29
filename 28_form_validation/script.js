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
// NAME VALIDATION
// ============================================
const nameInput = document.getElementById('name');
const nameError = nameInput.nextElementSibling;

function validateName() {
    if (nameInput.validity.valueMissing) {
        nameError.textContent = 'Name is required.';
        nameInput.setCustomValidity('Name is required.');
        nameInput.classList.add('touched');
        return false;
    }
    
    // Optional: check minimum length
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters.';
        nameInput.setCustomValidity('Name must be at least 2 characters.');
        nameInput.classList.add('touched');
        return false;
    }
    
    nameError.textContent = '';
    nameInput.setCustomValidity('');
    nameInput.classList.remove('touched');
    return true;
}

nameInput.addEventListener('blur', validateName);
nameInput.addEventListener('input', validateName);

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

// ============================================
// COUNTRY & POSTAL CODE VALIDATION
// ============================================
const countryInput = document.getElementById('country');
const countryError = countryInput.nextElementSibling;
const postalCodeInput = document.getElementById('postal-code');
const postalCodeError = postalCodeInput.nextElementSibling;

// Define postal code patterns for each country
const postalCodePatterns = {
    us: {
        pattern: /^\d{5}(-\d{4})?$/,
        example: '12345 or 12345-6789',
        message: 'US ZIP code must be 5 digits (e.g., 12345) or 5+4 format (e.g., 12345-6789)'
    },
    ca: {
        pattern: /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
        example: 'A1A 1A1',
        message: 'Canadian postal code must be in format: A1A 1A1 (letter, digit, letter, space, digit, letter, digit)'
    },
    uk: {
        pattern: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
        example: 'SW1A 1AA or M1 1AA',
        message: 'UK postal code format: SW1A 1AA or M1 1AA'
    },
    au: {
        pattern: /^\d{4}$/,
        example: '2000',
        message: 'Australian postal code must be 4 digits (e.g., 2000)'
    }
};

// Validate country selection

function validateCountry() {
    if (countryInput.validity.valueMissing) {
        countryError.textContent = 'Please select a country.';
        countryInput.setCustomValidity('Please select a country.');
        countryInput.classList.add('touched');
        return false;
    }

    countryError.textContent = '';
    countryInput.setCustomValidity('');
    countryInput.classList.remove('touched');
    return true;

};

// Validate postal code based on selected country
function validatePostalCode() {
    const selectedCountry = countryInput.value;
    const postalCode = postalCodeInput.value;

    // Check if empty first
    if (postalCodeInput.validity.valueMissing) {
        postalCodeError.textContent = 'Postal code is required.';
        postalCodeInput.setCustomValidity('Postal code is required.');
        postalCodeInput.classList.add('touched');
        return false;
    }

    // Check if country is selected
    if (!selectedCountry) {
        postalCodeError.textContent = 'Please select a country first.';
        postalCodeInput.setCustomValidity('Please select a country first.');
        postalCodeInput.classList.add('touched');
        return false;
    }

    // Get the pattern for the selected country
    const countryPattern = postalCodePatterns[selectedCountry];

    // Validate against country-specific pattern
    if (!countryPattern.pattern.test(postalCode)) {
        postalCodeError.textContent = countryPattern.message;
        postalCodeInput.setCustomValidity(countryPattern.message);
        postalCodeInput.classList.add('touched');
        return false;
    }
    
    // Valid!
    postalCodeError.textContent = '';
    postalCodeInput.setCustomValidity('');
    postalCodeInput.classList.remove('touched');
    return true;
    
};

// Attach event listeners
countryInput.addEventListener('change', validateCountry);
countryInput.addEventListener('blur', validateCountry);

postalCodeInput.addEventListener('input', validatePostalCode);
postalCodeInput.addEventListener('blur', validatePostalCode);

// When country changes, re-validate postal code (it might now be invalid!)
countryInput.addEventListener('change', function() {
    if (postalCodeInput.value.length > 0) {
        validatePostalCode();
    }
});

// ============================================
// FORM SUBMISSION VALIDATION
// ============================================

const form = document.getElementById('registrationForm');

form.addEventListener('submit', function(e) {
    // Always prevent default submission
    e.preventDefault();

    console.log('Form submission attempted ...');

    // Validate All fields (even if user didn't interact with them)
    const nameValid = validateName(); // You'll need to add this
    const emailValid = validateEmail();
    const countryValid = validateCountry();
    const postalCodeValid = validatePostalCode();
    const passwordValid = validatePassword();
    const passwordConfirmValid = validatePasswordConfirmation();

    // Check if ALL validations passed
    if (nameValid && emailValid && countryValid && postalCodeValid && passwordValid && passwordConfirmValid) {
        // SUCCESS! All fields are valid
        console.log('Form is valid! Submitting...');

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: emailInput.value,
            country: countryInput.value,
            postalCode: postalCodeInput.value,
            password: passwordInput.value,
            passwordConfirm: passwordConfirmInput.value,
        };

        console.log('Form data:', formData);

        // Show success message
        displaySuccessMessage();
    } else {
        // FAILURE! Some fields are invalid
        console.log('Form is invalid. Please fix the errors.');

        // Find the first invalid field and focus it
        const firstInvalidField = form.querySelector('.touched');
        if (firstInvalidField) {
            firstInvalidField.focus();
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Display success message
function displaySuccessMessage() {
    // Create success div
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #4CAF50;
        color: white;
        padding: 30px 50px;
        border-radius: 8px;
        font-size: 24px;
        font-weight: bold;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        text-align: center;
    `;
    successDiv.innerHTML = `
        🙌 High Five! 🙌<br>
        <span style="font-size: 18px; font-weight: normal;">Form submitted successfully!</span>
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.remove();
        // Optionally reset the form
        // form.reset();
    }, 3000);
}


