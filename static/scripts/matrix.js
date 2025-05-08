document.addEventListener('DOMContentLoaded', function() {
    // Создаем canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    // Настройки матрицы
    const config = {
        fontSize: 16,
        columnWidth: 20,
        fadeSpeed: 0.02,
        fallSpeed: 1.5,
        charChangeSpeed: 0.1,
        chars: '01アイウエオ0123456789ABCDEF'
    };
    
    // Инициализация canvas
    const ctx = canvas.getContext('2d');
    let columns = [];
    let lastTime = 0;
    
    function init() {
        resizeCanvas();
        createColumns();
        window.addEventListener('resize', resizeCanvas);
        requestAnimationFrame(update);
    }
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createColumns();
    }
    
    function createColumns() {
        columns = [];
        const columnCount = Math.floor(canvas.width / config.columnWidth);
        
        for (let i = 0; i < columnCount; i++) {
            columns.push({
                x: i * config.columnWidth,
                chars: [],
                nextCharTime: 0,
                speed: 2 + Math.random() * 3
            });
        }
    }
    
    function update(time) {
        if (!lastTime) lastTime = time;
        const deltaTime = time - lastTime;
        lastTime = time;
        
        // Очищаем canvas с полупрозрачным фоном для эффекта шлейфа
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Обновляем и рисуем символы
        columns.forEach(column => {
            // Добавляем новые символы
            if (Math.random() < 0.03) {
                addNewChar(column);
            }
            
            // Обновляем существующие символы
            for (let i = column.chars.length - 1; i >= 0; i--) {
                const char = column.chars[i];
                char.y += column.speed * deltaTime / 16;
                char.opacity -= config.fadeSpeed * deltaTime / 16;
                
                // Удаляем невидимые символы
                if (char.opacity <= 0 || char.y > canvas.height) {
                    column.chars.splice(i, 1);
                    continue;
                }
                
                // Изменяем символ для эффекта мерцания
                if (Math.random() < config.charChangeSpeed) {
                    char.value = config.chars[Math.floor(Math.random() * config.chars.length)];
                }
                
                // Рисуем символ
                ctx.fillStyle = `rgba(0, 255, 0, ${char.opacity})`;
                ctx.font = `${config.fontSize}px 'Courier New', monospace`;
                ctx.fillText(char.value, column.x, char.y);
            }
        });
        
        requestAnimationFrame(update);
    }
    
    function addNewChar(column) {
        const lastChar = column.chars[column.chars.length - 1];
        const y = lastChar ? lastChar.y - config.fontSize : -config.fontSize;
        
        column.chars.push({
            value: config.chars[Math.floor(Math.random() * config.chars.length)],
            y: y,
            opacity: 0.7 + Math.random() * 0.3
        });
        
        // Первый символ в цепочке делаем ярче
        if (column.chars.length === 1) {
            column.chars[0].opacity = 1;
        }
    }
    
    init();
});