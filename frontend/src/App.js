import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchData } from './services/api'; // Import the API function to fetch data

function App() {
  const [data, setData] = useState(null);  // State to hold the data from the backend
  const [loading, setLoading] = useState(true);  // State to show loading indicator
  const [error, setError] = useState(null);  // State to handle any errors

  // Fetch data when the component is mounted
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData(); // Call the fetchData function
        setData(result);  // Store the result in state
      } catch (err) {
        setError(err.message);  // Set error if there is one
      } finally {
        setLoading(false);  // Stop loading once data is fetched
      }
    };

    getData();  // Invoke the fetch function
  }, []);  // Empty array ensures it runs once when the component mounts

  return (
    <div className="App">
      <header className="App-header">

        {/* Display loading state */}
        {loading && <p>Loading...</p>}

        {/* Display error message if any */}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {/* Display data once it's fetched */}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </header>
    </div>
  );
}

export default App;
