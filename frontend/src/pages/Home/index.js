import React from 'react';
import './styles.css';

function Home({ data }) {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to My Resume</h1>
        <p>Full Stack Developer | React | FastAPI</p>
      </section>
      
      <section className="data-section">
        <h2>Data from Backend</h2>
        {data ? (
          <pre className="data-display">{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>No data available</p>
        )}
      </section>
    </div>
  );
}

export default Home;