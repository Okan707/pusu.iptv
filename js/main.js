/* ==========================================================================
   Püsü IPTV - Interactive Scripts & Modal Controller
   Author: Okan Bayındır
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
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Sticky Header Shadow Effect
        if (currentScroll > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide on scroll DOWN, show on scroll UP
        const isMobileMenuOpen = mainNav && mainNav.classList.contains('active');
        if (!isMobileMenuOpen && Math.abs(currentScroll - lastScrollTop) > scrollThreshold) {
            if (currentScroll > lastScrollTop && currentScroll > 80) {
                // Scrolling down -> hide navbar
                header.classList.add('header-hidden');
            } else {
                // Scrolling up -> reveal navbar
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
            if (mainNav.classList.contains('active')) {
                header.classList.remove('header-hidden');
            }
        });

        // Close menu when clicking nav link
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

    // 4. Scroll Reveal Animations (Intersection Observer with Stagger)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply staggered reveals to grid cards
    document.querySelectorAll('.features-grid, .modules-grid, .android-sharp-features, .other-apps-grid').forEach(grid => {
        const cards = grid.children;
        Array.from(cards).forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.08}s`;
        });
    });

    // Observe animatable elements
    const elementsToAnimate = document.querySelectorAll(
        '.reveal-fade-up, .reveal-scale-in, .feature-box, .module-card, .sharp-feature-card, .other-app-card, .download-card, .story-card'
    );
    elementsToAnimate.forEach(el => {
        if (!el.classList.contains('reveal-scale-in')) {
            el.classList.add('reveal-fade-up');
        }
        animateOnScroll.observe(el);
    });

    // 5. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 120;

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

    // 6. Privacy Policy Modal Controller with URL Hash Support (#gizlilik-politikasi)
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

    // Close when clicking on backdrop
    if (privacyModal) {
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) {
                closeModal(true);
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && privacyModal && privacyModal.classList.contains('active')) {
            closeModal(true);
        }
    });

    // Auto-open modal if URL already has #gizlilik-politikasi on page load
    if (window.location.hash === '#gizlilik-politikasi' || window.location.hash === '#gizlilik') {
        openModal(false);
    }

    // Listen to hash changes and browser Back/Forward navigation
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

});
