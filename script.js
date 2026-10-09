/* =================================
   MOBILE MENU
================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const icon = menuBtn.querySelector("i");

    if (navMenu.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu after clicking */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =================================
   DARK / LIGHT MODE
================================= */

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

} else {

    themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';
}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    if (isLight) {

        localStorage.setItem(
            "portfolioTheme",
            "light"
        );

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem(
            "portfolioTheme",
            "dark"
        );

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});


/* =================================
   PROJECT FILTER
================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");

const noProjects =
    document.getElementById("noProjects");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active from every button */

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        /* Add active to clicked button */

        button.classList.add("active");

        const selectedFilter =
            button.getAttribute("data-filter");

        let visibleProjects = 0;


        projectCards.forEach(card => {

            const category =
                card.getAttribute("data-category");


            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {

                card.classList.remove("hide");

                visibleProjects++;

            } else {

                card.classList.add("hide");

            }

        });


        /* Show message if nothing found */

        if (visibleProjects === 0) {

            noProjects.style.display = "block";

        } else {

            noProjects.style.display = "none";

        }

    });

});


/* =================================
   SCROLL PROGRESS
================================= */

const scrollProgress =
    document.getElementById("scrollProgress");


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;

    const progress =
        (scrollTop / pageHeight) * 100;

    scrollProgress.style.width =
        progress + "%";

});


/* =================================
   ACTIVE NAVIGATION
================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


/* =================================
   ANIMATED COUNTERS
================================= */

const counters =
    document.querySelectorAll(".stat-number");

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;


    counters.forEach(counter => {

        const target =
            Number(counter.getAttribute("data-target"));

        let current = 0;

        const increment =
            target / 50;


        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.textContent =
                    Math.ceil(current);

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target;

            }

        };


        updateCounter();

    });

}


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    startCounters();

                }

            });

        },
        {
            threshold: 0.4
        }
    );


const aboutStats =
    document.querySelector(".about-stats");

if (aboutStats) {
    counterObserver.observe(aboutStats);
}


/* =================================
   CURSOR GLOW
================================= */

const cursorGlow =
    document.querySelector(".cursor-glow");


document.addEventListener("mousemove", event => {

    cursorGlow.style.left =
        event.clientX + "px";

    cursorGlow.style.top =
        event.clientY + "px";

});


/* =================================
   PROJECT CARD MOUSE EFFECT
================================= */

projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -3;

        const rotateY =
            ((x / rect.width) - 0.5) * 3;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-7px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =================================
   ESC KEY CLOSE MENU
================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        navMenu.classList.remove("open");

        const icon =
            menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});