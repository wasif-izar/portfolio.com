// Modern Portfolio JavaScript - Lightweight

document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .timeline-item,
        .skill-card,
        .project-card,
        .contact-card,
        .highlight-item
    `);

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing after initial animations
        setTimeout(typeWriter, 1200);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Loading animation completion
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Enhanced Console Easter Egg
    const styles = {
        title: 'font-size: 24px; color: #6366f1; font-weight: bold; text-shadow: 2px 2px 4px rgba(99,102,241,0.3);',
        subtitle: 'font-size: 16px; color: #8b5cf6; font-weight: 600;',
        text: 'font-size: 14px; color: #10b981;',
        secret: 'font-size: 12px; color: #f59e0b; font-style: italic;'
    };

    console.log('%c🚀 Welcome to my portfolio!', styles.title);
    console.log('%c✨ Built with modern web technologies', styles.subtitle);
    console.log('%c💼 Interested in the code? Check out: https://github.com/wasif-izar', styles.text);
    console.log('%c🎮 Easter egg: Triple-tap my name for a surprise!', styles.secret);

    // Triple-Tap Easter Egg (Works on both Desktop & Mobile)
    const heroName = document.getElementById('hero-name');
    let tapCount = 0;
    let tapTimer = null;

    if (heroName) {
        heroName.addEventListener('click', (e) => {
            tapCount++;

            // Clear previous timer
            if (tapTimer) clearTimeout(tapTimer);

            // Check for triple tap
            if (tapCount === 3) {
                activateMatrixMode();
                tapCount = 0;
                // Add subtle feedback
                heroName.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    heroName.style.transform = '';
                }, 200);
            } else {
                // Reset counter after 500ms
                tapTimer = setTimeout(() => {
                    tapCount = 0;
                }, 500);
            }
        });

        // Add cursor pointer for better UX
        heroName.style.cursor = 'pointer';
        heroName.style.transition = 'transform 0.2s ease';
    }

    // Matrix Rain Effect
    function activateMatrixMode() {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-rain active';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const chars = '01010101010101010101'; // Binary rain
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        console.log('%c🎊 MATRIX MODE ACTIVATED! 🎊', 'font-size: 20px; color: #00ff00; font-weight: bold; background: #000; padding: 10px;');

        let frameCount = 0;
        const maxFrames = 300; // Run for 5 seconds at 60fps
        const fadeFrames = 60; // 1 second fade out
        let opacity = 1;

        function draw() {
            // Calculate fade effect
            if (frameCount >= maxFrames - fadeFrames) {
                opacity = (maxFrames - frameCount) / fadeFrames;
            }

            ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            frameCount++;
            if (frameCount < maxFrames) {
                requestAnimationFrame(draw);
            } else {
                // Smooth fade out of canvas
                canvas.style.transition = 'opacity 0.5s ease-out';
                canvas.style.opacity = '0';
                setTimeout(() => canvas.remove(), 500);
            }
        }

        draw();
    }
});

// Prevent FOUC (Flash of Unstyled Content)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate positions if needed
        const navMenu = document.getElementById('navMenu');
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.getElementById('navToggle').classList.remove('active');
        }
    }, 250);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});
