// DOM Ready - Improved with error handling
document.addEventListener('DOMContentLoaded', function() {
    console.log('YetiWings Tours website loaded successfully');
    
    try {
        // Initialize components with error handling
        initNavigation();
        initInquiryModal();
        initWhatsAppWidget();
        initContactForm();
        initScrollEffects();
        initSmoothScrolling();
        initImageLazyLoading();
    } catch (error) {
        console.error('Error initializing components:', error);
    }
});

// Navigation Menu - Enhanced with mobile dropdown support
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Handle dropdown menus for mobile
    navItems.forEach(item => {
        if (item.classList.contains('dropdown')) {
            const dropdownToggle = item.querySelector('.nav-link');
            
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                    
                    // Close other dropdowns
                    document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
                        if (dropdown !== item) {
                            dropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
}

// Enhanced Inquiry Modal functionality
function initInquiryModal() {
    const modal = document.getElementById('inquiryModal');
    const closeBtn = document.querySelector('.close-modal');
    const inquireButtons = document.querySelectorAll('.inquire-btn');
    const modalPackageName = document.getElementById('modalPackageName');
    const emailInquiryBtn = document.getElementById('emailInquiry');
    const whatsappInquiryBtn = document.getElementById('whatsappInquiry');
    
    if (!modal) return;
    
    // Open modal when inquire buttons are clicked
    inquireButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            if (modalPackageName) {
                modalPackageName.textContent = packageName;
            }
            
            // Update email and WhatsApp links
            if (emailInquiryBtn) {
                const emailSubject = `Inquiry about ${packageName}`;
                emailInquiryBtn.href = `mailto:infoyetiwings@gmail.com?subject=${encodeURIComponent(emailSubject)}`;
            }
            
            if (whatsappInquiryBtn) {
                const whatsappMessage = `Hi! I'm interested in the package: ${packageName}`;
                whatsappInquiryBtn.href = `https://wa.me/9779840106877?text=${encodeURIComponent(whatsappMessage)}`;
            }
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Enhanced WhatsApp Widget with tooltip
function initWhatsAppWidget() {
    const whatsappBtn = document.querySelector('.whatsapp-widget .whatsapp-btn');
    const whatsappTooltip = document.querySelector('.whatsapp-tooltip');
    
    if (whatsappBtn) {
        // Show tooltip on hover
        whatsappBtn.addEventListener('mouseenter', function() {
            if (whatsappTooltip) {
                whatsappTooltip.style.opacity = '1';
                whatsappTooltip.style.visibility = 'visible';
            }
        });
        
        // Hide tooltip after delay
        whatsappBtn.addEventListener('mouseleave', function() {
            if (whatsappTooltip) {
                setTimeout(() => {
                    whatsappTooltip.style.opacity = '0';
                    whatsappTooltip.style.visibility = 'hidden';
                }, 500);
            }
        });
        
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank');
        });
    }
}

// Enhanced Contact Form with validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
        
        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        }
        
        if (!email.value.trim() || !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!message.value.trim()) {
            showError(message, 'Please enter your message');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Get form data
        const formData = {
            name: name.value,
            email: email.value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: message.value
        };
        
        // Prepare email content
        const emailSubject = `Website Contact: ${formData.subject}`;
        const emailBody = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
        
        // Open email client
        window.location.href = `mailto:infoyetiwings@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Show success message
        alert('Thank you for your message! Your email client will open to send us your inquiry.');
        
        // Reset form
        contactForm.reset();
    });
    
    // Helper functions for form validation
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('small');
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            errorElement.style.display = 'block';
            errorElement.style.marginTop = '5px';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        
        // Highlight the input field
        input.style.borderColor = 'red';
        
        // Remove error on input
        input.addEventListener('input', function() {
            errorElement.textContent = '';
            input.style.borderColor = '#ddd';
        }, { once: true });
    }
}

// Scroll effects for header
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }, 100));
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lazy loading for images
function initImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('.package-image img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            // Add a small placeholder while loading
            if (!img.src) {
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" width="1" height="1"%3E%3C/svg%3E';
            }
            
            imageObserver.observe(img);
        });
    }
}

// Utility function to throttle frequent events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}