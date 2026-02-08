// INDIS 2026 - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initMenu();
    initSmoothScroll();
    // initScrollAnimations();
    initJurySlider();
});

// Menu Toggle Functions
function initMenu() {
    // Create menu overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', function() {
        toggleMenu();
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const menu = document.getElementById('sideMenu');
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        }
    });
}

function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.querySelector('.menu-overlay');
    const hamburger = document.querySelector('.hamburger-menu');
    
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        hamburger.style.display = 'none';
    } else {
        document.body.style.overflow = '';
        hamburger.style.display = 'flex';
    }
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Close menu if open
                    const menu = document.getElementById('sideMenu');
                    if (menu.classList.contains('active')) {
                        toggleMenu();
                    }
                    
                    // Smooth scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.topic-card, .date-card, .committee-card, .jury-card, section h2'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}

// Jury Slider
function initJurySlider() {
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');
    const dots = document.querySelectorAll('.jury-dots .dot');
    const juryGrids = document.querySelectorAll('.jury-grid');
    
    let currentSlide = 0;
    const totalSlides = 3;
    
    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
        
        rightArrow.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });
    
    function updateSlider() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Animation for slider transition
        juryGrids.forEach(grid => {
            grid.style.opacity = '0';
            grid.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                grid.style.opacity = '1';
                grid.style.transform = 'translateX(0)';
            }, 200);
        });
    }
}

// Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Add CSS for animations dynamically
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .jury-grid {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .timeline-item {
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .timeline-item.visible {
        opacity: 1;
        transform: scale(1);
    }
`;
document.head.appendChild(animationStyles);

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    
    if (hero && scrollPosition < hero.offsetHeight) {
        const overlay = document.querySelector('.hero-overlay');
        const content = document.querySelector('.hero-content');
        
        if (overlay) {
            overlay.style.opacity = 0.9 + (scrollPosition / hero.offsetHeight) * 0.1;
        }
        
        if (content) {
            content.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    }
});

// Active Menu Link on Scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// Form Validation (for future contact form)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }
    });
    
    return isValid;
}

// Utility: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility: Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Window Resize Handler
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments
    const menu = document.getElementById('sideMenu');
    if (window.innerWidth > 768 && menu.classList.contains('active')) {
        // Reset menu state on larger screens
    }
}, 250));

// Console welcome message
console.log('%cINDIS 2026', 'font-size: 24px; font-weight: bold; color: #2e3f92;');
console.log('%cInternational Conference on Design & Innovation Studies', 'font-size: 14px; color: #666;');
console.log('%c24th - 28th September 2026', 'font-size: 12px; color: #e49514;');
