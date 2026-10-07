const scrollContainer = document.getElementById('scrollContainer');
const sections = document.querySelectorAll('.section');

// =========================
// FLOATING PROJECT POPUP
// =========================

const popup = document.getElementById('projectPopup');

const popupTitle = document.getElementById('popupTitle');

const popupDesc = document.getElementById('popupDesc');

const popupBtn = document.getElementById('popupBtn');

let popupTimeout;

// OPEN POPUP
function openPopup(item) {

    clearTimeout(popupTimeout);

    // CONTENT
    popupTitle.innerText =
        item.getAttribute('data-title');

    popupDesc.innerText =
        item.getAttribute('data-desc');

    popupBtn.href =
        item.getAttribute('data-link');

    // POSITION
    const rect =
        item.getBoundingClientRect();

    popup.style.top =
        `${window.scrollY + rect.top - 180}px`;

    popup.style.left =
        `${rect.left + rect.width / 2 - 215}px`;

    // SHOW
    popup.classList.add('active');
}

// CLOSE POPUP
function closePopup() {

    popupTimeout = setTimeout(() => {

        popup.classList.remove('active');

    }, 150);
}

// PROJECT EVENTS
// ONLY PROJECT SECTION POPUPS
document.querySelectorAll(
    '#stage2 .project-item, #stage3 .project-item, #stage4 .project-item:not(.no-popup)'
).forEach(item => {
    item.addEventListener('mouseenter', () => {

        openPopup(item);
    });

    item.addEventListener('mouseleave', () => {

        closePopup();
    });
});
// KEEP OPEN WHEN CURSOR ENTERS POPUP
popup.addEventListener('mouseenter', () => {

    clearTimeout(popupTimeout);
});

// CLOSE WHEN LEAVING POPUP
popup.addEventListener('mouseleave', () => {

    closePopup();
});

// =========================
// FADE-IN EFFECT
// =========================

const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// =========================
// CURSOR BLOB EFFECT
// =========================

const blob = document.querySelector('.blob');

window.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        blob.style.left = `${e.clientX}px`;
        blob.style.top = `${e.clientY}px`;
    });
});

// =========================
// OVERVIEW SYNC
// =========================

function syncOverview() {

    // BIO
    const mainBio = document.querySelector('#stage1 p').innerText;
    document.getElementById('dynamic-bio').innerText = mainBio;

    // SKILLS
    const skillPills = document.querySelectorAll('#stage1 .skills-grid .skill-pill');
    const skillsContainer = document.getElementById('dynamic-skills');

    skillsContainer.innerHTML = '';

    skillPills.forEach(pill => {
        skillsContainer.appendChild(pill.cloneNode(true));
    });

    // HISTORY
    const education = document.querySelectorAll('#stage1 div[style*="grid-template-columns"] div');
    const internships = document.querySelectorAll('#stage3 .resume-grid .project-item');

    const historyContainer = document.getElementById('dynamic-history');

    historyContainer.innerHTML = '<strong style="color:white">Education:</strong><br>';

    education.forEach(edu => {
        historyContainer.innerHTML += `<p>• ${edu.innerText.replace('\n', ' - ')}</p>`;
    });

    historyContainer.innerHTML += '<br><strong style="color:white">Experience:</strong><br>';

    internships.forEach(job => {
        historyContainer.innerHTML += `<p>• ${job.innerText.replace('\n', ': ')}</p>`;
    });
}
// =========================
// OVERVIEW LIFT ANIMATION
// =========================

const stage4 = document.getElementById('stage4');

// The cards drop into place only once the Overview Summary section has been
// reached (works for the laptop scroll column and for the phone page scroll).
// When the section is scrolled completely out of view it resets, so it drops
// again the next time it is reached.
if (stage4) {
    const overviewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stage4.classList.add('active-overview');
            } else {
                stage4.classList.remove('active-overview');
            }
        });
    }, {
        threshold: 0,
        // section counts as "reached" when its top passes the upper ~60% of the screen
        rootMargin: '0px 0px -40% 0px'
    });
    overviewObserver.observe(stage4);
}

window.addEventListener('DOMContentLoaded', syncOverview);
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');

let isOpen = false;

chatToggle.addEventListener('click', () => {

    if (!isOpen) {

        // OPEN CHAT
        chatWindow.style.display = 'block';

        setTimeout(() => {
            chatWindow.style.opacity = '1';
            chatWindow.style.transform = 'translateY(0)';
        }, 10);

        // CHANGE BUTTON TO CLOSE ICON
        chatToggle.innerHTML = `
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                    <path d="M18 6L6 18M6 6l12 12"
                        stroke="white"
                        stroke-width="2.5"
                        stroke-linecap="round"/>
                </svg>
            `;

        isOpen = true;

    } else {

        // CLOSE CHAT
        chatWindow.style.opacity = '0';
        chatWindow.style.transform = 'translateY(20px)';

        setTimeout(() => {
            chatWindow.style.display = 'none';
        }, 300);

        // CHANGE BACK TO CHAT ICON
        chatToggle.innerHTML = `
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
            `;

        isOpen = false;
    }
});
// your existing code...

// =========================================
// SKILL POPUP FOR STAGE1 + STAGE4
// =========================================

document.querySelectorAll(
    '#stage1 .skill-pill, #stage4 .skill-pill'
).forEach(skill => {

    skill.addEventListener('mouseenter', () => {

        clearTimeout(popupTimeout);

        const skillName = skill.innerText.trim();

        popupTitle.innerText = skillName;

        // DIFFERENT TEXT FOR EACH SKILL

        if (skillName === "MongoDB") {

            popupDesc.innerText =
                "MongoDB to develop scalable and high-performance web applications. I work with MongoDB to store, manage, and optimize application data efficiently in MERN stack projects. I use it for user authentication, APIs, dynamic content management, and real-time database operations while ensuring flexibility, speed, and secure data handling.";

        } else if (skillName === "Express Js") {

            popupDesc.innerText =
                "Express JS Used to build fast and scalable backend applications, REST APIs, and server-side logic for modern web applications.";

        } else if (skillName === "React Js") {

            popupDesc.innerText =
                "React JS Used to create dynamic, responsive, and interactive user interfaces with reusable components and modern frontend development practices.";

        } else if (skillName === "Node JS") {

            popupDesc.innerText =
                "Node JS Used for backend development, APIs, real-time applications, and scalable server-side solutions.";

        } else if (skillName === "JavaScript") {

            popupDesc.innerText =
                "JavaScript Used for building interactive web applications, frontend functionality, backend development, and dynamic user experiences.";

        } else if (skillName === "Java") {

            popupDesc.innerText =
                "Java Used for object-oriented programming, application development, and creating reliable and platform-independent software solutions.";

        } else if (skillName === "C++") {

            popupDesc.innerText =
                "C++ Used for developing efficient and high-performance programs with strong knowledge of object-oriented programming and problem solving.";

        } else if (skillName === "Python") {

            popupDesc.innerText =
                "Python Used for scripting, automation, backend development, data handling, and AI-related applications.";

        } else if (skillName === "CSS") {

            popupDesc.innerText =
                "CSS Used to design modern, responsive, and visually appealing user interfaces with clean styling and animations.";

        } else if (skillName === "Bootstrap") {

            popupDesc.innerText =
                "Bootstrap Used to build responsive and mobile-friendly websites quickly using modern UI components and grid systems.";

        } else if (skillName === "MySQL") {

            popupDesc.innerText =
                "MySQL Used for managing relational databases, writing optimized queries, and handling secure data storage and retrieval.";

        } else if (skillName === "Database Management") {

            popupDesc.innerText =
                "Skilled in designing, managing, and optimizing databases for efficient data organization, security, and performance.";

        } else if (skillName === "Problem Solving & Debugging") {

            popupDesc.innerText =
                "Strong ability to analyze issues, debug code efficiently, and develop optimized technical solutions.";

        } else if (skillName === "Rest API") {

            popupDesc.innerText =
                "Experienced in creating and integrating RESTful APIs for seamless communication between frontend and backend systems.";

        } else if (skillName === "Basic AI & Cloud Computing Concepts") {

            popupDesc.innerText =
                "Familiar with AI concepts, cloud technologies, and scalable computing solutions.";

        } else {

            popupDesc.innerText =
                "Technical skill used in modern software development projects.";
        }

        popupBtn.href = "#stage1";
        popupBtn.innerText = "View Skill";

        // POSITION
        const rect = skill.getBoundingClientRect();

        popup.style.top =
            `${window.scrollY + rect.top - 300}px`;

        popup.style.left =
            `${rect.left + rect.width / 2 - 215}px`;

        popup.classList.add('active');

    });

    skill.addEventListener('mouseleave', () => {

        closePopup();

    });

});

// =========================
// CERTIFICATION POPUP
// =========================

const certPopup = document.getElementById('certPopup');

const certPopupTitle =
    document.getElementById('certPopupTitle');
const certPopupDesc =
    document.getElementById('certPopupDesc');

const certPopupImg =
    document.getElementById('certPopupImg');
const certSmallTitle =
    document.getElementById("certSmallTitle");

let certTimeout;

document.querySelectorAll('.certification-card').forEach(card => {

    card.addEventListener('mouseenter', () => {

        clearTimeout(certTimeout);

        // TITLE
        certPopupTitle.innerText =
            card.getAttribute('data-title');

        // DESCRIPTION
        certPopupDesc.innerText =
            card.getAttribute('data-desc');
        // POSITION
        const rect = card.getBoundingClientRect();

        certPopup.style.top =
            `${window.scrollY + rect.top - 320}px`;

        certPopup.style.left =
            `${rect.left + rect.width / 2 - 260}px`;

        // SHOW
        certPopup.classList.add('active');
    });

    card.addEventListener('mouseleave', () => {

        certTimeout = setTimeout(() => {

            certPopup.classList.remove('active');

        }, 120);
    });
});

// KEEP POPUP OPEN
certPopup.addEventListener('mouseenter', () => {

    clearTimeout(certTimeout);
});

// CLOSE
certPopup.addEventListener('mouseleave', () => {

    certPopup.classList.remove('active');
});

// QUICK MESSAGE BUTTONS

const quickButtons =
    document.querySelectorAll('.quick-message-btn');

const messageBox =
    document.getElementById('messageBox');

quickButtons.forEach(button => {

    button.addEventListener('click', () => {

        messageBox.value =
            button.innerText.trim() + "\n\n";

        messageBox.focus();

        messageBox.selectionStart =
            messageBox.selectionEnd =
            messageBox.value.length;

    });

});

// =========================================
// CLOSE CHAT
// =========================================

document.getElementById("closeChat").addEventListener("click", () => {

    document.getElementById("chat-window").style.display = "none";
});


// =========================================
// REFRESH CHAT
// =========================================

document.getElementById("refreshChat").addEventListener("click", () => {

    location.reload();
});


// =========================================
// FULLSCREEN CHAT
// =========================================

document.getElementById("fullscreenChat").addEventListener("click", () => {

    document.getElementById("chat-window")
        .classList.toggle("fullscreen");
});



/* =========================================
4TH SECTION DOWNLOAD ANIMATION
========================================= */

const flyingDownload =
    document.getElementById("flyingDownload");

const stage4Section =
    document.getElementById("stage4");

const flyingObserver =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                flyingDownload.classList.add("active");

            } else {

                flyingDownload.classList.remove("active");
            }

        });

    }, {
        threshold: 0.55
    });

flyingObserver.observe(stage4Section);






// =========================================
// OVERVIEW SUMMARY: AUTO-FIT TO ONE SCREEN
// Picks the largest font size at which the whole
// overview fits the screen without any scrolling.
// =========================================
(function () {
    const sec = document.getElementById('stage4');
    if (!sec) return;
    const grid = sec.querySelector(':scope > div');
    let timer;

    function fits() {
        if (grid.scrollHeight > grid.clientHeight + 1 ||
            grid.scrollWidth > grid.clientWidth + 1) return false;
        // On desktop/laptop the overview has a fixed height, so every card
        // (and the education boxes inside) must fit inside its own box.
        // On phones (<=768px) the section grows to its natural height, so skip this.
        if (window.innerWidth > 768) {
            const cards = grid.querySelectorAll('.summary-card');
            for (const card of cards) {
                if (card.scrollHeight > card.clientHeight + 1) return false;
            }
        }
        return true;
    }

    function fitOverview() {
        sec.classList.add('ov-fitting');
        let lo = 4, hi = Math.min(17, window.innerWidth / 22), best = lo;
        for (let i = 0; i < 10; i++) {
            const mid = (lo + hi) / 2;
            sec.style.setProperty('--ov-fs', mid + 'px');
            if (fits()) { best = mid; lo = mid; } else { hi = mid; }
        }
        sec.style.setProperty('--ov-fs', best + 'px');
        void sec.offsetHeight;
        sec.classList.remove('ov-fitting');
    }

    function queueFit() {
        clearTimeout(timer);
        timer = setTimeout(fitOverview, 80);
    }

    window.addEventListener('load', fitOverview);
    window.addEventListener('resize', queueFit);
    window.addEventListener('orientationchange', queueFit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitOverview);
    fitOverview();
})();
