document.addEventListener('DOMContentLoaded', () => {
    // Инициализация системы
    let isEnabled = false;
    const cardSelectors = ['.card', '.card-pers'];
    let navIndicator = null;
    let currentCardIndex = -1;
    let autoScrollEnabled = false;

    // Создаем индикатор навигации
    function createNavIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'nav-indicator';
        indicator.innerHTML = '⯆ <span>SPACE</span>: Další kartička';
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

    // Точный скролл к карточке с полным отображением
    function preciseScrollTo(element) {
        const windowHeight = window.innerHeight;
        const elementRect = element.getBoundingClientRect();
        const elementHeight = elementRect.height;
        
        // Рассчитываем позицию для полного отображения карточки
        let scrollPosition;
        
        if (elementHeight < windowHeight) {
            // Если карточка меньше высоты окна - центрируем
            scrollPosition = window.pageYOffset + elementRect.top - (windowHeight - elementHeight) / 2;
        } else {
            // Если карточка больше - показываем начало
            scrollPosition = window.pageYOffset + elementRect.top;
        }
        
        // Плавный скролл с кастомной анимацией
        const startPosition = window.pageYOffset;
        const distance = scrollPosition - startPosition;
        const duration = Math.min(800, Math.max(300, Math.abs(distance) * 0.5));
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeProgress = easeOutQuad(progress);
            window.scrollTo(0, startPosition + distance * easeProgress);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    function easeOutQuad(t) {
        return t * (2 - t);
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
        
        if (currentCardIndex === -1) {
            currentCardIndex = 0;
        } else {
            currentCardIndex = (currentCardIndex + 1) % cards.length;
        }

        const nextCard = cards[currentCardIndex];
        
        if (nextCard) {
            preciseScrollTo(nextCard);
            
            document.querySelectorAll('.card-highlight').forEach(el => {
                el.classList.remove('card-highlight');
            });
            nextCard.classList.add('card-highlight');
            
            if (navIndicator) {
                navIndicator.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    navIndicator.style.transform = 'translateY(0)';
                }, 200);
            }
        }
    }

    // Настройка автоскролла к финальному сообщению
    function setupAutoScroll() {
        const cards = getAllCards();
        const lastCard = cards[cards.length - 1];
        const endMessage = document.querySelector('h1.project-end-title');

        if (lastCard && endMessage) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !autoScrollEnabled) {
                    autoScrollEnabled = true;
                    
                    setTimeout(() => {
                        preciseScrollTo(endMessage);
                        endMessage.classList.add('show');
                    }, 20000);
                }
            }, { threshold: 0.7 });

            observer.observe(lastCard);
        }
    }

    // Обработчик клавиш
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            scrollToNextCard();
        }
    });

    // Инициализация с задержкой
    setTimeout(() => {
        enableSystem();
        setupAutoScroll();
    }, 1500);

    // Инициализация AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-back'
        });
    }
});