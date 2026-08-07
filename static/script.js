document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImg");
    
    document.querySelectorAll('.project-thumb img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.style.display = "flex";
            modalImg.src = img.src;
        });
    });

    modal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-btn')) {
                card.classList.remove('active');
                return;
            }

            if (!card.classList.contains('active')) {
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                setTimeout(() => {
                    const offset = 100;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = card.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
});
