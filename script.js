/* =========================================
   EVERMORE WEDDING PHOTOGRAPHY
   script.js
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       HEADER
       ========================================= */

    const header =
        document.querySelector(".site-header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =========================================
       MOBILE MENU
       ========================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navigation =
        document.querySelector(".navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navigation.classList.toggle("active");

                menuToggle.classList.toggle(
                    "active",
                    isOpen
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );
            }
        );

        navigation
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        navigation.classList.remove(
                            "active"
                        );

                        menuToggle.classList.remove(
                            "active"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                );
            });
    }


    /* =========================================
       PORTFOLIO FILTER
       ========================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const portfolioItems =
        document.querySelectorAll(".portfolio-item");

    filterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach((btn) => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                const filter =
                    button.dataset.filter;

                portfolioItems.forEach((item) => {

                    const category =
                        item.dataset.category;

                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        item.classList.remove(
                            "hidden"
                        );

                        item.style.display = "";

                        requestAnimationFrame(() => {

                            item.style.opacity = "1";
                            item.style.transform =
                                "scale(1)";

                        });

                    } else {

                        item.style.opacity = "0";
                        item.style.transform =
                            "scale(0.97)";

                        setTimeout(() => {

                            item.classList.add(
                                "hidden"
                            );

                        }, 250);
                    }
                });

            }
        );

    });


    /* =========================================
       LIGHTBOX
       ========================================= */

    const lightbox =
        document.querySelector("#lightbox");

    const lightboxImage =
        document.querySelector(".lightbox-image");

    const closeButton =
        document.querySelector(".lightbox-close");

    const previousButton =
        document.querySelector(".lightbox-prev");

    const nextButton =
        document.querySelector(".lightbox-next");

    const portfolioImages =
        document.querySelectorAll(
            ".portfolio-item img"
        );

    let currentIndex = 0;


    function getVisibleImages() {

        return Array.from(
            portfolioImages
        ).filter((image) => {

            const item =
                image.closest(".portfolio-item");

            return (
                item &&
                !item.classList.contains("hidden")
            );
        });

    }


    function openLightbox(index) {

        const images =
            getVisibleImages();

        if (!images.length) return;

        currentIndex = index;

        const image =
            images[currentIndex];

        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt;

        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "lightbox-open"
        );
    }


    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "lightbox-open"
        );
    }


    function nextImage() {

        const images =
            getVisibleImages();

        if (!images.length) return;

        currentIndex =
            (currentIndex + 1) %
            images.length;

        lightboxImage.src =
            images[currentIndex].src;

        lightboxImage.alt =
            images[currentIndex].alt;
    }


    function previousImage() {

        const images =
            getVisibleImages();

        if (!images.length) return;

        currentIndex =
            (currentIndex - 1 + images.length) %
            images.length;

        lightboxImage.src =
            images[currentIndex].src;

        lightboxImage.alt =
            images[currentIndex].alt;
    }


    portfolioImages.forEach(
        (image) => {

            image.addEventListener(
                "click",
                () => {

                    const images =
                        getVisibleImages();

                    const index =
                        images.indexOf(image);

                    openLightbox(
                        index >= 0
                            ? index
                            : 0
                    );

                }
            );

        }
    );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextImage
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousImage
        );

    }


    /* =========================================
       LIGHTBOX BACKDROP
       ========================================= */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === lightbox
                ) {
                    closeLightbox();
                }

            }
        );

    }


    /* =========================================
       LIGHTBOX KEYBOARD CONTROLS
       ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowRight") {
                nextImage();
            }

            if (event.key === "ArrowLeft") {
                previousImage();
            }

        }
    );


    /* =========================================
       SMOOTH SCROLL
       ========================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetID =
                        link.getAttribute("href");

                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetID
                        );

                    if (!target) return;

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const position =
                        target.offsetTop -
                        headerHeight;

                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =========================================
       ACTIVE NAVIGATION
       ========================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".navigation a"
        );


    function updateActiveNavigation() {

        let current = "";

        const scrollPosition =
            window.scrollY + 180;

        sections.forEach((section) => {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;

            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {
                current =
                    section.getAttribute("id");
            }

        });


        navLinks.forEach((link) => {

            link.classList.remove(
                "active"
            );

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {
                link.classList.add(
                    "active"
                );
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =========================================
       SCROLL REVEAL
       ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".service-card, " +
            ".featured-grid, " +
            ".about-content, " +
            ".testimonial-inner"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "reveal",
                                    "revealed"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "revealed"
                );

            }
        );

    }


    /* =========================================
       CONTACT FORM
       ========================================= */

    const contactForm =
        document.querySelector(
            "#contact-form"
        );

    const formStatus =
        document.querySelector(
            "#form-status"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const formData =
                    new FormData(
                        contactForm
                    );

                const name =
                    formData.get("name");

                const email =
                    formData.get("email");

                const date =
                    formData.get("date");

                const venue =
                    formData.get("venue");

                const message =
                    formData.get("message");


                console.log(
                    "Wedding enquiry:",
                    {
                        name,
                        email,
                        date,
                        venue,
                        message
                    }
                );


                if (formStatus) {

                    formStatus.textContent =
                        "Thank you. Your enquiry has been received.";

                }


                contactForm.reset();

            }
        );

    }


    /* =========================================
       CURRENT YEAR
       ========================================= */

    const year =
        document.querySelector(
            "#current-year"
        );

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =========================================
       IMAGE ERROR HANDLING
       ========================================= */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.addEventListener(
                "error",
                () => {

                    image.style.opacity = "0.5";

                }
            );

        });


    console.log(
        "Evermore Wedding Photography website loaded."
    );

});