// config.js - Конфигурация API

// Базовый URL для API (замените на ваш домен PythonAnywhere)
const API_BASE_URL = 'https://yourusername.pythonanywhere.com';

// Альтернативная конфигурация для разработки
// const API_BASE_URL = 'http://localhost:5000';

// Настройки для запросов
const API_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000 // 10 секунд
};

// Функция для выполнения запросов с обработкой ошибок
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...API_CONFIG,
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

// Экспорт для использования в модулях (если используется)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_BASE_URL,
        API_CONFIG,
        apiRequest
    };
}
