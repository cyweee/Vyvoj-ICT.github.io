document.addEventListener('DOMContentLoaded', () => {
    let isEnabled = false;
    const cardSelectors = ['.card', '.card-pers'];
    let navIndicator = null;
    let currentCardIndex = -1;

    // Создание финальной секции
    function createFinalSection() {
        const footer = document.querySelector('footer');
        const cards = document.querySelectorAll(cardSelectors.join(','));
        if (!footer || cards.length === 0) return;

        const finalSection = document.createElement('section');
        finalSection.className = 'final-section';
        
        finalSection.innerHTML = `
            <div class="final-section-spacer"></div>
            <h1 class="project-end-title">Děkujeme za pozornost!!!</h1>
            <div class="final-section-spacer"></div>
        `;

        footer.parentNode.insertBefore(finalSection, footer);
        updateFinalSectionPosition();
        window.addEventListener('resize', updateFinalSectionPosition);
    }

    // Обновление позиционирования
    function updateFinalSectionPosition() {
        const footer = document.querySelector('footer');
        const cards = document.querySelectorAll(cardSelectors.join(','));
        const finalSection = document.querySelector('.final-section');
        
        if (!footer || cards.length === 0 || !finalSection) return;

        const lastCard = cards[cards.length - 1];
        const spacers = finalSection.querySelectorAll('.final-section-spacer');
        
        // Расчет отступов
        const minCardSpace = 150;
        const footerSpace = 100;
        const availableSpace = footer.offsetTop - (lastCard.offsetTop + lastCard.offsetHeight);
        
        spacers[0].style.height = `${Math.max(availableSpace - footerSpace, minCardSpace)}px`;
        spacers[1].style.height = `${footerSpace}px`;
    }

    // Навигационный индикатор
    function createNavIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'nav-indicator';
        indicator.innerHTML = '⯆ <span>SPACE</span>: Další část';
        document.body.appendChild(indicator);
        return indicator;
    }

    // Активация системы
    const enableSystem = () => {
        isEnabled = true;
        navIndicator = createNavIndicator();
        navIndicator.style.opacity = '1';
        window.removeEventListener('scroll', enableSystem);
    };

    // Улучшенный плавный скролл
    function smoothScrollTo(element) {
        const targetPosition = element.offsetTop - 100;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Получение секций
    function getAllSections() {
        return [
            ...document.querySelectorAll(cardSelectors.join(',')),
            document.querySelector('.final-section')
        ].filter(Boolean).sort((a, b) => a.offsetTop - b.offsetTop);
    }

    // Навигация
    function scrollToNextSection() {
        if (!isEnabled) return;
        
        const sections = getAllSections();
        if (sections.length === 0) return;

        const nextIndex = currentCardIndex === -1 ? 0 : (currentCardIndex + 1) % sections.length;
        const nextSection = sections[nextIndex];

        if (nextSection) {
            smoothScrollTo(nextSection);
            
            // Подсветка
            document.querySelectorAll('.card-highlight').forEach(el => el.classList.remove('card-highlight'));
            if (nextSection.matches('.card, .card-pers')) {
                nextSection.classList.add('card-highlight');
            }
            
            // Обновление индикатора
            if (navIndicator) {
                const isFinal = nextIndex === sections.length - 1;
                navIndicator.innerHTML = isFinal 
                    ? '⯅ <span>SPACE</span>: Zpět na začátek' 
                    : '⯆ <span>SPACE</span>: Další část';
                navIndicator.classList.toggle('final-mode', isFinal);
            }

            currentCardIndex = nextIndex;
        }
    }

    // Инициализация
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            scrollToNextSection();
        }
    });

    setTimeout(() => {
        createFinalSection();
        enableSystem();
        AOS.init({ duration: 800, once: true, easing: 'ease-out-back' });
    }, 1500);
});