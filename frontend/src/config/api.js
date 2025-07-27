
// API configuration for search microservice
const API_CONFIG = {// Default to localhost for development
    baseURL: 'http://localhost:8080', // TODO: Hana, change this to your actual backend URL

    // API endpoints
    endpoints: {
        searchTasks: '/api/tasks/search'
    }
}

export default API_CONFIG