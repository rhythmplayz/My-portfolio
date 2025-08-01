document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth scrolling for navigation links ---
    document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Adjust scroll position for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close navbar on mobile after clicking
                const navbarCollapse = document.getElementById('navbarNav');
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }

            // Update active link state
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // --- Update active link on scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarHeight = document.querySelector('.navbar').offsetHeight; // Define here for global use

    function updateActiveLink() {
        let currentActive = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight; // Adjust for navbar height
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentActive = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentActive) {
                link.classList.add('active');
            }
        });
    }

    // Call on load and scroll
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call to set active link on page load

    // --- Contact Form Submission ---
    const contactForm = document.querySelector('#contact form');
    const customMessageBox = document.getElementById('customMessageBox');
    const messageText = document.getElementById('messageText');
    const closeMessageBtn = document.getElementById('closeMessageBtn');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent actual form submission

        // In a real scenario, you'd send this data to a server
        console.log('Form Submitted!');
        console.log('Name:', document.getElementById('name').value);
        console.log('Email:', document.getElementById('email').value);
        console.log('Subject:', document.getElementById('subject').value);
        console.log('Message:', document.getElementById('message').value);

        // Show custom message box
        messageText.textContent = 'Thank you for your message! I will get back to you soon.';
        customMessageBox.classList.add('show');

        // Clear the form
        contactForm.reset();
    });

    closeMessageBtn.addEventListener('click', () => {
        customMessageBox.classList.remove('show');
    });


    // --- Scroll to Top Button Functionality ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling down 300px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Scroll Reveal Animations (using Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // If you want to reveal only once, uncomment the line below
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove 'is-visible' when element scrolls out of view
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // --- Vanta.js DOTS Background Animation ---
    if (window.VANTA) {
        window.VANTA.DOTS({
            el: ".vanta-bg", // Target the new div for Vanta.js
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x9a8d00,
            color2: 0xe3df00,
            backgroundColor: 0x0,
            size: 5.00,
            spacing: 88.00,
            showLines: false
        });
    }
});