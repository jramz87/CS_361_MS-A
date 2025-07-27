// SearchTitle Component - searches tasks by title
// To import this component as a standalone microservice use:
// import SearchTitle from './SearchTitle'

import React, { useState } from 'react'
import styles from './SearchTitle.module.css'
import axios from 'axios'
import API_CONFIG from '../config/api'

function SearchTitle() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)

    const searchTasks = async () => {
        // Don't search if query is empty
        if (!query.trim()) {
            return
        }
        
        setLoading(true)
        
        try {
            const response = await axios.get(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.searchTasks}?title=${encodeURIComponent(query)}`)
            
            // Update results and indicate search has occurred
            setResults(response.data.results || [])
            setHasSearched(true)
        } catch (error) {
            console.error('Search failed:', error)
            setResults([])
        }
        
        setLoading(false)
    }

    // Handle enter key press in search input
    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            searchTasks()
        }
    }

    // Reset search to initial state
    const resetSearch = () => {
        setQuery('')
        setResults([])
        setHasSearched(false)
    }

    // Do we have results to show?
    const hasResults = results && results.length > 0

    return (
        <div className={styles.container}>
            {/* Search input section */}
            <label htmlFor="search-input" className={styles.label}>
                Search Tasks by Title
            </label>
            
            <div className={styles.searchContainer}>
                <input
                    id="search-input"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleEnterKey}
                    placeholder="Enter task title keywords..."
                    className={styles.searchInput}
                    maxLength={30}   // 30 char limit provided by H.S.
                />
                <button
                    onClick={searchTasks}
                    disabled={loading || !query.trim()}
                    className={styles.searchButton}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            
            {/* Show clear button if there's a query */}
            {query && (
                <button onClick={resetSearch} className={styles.clearButton}>
                    Clear search
                </button>
            )}

            {/* Results section - only show if we've actually searched */}
            {hasSearched && (
                <div className={styles.resultsContainer}>
                    {hasResults ? (
                        <div>
                            {/* Results header */}
                            <div className={styles.resultsHeader}>
                                Found {results.length} matching task{results.length !== 1 ? 's' : ''}
                            </div>
                            
                            {/* Loop through each result */}
                            {results.map((task) => (
                                <div key={task._id} className={styles.resultItem}>
                                    <div>
                                        {/* Task title */}
                                        <div className={styles.resultTitle}>{task.title}</div>
                                        
                                        {/* Task description if it exists */}
                                        {task.description && (
                                            <div className={styles.resultDescription}>{task.description}</div>
                                        )}
                                        
                                        {/* Task metadata */}
                                        <div className={styles.resultMeta}>
                                            {task.group_name && <span>Group: {task.group_name}</span>}
                                            {task.date && <span>Date: {task.date}</span>}
                                            {task.priority && <span>Priority: {task.priority}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // No results found message
                        <div className={styles.noResults}>
                            <div>No results found</div>
                            <div>Try searching with different keywords.</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchTitle