/* ==========================================================================
   Püsü IPTV — Interactive Visual & Animation Controller (v19.0.0)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.main-nav a');

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
            if (currentScroll > lastScrollTop && currentScroll > 80) {
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
                const headerOffset = 76;
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
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.bento-simulation-grid, .visual-modules-grid, .other-apps-grid').forEach(grid => {
        Array.from(grid.children).forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.08}s`;
        });
    });

    const elementsToAnimate = document.querySelectorAll(
        '.reveal-fade-up, .reveal-scale-in, .sim-card, .v-module-card, .other-app-card, .device-showcase-box, .puskul-showcase-card, .qr-bridge-showcase'
    );
    elementsToAnimate.forEach(el => {
        if (!el.classList.contains('reveal-scale-in')) {
            el.classList.add('reveal-fade-up');
        }
        animateOnScroll.observe(el);
    });

    // 5. Live Recording Timer Simulation in Visual Bento
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

    // 6. Quick QR Pairing Form Handler
    const quickQrForm = document.getElementById('quickQrForm');
    const quickPairCode = document.getElementById('quickPairCode');
    if (quickQrForm && quickPairCode) {
        quickQrForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cleanCode = (quickPairCode.value || '').replace(/[^0-9A-Za-z]/g, '').toUpperCase().slice(0, 6);
            if (cleanCode) {
                window.location.href = `qr.html?code=${encodeURIComponent(cleanCode)}`;
            } else {
                window.location.href = 'qr.html';
            }
        });
    }

    // 7. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id], div[id="qr-giris"]');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 140;

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

    // 8. Privacy Policy Modal Controller
    const privacyModal = document.getElementById('privacyModal');
    const openPrivacyBtns = document.querySelectorAll('.open-privacy-modal, a[href="#gizlilik-politikasi"], a[href="#gizlilik"]');
    const closePrivacyBtns = document.querySelectorAll('.close-privacy-modal');

    function openModal(updateHistory = true) {
        if (privacyModal) {
            privacyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (updateHistory && window.location.hash !== '#gizlilik-politikasi') {
                history.pushState({ modal: 'privacy' }, '', '#gizlilik-politikasi');
            }
        }
    }

    function closeModal(updateHistory = true) {
        if (privacyModal) {
            privacyModal.classList.remove('active');
            document.body.style.overflow = '';
            if (updateHistory && (window.location.hash === '#gizlilik-politikasi' || window.location.hash === '#gizlilik')) {
                history.pushState(null, '', window.location.pathname + window.location.search);
            }
        }
    }

    openPrivacyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(true);
        });
    });

    closePrivacyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(true);
        });
    });

    if (privacyModal) {
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) {
                closeModal(true);
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && privacyModal && privacyModal.classList.contains('active')) {
            closeModal(true);
        }
    });

    if (window.location.hash === '#gizlilik-politikasi' || window.location.hash === '#gizlilik') {
        openModal(false);
    }

    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#gizlilik-politikasi' || window.location.hash === '#gizlilik') {
            openModal(false);
        } else if (privacyModal && privacyModal.classList.contains('active')) {
            closeModal(false);
        }
    });

    window.addEventListener('popstate', () => {
        if (window.location.hash !== '#gizlilik-politikasi' && window.location.hash !== '#gizlilik' && privacyModal && privacyModal.classList.contains('active')) {
            closeModal(false);
        }
    });

    // 9. Release Download Redirect for Windows Setup (v19.0.0)
    document.querySelectorAll('a[href*="Pusu_IPTV_Setup.exe"], .btn-header-download').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'https://github.com/Okan707/pusu.iptv/releases/download/19.0.0/Pusu_IPTV_Setup.exe';
        });
    });
});
