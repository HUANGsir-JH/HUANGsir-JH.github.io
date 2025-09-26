// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing animation for hero title
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.gradient-text');
    const words = ['黄先生', '全栈开发者', '技术爱好者', '代码艺术家'];

    if (txtElement) {
        new TypeWriter(txtElement, words, 2000);
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('请填写所有必填字段！');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('请输入有效的邮箱地址！');
            return;
        }

        // Show success message (you can replace this with actual form submission)
        alert('谢谢您的消息！我会尽快回复您。');
        contactForm.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .contact-item, .stat');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Skills animation
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('fade-in');
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Counter animation for stats
function animateCounter(el, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + '+';
    }, 20);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat h4');
            const targets = [50, 3, 100]; // Corresponding to the numbers in HTML

            counters.forEach((counter, index) => {
                animateCounter(counter, targets[index]);
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const parallaxSpeed = 0.5;

    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Dynamic theme detection
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Add some interactive particles to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease forwards;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .particle {
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.toString() === konamiSequence.toString()) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s ease-in-out infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 恭喜发现彩蛋！你是真正的开发者！');
        }, 2000);
        konamiCode = [];
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);