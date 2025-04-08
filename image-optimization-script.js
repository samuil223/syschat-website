// Код за оптимизация на изображения чрез lazy loading
document.addEventListener('DOMContentLoaded', function() {
    // Прилагаме lazy loading на всички изображения
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        // Добавяме атрибут loading="lazy" към всички изображения
        img.setAttribute('loading', 'lazy');
        
        // Добавяме decoding="async" за паралелно декодиране
        img.setAttribute('decoding', 'async');
        
        // Добавяме атрибут за alt текст, ако липсва
        if (!img.alt) {
            const imgSrc = img.src;
            const altText = imgSrc.split('/').pop().split('.')[0]
                .replace(/[_-]/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
            img.alt = altText;
        }
    });
    
    // Прилагаме lazy loading на iframes (за видеа)
    const iframes = document.querySelectorAll('iframe:not([loading])');
    iframes.forEach(iframe => {
        iframe.setAttribute('loading', 'lazy');
        
        // Добавяме title атрибут за достъпност, ако липсва
        if (!iframe.title) {
            iframe.title = 'Видео съдържание';
        }
    });
    
    // Функция за проверка дали елемент е във видимата област
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.bottom >= 0 &&
            rect.right >= 0
        );
    }
    
    // Добавяме IntersectionObserver за засичане на елементи във видимата област
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Заменяме src с data-src
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    // Заменяме srcset с data-srcset
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    img.classList.remove('lazy-image');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
        
        // Същото за видеа
        const lazyVideos = document.querySelectorAll('.lazy-video');
        
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    if (video.dataset.src) {
                        video.src = video.dataset.src;
                        video.removeAttribute('data-src');
                    }
                    video.classList.remove('lazy-video');
                    videoObserver.unobserve(video);
                }
            });
        });
        
        lazyVideos.forEach(video => {
            videoObserver.observe(video);
        });
    }
    
    // Добавяме функционалност за responsive images
    const responsiveImages = document.querySelectorAll('.responsive-image');
    responsiveImages.forEach(img => {
        // Ако имаме data-srcset, създаваме srcset атрибут
        if (img.dataset.srcset) {
            const srcSetParts = img.dataset.srcset.split(',');
            const srcSet = srcSetParts.map(part => {
                const [url, width] = part.trim().split(' ');
                return `${url} ${width}`;
            }).join(', ');
            
            img.srcset = srcSet;
        }
        
        // Ако имаме data-sizes, създаваме sizes атрибут
        if (img.dataset.sizes) {
            img.sizes = img.dataset.sizes;
        } else {
            // Добавяме подразбиращи се sizes, ако не са зададени
            img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
        }
    });
    
    // Функция за оптимизация на зареждането на изображения за конкретния екран
    function optimizeImagesForScreen() {
        const devicePixelRatio = window.devicePixelRatio || 1;
        const screenWidth = window.innerWidth * devicePixelRatio;
        
        const images = document.querySelectorAll('img[data-src-mobile], img[data-src-tablet], img[data-src-desktop]');
        images.forEach(img => {
            // Определяме кой размер да използваме
            let srcToUse = img.getAttribute('data-src-desktop');
            
            if (screenWidth <= 768 && img.hasAttribute('data-src-mobile')) {
                srcToUse = img.getAttribute('data-src-mobile');
            } else if (screenWidth <= 1200 && img.hasAttribute('data-src-tablet')) {
                srcToUse = img.getAttribute('data-src-tablet');
            }
            
            if (srcToUse && img.src !== srcToUse) {
                img.src = srcToUse;
            }
        });
    }
    
    // Първоначално оптимизиране
    optimizeImagesForScreen();
    
    // Оптимизиране при промяна в размера на екрана
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(optimizeImagesForScreen, 200);
    });
    
    // Функционалност за изображения с фонов цвят за индикация на зареждане
    const colorPlaceholderImages = document.querySelectorAll('.color-placeholder');
    colorPlaceholderImages.forEach(img => {
        // Добавяме стил за фонов цвят, ако не е добавен
        if (img.dataset.placeholderColor && !img.style.backgroundColor) {
            img.style.backgroundColor = img.dataset.placeholderColor;
        }
        
        // Премахваме фоновия цвят след зареждане на изображението
        img.addEventListener('load', function() {
            img.style.backgroundColor = 'transparent';
        });
    });
    
    // Добавяме функционалност за превенция на потребителя да изтегли изображение при грешка при зареждане
    const errorImages = document.querySelectorAll('img[data-error-src]');
    errorImages.forEach(img => {
        img.addEventListener('error', function() {
            if (img.dataset.errorSrc) {
                img.src = img.dataset.errorSrc;
            }
        });
    });
});