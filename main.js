/* ==========================================================================
   PÜSÜ IPTV — Dark Architectural Studio Controller (v19.4.0)
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

    document.querySelectorAll('.ds-bento-grid, .ds-modules-grid, .qr-formats-grid, .ds-community-grid').forEach(grid => {
        Array.from(grid.children).forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.06}s`;
        });
    });

    const elementsToAnimate = document.querySelectorAll(
        '.reveal-fade-up, .reveal-scale-in, .bento-box, .ds-module-card, .ds-project-row, .ds-social-card'
    );
    elementsToAnimate.forEach(el => {
        if (!el.classList.contains('reveal-scale-in')) {
            el.classList.add('reveal-fade-up');
        }
        animateOnScroll.observe(el);
    });

    // 5. Live Recording Timer Simulation
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

    // 8. Privacy Policy Hash Redirect Support
    if (window.location.hash === '#gizlilik-politikasi' || window.location.hash === '#gizlilik') {
        window.location.replace('gizlilik.html');
    }

    // 9. Release Download Redirect for Windows Setup (v19.3.0)
    document.querySelectorAll('a[href*="Pusu_IPTV_Setup.exe"], .btn-header-download').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'https://github.com/Okan707/pusu.iptv/releases/download/19.3.0/Pusu_IPTV_Setup.exe';
        });
    });
});
