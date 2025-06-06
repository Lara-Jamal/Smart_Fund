document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('fundForm');
    
    // Form validation patterns
    const validationPatterns = {
        fullName: /^[a-zA-Z\s]{2,50}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\+?[\d\s-]{10,}$/,
        amount: /^[1-9]\d{2,}$/,
        purpose: /^[\s\S]{10,500}$/,
        age: /^(?:1[8-9]|[2-9]\d|1[0-1]\d|120)$/,
        income: /^[1-9]\d*$/
    };

    // Error messages
    const errorMessages = {
        fullName: 'Please enter a valid full name (2-50 characters, letters only)',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number (minimum 10 digits)',
        amount: 'Please enter a valid amount (minimum $100)',
        purpose: 'Please provide a detailed purpose (10-500 characters)',
        age: 'Please enter a valid age (18-120 years)',
        income: 'Please enter a valid monthly income',
        gender: 'Please select your gender',
        education: 'Please select your education level',
        relationship: 'Please select your relationship status',
        employment: 'Please select your employment status',
        fundType: 'Please select a fund type',
        idDocument: 'Please upload a valid ID document (PDF, JPG, or PNG, max 10MB)'
    };

    // Show error message
    function showError(input, message) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        input.classList.add('border-red-500');
    }

    // Hide error message
    function hideError(input) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        errorDiv.classList.add('hidden');
        input.classList.remove('border-red-500');
    }

    // Update file name display
    window.updateFileName = function(input) {
        const fileNameDisplay = document.getElementById('selectedFileName');
        if (input.files.length > 0) {
            const file = input.files[0];
            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                showError(input, 'File size must be less than 10MB');
                input.value = '';
                fileNameDisplay.textContent = '';
                return;
            }
            // Validate file type
            const validTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            if (!validTypes.includes(fileExtension)) {
                showError(input, 'Please upload a PDF, JPG, or PNG file');
                input.value = '';
                fileNameDisplay.textContent = '';
                return;
            }
            fileNameDisplay.textContent = `Selected file: ${file.name}`;
            hideError(input);
        } else {
            fileNameDisplay.textContent = '';
        }
    };

    // Add event listeners for all form fields
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', function() {
            validateField(this);
        });
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });

    // Update validateField function to handle new fields
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = field.parentElement.querySelector('.error-message');

        // Handle radio groups (gender and fund type)
        if (field.type === 'radio') {
            const radioGroup = document.querySelectorAll(`input[name="${fieldName}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            
            if (!isChecked) {
                showError(errorElement, errorMessages[fieldName]);
                return false;
            }
            hideError(errorElement);
            return true;
        }

        // Handle select fields
        if (field.tagName === 'SELECT') {
            if (!value) {
                showError(errorElement, errorMessages[fieldName]);
                return false;
            }
            hideError(errorElement);
            return true;
        }

        // Handle file input
        if (field.type === 'file') {
            const file = field.files[0];
            if (!file) {
                showError(errorElement, errorMessages[fieldName]);
                return false;
            }
            
            const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            const maxSize = 10 * 1024 * 1024; // 10MB
            
            if (!validTypes.includes(file.type)) {
                showError(errorElement, 'Please upload a PDF, JPG, or PNG file');
                return false;
            }
            
            if (file.size > maxSize) {
                showError(errorElement, 'File size must be less than 10MB');
                return false;
            }
            
            hideError(errorElement);
            return true;
        }

        // Handle number inputs (amount, age, income)
        if (field.type === 'number') {
            if (!value) {
                showError(errorElement, errorMessages[fieldName]);
                return false;
            }
            
            const numValue = parseInt(value);
            if (fieldName === 'amount' && numValue < 100) {
                showError(errorElement, errorMessages[fieldName]);
                return false;
            }
            if (fieldName === 'age' && (numValue < 18 || numValue > 120)) {
                showError(errorElement, errorMessages[fieldName]);
                return false;
            }
            if (fieldName === 'income' && numValue <= 0) {
                showError(errorElement, errorMessages[fieldName]);
                return false;
            }
            
            hideError(errorElement);
            return true;
        }

        // Handle other inputs with patterns
        if (validationPatterns[fieldName]) {
            if (!validationPatterns[fieldName].test(value)) {
                showError(errorElement, errorMessages[fieldName]);
                return false;
            }
            hideError(errorElement);
            return true;
        }

        return true;
    }

    // Add drag and drop functionality
    const dropZone = document.querySelector('.border-dashed');
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('border-green-500', 'bg-green-50');
    }

    function unhighlight(e) {
        dropZone.classList.remove('border-green-500', 'bg-green-50');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        const fileInput = document.getElementById('idDocument');
        fileInput.files = files;
        updateFileName(fileInput);
    }

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        form.querySelectorAll('input, textarea, select').forEach(input => {
            if (input.type === 'file') {
                if (!validateField(input)) {
                    isValid = false;
                }
            } else if (input.type === 'radio') {
                if (!validateField(input)) {
                    isValid = false;
                }
            } else if (input.type === 'select-one') {
                if (!validateField(input)) {
                    isValid = false;
                }
            } else if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!validateField(form.querySelector('input[name="fundType"]'))) {
            isValid = false;
        }

        if (isValid) {
            // Here you would typically send the form data to a server
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // For demonstration, we'll just show a success message
            alert('Form submitted successfully!');
            form.reset();
            document.getElementById('selectedFileName').textContent = '';
        }
    });
}); 