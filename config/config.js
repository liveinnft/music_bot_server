// Конфигурация API для разных окружений
const CONFIG = {
    // Для разработки (локальный сервер)
    development: {
        API_BASE_URL: 'http://localhost:5000'
    },
    
    // Для продакшена (PythonAnywhere)
    production: {
        API_BASE_URL: 'https://yourusername.pythonanywhere.com'  // Замените на ваш домен
    }
};

// Автоматическое определение окружения
function getEnvironment() {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'development';
    } else {
        return 'production';
    }
}

// Экспорт конфигурации
const currentEnv = getEnvironment();
const API_BASE_URL = CONFIG[currentEnv].API_BASE_URL;

console.log(`🌐 Окружение: ${currentEnv}`);
console.log(`🔗 API URL: ${API_BASE_URL}`);

// Функция для проверки доступности API
async function checkApiHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ API работает:', data);
            return true;
        } else {
            console.error('❌ API недоступен:', data.error);
            return false;
        }
    } catch (error) {
        console.error('❌ Ошибка соединения с API:', error);
        return false;
    }
}

// Функция для отображения состояния API
function showApiStatus() {
    checkApiHealth().then(isHealthy => {
        if (!isHealthy) {
            // Показываем уведомление о проблемах с API
            const statusDiv = document.createElement('div');
            statusDiv.className = 'alert alert-warning';
            statusDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                max-width: 300px;
                border-radius: 10px;
                background: rgba(255, 193, 7, 0.9);
                color: #856404;
                padding: 15px;
                font-size: 14px;
            `;
            statusDiv.innerHTML = `
                <strong>⚠️ Проблемы с API</strong><br>
                Сервер временно недоступен
            `;
            
            document.body.appendChild(statusDiv);
            
            // Убираем уведомление через 5 секунд
            setTimeout(() => {
                statusDiv.remove();
            }, 5000);
        }
    });
}

// Запускаем проверку API при загрузке страницы
document.addEventListener('DOMContentLoaded', showApiStatus);
