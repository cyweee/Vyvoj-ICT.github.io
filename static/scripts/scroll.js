document.addEventListener('DOMContentLoaded', () => {
    // Инициализация системы
    let isEnabled = false;
    const cardSelectors = ['.card', '.card-pers'];
    let navIndicator = null;

    // Создаем индикатор навигации
    function createNavIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'nav-indicator';
        indicator.innerHTML = '⯆ <span>SPACE</span>:  Další kartička';
        document.body.appendChild(indicator);
        return indicator;
    }

    // Активация системы
    const enableSystem = () => {
        isEnabled = true;
        navIndicator = createNavIndicator();
        setTimeout(() => {
            navIndicator.style.opacity = '1';
        }, 50);
        window.removeEventListener('scroll', enableSystem);
    };

    setTimeout(enableSystem, 3000);
    window.addEventListener('scroll', enableSystem, { once: true });

    // Плавный скролл к элементу
    function smoothScrollTo(target) {
        const element = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;
        
        if (!element) return;
        
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const scrollPosition = element.offsetTop - Math.min(headerHeight, 100);
        
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });

        // Подсветка текущей карточки
        document.querySelectorAll('.card-highlight').forEach(el => {
            el.classList.remove('card-highlight');
        });
        element.classList.add('card-highlight');
    }

    // Получаем все карточки
    function getAllCards() {
        return Array.from(document.querySelectorAll(cardSelectors.join(',')))
            .sort((a, b) => a.offsetTop - b.offsetTop);
    }

    // Навигация по карточкам
    function scrollToNextCard() {
        if (!isEnabled) return;
        
        const cards = getAllCards();
        if (cards.length === 0) return;
        
        const currentScroll = window.scrollY + (window.innerHeight / 3);
        let nextCard = null;

        for (const card of cards) {
            if (card.offsetTop > currentScroll) {
                nextCard = card;
                break;
            }
        }

        if (!nextCard && cards.length > 0) {
            nextCard = cards[0];
        }

        if (nextCard) {
            smoothScrollTo(nextCard);
            
            // Анимация индикатора при переключении
            if (navIndicator) {
                navIndicator.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    navIndicator.style.transform = 'translateY(0)';
                }, 200);
            }
        }
    }

    // Обработчик клавиш
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            scrollToNextCard();
        }
    });

    // Инициализация AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-back'
        });
    }
});