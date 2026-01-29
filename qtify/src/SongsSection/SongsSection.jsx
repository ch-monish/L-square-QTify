import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import Carousel from "../Carousel/Carousel";
import SongCard from "../SongCard/SongCard";
import styles from "./SongsSection.module.css";

const SONGS_API = "https://qtify-backend.labs.crio.do/songs";
const GENRES_API = "https://qtify-backend.labs.crio.do/genres";

function SongsSection() {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch genres
        const genresRes = await fetch(GENRES_API);
        if (!genresRes.ok) throw new Error("Failed to fetch genres");
        const genresData = await genresRes.json();
        // Handle if genres is wrapped in an object with a 'data' property
        const genresList = Array.isArray(genresData) ? genresData : genresData.data || [];
        setGenres(genresList);

        // Fetch songs
        const songsRes = await fetch(SONGS_API);
        if (!songsRes.ok) throw new Error("Failed to fetch songs");
        const songsData = await songsRes.json();
        setSongs(songsData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter songs based on selected genre
  const filteredSongs = selectedGenre === "all" 
    ? songs 
    : songs.filter((song) => song.genre && song.genre.key === selectedGenre);

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  return (
    <section className={styles.songsSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Songs</h2>
      </div>

      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {!loading && !error && (
        <div>
          {/* Tabs */}
          <div className={styles.tabsContainer}>
            <Tabs
              value={selectedGenre}
              onChange={handleGenreChange}
              className={styles.tabs}
              TabIndicatorProps={{
                className: styles.tabIndicator,
              }}
            >
              <Tab
                label="All"
                value="all"
                className={selectedGenre === "all" ? styles.activeTab : styles.tab}
              />
              {genres.map((genre) => (
                <Tab
                  key={genre.key}
                  label={genre.label}
                  value={genre.key}
                  className={selectedGenre === genre.key ? styles.activeTab : styles.tab}
                />
              ))}
            </Tabs>
          </div>

          {/* Carousel */}
          <Carousel items={filteredSongs} CardComponent={SongCard} />
        </div>
      )}
    </section>
  );
}

export default SongsSection;
