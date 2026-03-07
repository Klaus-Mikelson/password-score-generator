/* ============================================
   PASSWORD STRENGTH ANALYZER - JAVASCRIPT
   Real-time password analysis with zxcvbn
   ============================================ */

// ============================================
// 1. DOM ELEMENT REFERENCES
// ============================================

const passwordInput = document.getElementById('passwordInput');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthLabel = document.getElementById('strengthLabel');
const scoreValue = document.getElementById('scoreValue');
const crackTimeValue = document.getElementById('crackTimeValue');
const suggestionsContainer = document.getElementById('suggestionsContainer');
const generateBtn = document.getElementById('generateBtn');
const generatedPassword = document.getElementById('generatedPassword');
const copyBtn = document.getElementById('copyBtn');

// ============================================
// 2. CONFIGURATION & CONSTANTS
// ============================================

// Strength level configurations
const STRENGTH_LEVELS = [
    {
        name: 'Very Weak',
        color: '#ff1744',
        gradient: 'linear-gradient(90deg, #ff1744, #ff6f00)',
        width: '20%',
        range: [0, 0]
    },
    {
        name: 'Weak',
        color: '#ff6f00',
        gradient: 'linear-gradient(90deg, #ff6f00, #ffc400)',
        width: '40%',
        range: [1, 1]
    },
    {
        name: 'Fair',
        color: '#ffc400',
        gradient: 'linear-gradient(90deg, #ffc400, #ffeb3b)',
        width: '60%',
        range: [2, 2]
    },
    {
        name: 'Strong',
        color: '#4caf50',
        gradient: 'linear-gradient(90deg, #4caf50, #8bc34a)',
        width: '80%',
        range: [3, 3]
    },
    {
        name: 'Very Strong',
        color: '#00ff88',
        gradient: 'linear-gradient(90deg, #00ff88, #00d4ff)',
        width: '100%',
        range: [4, 4]
    }
];

// Character sets for password generation
const CHAR_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*-_+=?'
};

// ============================================
// 3. PASSWORD INPUT EVENT LISTENER
// ============================================

/**
 * Real-time password analysis on input
 * Triggered every time the user types in the password field
 */
passwordInput.addEventListener('input', function() {
    const password = this.value;

    // If password is empty, reset all displays
    if (password.length === 0) {
        resetAllDisplays();
        return;
    }

    // Analyze password strength using zxcvbn library
    // zxcvbn returns an object with score, feedback, and more
    const result = zxcvbn(password);

    // Update all UI elements based on zxcvbn result
    updateStrengthMeter(result);
    updateScore(result);
    updateCrackTime(result);
    updateSuggestions(result);
});

// ============================================
// 4. STRENGTH METER UPDATE
// ============================================

/**
 * Updates the strength meter bar with color and width
 * @param {object} result - zxcvbn result object containing score
 */
function updateStrengthMeter(result) {
    // Get the score (0-4) from zxcvbn
    const score = result.score;
    
    // Get the corresponding strength level
    const strengthLevel = STRENGTH_LEVELS[score];

    // Update the visual bar
    strengthBar.style.width = strengthLevel.width;
    strengthBar.style.background = strengthLevel.gradient;

    // Update the strength label text and color
    strengthLabel.textContent = strengthLevel.name;
    strengthLabel.style.background = `rgba(${hexToRgb(strengthLevel.color)}, 0.1)`;
    strengthLabel.style.color = strengthLevel.color;

    // Add subtle animation when meter updates
    strengthBar.style.animation = 'none';
    setTimeout(() => {
        strengthBar.style.animation = 'pulse 1s ease-in-out';
    }, 10);
}

/**
 * Helper function to convert hex color to RGB
 * Used for creating semi-transparent colors
 * @param {string} hex - Hex color code
 * @returns {string} RGB values as "r,g,b"
 */
function hexToRgb(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r},${g},${b}`;
}

// ============================================
// 5. SCORE DISPLAY UPDATE
// ============================================

/**
 * Updates the password score display (0/4, 1/4, etc.)
 * @param {object} result - zxcvbn result object
 */
function updateScore(result) {
    const score = result.score; // 0-4
    scoreValue.textContent = `${score} / 4`;
}

// ============================================
// 6. CRACK TIME DISPLAY UPDATE
// ============================================

/**
 * Updates the estimated crack time display
 * Converts zxcvbn crack time data to human-readable format
 * @param {object} result - zxcvbn result object
 */
function updateCrackTime(result) {
    // zxcvbn provides crack_times_seconds with different scenarios
    // Using 'online_throttling_100_per_hour' for realistic estimation
    const crackTimeSeconds = result.crack_times_seconds.online_throttling_100_per_hour;

    // Convert seconds to human-readable format
    const readableTime = formatCrackTime(crackTimeSeconds);
    crackTimeValue.textContent = readableTime;
}

/**
 * Converts seconds to human-readable time format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
function formatCrackTime(seconds) {
    // Define time units and their thresholds
    const timeUnits = [
        { name: 'year', seconds: 31536000 },
        { name: 'month', seconds: 2592000 },
        { name: 'week', seconds: 604800 },
        { name: 'day', seconds: 86400 },
        { name: 'hour', seconds: 3600 },
        { name: 'minute', seconds: 60 }
    ];

    // If less than a second, return special message
    if (seconds < 1) {
        return 'Less than a second';
    }

    // Find the appropriate time unit
    for (let unit of timeUnits) {
        if (seconds >= unit.seconds) {
            const value = Math.floor(seconds / unit.seconds);
            const plural = value > 1 ? 's' : '';
            return `${value} ${unit.name}${plural}`;
        }
    }

    // If less than a minute, show seconds
    const seconds_value = Math.floor(seconds);
    const plural = seconds_value > 1 ? 's' : '';
    return `${seconds_value} second${plural}`;
}

// ============================================
// 7. SUGGESTIONS & FEEDBACK DISPLAY
// ============================================

/**
 * Updates the suggestions panel with improvement tips
 * @param {object} result - zxcvbn result object containing feedback
 */
function updateSuggestions(result) {
    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';

    // Get feedback array from zxcvbn
    const feedback = result.feedback;

    // Combine warning and suggestions if they exist
    const tips = [];

    if (feedback.warning) {
        tips.push(feedback.warning);
    }

    if (feedback.suggestions && feedback.suggestions.length > 0) {
        tips.push(...feedback.suggestions);
    }

    // If no suggestions, show encouraging message
    if (tips.length === 0) {
        const message = document.createElement('p');
        message.className = 'placeholder-text';
        message.textContent = '✓ Great! No suggestions needed. Your password looks strong!';
        suggestionsContainer.appendChild(message);
        return;
    }

    // Display each suggestion
    tips.forEach((tip) => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'suggestion-item';
        
        const suggestionText = document.createElement('span');
        suggestionText.className = 'suggestion-text';
        // Capitalize first letter
        suggestionText.textContent = tip.charAt(0).toUpperCase() + tip.slice(1);
        
        suggestionElement.appendChild(suggestionText);
        suggestionsContainer.appendChild(suggestionElement);
    });
}

// ============================================
// 8. RESET ALL DISPLAYS
// ============================================

/**
 * Resets all strength displays to default
 * Called when password input is empty
 */
function resetAllDisplays() {
    // Reset strength meter
    strengthBar.style.width = '0%';
    strengthBar.style.background = 'linear-gradient(90deg, #ff1744, #ff6f00)';

    // Reset strength label
    strengthLabel.textContent = 'Very Weak';
    strengthLabel.style.background = 'rgba(255, 23, 68, 0.1)';
    strengthLabel.style.color = '#ff1744';

    // Reset score
    scoreValue.textContent = '0 / 4';

    // Reset crack time
    crackTimeValue.textContent = 'Less than a second';

    // Reset suggestions
    suggestionsContainer.innerHTML = '<p class="placeholder-text">Your suggestions will appear here as you type</p>';
}

// ============================================
// 9. PASSWORD VISIBILITY TOGGLE
// ============================================

/**
 * Toggles between showing and hiding the password
 * Updates the input type and button icon
 */
togglePasswordBtn.addEventListener('click', function() {
    // Toggle input type between password and text
    const isPasswordMode = passwordInput.type === 'password';
    
    if (isPasswordMode) {
        // Show password
        passwordInput.type = 'text';
        togglePasswordBtn.querySelector('.eye-icon').textContent = '🚫';
        togglePasswordBtn.title = 'Hide password';
    } else {
        // Hide password
        passwordInput.type = 'password';
        togglePasswordBtn.querySelector('.eye-icon').textContent = '👁️';
        togglePasswordBtn.title = 'Show password';
    }
});

// ============================================
// 10. PASSWORD GENERATOR
// ============================================

/**
 * Generates a strong random password
 * Combines uppercase, lowercase, numbers, and symbols
 * Ensures at least one character from each set
 */
function generateStrongPassword() {
    const LENGTH = 16; // Password length
    
    // Combine all character sets
    const allCharacters = 
        CHAR_SETS.uppercase + 
        CHAR_SETS.lowercase + 
        CHAR_SETS.numbers + 
        CHAR_SETS.symbols;

    let password = '';

    // Ensure at least one character from each set
    password += CHAR_SETS.uppercase[Math.floor(Math.random() * CHAR_SETS.uppercase.length)];
    password += CHAR_SETS.lowercase[Math.floor(Math.random() * CHAR_SETS.lowercase.length)];
    password += CHAR_SETS.numbers[Math.floor(Math.random() * CHAR_SETS.numbers.length)];
    password += CHAR_SETS.symbols[Math.floor(Math.random() * CHAR_SETS.symbols.length)];

    // Fill the rest with random characters from all sets
    for (let i = 4; i < LENGTH; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    // Shuffle the password (Fisher-Yates algorithm)
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}

/**
 * Event listener for Generate button
 * Generates and displays a new strong password
 */
generateBtn.addEventListener('click', function() {
    const newPassword = generateStrongPassword();
    generatedPassword.value = newPassword;

    // Visual feedback
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// ============================================
// 11. COPY TO CLIPBOARD FUNCTIONALITY
// ============================================

/**
 * Copies the generated password to clipboard
 * Shows visual feedback to user
 */
copyBtn.addEventListener('click', function() {
    const password = generatedPassword.value;

    // Check if there's a password to copy
    if (!password) {
        alert('Please generate a password first!');
        return;
    }

    // Use modern Clipboard API
    navigator.clipboard.writeText(password).then(() => {
        // Show success feedback
        const originalText = this.textContent;
        this.textContent = '✓ Copied!';
        
        // Show feedback for 2 seconds
        setTimeout(() => {
            this.textContent = originalText;
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = password;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // Show success feedback
        const originalText = this.textContent;
        this.textContent = '✓ Copied!';
        setTimeout(() => {
            this.textContent = originalText;
        }, 2000);
    });
});

// ============================================
// 12. INITIALIZATION
// ============================================

/**
 * Initialize the application when page loads
 * Reset displays and set up ready state
 */
document.addEventListener('DOMContentLoaded', function() {
    // Reset all displays on page load
    resetAllDisplays();

    // Generate an initial password
    generatedPassword.value = generateStrongPassword();

    // Set focus to password input
    passwordInput.focus();

    // Log initialization message
    console.log('Password Strength Analyzer loaded successfully!');
});

// ============================================
// 13. ACCESSIBILITY & UX ENHANCEMENTS
// ============================================

/**
 * Allow pressing Enter in generator section to copy password
 */
generatedPassword.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        copyBtn.click();
    }
});

/**
 * Allow pressing Enter in password input to generate password
 */
passwordInput.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === 'Enter') {
        generateBtn.click();
    }
});

/**
 * Clear password on Ctrl+Shift+C
 */
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'X') {
        passwordInput.value = '';
        passwordInput.focus();
        resetAllDisplays();
    }
});

console.log('✓ All event listeners initialized');
console.log('Tip: Press Shift+Enter to generate a new password');
