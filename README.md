# Search Component Setup

## What you need to copy
```
SearchTitle.jsx (goes in frontend/src/components/)
SearchTitle.module.css (goes in frontend/src/components/)
api.js (goes in frontend/src/config/)
```

## Installation
```bash
npm install axios
```

## Setup

### 1. Modify api.js file in frontend
In `src/config/api.js`, modify `baseURL` to real value

### 2. Environment variable
Add this to your frontend .env file:
```
VITE_API_URL=http://your-backend-url
```

If you use Create React App instead of Vite, change `api.js`:
```javascript
// Change this line:
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',

// To this:
baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
```

### 3. Alternative: Use Vite proxy instead of environment variable
If you get CORS errors, add this to `vite.config.js`:
```javascript
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
}
```

Then set `baseURL: ''` in api.js

### 4. In backend, update MongoDB collection name in Task.js
In `backend/models/Task.js` update `collection` field

### 5. In backend, update .env file with MongoDB connect string
In `backend/.env` update `MONGODB_URI`

### 6. In backend, update .env file for CORS configuration
In `backend/.env` update `ALLOWED_ORIGINS`

### 7. How to use it
```javascript
import SearchTitle from './SearchTitle'

<SearchTitle />
```

## Your backend needs

**Endpoint:** `GET /api/tasks/search?title=whatever`

**Returns:**
```json
{
  "results": [
    {
      "_id": "123",
      "title": "some task",
      "description": "details",
      "group_name": "team name", 
      "date": "07-26-25",
      "priority": 1
    }
  ]
}
```

**CORS setup:**
```javascript
app.use(cors({
  origin: 'http://your-frontend-url'
}))
```