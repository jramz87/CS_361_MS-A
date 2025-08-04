# Search Microservice

## What it does
This microservice provides task search functionality (where tasks are MongoDB documents). Users can search for tasks by typing keywords, and the system finds all tasks that contain those words in the title.

**Key features:**
- Search tasks by title keywords
- Case-insensitive search (finds "Project" when searching "project")
- Multi-word search (finds tasks containing ALL search words)
- Click to expand task details
- Real-time search with Enter key or Search button
- 30 character search limit
- Clear search functionality

## Installation
1. Clone this repo: `git clone [repo-url]`
2. Install backend: `cd backend && npm install`
3. Install frontend: `cd ../frontend && npm install`

## Usage
1. Update the necessary fields in `config.js` (located in root directory)
2. Start the backend: `cd backend && npm run dev`
3. In your main app, import the component:

```javascript
import SearchTitle from '../search-microservice/frontend/src/components/SearchTitle'

function App() {
  return <SearchTitle />
}
```

The SearchTitle component handles all API communication automatically. No additional setup required - just import and use.

## Internal API Reference

The SearchTitle component communicates with the backend using the following API:

**API Endpoint:** `/api/tasks/search`

**Request Format:** GET request with query parameter
```
http://your-backend-url/api/tasks/search?title=search+terms
```

**Router Logic:**
The Express router handles the search request and response logic:

1. **Extracts** the search term from the query parameter
2. **Parses** the search string into individual words
3. **Creates** case-insensitive regular expressions for each word
4. **Queries** MongoDB database using an AND condition to find tasks whose titles contain ALL search words
5. **Returns** all matching task information as JSON response

**Response Format:**
```javascript
{
  "results": [
    {
      "_id": "64f8a1b2c3d4e5f6789a0b1c",
      "title": "Study for Exam",
      "description": "study for CS 361 final",
      "group_name": "School Tasks", 
      "date": "07-26-25",
      "priority": 1
    }
  ]
}
```

*Note: This API information is for reference only. The SearchTitle component handles all API calls internally - you don't need to make these requests manually.*

## UML Sequence Diagram
![UML Sequence Diagram](./UML.png)