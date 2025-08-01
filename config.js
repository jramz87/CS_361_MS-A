// Microservice Configuration - Update these values for your setup for proper integration

// Define the config object
var MICROSERVICE_CONFIG = {
    // Frontend API configuration
    frontend: {
        apiUrl: 'http://localhost:8080',                                // Backend URL of main program
    },
    
    // Backend database configuration  
    backend: {
        port: 8080,                                                     // Backend port of main program
        mongoUri: 'mongodb+srv://username:password/test',   // MongoDB connection string
        collectionName: 'search-title',                                 // MongoDB task collection name
        allowedOrigins: 'http://localhost:3000,http://localhost:5173'   // Frontend URLs for CORS
    }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    // Node.js/CommonJS environment (backend)
    module.exports = MICROSERVICE_CONFIG
} else if (typeof window !== 'undefined') {
    // Browser environment (frontend)
    window.MICROSERVICE_CONFIG = MICROSERVICE_CONFIG
}