// ============================================
// 配置数据加载
// ============================================

let config = null;

// 加载配置文件
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        config = await response.json();
        initPage();
    } catch (error) {
        console.error('加载配置文件失败:', error);
        // 使用默认配置
        initPageWithDefaults();
    }
}

// ============================================
// 页面初始化
// ============================================

function initPage() {
    initTypingEffect();
    initAboutSection();
    initSkillsSection();
    initProjectsSection();
    initExperienceSection();
    initContactSection();
    initScrollAnimations();
    initNavbar();
    initThemeToggle();
    initBackToTop();
    initParticles();
    initCountUp();
}

function initPageWithDefaults() {
    console.log('使用默认配置初始化页面');
}

// ============================================
// 打字效果
// ============================================

function initTypingEffect() {
    const nameElement = document.getElementById('typed-name');
    const name = config?.personalInfo?.name || '黄杰豪';
    let i = 0;

    function typeWriter() {
        if (i < name.length) {
            nameElement.textContent += name.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        }
    }

    // 延迟开始打字效果
    setTimeout(typeWriter, 500);
}

// ============================================
// 关于我部分
// ============================================

function initAboutSection() {
    // 设置介绍文字
    const introElement = document.getElementById('about-intro');
    if (introElement && config?.about?.introduction) {
        introElement.textContent = config.about.introduction;
    }

    // 设置教育信息
    const educationElement = document.getElementById('education-info');
    if (educationElement && config?.schoolExperience) {
        const edu = config.schoolExperience;
        educationElement.textContent = `${edu.university} · ${edu.major} · ${edu.degree} (${edu.duration})`;
    }
}

// ============================================
// 技术栈部分
// ============================================

function initSkillsSection() {
    const container = document.getElementById('skills-container');
    if (!container || !config?.skills) return;

    const skillCategories = [
        { key: 'languages', title: '编程语言', icon: 'fas fa-code', iconClass: 'languages' },
        { key: 'frontend', title: '前端技术', icon: 'fas fa-palette', iconClass: 'frontend' },
        { key: 'backend', title: '后端框架', icon: 'fas fa-server', iconClass: 'backend' },
        { key: 'tools', title: '工具 & 其他', icon: 'fas fa-tools', iconClass: 'tools' }
    ];

    skillCategories.forEach(category => {
        const skills = config.skills[category.key];
        if (!skills || skills.length === 0) return;

        const categoryHTML = `
            <div class="skill-category fade-in">
                <div class="skill-category-header">
                    <div class="skill-category-icon ${category.iconClass}">
                        <i class="${category.icon}"></i>
                    </div>
                    <h3 class="skill-category-title">${category.title}</h3>
                </div>
                <div class="skill-tags">
                    ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;
        container.innerHTML += categoryHTML;
    });
}

// ============================================
// 项目展示部分
// ============================================

function initProjectsSection() {
    const container = document.getElementById('projects-container');
    if (!container || !config?.projects) return;

    config.projects.forEach((project, index) => {
        const isValidGithub = project.github && project.github.startsWith('http');
        const githubLink = isValidGithub
            ? `<a href="${project.github}" target="_blank" class="project-link">
                <i class="fab fa-github"></i>
                <span>查看源码</span>
               </a>`
            : `<span class="project-link" style="opacity: 0.6; cursor: default;">
                <i class="fas fa-lock"></i>
                <span>暂未公开</span>
               </span>`;

        const projectHTML = `
            <div class="project-card fade-in" style="transition-delay: ${index * 0.1}s">
                <div class="project-image-wrapper">
                    <img src="${project.coverImage || '/assets/project-default.png'}" 
                         alt="${project.title}" 
                         class="project-image"
                         onerror="this.src='https://via.placeholder.com/400x200?text=${encodeURIComponent(project.title)}'">
                    <div class="project-overlay">
                        ${githubLink}
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += projectHTML;
    });
}

// ============================================
// 经历时间线部分
// ============================================

function initExperienceSection() {
    const container = document.getElementById('experience-container');
    if (!container || !config?.schoolExperience?.activities) return;

    config.schoolExperience.activities.forEach((activity, index) => {
        const timelineHTML = `
            <div class="timeline-item fade-in" style="transition-delay: ${index * 0.15}s">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-time">${activity.time}</span>
                    <h3 class="timeline-role">${activity.role}</h3>
                    <p class="timeline-department">${activity.department}</p>
                    <p class="timeline-description">${activity.description}</p>
                </div>
            </div>
        `;
        container.innerHTML += timelineHTML;
    });
}

// ============================================
// 联系方式部分
// ============================================

function initContactSection() {
    if (!config?.personalInfo) return;

    const emailElement = document.getElementById('contact-email');
    const phoneElement = document.getElementById('contact-phone');
    const wechatElement = document.getElementById('contact-wechat');

    if (emailElement) emailElement.textContent = config.personalInfo.email;
    if (phoneElement) phoneElement.textContent = config.personalInfo.phone;
    if (wechatElement && config.socialLinks?.wechat) {
        wechatElement.textContent = config.socialLinks.wechat;
    }
}

// ============================================
// 滚动动画
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// 导航栏功能
// ============================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 滚动时添加阴影
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 更新当前活动的导航链接
        updateActiveNavLink();
    });

    // 移动端菜单切换
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// 主题切换
// ============================================

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(icon, savedTheme);
    } else {
        // 检查系统主题偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeIcon(icon, 'dark');
        }
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(icon, newTheme);
    });
}

function updateThemeIcon(icon, theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ============================================
// 回到顶部按钮
// ============================================

function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 粒子背景效果
// ============================================

function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        container.appendChild(particle);
    }
}

// ============================================
// 数字滚动动画
// ============================================

function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                animateCount(element, target);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));
}

function animateCount(element, target) {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// 平滑滚动
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 页面加载完成后初始化
// ============================================

document.addEventListener('DOMContentLoaded', loadConfig);
