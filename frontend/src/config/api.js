// API configuration for search microservice
import '../../../config.js'  // Load the config into window

const API_CONFIG = {
    baseURL: window.MICROSERVICE_CONFIG.frontend.apiUrl,
    endpoints: {
        searchTasks: '/api/tasks/search'
    }
}

export default API_CONFIG