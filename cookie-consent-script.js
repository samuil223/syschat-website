// Код за банер за съгласие с бисквитките
document.addEventListener('DOMContentLoaded', function() {
    // Проверяваме дали потребителят вече е дал съгласие
    if (!localStorage.getItem('cookieConsent')) {
        // Създаваме елемента за банера
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <p>Този сайт използва бисквитки, за да подобри вашето изживяване. С използването на нашия сайт, вие се съгласявате с нашата <a href="cookies.html">политика за бисквитките</a>.</p>
                </div>
                <div class="cookie-buttons">
                    <button class="cookie-btn accept-all">Приемам всички</button>
                    <button class="cookie-btn accept-necessary">Само необходимите</button>
                    <button class="cookie-btn cookie-settings">Настройки</button>
                </div>
            </div>
        `;
        
        // Добавяме стиловете за банера
        const cookieStyles = document.createElement('style');
        cookieStyles.textContent = `
            .cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 15px 20px;
                z-index: 10000;
                display: flex;
                justify-content: center;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
            }
            
            .cookie-content {
                display: flex;
                max-width: 1200px;
                width: 100%;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
            }
            
            .cookie-text {
                flex: 1;
                min-width: 300px;
                padding-right: 20px;
            }
            
            .cookie-text a {
                color: var(--secondary);
                text-decoration: underline;
            }
            
            .cookie-buttons {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 10px;
            }
            
            .cookie-btn {
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 600;
                white-space: nowrap;
            }
            
            .accept-all {
                background-color: var(--secondary);
                color: white;
            }
            
            .accept-necessary {
                background-color: transparent;
                border: 1px solid white;
                color: white;
            }
            
            .cookie-settings {
                background-color: var(--gray-100);
                color: var(--dark);
            }
            
            .cookie-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10001;
                padding: 20px;
            }
            
            .cookie-modal-content {
                background-color: white;
                border-radius: 8px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                padding: 30px;
                position: relative;
            }
            
            .cookie-modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 24px;
                cursor: pointer;
                background: none;
                border: none;
                color: var(--dark);
            }
            
            .cookie-category {
                margin-bottom: 20px;
                border-bottom: 1px solid var(--gray-300);
                padding-bottom: 15px;
            }
            
            .cookie-category:last-child {
                border-bottom: none;
            }
            
            .cookie-category-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .cookie-toggle {
                display: flex;
                align-items: center;
            }
            
            .cookie-toggle input {
                width: 40px;
                height: 20px;
                margin-left: 10px;
            }
            
            .cookie-save-btn {
                background-color: var(--secondary);
                color: white;
                border: none;
                border-radius: 4px;
                padding: 10px 20px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 20px;
            }
            
            @media (max-width: 768px) {
                .cookie-content {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .cookie-text {
                    padding-right: 0;
                    margin-bottom: 15px;
                }
            }
        `;
        
        // Добавяме елементите в DOM
        document.head.appendChild(cookieStyles);
        document.body.appendChild(cookieBanner);
        
        // Функционалност на бутоните
        const acceptAllBtn = cookieBanner.querySelector('.accept-all');
        const acceptNecessaryBtn = cookieBanner.querySelector('.accept-necessary');
        const settingsBtn = cookieBanner.querySelector('.cookie-settings');
        
        // Приемаме всички бисквитки
        acceptAllBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'all');
            cookieBanner.remove();
        });
        
        // Приемаме само необходимите
        acceptNecessaryBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'necessary');
            cookieBanner.remove();
        });
        
        // Показваме настройките
        settingsBtn.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'cookie-modal';
            modal.innerHTML = `
                <div class="cookie-modal-content">
                    <button class="cookie-modal-close">&times;</button>
                    <h2>Настройки за бисквитки</h2>
                    <p>Изберете кои категории бисквитки искате да разрешите:</p>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Необходими</h3>
                            <div class="cookie-toggle">
                                <label>Разрешени</label>
                                <input type="checkbox" checked disabled>
                            </div>
                        </div>
                        <p>Тези бисквитки са необходими за основното функциониране на уебсайта и не могат да бъдат изключени.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Функционални</h3>
                            <div class="cookie-toggle">
                                <label>Разрешавам</label>
                                <input type="checkbox" class="functional-cookies" checked>
                            </div>
                        </div>
                        <p>Тези бисквитки позволяват подобрена функционалност и персонализация, като запомняне на предпочитанията.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Аналитични</h3>
                            <div class="cookie-toggle">
                                <label>Разрешавам</label>
                                <input type="checkbox" class="analytics-cookies" checked>
                            </div>
                        </div>
                        <p>Тези бисквитки ни помагат да разберем как посетителите взаимодействат с нашия уебсайт.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Маркетингови</h3>
                            <div class="cookie-toggle">
                                <label>Разрешавам</label>
                                <input type="checkbox" class="marketing-cookies" checked>
                            </div>
                        </div>
                        <p>Тези бисквитки се използват за проследяване на посетители на различни уебсайтове с цел показване на подходящи реклами.</p>
                    </div>
                    
                    <button class="cookie-save-btn">Запази настройките</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Затваряне на модала
            const closeBtn = modal.querySelector('.cookie-modal-close');
            closeBtn.addEventListener('click', function() {
                modal.remove();
            });
            
            // Запазване на настройките
            const saveBtn = modal.querySelector('.cookie-save-btn');
            saveBtn.addEventListener('click', function() {
                const functionalCookies = modal.querySelector('.functional-cookies').checked;
                const analyticsCookies = modal.querySelector('.analytics-cookies').checked;
                const marketingCookies = modal.querySelector('.marketing-cookies').checked;
                
                const settings = {
                    necessary: true,
                    functional: functionalCookies,
                    analytics: analyticsCookies,
                    marketing: marketingCookies
                };
                
                localStorage.setItem('cookieConsent', 'custom');
                localStorage.setItem('cookieSettings', JSON.stringify(settings));
                
                modal.remove();
                cookieBanner.remove();
            });
            
            // Затваряне на модала при клик извън него
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.remove();
                }
            });
        });
    }
});