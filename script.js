// Particle animation
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 80;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Resize canvas when window is resized
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = '#3a6ea5';
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animate particles
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect particles with lines if they're close enough
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#3a6ea5';
                    ctx.globalAlpha = 0.2;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
});

// Typing animation
document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;
    
    const text = textElement.getAttribute('data-text');
    const typeSpeed = 70;
    let charIndex = 0;
    
    function type() {
        if (charIndex < text.length) {
            textElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typeSpeed);
        } else {
            setTimeout(startBlinking, 1500);
        }
    }
    
    function startBlinking() {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.classList.add('blinking');
        }
    }
    
    type();
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        
        // Simple validation
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            removeError(nameInput);
        }
        
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else {
            removeError(messageInput);
        }
        
        if (isValid) {
            // Show success message
            document.querySelector('.form-container').classList.add('hidden');
            document.querySelector('.success-message').classList.remove('hidden');
            
            // Reset form
            contactForm.reset();
        }
    });
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
});

// Progress animation
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    
    function animateProgress() {
        progressBars.forEach(bar => {
            const percentage = bar.getAttribute('data-progress');
            bar.style.width = percentage + '%';
        });
    }
    
    // Add animation when page loads
    setTimeout(animateProgress, 500);
    
    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed');
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
});

// Navigation and modal handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle section navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            document.getElementById(targetId).classList.add('active');
            
            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Show home section by default
    document.getElementById('home').classList.add('active');
    navLinks[0].classList.add('active');
    
    // Handle "Learn More" button to navigate to about section
    const learnMoreButton = document.querySelector('.hero-actions .primary');
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show about section
            document.getElementById('about').classList.add('active');
            
            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Set the About nav link as active
            const aboutNavLink = document.querySelector('a[href="#about"]');
            if (aboutNavLink) {
                aboutNavLink.classList.add('active');
            }
        });
    }
    
    // Handle modal for all contact buttons
    const contactButtons = document.querySelectorAll('#contact-button, #contact-button-hero');
    const closeModalButton = document.querySelector('.close-modal');
    const modal = document.querySelector('.modal');
    
    if (contactButtons.length > 0 && modal) {
        contactButtons.forEach(button => {
            button.addEventListener('click', function() {
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    if (closeModalButton && modal) {
        closeModalButton.addEventListener('click', function() {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Handle close button in success message
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
            
            // Reset form display after modal is closed
            setTimeout(() => {
                document.querySelector('.form-container').classList.remove('hidden');
                document.querySelector('.success-message').classList.add('hidden');
            }, 300);
        });
    }
});
