// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeGallery();
    initializeContactForm();
    initializeScrollIndicators();
});
// Navigation Functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    // Header background change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(59, 130, 246, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.1)';
        }
    });
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}
// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special handling for different elements
                if (entry.target.classList.contains('about-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                if (entry.target.classList.contains('gallery-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
                
                if (entry.target.classList.contains('skill-item') || entry.target.classList.contains('hobby-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);
    // Observe elements for animations
    const animateElements = document.querySelectorAll('.about-card, .gallery-item, .skill-item, .hobby-item, .contact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}
// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                setTimeout(() => {
                    entry.target.style.width = skillLevel + '%';
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        skillObserver.observe(bar);
    });
}
// Gallery and Modal Functionality
let currentImageIndex = 0;
let galleryImages = [];
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.modal-close');
    // Collect all gallery images
    galleryImages = Array.from(galleryItems).map(item => {
        return item.querySelector('.gallery-img').src;
    });
    // Close modal when clicking outside image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
        if (e.key === 'ArrowLeft' && modal.style.display === 'block') {
            prevImage();
        }
        if (e.key === 'ArrowRight' && modal.style.display === 'block') {
            nextImage();
        }
    });
    // Add hover effects to gallery items
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('.gallery-img');
        const overlay = item.querySelector('.gallery-overlay');
        
        item.addEventListener('mouseenter', function() {
            img.style.transform = 'scale(1.1)';
            overlay.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            img.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
        });
    });
}
function openModal(imageSrc) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    
    currentImageIndex = galleryImages.indexOf(imageSrc);
    modalImage.src = imageSrc;
    modal.style.display = 'block';
    
    // Add fade in animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    closeModalFunction();
}
function closeModalFunction() {
    const modal = document.getElementById('photoModal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const modalImage = document.getElementById('modalImage');
    
    modalImage.style.opacity = '0';
    setTimeout(() => {
        modalImage.src = galleryImages[currentImageIndex];
        modalImage.style.opacity = '1';
    }, 150);
}
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const modalImage = document.getElementById('modalImage');
    
    modalImage.style.opacity = '0';
    setTimeout(() => {
        modalImage.src = galleryImages[currentImageIndex];
        modalImage.style.opacity = '1';
    }, 150);
}
// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Add floating label effect
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value !== '') {
            input.parentNode.classList.add('focused');
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Mohon lengkapi semua field!', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Format email tidak valid!', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Pesan berhasil dikirim! Terima kasih atas pesan Anda.', 'success');
            this.reset();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Remove focused class from form groups
            formInputs.forEach(input => {
                input.parentNode.classList.remove('focused');
            });
        }, 2000);
    });
}
// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        transform: translateX(400px);
        transition: all 0.3s ease;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseover', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseout', () => closeBtn.style.opacity = '0.8');
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Manual close
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}
// Scroll Indicators
function initializeScrollIndicators() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}
// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});
// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});
// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: 'Poppins', sans-serif;
    }
    
    .nav-link.active {
        background: linear-gradient(135deg, #3b82f6, #60a5fa);
        color: white !important;
    }
    
    .form-group.focused label {
        color: #3b82f6;
        font-size: 0.9rem;
        transform: translateY(-5px);
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);
// Smooth page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});
// Initialize cursor effects
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor-effect');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});
// Add loading animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Trigger initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});
// Add Easter Egg - Konami Code
let konamiCode = [];
const correctCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];
document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > correctCode.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === correctCode.length && 
        konamiCode.every((code, index) => code === correctCode[index])) {
        
        // Easter egg activated!
        showNotification('🎉 Konami Code activated! You found the secret!', 'success');
        
        // Add some fun effects
        document.body.style.animation = 'rainbow 2s ease-in-out';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        konamiCode = [];
    }
});
// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);