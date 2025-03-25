import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchData } from './services/api'; // Import the API function to fetch data
import Header from './components/Header'; // Import the Header component
import Footer from './components/Footer'; // Import the Footer component
import Home from './pages/Home'; // Import the Home page component
import { ThemeProvider } from './context/ThemeContext'; // Import the ThemeProvider

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
    <ThemeProvider>
      <div className="App">
        <Header />
        <main className="App-content">
          {/* Display loading state */}
          {loading && <p>Loading...</p>}

          {/* Display error message if any */}
          {error && <p className="text-error">Error: {error}</p>}

          {/* Render Home component and pass data to it */}
          {!loading && !error && <Home data={data} />}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
