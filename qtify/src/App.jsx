// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import './App.css'
import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';
import Section from './Section/Section';
import SongCard from './SongCard/SongCard';
// SongsSection component is no longer used; reuse Section for Songs


function App() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topResponse = await fetch('https://qtify-backend.labs.crio.do/albums/top');
        const topData = await topResponse.json();
        setTopAlbums(topData);

        const newResponse = await fetch('https://qtify-backend.labs.crio.do/albums/new');
        const newData = await newResponse.json();
        setNewAlbums(newData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const theme = createTheme({
    palette: {
      background: {
        default: '#000000',
        paper: '#000000',
      },
      primary: {
        main: '#34c94b',
      },
      secondary: {
        main: '#181818',
      },
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.7)',
      },
      error: {
        main: '#ff4d4f',
      },
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Navbar searchData={[...topAlbums, ...newAlbums]} />
      <Hero />
      {!loading && !error && (
        <>
          <Section title="Top Albums" data={topAlbums} />
          <Section title="New Albums" data={newAlbums} />
          <Section title="Songs" fetchUrl={"https://qtify-backend.labs.crio.do/songs"} CardComponent={SongCard} showToggle={false} />
        </>
      )}
      {loading && <p style={{ padding: '20px', color: theme.palette.primary.main }}>Loading...</p>}
      {error && <p style={{ padding: '20px', color: theme.palette.error.main }}>Error: {error}</p>}
    </ThemeProvider>
  )
}

export default App
