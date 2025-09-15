// Back to Top Button
window.onscroll = function() {
    const backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};
document.getElementById("backToTop").addEventListener("click", () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
});

// Form Submission
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector("form");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Thank you for reaching out! We will get back to you soon.");
            contactForm.reset();
        });
    }
});
// Toggle Mobile Menu
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}

document.addEventListener('DOMContentLoaded', function() {
    const animateBoxes = document.querySelectorAll('.animate-box');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    animateBoxes.forEach(box => {
        observer.observe(box);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Active nav highlight on scroll
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
    const setActiveLink = () => {
        let currentId = '';
        const scrollPos = window.scrollY + 120;
        sections.forEach(sec => {
            if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
                currentId = sec.id;
            }
        });
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    // Dynamic projects rendering
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        fetch('projects.json')
            .then(response => response.json())
            .then(projects => {
                projectsGrid.innerHTML = projects.map(project => {
                    const githubButton = project.github ? `<a class="btn-github" href="${project.github}" target="_blank" rel="noopener noreferrer"><span>View on Github</span></a>` : '';
                    const liveButton = project.link ? `<a class="btn-github" href="${project.link}" target="_blank" rel="noopener noreferrer"><span>View Module</span></a>` : '';
                    return `
                        <div class="project-card">
                            <img src="${project.image}" alt="${project.title}">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div style="display:flex; gap:8px; flex-wrap:wrap;">${githubButton} ${liveButton}</div>
                        </div>
                    `;
                }).join('');
            })
            .catch(() => {
                projectsGrid.innerHTML = '<p>Unable to load projects at the moment.</p>';
            });
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const applyTheme = (theme) => {
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) themeToggle.innerHTML = theme === 'theme-dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    };
    const savedTheme = localStorage.getItem('theme') || 'theme-dark';
    applyTheme(savedTheme);
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = document.body.classList.contains('theme-dark') ? 'theme-light' : 'theme-dark';
            applyTheme(next);
        });
    }
});
