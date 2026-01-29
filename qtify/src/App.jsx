// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import './App.css'
import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';
import Section from './Section/Section';

function App() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopAlbums = async () => {
      try {
        const response = await fetch('https://qtify-backend.labs.crio.do/albums/top');
        const data = await response.json();
        setTopAlbums(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTopAlbums();
  }, []);

  const theme = createTheme();
  const searchData = topAlbums;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar searchData={searchData} />
        <Hero />
        {!loading && !error && <Section title="Top Albums" data={topAlbums} />}
        {loading && <p style={{ padding: '20px', color: 'white' }}>Loading...</p>}
        {error && <p style={{ padding: '20px', color: 'red' }}>Error: {error}</p>}
      </ThemeProvider>
    </>
  )
}

export default App
