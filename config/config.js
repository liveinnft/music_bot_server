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

// Определяем текущее окружение
const ENVIRONMENT = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' ? 
                   'development' : 'production';

// Экспортируем конфигурацию
const API_BASE_URL = CONFIG[ENVIRONMENT].API_BASE_URL;

console.log(`Running in ${ENVIRONMENT} mode`);
console.log(`API Base URL: ${API_BASE_URL}`);
