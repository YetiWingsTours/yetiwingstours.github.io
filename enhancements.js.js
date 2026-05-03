/**
 * Yeti Wings - Enhancements.js
 * Adds 10 enhanced features without altering existing code.
 * Include this script after all other scripts (e.g., before </body>).
 * Version: 1.0
 */

(function() {
    "use strict";

    // ---------- 1. SMOOTH SCROLL FOR INTERNAL ANCHORS ----------
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            const hash = anchor.getAttribute('href');
            if (hash === '#' || hash === '') return;
            const targetId = hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;
            
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.pushState(null, null, hash);
            });
        });
    }

    // ---------- 2. TOAST NOTIFICATIONS ----------
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = type === 'success' ? '#2e7d32' : '#c62828';
        toast.style.color = 'white';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.fontSize = '0.9rem';
        toast.style.zIndex = '9999';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '1'; }, 10);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function overrideFormStatus() {
        const statusDivs = document.querySelectorAll('#formStatus, #contactFormStatus');
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    const div = mutation.target;
                    const text = div.innerText;
                    if (text.includes('✓') || text.includes('Thank you')) {
                        showToast(text, 'success');
                        div.innerHTML = '';
                    } else if (text.includes('⚠️') || text.includes('problem')) {
                        showToast(text, 'error');
                        div.innerHTML = '';
                    }
                }
            });
        });
        statusDivs.forEach(div => {
            observer.observe(div, { childList: true, subtree: true, characterData: true });
        });
    }

    // ---------- 3. LAZY LOADING FOR IMAGES ----------
    function initLazyLoading() {
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    }

    // ---------- 4. DARK/LIGHT THEME TOGGLE ----------
    let darkMode = false;
    function createThemeToggle() {
        const button = document.createElement('button');
        button.id = 'themeToggle';
        button.innerHTML = '🌙 Dark Mode';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.left = '20px';
        button.style.zIndex = '999';
        button.style.padding = '10px 15px';
        button.style.borderRadius = '30px';
        button.style.border = 'none';
        button.style.backgroundColor = '#1e2a3a';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        button.style.fontSize = '0.8rem';
        button.style.fontWeight = '600';
        document.body.appendChild(button);

        button.addEventListener('click', () => {
            darkMode = !darkMode;
            if (darkMode) {
                document.body.style.backgroundColor = '#121212';
                document.body.style.color = '#e0e0e0';
                button.innerHTML = '☀️ Light Mode';
                document.querySelectorAll('.card, .tour-card, .service-card, .testimonial-card, .modal-content, .why-card, .feature-card, .contact-card, .founder-card').forEach(el => {
                    if (el) {
                        el.style.backgroundColor = '#1e1e1e';
                        el.style.color = '#ddd';
                    }
                });
                document.querySelectorAll('footer').forEach(el => el.style.backgroundColor = '#0a0a0a');
                document.querySelectorAll('.btn-outline').forEach(el => el.style.borderColor = '#87CEEB');
            } else {
                document.body.style.backgroundColor = '';
                document.body.style.color = '';
                button.innerHTML = '🌙 Dark Mode';
                document.querySelectorAll('.card, .tour-card, .service-card, .testimonial-card, .modal-content, .why-card, .feature-card, .contact-card, .founder-card').forEach(el => {
                    if (el) {
                        el.style.backgroundColor = '';
                        el.style.color = '';
                    }
                });
                document.querySelectorAll('footer').forEach(el => el.style.backgroundColor = '');
                document.querySelectorAll('.btn-outline').forEach(el => el.style.borderColor = '');
            }
        });
    }

    // ---------- 5. UNIFIED BACK TO TOP BUTTON ----------
    function initBackToTop() {
        if (document.getElementById('globalBackToTop')) return;
        const btn = document.createElement('button');
        btn.id = 'globalBackToTop';
        btn.innerHTML = '↑';
        btn.style.position = 'fixed';
        btn.style.bottom = '80px';
        btn.style.right = '20px';
        btn.style.width = '44px';
        btn.style.height = '44px';
        btn.style.borderRadius = '50%';
        btn.style.backgroundColor = '#87CEEB';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.fontSize = '1.5rem';
        btn.style.cursor = 'pointer';
        btn.style.zIndex = '999';
        btn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        btn.style.opacity = '0';
        btn.style.transition = 'opacity 0.3s';
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            btn.style.opacity = window.scrollY > 300 ? '1' : '0';
        });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- 6. IMAGE LIGHTBOX GALLERY ----------
    function initLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item img, .team-card img, .tour-card img, .activity-card img, .service-card .card-img img');
        if (galleryItems.length === 0) return;
        
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
        lightbox.style.display = 'none';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '10000';
        lightbox.style.cursor = 'pointer';
        
        const img = document.createElement('img');
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.borderRadius = '8px';
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
        
        galleryItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                img.src = item.src;
                lightbox.style.display = 'flex';
            });
        });
    }

    // ---------- 7. TYPING ANIMATION FOR HERO TEXT ----------
    function initTypingAnimation() {
        const heroes = document.querySelectorAll('.hero h1, .contact-hero h1');
        if (heroes.length === 0) return;
        heroes.forEach(hero => {
            const originalText = hero.innerText;
            hero.innerText = '';
            let i = 0;
            function typeWriter() {
                if (i < originalText.length) {
                    hero.innerText += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            typeWriter();
        });
    }

    // ---------- 8. MINI CART / ENQUIRY COUNTER ----------
    let enquiryCount = 0;
    function createEnquiryCounter() {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.backgroundColor = '#87CEEB';
        container.style.color = '#1e2a3a';
        container.style.padding = '6px 12px';
        container.style.borderRadius = '20px';
        container.style.fontSize = '0.8rem';
        container.style.fontWeight = 'bold';
        container.style.zIndex = '1001';
        container.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        container.innerHTML = `📋 Enquiries: ${enquiryCount}`;
        document.body.appendChild(container);
        
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.book-now, .book-now-btn, .inquire-btn, .btn-inquire, .view-details-btn, .plan-trip-btn');
            if (btn) {
                enquiryCount++;
                container.innerHTML = `📋 Enquiries: ${enquiryCount}`;
                showToast(`Enquiry started (${enquiryCount} total)`, 'success');
            }
        });
    }

    // ---------- 9. LIVE CHAT PLACEHOLDER ----------
    function createLiveChat() {
        const chatDiv = document.createElement('div');
        chatDiv.style.position = 'fixed';
        chatDiv.style.bottom = '20px';
        chatDiv.style.left = '50%';
        chatDiv.style.transform = 'translateX(-50%)';
        chatDiv.style.backgroundColor = '#fff';
        chatDiv.style.border = '1px solid #87CEEB';
        chatDiv.style.borderRadius = '30px';
        chatDiv.style.padding = '8px 16px';
        chatDiv.style.fontSize = '0.8rem';
        chatDiv.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        chatDiv.style.zIndex = '998';
        chatDiv.innerHTML = '💬 Need help? <a href="mailto:infoyetiwings@gmail.com" style="color:#87CEEB;">Chat with us</a>';
        document.body.appendChild(chatDiv);
        chatDiv.addEventListener('click', () => {
            window.location.href = 'mailto:infoyetiwings@gmail.com?subject=Live Chat Inquiry';
        });
        chatDiv.style.cursor = 'pointer';
    }

    // ---------- 10. COOKIE CONSENT BANNER ----------
    function initCookieConsent() {
        if (localStorage.getItem('cookieConsent')) return;
        const banner = document.createElement('div');
        banner.id = 'cookieBanner';
        banner.style.position = 'fixed';
        banner.style.bottom = '0';
        banner.style.left = '0';
        banner.style.width = '100%';
        banner.style.backgroundColor = '#1e2a3a';
        banner.style.color = 'white';
        banner.style.padding = '12px 20px';
        banner.style.display = 'flex';
        banner.style.justifyContent = 'space-between';
        banner.style.alignItems = 'center';
        banner.style.flexWrap = 'wrap';
        banner.style.zIndex = '10001';
        banner.style.fontSize = '0.9rem';
        banner.innerHTML = `
            <span>🍪 We use cookies to improve your experience. By using our site, you agree to our cookie policy.</span>
            <button id="acceptCookies" style="background:#87CEEB; border:none; padding:8px 20px; border-radius:30px; cursor:pointer; margin-left:15px;">Accept</button>
        `;
        document.body.appendChild(banner);
        document.getElementById('acceptCookies').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            banner.remove();
        });
    }

    // ---------- INITIALIZE ALL ----------
    function init() {
        initSmoothScroll();
        initLazyLoading();
        createThemeToggle();
        initBackToTop();
        initLightbox();
        initTypingAnimation();
        createEnquiryCounter();
        createLiveChat();
        initCookieConsent();
        setTimeout(overrideFormStatus, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();