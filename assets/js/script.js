/* =========================================================
   ALFIRA ROSSA PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. PAGE LOADER
       ===================================================== */

    const loader = document.getElementById("pageLoader");

    if (loader) {

        function hideLoader() {

            if (loader.classList.contains("loader-hidden")) {
                return;
            }

            loader.classList.add("loader-hidden");

            setTimeout(function () {
                loader.setAttribute("aria-hidden", "true");
            }, 700);
        }

        if (document.readyState === "complete") {

            setTimeout(hideLoader, 350);

        } else {

            window.addEventListener("load", function () {
                setTimeout(hideLoader, 350);
            }, { once: true });

        }

        /* Safety fallback */
        setTimeout(hideLoader, 2500);
    }


    /* =====================================================
       2. MOBILE NAVIGATION / HAMBURGER
       ===================================================== */

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {

        navToggle.addEventListener("click", function () {

            const isOpen = navMenu.classList.toggle("active");

            navToggle.classList.toggle("active", isOpen);

            navToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* Close menu after clicking a navigation link */

        const navLinks = navMenu.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");
                navToggle.classList.remove("active");

                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", function (event) {

            const clickedInside =
                navMenu.contains(event.target) ||
                navToggle.contains(event.target);

            if (!clickedInside) {

                navMenu.classList.remove("active");
                navToggle.classList.remove("active");

                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       3. THEME TOGGLE
       ===================================================== */

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        const savedTheme = localStorage.getItem("alfira-theme");

        if (savedTheme === "light") {

            document.body.classList.add("light-theme");

        }


        function updateThemeIcon() {

            const icon = themeToggle.querySelector("i");

            if (!icon) {
                return;
            }

            if (document.body.classList.contains("light-theme")) {

                icon.className = "bi bi-sun-fill";

            } else {

                icon.className = "bi bi-moon-stars-fill";

            }

        }


        updateThemeIcon();


        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("light-theme");

            const isLight =
                document.body.classList.contains("light-theme");

            localStorage.setItem(
                "alfira-theme",
                isLight ? "light" : "dark"
            );

            updateThemeIcon();

        });

    }


    /* =====================================================
       4. PROJECT FILTER
       ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");


    if (filterButtons.length && projectCards.length) {

        filterButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const filter =
                    button.getAttribute("data-filter");


                /* Active button */

                filterButtons.forEach(function (btn) {

                    btn.classList.remove("active");

                });

                button.classList.add("active");


                /* Filter cards */

                projectCards.forEach(function (card) {

                    const category =
                        card.getAttribute("data-category");


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.style.display = "";

                        requestAnimationFrame(function () {

                            card.classList.remove("filter-hidden");

                        });

                    } else {

                        card.classList.add("filter-hidden");

                        setTimeout(function () {

                            if (
                                card.classList.contains(
                                    "filter-hidden"
                                )
                            ) {

                                card.style.display = "none";

                            }

                        }, 250);

                    }

                });

            });

        });

    }


    /* =====================================================
       5. SCROLL PROGRESS
       ===================================================== */

    const scrollProgress =
        document.getElementById("scrollProgress");


    function updateScrollProgress() {

        if (!scrollProgress) {
            return;
        }

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {
            return;
        }


        const percentage =
            (scrollTop / documentHeight) * 100;


        scrollProgress.style.setProperty(
            "--scroll-progress",
            percentage + "%"
        );

        scrollProgress.style.height =
            percentage + "%";

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    
    
   /* =====================================================
        6. ACTIVE NAVIGATION ON SCROLL
        ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        '.nav-link[href^="#"]'
    );

    function updateActiveNavigation() {
        const header = document.querySelector("header");

        const headerHeight = header
            ? header.getBoundingClientRect().height
            : 0;

        // Garis acuan sedikit di bawah header navigasi
        const referencePosition =
            window.scrollY + headerHeight + 80;

        let currentSection = sections[0]?.id || "";

        sections.forEach(function (section) {
            const sectionTop =
                section.getBoundingClientRect().top +
                window.scrollY;

            if (sectionTop <= referencePosition) {
                currentSection = section.id;
            }
       });

        // Pastikan menu Contact aktif saat mencapai akhir halaman
        const pageBottom =
            window.scrollY + window.innerHeight;

        const documentHeight =
            document.documentElement.scrollHeight;

        if (pageBottom >= documentHeight - 5) {
            const contactSection =
                document.querySelector("#contact");

            if (contactSection) {
                currentSection = "contact";
        }
    }

    navigationLinks.forEach(function (link) {
        const isActive =
            link.getAttribute("href") ===
            "#" + currentSection;

        link.classList.toggle("active", isActive);
    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateActiveNavigation
);

window.addEventListener(
    "load",
    updateActiveNavigation
);

// Atur menu aktif saat halaman pertama kali dibuka
updateActiveNavigation();




    /* =====================================================
       7. CORONA SUN SCROLL REVEAL
       ===================================================== */

    const sunElements =
        document.querySelectorAll("[data-sun-trigger]");


    if (sunElements.length) {

        const sunObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "sun-visible"
                            );

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );


        sunElements.forEach(function (sun) {

            sunObserver.observe(sun);

        });

    }


    /* =====================================================
       8. FLOATING LANTERNS
       ===================================================== */

    const lanternField =
        document.getElementById("lanternField");


    if (lanternField) {

        /*
         * Create additional lanterns.
         * The CSS already provides the visual style.
         */

        const lanternCount = 12;


        for (let i = 0; i < lanternCount; i++) {

            const lantern =
                document.createElement("span");

            lantern.className = "floating-lantern";

            lantern.setAttribute(
                "aria-hidden",
                "true"
            );


            lantern.style.left =
                Math.random() * 92 + "%";

            lantern.style.top =
                Math.random() * 85 + "%";


            lantern.style.animationDelay =
                -(Math.random() * 7) + "s";


            lantern.style.animationDuration =
                (5 + Math.random() * 5) + "s";


            const scale =
                0.45 + Math.random() * 0.75;

            lantern.style.scale =
                scale;


            lanternField.appendChild(lantern);


            /* Lantern reacts to cursor */

            lantern.addEventListener(
                "click",
                function () {

                    lantern.classList.add(
                        "lantern-glow"
                    );


                    setTimeout(function () {

                        lantern.classList.remove(
                            "lantern-glow"
                        );

                    }, 800);

                }
            );

        }


        /*
         * Subtle cursor interaction
         */

        const hero =
            document.querySelector(".hero");


        if (hero) {

            hero.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        hero.getBoundingClientRect();


                    const mouseX =
                        event.clientX - rect.left;


                    const mouseY =
                        event.clientY - rect.top;


                    const xPercent =
                        mouseX / rect.width;


                    const yPercent =
                        mouseY / rect.height;


                    lanternField.style.setProperty(
                        "--mouse-x",
                        xPercent
                    );

                    lanternField.style.setProperty(
                        "--mouse-y",
                        yPercent
                    );

                }
            );

        }

    }


    /* =====================================================
       9. PASCAL — RANDOM MOTIVATION ENGINE
       ===================================================== */

    const pascalButton =
        document.getElementById("pascalButton");

    const pascalMessage =
        document.getElementById("pascalMessage");

    const pascalQuote =
        document.getElementById("pascalQuote");

    const pascalClose =
        document.getElementById("pascalClose");


    const pascalQuotes = [

        "Gak apa-apa jalannya pelan, yang penting gak stak di masa lalu. Let your light shine, bestie! ✨",

        "Capek ya? Ingat, Rapunzel aja nunggu 18 tahun buat liat lentera. Prosesmu juga bakal indah pada waktunya. 💜",

        "Error di codingan atau jaringan itu biasa. Yang gak biasa itu kalau menyerah sebelum kelar. Gas terus! 🚀",

        "Info loker masa depan: Dicari yang mau konsisten. Kamu salah satunya. Yuk bisa yuk! ☀️",

        "Plot twist terbaik dalam hidup adalah ketika berhasil mewujudkan mimpi yang dulu dikira mustahil. Keep going! ✨"

    ];


    let lastQuoteIndex = -1;


    function getRandomPascalQuote() {

        if (pascalQuotes.length === 1) {
            return pascalQuotes[0];
        }


        let randomIndex;


        do {

            randomIndex =
                Math.floor(
                    Math.random() *
                    pascalQuotes.length
                );

        } while (randomIndex === lastQuoteIndex);


        lastQuoteIndex = randomIndex;

        return pascalQuotes[randomIndex];

    }


    if (pascalButton && pascalMessage && pascalQuote) {

        pascalButton.addEventListener(
            "click",
            function () {

                pascalQuote.textContent =
                    getRandomPascalQuote();


                pascalMessage.classList.add(
                    "show"
                );


                /* Color shift */

                const colors = [
                    "#f2cc70",
                    "#d9a7ff",
                    "#ffd98a",
                    "#c9a7ff"
                ];


                const randomColor =
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ];


                pascalButton.style.setProperty(
                    "--pascal-color",
                    randomColor
                );


                pascalButton.classList.remove(
                    "pascal-active"
                );


                requestAnimationFrame(function () {

                    pascalButton.classList.add(
                        "pascal-active"
                    );

                });

            }
        );

    }


    if (pascalClose && pascalMessage) {

        pascalClose.addEventListener(
            "click",
            function () {

                pascalMessage.classList.remove(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       10. COLLABORATION → CONTACT FORM
       ===================================================== */

    const collaborationLinks =
        document.querySelectorAll(
            ".collaboration-link"
        );


    const collaborationType =
        document.getElementById(
            "collaborationType"
        );


    if (
        collaborationLinks.length &&
        collaborationType
    ) {

        collaborationLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        const type =
                            link.getAttribute(
                                "data-type"
                            );


                        if (type) {

                            collaborationType.value =
                                type;

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
   11. JOURNEY PHOTO MODAL
   ===================================================== */

const journeyCards = document.querySelectorAll(
    ".journey-photo-card[data-photo]"
);

if (journeyCards.length > 0) {

    const modal = document.createElement("div");

    modal.className = "journey-photo-modal";

    modal.innerHTML = `
        <div class="journey-photo-modal-backdrop"></div>

        <div
            class="journey-photo-modal-content"
            role="dialog"
            aria-modal="true"
        >

            <button
                type="button"
                class="journey-photo-modal-close"
                aria-label="Tutup foto"
            >
                <i class="bi bi-x-lg"></i>
            </button>

            <img
                class="journey-photo-modal-image"
                src=""
                alt=""
            >

            <div class="journey-photo-modal-info">

                <span>
                    ✦ Journey moment
                </span>

                <h3></h3>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    const modalImage =
        modal.querySelector(
            ".journey-photo-modal-image"
        );

    const modalTitle =
        modal.querySelector(
            ".journey-photo-modal-info h3"
        );

    const closeButton =
        modal.querySelector(
            ".journey-photo-modal-close"
        );

    const backdrop =
        modal.querySelector(
            ".journey-photo-modal-backdrop"
        );


    /* OPEN MODAL */

    function openJourneyModal(card) {

        const photo =
            card.getAttribute("data-photo");

        const title =
            card.getAttribute("data-photo-title") ||
            "Journey moment";


        modalImage.src = photo;
        modalImage.alt = title;
        modalTitle.textContent = title;


        modal.classList.add("active");

        document.body.classList.add(
            "modal-open"
        );

    }


    /* CLOSE MODAL */

    function closeJourneyModal() {

        modal.classList.remove("active");

        document.body.classList.remove(
            "modal-open"
        );

        /*
         * Kosongkan gambar setelah modal
         * tertutup supaya tidak terus tersimpan.
         */

        setTimeout(function () {

            if (
                !modal.classList.contains("active")
            ) {

                modalImage.src = "";

            }

        }, 300);

    }


    /* CLICK CARD */

    journeyCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                openJourneyModal(card);

            }
        );


        /* Keyboard accessibility */

        card.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openJourneyModal(card);

                }

            }
        );

    });


    /* CLOSE BUTTON */

    closeButton.addEventListener(
        "click",
        closeJourneyModal
    );


    /* CLICK OUTSIDE */

    backdrop.addEventListener(
        "click",
        closeJourneyModal
    );


    /* ESC KEY */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closeJourneyModal();

            }

        }
    );

}


    /* =====================================================
       12. CONTACT FORM VALIDATION
       ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        const fields = {

            name:
                document.getElementById(
                    "name"
                ),

            institution:
                document.getElementById(
                    "institution"
                ),

            email:
                document.getElementById(
                    "email"
                ),

            collaborationType:
                document.getElementById(
                    "collaborationType"
                ),

            message:
                document.getElementById(
                    "message"
                )

        };


        const formStatus =
            document.getElementById(
                "formStatus"
            );


        function showError(
            field,
            message
        ) {

            if (!field) {
                return;
            }


            field.classList.add(
                "input-error"
            );


            const error =
                document.getElementById(
                    field.id + "Error"
                );


            if (error) {

                error.textContent =
                    message;

                error.classList.add(
                    "show"
                );

            }

        }


        function clearError(field) {

            if (!field) {
                return;
            }


            field.classList.remove(
                "input-error"
            );


            const error =
                document.getElementById(
                    field.id + "Error"
                );


            if (error) {

                error.textContent = "";

                error.classList.remove(
                    "show"
                );

            }

        }


        Object.values(fields).forEach(
            function (field) {

                if (!field) {
                    return;
                }


                field.addEventListener(
                    "input",
                    function () {

                        clearError(field);

                    }
                );


                field.addEventListener(
                    "change",
                    function () {

                        clearError(field);

                    }
                );

            }
        );


        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                let valid = true;


                Object.values(fields).forEach(
                    function (field) {

                        clearError(field);

                    }
                );


                /* Name */

                if (
                    !fields.name ||
                    fields.name.value.trim() === ""
                ) {

                    showError(
                        fields.name,
                        "Nama wajib diisi."
                    );

                    valid = false;

                }


                /* Institution */

                if (
                    !fields.institution ||
                    fields.institution.value.trim() === ""
                ) {

                    showError(
                        fields.institution,
                        "Institusi wajib diisi."
                    );

                    valid = false;

                }


                /* Email */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !fields.email ||
                    !emailPattern.test(
                        fields.email.value.trim()
                    )
                ) {

                    showError(
                        fields.email,
                        "Masukkan email yang valid."
                    );

                    valid = false;

                }


                /* Collaboration */

                if (
                    !fields.collaborationType ||
                    fields.collaborationType.value === ""
                ) {

                    showError(
                        fields.collaborationType,
                        "Pilih jenis kolaborasi."
                    );

                    valid = false;

                }


                /* Message */

                if (
                    !fields.message ||
                    fields.message.value.trim() === ""
                ) {

                    showError(
                        fields.message,
                        "Pesan wajib diisi."
                    );

                    valid = false;

                }


                if (!valid) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Mohon lengkapi bagian yang masih diperlukan.";

                        formStatus.classList.add(
                            "error"
                        );

                    }

                    return;

                }


                /*
                 * Kirim data formulir ke Formspree
                 */

                if (formStatus) {
                    formStatus.textContent =
                        "Mengirim ajakan kolaborasi...";
                    formStatus.classList.remove(
                        "error",
                        "success"
                    );
                }

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );

                if (submitButton) {
                    submitButton.disabled = true;
                }

                fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        Accept: "application/json"
                    }
                })
                .then(async function (response) {
                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(
                            result.errors
                                ? result.errors
                                    .map(function (error) {
                                        return error.message;
                                    })
                                    .join(" ")
                                : "Pesan belum berhasil dikirim."
                        );
                    }

                    if (formStatus) {
                        formStatus.textContent =
                            "Ajakan kolaborasi berhasil dikirim! Terima kasih ✨";
                        formStatus.classList.remove("error");
                        formStatus.classList.add("success");
                    }

                    contactForm.reset();

                    Object.values(fields).forEach(
                        function (field) {
                            clearError(field);
                        }
                    );
                })
                .catch(function (error) {
                    if (formStatus) {
                        formStatus.textContent =
                            error.message ||
                            "Terjadi kesalahan. Silakan coba lagi.";
                        formStatus.classList.remove("success");
                        formStatus.classList.add("error");
                    }

                    console.error(
                        "Form submission error:",
                        error
                    );
                })
                .finally(function () {
                    if (submitButton) {
                        submitButton.disabled = false;
                    }
                });

                if (formStatus) {

                    formStatus.textContent =
                        "Form berhasil divalidasi. Terima kasih sudah menghubungi! ✨";

                    formStatus.classList.remove(
                        "error"
                    );

                    formStatus.classList.add(
                        "success"
                    );

                }


                contactForm.reset();

            }
        );

    }


    
/* =====================================================
   13. SMOOTH SCROLL
   ===================================================== */

const anchorLinks = document.querySelectorAll(
    'a[href^="#"]'
);

anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth",
            block: "start"
        });
    });
});


    /* =====================================================
       14. REDUCE MOTION ACCESSIBILITY
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (prefersReducedMotion.matches) {

        document.documentElement.style.scrollBehavior =
            "auto";

    }


    /* =====================================================
       JAVASCRIPT READY
       ===================================================== */

    console.log(
        "✨ Alfira Portfolio JavaScript loaded successfully."
    );

});
