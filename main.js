// ---------- TOGGLE NAVBAR -----------
let navMenu = document.getElementById('nav-menu');
let toggleBtn = document.getElementById('toggleBtn');

function myMenuFunction() {
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
        toggleBtn.className = 'uil uil-multiply';
    } else {
        toggleBtn.className = 'uil uil-bars';
    }
}

// Close menu when link is clicked
function closeMenu() {
    navMenu.classList.remove('active');
    toggleBtn.className = 'uil uil-bars';
}

let navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ---------- CHANGE HEADER ON SCROLL -----------
window.addEventListener('scroll', headerShadow);
window.addEventListener('load', headerShadow);

function headerShadow() {
    const navHeader = document.getElementById('header');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navHeader.style.boxShadow = '0 4px 10px #000000BB';
        navHeader.style.height = '70px';
        navHeader.style.lineHeight = '70px';
        navHeader.style.background = '#00000078';
        navHeader.style.backdropFilter = 'blur(8px)';
        navHeader.style.webkitBackdropFilter = 'blur(8px)';
    } else {
        navHeader.style.boxShadow = 'none';
        navHeader.style.height = '90px';
        navHeader.style.lineHeight = '90px';
        navHeader.style.background = 'rgba(0, 0, 0, 0.8)';
        navHeader.style.backdropFilter = 'blur(10px)';
        navHeader.style.webkitBackdropFilter = 'blur(10px)';
    }
}

// ---------- SCROLL REVEAL ANIMATIONS -----------
const sr = ScrollReveal({
    origin: 'top',
    distance: '75px',
    duration: 1650,
    reset: false
});

sr.reveal('.featured-name', { delay: 50 });
sr.reveal('.featured-text-info', { delay: 50 });
sr.reveal('.featured-text-btn', { delay: 50 });
sr.reveal('.social-icons', { delay: 50 });
sr.reveal('.project-box', { delay: 70 });
sr.reveal('.service-box', { delay: 70 });
sr.reveal('.top-header', {});

const srLeft = ScrollReveal({
    origin: 'left',
    distance: '80px',
    duration: 1750,
    reset: false
});

srLeft.reveal('.about-info', { delay: 60 });
srLeft.reveal('.contact-info', { delay: 60 });

const srRight = ScrollReveal({
    origin: 'right',
    distance: '80px',
    duration: 1750,
    reset: false
});

srRight.reveal('.skills-section', { delay: 50 });
srRight.reveal('.skills-box', { delay: 50 });
srRight.reveal('.form', { delay: 50 });
srRight.reveal('.profile-image', { delay: 60 });

// ---------- CHANGE ACTIVE LINK -----------
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector(`.nav-link.${sectionId}`);
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('load', scrollActive);
window.addEventListener('scroll', scrollActive);

// ---------- SCROLL TO FUNCTIONS -----------
const easingFunctions = {
    // Quadratic easing
    easeInOutCubic: t => t < 0.5
        ? 4 * t * t * t
        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};

let currentEasingFunction = 'easeInOutCubic';

function scrollToTarget(target, offset = 0, duration = 2000, easingType = currentEasingFunction) {
    if (window.scrollAnimation) {
        cancelAnimationFrame(window.scrollAnimation);
        window.scrollAnimation = null;
    }

    const targetPosition = typeof target === 'number'
        ? target
        : target.getBoundingClientRect().top + window.scrollY;

    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition - offset;

    if (Math.abs(distance) < 3) {
        window.scrollTo(0, targetPosition - offset);
        return;
    }

    const startTime = performance.now();
    const ease = easingFunctions[easingType] || easingFunctions.easeInOutCubic;

    function scrollAnimation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = ease(progress);
        const scrollAmount = startPosition + distance * easedProgress;
        window.scrollTo(0, scrollAmount);

        if (progress < 1) {
            window.scrollAnimation = requestAnimationFrame(scrollAnimation);
        } else {
            window.scrollAnimation = null;
        }
    }

    window.scrollAnimation = requestAnimationFrame(scrollAnimation);
}

// -------- Section scroll functions --------
function scrollToHome() {
    scrollToTarget(0, 0, 2000);
}

function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    scrollToTarget(aboutSection, 0, 2000);
}

function scrollToProjects() {
    const projectsSection = document.getElementById('projects');
    scrollToTarget(projectsSection, 0, 2000);
}

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    scrollToTarget(contactSection, 0, 2000);
}

function scrollToFooter() {
    const footerSection = document.getElementById('footer');
    scrollToTarget(footerSection, 0, 2000);
}

//HIRE ME BUTTON
let blueBtn = document.querySelector('.blue- btn')
blueBtn.addEventListener('click', function(){
    scrollToTarget(document.getElementById('contact'), 0, 200);
})

// Initialize EmailJS
//   (function() {
//     // emailjs.init("gZBrTo_lOBpeEXt_s");
//   })();

  // Form submit handler
//   document.getElementById("contact-form").addEventListener("submit", function(event) {
//     event.preventDefault();

//     emailjs.sendForm("service_k8lbwkf", "template_oqkld7p", this)
//       .then(function(response) {
//         alert("✅ Message sent successfully!");
//         document.getElementById("contact-form").reset(); // Optional: reset form
//       }, function(error) {
//         alert("❌ Failed to send message. Error: " + JSON.stringify(error));
//       });
//   });

emailjs.init("gZBrTo_lOBpeEXt_s"); // yahan aapka Public Key

document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault();

  emailjs.sendForm('service_k8lbwkf', 'template_oqkld7p', this)
    .then(function() {
      alert('Message sent successfully!');
    }, function(error) {
      alert('Failed to send message: ' + JSON.stringify(error));
    });
});
