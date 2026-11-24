/* ==========================================================================
   PÜSÜ IPTV — Dual-Theme Studio Controller (v19.6.0)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.main-nav a');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeToggleLabel = document.getElementById('themeToggleLabel');

    // 0. Smokin (Dark) / Angora (Light) Theme Switcher
    const heroThemeImage = document.getElementById('heroThemeImage');
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('pusu_theme', theme);
        if (themeToggleLabel) {
            themeToggleLabel.textContent = theme === 'dark' ? 'Angora' : 'Smokin';
        }
        if (heroThemeImage) {
            heroThemeImage.src = theme === 'dark' ? 'windows_screen.png?v=20.0.0' : 'android_screen.png?v=20.0.0';
        }
    };

    const currentTheme = document.documentElement.getAttribute('data-theme') || localStorage.getItem('pusu_theme') || 'dark';
    applyTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const active = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            applyTheme(active === 'dark' ? 'light' : 'dark');
        });
    }

    // 1. Auto-Hiding Navbar on Scroll Down & Show on Scroll Up
    let lastScrollTop = 0;
    const scrollThreshold = 10;

    window.addEventListener('scroll', () => {
        if (!header) return;
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        const isMobileMenuOpen = mainNav && mainNav.classList.contains('active');
        if (!isMobileMenuOpen && Math.abs(currentScroll - lastScrollTop) > scrollThreshold) {
            if (currentScroll > lastScrollTop && currentScroll > 90) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }
    }, { passive: true });

    // 2. Mobile Menu Toggle
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            if (mainNav.classList.contains('active') && header) {
                header.classList.remove('header-hidden');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // 3. Smooth Scrolling for Internal Hash Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#' || targetId === '#gizlilik-politikasi' || targetId === '#gizlilik') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll Reveal Animations with Stagger
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.06
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.ds-bento-grid, .showcase-screens-grid').forEach(grid => {
        Array.from(grid.children).forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.06}s`;
        });
    });

    const elementsToAnimate = document.querySelectorAll(
        '.reveal-fade-up, .reveal-scale-in, .bento-box'
    );
    elementsToAnimate.forEach(el => {
        if (!el.classList.contains('reveal-scale-in')) {
            el.classList.add('reveal-fade-up');
        }
        animateOnScroll.observe(el);
    });

    // 5. Live Recording Timer Simulation & Animated Feature Showcase
    const recTimerEl = document.querySelector('.rec-timer');
    if (recTimerEl) {
        let totalSeconds = 14 * 60 + 28;
        setInterval(() => {
            totalSeconds++;
            const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
            const secs = String(totalSeconds % 60).padStart(2, '0');
            recTimerEl.textContent = `00:${mins}:${secs}`;
        }, 1000);
    }

    const triggerBtns = document.querySelectorAll('.anim-trigger-btn');
    const animScenes = document.querySelectorAll('.anim-scene');
    if (triggerBtns.length > 0 && animScenes.length > 0) {
        let currentSceneIdx = 0;
        let sceneInterval = null;

        const activateScene = (idx) => {
            currentSceneIdx = idx;
            triggerBtns.forEach((btn, i) => {
                btn.classList.toggle('active', i === idx);
            });
            animScenes.forEach((scene, i) => {
                scene.classList.toggle('active', i === idx);
            });
        };

        const startAutoCycle = () => {
            clearInterval(sceneInterval);
            sceneInterval = setInterval(() => {
                const nextIdx = (currentSceneIdx + 1) % triggerBtns.length;
                activateScene(nextIdx);
            }, 4200);
        };

        triggerBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                activateScene(idx);
                startAutoCycle();
            });
            btn.addEventListener('mouseenter', () => {
                activateScene(idx);
                startAutoCycle();
            });
        });

        startAutoCycle();
    }

    // 6. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // 7. Privacy Policy Hash Redirect Support
    if (window.location.hash === '#gizlilik-politikasi' || window.location.hash === '#gizlilik') {
        window.location.replace('gizlilik.html');
    }

    // 8. Release Download Redirect for Windows Setup
    document.querySelectorAll('a[href*="Pusu_IPTV_Setup.exe"], .btn-header-download').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'https://github.com/Okan707/pusu.iptv/releases/download/19.3.0/Pusu_IPTV_Setup.exe';
        });
    });
});
