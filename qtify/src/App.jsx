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
import Container from './Container/Container';

function App() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
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

        const songsResponse = await fetch('https://qtify-backend.labs.crio.do/songs');
        const songsData = await songsResponse.json();
        setSongs(songsData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const theme = createTheme();
  const searchData = [...topAlbums, ...newAlbums];

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar searchData={searchData} />
        <Hero />
        {!loading && !error && (
          <>
            <Section title="Top Albums" data={topAlbums} />
            <Section title="New Albums" data={newAlbums} />
            <Container title="Songs" data={songs} CardComponent={SongCard} />
          </>
        )}
        {loading && <p style={{ padding: '20px', color: 'white' }}>Loading...</p>}
        {error && <p style={{ padding: '20px', color: 'red' }}>Error: {error}</p>}
      </ThemeProvider>
    </>
  )
}

export default App
