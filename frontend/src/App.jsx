// This App.jsx is just used for testing of the standalone component, 
// to integrate this microservice into the main program, use:
// import SearchTitle from './SearchTitle'

import SearchTitle from './components/SearchTitle'

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Component Test</h1>
      <SearchTitle />
    </div>
  )
}

export default App