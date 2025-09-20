// Modern Portfolio JavaScript - Mohamed Ebrahem

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Initialize all portfolio functionality
function initializePortfolio() {
    initializeNavigation();
    initializeThemeToggle();
    initializeScrollAnimations();
    initializePortfolioFilters();
    initializeSkillBars();
    initializeContactForm();
    initializeBackToTop();
    initializeTypingEffect();
    initializeParticleEffect();
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'theme-dark';
    applyTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
            const newTheme = currentTheme === 'theme-dark' ? 'theme-light' : 'theme-dark';
            applyTheme(newTheme);
        });
    }
    
    function applyTheme(theme) {
        body.classList.remove('theme-light', 'theme-dark');
        body.classList.add(theme);
        localStorage.setItem('theme', theme);
        
        if (themeToggle) {
            const icon = theme === 'theme-dark' ? 'fas fa-moon' : 'fas fa-sun';
            themeToggle.innerHTML = `<i class="${icon}"></i>`;
        }
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section is visible
                if (entry.target.classList.contains('skill-progress')) {
                    animateSkillBar(entry.target);
                }
                
                // Animate counters when hero stats are visible
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .skill-progress, .stat-number');
    animatedElements.forEach(el => observer.observe(el));
}

// Portfolio filtering
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const projectCategory = card.getAttribute('data-category') || 'all';
                
                if (filter === 'all' || projectCategory === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        bar.setAttribute('data-width', width);
    });
}

function animateSkillBar(bar) {
    const targetWidth = bar.getAttribute('data-width');
    const percentage = bar.querySelector('.skill-percentage');
    
    let currentWidth = 0;
    const increment = parseFloat(targetWidth) / 50; // 50 steps for smooth animation
    
    const timer = setInterval(() => {
        currentWidth += increment;
        if (currentWidth >= parseFloat(targetWidth)) {
            currentWidth = parseFloat(targetWidth);
            clearInterval(timer);
        }
        
        bar.style.width = currentWidth + '%';
        if (percentage) {
            percentage.textContent = Math.round(currentWidth) + '%';
        }
    }, 20);
}

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50; // 50 steps for smooth animation
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.round(current) + suffix;
    }, 20);
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.querySelector('.form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<span class="loading"></span> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Back to top button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Typing effect for hero section
function initializeTypingEffect() {
    const typingElement = document.querySelector('.hero-description');
    
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const timer = setInterval(() => {
            typingElement.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
            }
        }, 50);
    }
}

// Particle effect for hero section
function initializeParticleEffect() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            createParticle(heroSection);
        }
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: float 6s ease-in-out infinite;
    `;
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    
    container.appendChild(particle);
}

// Dynamic projects loading
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (projectsGrid) {
        fetch('projects.json')
            .then(response => response.json())
            .then(projects => {
                projectsGrid.innerHTML = projects.map(project => {
                    const githubButton = project.github ? 
                        `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                            <i class="fab fa-github"></i>
                            <span>GitHub</span>
                        </a>` : '';
                    
                    const liveButton = project.link ? 
                        `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                            <i class="fas fa-external-link-alt"></i>
                            <span>View Project</span>
                        </a>` : '';
                    
                    const technologies = project.technologies ? 
                        project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : '';
                    
                    const features = project.features ? 
                        project.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('') : '';
                    
                    return `
                        <div class="project-card fade-in" data-category="${project.category || 'all'}">
                            <img src="${project.image}" alt="${project.title}" loading="lazy">
                            <div class="project-content">
                                <h3 class="project-title">${project.title}</h3>
                                <p class="project-description">${project.description}</p>
                                
                                ${technologies ? `
                                    <div class="project-technologies">
                                        ${technologies}
                                    </div>
                                ` : ''}
                                
                                ${features ? `
                                    <div class="project-features">
                                        <h4>Key Features:</h4>
                                        <div class="features-list">
                                            ${features}
                                        </div>
                                    </div>
                                ` : ''}
                                
                                <div class="project-actions">
                                    ${githubButton}
                                    ${liveButton}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
                
                // Initialize scroll animations for new elements
                const newElements = projectsGrid.querySelectorAll('.fade-in');
                newElements.forEach(el => {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('visible');
                            }
                        });
                    }, { threshold: 0.1 });
                    observer.observe(el);
                });
            })
            .catch(error => {
                console.error('Error loading projects:', error);
                projectsGrid.innerHTML = '<p class="error-message">Unable to load projects at the moment. Please try again later.</p>';
            });
    }
}

// Initialize projects loading
loadProjects();

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initializeLazyLoading();

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .error-message {
        text-align: center;
        color: #ef4444;
        padding: 2rem;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.toggleMenu = function() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navLinks && menuToggle) {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }
};

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}