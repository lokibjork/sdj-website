document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Dark Mode Logic
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
        updateIcon('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    }

    function updateIcon(theme) {
        if (!icon) return;
        if (theme === 'dark') {
            icon.classList.remove('ph-sun');
            icon.classList.add('ph-moon');
        } else {
            icon.classList.remove('ph-moon');
            icon.classList.add('ph-sun');
        }
    }

    // Contact Form Validation (Simple)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
                .then(() => {
                    const name = document.getElementById('name').value;
                    alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`);
                    contactForm.reset();
                })
                .catch((error) => {
                    alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
                    console.error(error);
                });
        });
    }

    // Configurator Logic
    const configOptions = document.querySelectorAll('.pkg-option-card');
    const basePriceEl = document.getElementById('base-price');
    const platformPriceEl = document.getElementById('platform-price');
    const extrasPriceEl = document.getElementById('extras-price');
    const totalPriceEl = document.getElementById('total-price');
    const btnOrcamento = document.getElementById('btn-orcamento');
    const btnClear = document.getElementById('btn-clear');

    let state = {
        basePrice: 250,
        platformPrice: 0,
        extrasPrice: 0,
        selectedGameType: { name: 'Quiz / Trivia', price: 250 },
        selectedPlatform: { name: 'Web', price: 0 },
        selectedExtras: []
    };

    function updateSummary() {
        if (!basePriceEl || !platformPriceEl || !extrasPriceEl || !totalPriceEl) return;

        basePriceEl.textContent = `R$ ${state.basePrice}`;
        platformPriceEl.textContent = state.platformPrice === 0 ? 'Incluso' : `+ R$ ${state.platformPrice}`;
        extrasPriceEl.textContent = state.extrasPrice === 0 ? 'R$ 0' : `+ R$ ${state.extrasPrice}`;

        const total = state.basePrice + state.platformPrice + state.extrasPrice;
        totalPriceEl.textContent = `R$ ${total}`;

        // Add animation class to total
        totalPriceEl.classList.remove('pulse');
        void totalPriceEl.offsetWidth; // Trigger reflow
        totalPriceEl.classList.add('pulse');

        // Update Button Link with Params
        const extrasNames = state.selectedExtras.length > 0 ? state.selectedExtras.join(', ') : 'Nenhum';
        const message = `Olá! Gostaria de um orçamento para:
- Tipo: ${state.selectedGameType.name}
- Plataforma: ${state.selectedPlatform.name}
- Extras: ${extrasNames}
- Estimativa do Site: R$ ${total}`;

        const encodedMessage = encodeURIComponent(message);
        if (btnOrcamento) {
            btnOrcamento.href = `contato.html?subject=OrcamentoPersonalizado&body=${encodedMessage}`;
        }
    }

    function resetConfigurator() {
        // Reset state
        state = {
            basePrice: 250,
            platformPrice: 0,
            extrasPrice: 0,
            selectedGameType: { name: 'Quiz / Trivia', price: 250 },
            selectedPlatform: { name: 'Web', price: 0 },
            selectedExtras: []
        };

        // Reset UI
        configOptions.forEach(card => {
            card.classList.remove('selected');

            // Re-select defaults
            if (card.dataset.value === 'quiz' && card.dataset.type === 'game-type') {
                card.classList.add('selected');
            }
            if (card.dataset.value === 'web' && card.dataset.type === 'platform') {
                card.classList.add('selected');
            }
        });

        updateSummary();
    }

    if (configOptions.length > 0) {
        configOptions.forEach(option => {
            option.addEventListener('click', () => {
                const type = option.dataset.type;
                const price = parseInt(option.dataset.price);
                const value = option.dataset.value;
                const nameSpan = option.querySelector('span');
                const name = nameSpan ? nameSpan.textContent : value;

                if (type === 'game-type') {
                    // Single select for game type
                    document.querySelectorAll('.pkg-option-card[data-type="game-type"]').forEach(el => {
                        el.classList.remove('selected');
                    });
                    option.classList.add('selected');
                    state.basePrice = price;
                    state.selectedGameType = { name, price };
                }
                else if (type === 'platform') {
                    // Single select for platform
                    document.querySelectorAll('.pkg-option-card[data-type="platform"]').forEach(el => {
                        el.classList.remove('selected');
                    });
                    option.classList.add('selected');
                    state.platformPrice = price;
                    state.selectedPlatform = { name, price };
                }
                else if (type === 'extra') {
                    // Multi select for extras
                    if (option.classList.contains('selected')) {
                        option.classList.remove('selected');
                        state.extrasPrice -= price;
                        state.selectedExtras = state.selectedExtras.filter(e => e !== name);
                    } else {
                        option.classList.add('selected');
                        state.extrasPrice += price;
                        state.selectedExtras.push(name);
                    }
                }

                updateSummary();
            });
        });

        // Initialize summary
        updateSummary();
    }

    if (btnClear) {
        btnClear.addEventListener('click', (e) => {
            e.preventDefault();
            resetConfigurator();
        });
    }

    // Portfolio Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        // Add animation
                        card.classList.add('fade-in');
                        setTimeout(() => card.classList.remove('fade-in'), 500);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // FAQ Logic
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Close other items (optional - accordion style)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
});
