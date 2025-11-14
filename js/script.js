document.addEventListener("DOMContentLoaded", () => {

    // --- 1. تشغيل قائمة الموبايل ---
    const menuButton = document.getElementById("mobile-menu-button");
    const navLinks = document.getElementById("nav-links");
    let menuIcon = null;
    if (menuButton) menuIcon = menuButton.querySelector("i"); // الأيقونة داخل الزر

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            // فتح/إغلاق القائمة
            navLinks.classList.toggle("active");

            // تغيير الأيقونة (bars / xmark)
            if (menuIcon) {
                if (navLinks.classList.contains("active")) {
                    menuIcon.classList.remove("fa-bars");
                    menuIcon.classList.add("fa-xmark");
                    menuButton.setAttribute("aria-label", "إغلاق القائمة");
                } else {
                    menuIcon.classList.remove("fa-xmark");
                    menuIcon.classList.add("fa-bars");
                    menuButton.setAttribute("aria-label", "فتح القائمة");
                }
            }
        });
    }

    // --- 2. تشغيل معرض الصور (Lightbox) ---
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeButton = document.getElementById("lightbox-close");
    const galleryItems = document.querySelectorAll(".gallery-item");

    // if there is no lightbox in DOM, create one dynamically
    if (!lightbox) {
        const lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.className = 'lightbox';
        lb.innerHTML = `<div class="lightbox-inner"><button id="lightbox-close" aria-label="إغلاق">×</button><img id="lightbox-img" src="" alt=""></div>`;
        document.body.appendChild(lb);
    }

    const _lightbox = document.getElementById('lightbox');
    const _lightboxImg = document.getElementById('lightbox-img');
    const _closeButton = document.getElementById('lightbox-close');

    if (_lightbox && _lightboxImg && _closeButton) {
        
        // عند الضغط على أي صورة في المعرض
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                // try data-src first (recommended), else fallback to img src
                const imgSrc = item.getAttribute("data-src") || (item.querySelector('img') && item.querySelector('img').getAttribute('src'));
                if (imgSrc) {
                    _lightboxImg.setAttribute("src", imgSrc);
                    _lightbox.classList.add("active"); // إظهار اللايت بوكس
                }
            });
        });

        // عند الضغط على زر الإغلاق (X)
        _closeButton.addEventListener("click", () => {
            _lightbox.classList.remove("active"); // إخفاء اللايت بوكس
        });

        // إغلاق اللايت بوكس عند الضغط على الخلفية
        _lightbox.addEventListener("click", (e) => {
            if (e.target === _lightbox) { // التأكد أن الضغط كان على الخلفية وليس الصورة
                _lightbox.classList.remove("active");
            }
        });
    }

});