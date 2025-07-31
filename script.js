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

    // --- Vertex Background Animation ---
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const numParticles = 80; // Adjust for performance vs. density
    const maxDistance = 120; // Max distance for drawing lines
    const particleRadius = 1.5; // Radius of each particle dot
    const particleSpeed = 0.5; // Max speed for particles

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * particleSpeed,
                vy: (Math.random() - 0.5) * particleSpeed,
                radius: particleRadius
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas

        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];

            // Draw particle dot
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(247, 255, 8, 0.8)'; // Brighter cyan for dots
            ctx.fill();

            // Draw lines to other particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    // Fade line based on distance
                    ctx.strokeStyle = `rgba(247, 255, 8, ${1 - (distance / maxDistance) * 0.7})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            // Bounce off walls
            if (p.x < 0 || p.x > canvas.width) {
                p.vx *= -1;
            }
            if (p.y < 0 || p.y > canvas.height) {
                p.vy *= -1;
            }
        }
    }

    function animateParticles() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animateParticles);
    }

    // Initialize and start animation
    initCanvas();
    animateParticles();

    // Handle window resize
    window.addEventListener('resize', initCanvas);
});
