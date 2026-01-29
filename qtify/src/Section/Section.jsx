import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import styles from "./Section.module.css";

const NEW_ALBUMS_API = "https://qtify-backend.labs.crio.do/albums/new";
const SONGS_API = "https://qtify-backend.labs.crio.do/songs";
const GENRES_API = "https://qtify-backend.labs.crio.do/genres";

function Section({ title, data, fetchUrl, CardComponent, showToggle = true }) {
  const [albums, setAlbums] = useState(data || []);
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");


  // Determine the URL to fetch: prefer explicit fetchUrl, otherwise default
  const urlToFetch = fetchUrl || (title === "Songs" ? SONGS_API : NEW_ALBUMS_API);
  const isSongsSection = title === "Songs";

  // Fetch genres if this is the Songs section
  useEffect(() => {
    if (!isSongsSection) return;
    const fetchGenres = async () => {
      try {
        const res = await fetch(GENRES_API);
        if (!res.ok) throw new Error("Failed to fetch genres");
        const genresData = await res.json();
        const genresList = Array.isArray(genresData) ? genresData : genresData.data || [];
        setGenres(genresList);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };
    fetchGenres();
  }, [isSongsSection]);

  useEffect(() => {
    // If data is provided via props, use it directly
    if (data && data.length > 0) {
      setAlbums(data);
      setLoading(false);
      return;
    }

    // Otherwise, fetch from the provided URL
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const res = await fetch(urlToFetch);
        if (!res.ok) throw new Error("Failed to fetch");
        const fetchedData = await res.json();
        setAlbums(fetchedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, [data, urlToFetch]);

  const handleToggle = () => {
    // Toggle between showing 7 cards and all cards
    setIsCollapsed(!isCollapsed);
  };

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  // Filter songs based on selected genre
  let filteredItems = albums;
  if (isSongsSection && selectedGenre !== "all") {
    filteredItems = albums.filter((song) => song.genre && song.genre.key === selectedGenre);
  }

  // Show 7 cards if collapsed, all if expanded
  const cardsToDisplay = isCollapsed ? filteredItems.slice(0, 7) : filteredItems;
  const shouldShowToggle = showToggle && filteredItems.length > 7;
//   const buttonText = isCollapsed ? "Collapse" : "Show All";
  const buttonText = isCollapsed ?"Show All"  :  "Collapse";

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {shouldShowToggle && (
          <button className={styles.toggleButton} onClick={handleToggle}>
            {buttonText}
          </button>
        )}
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && !error && (
        <div>
          {isSongsSection && (
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
          )}
          {showToggle ? (
            isCollapsed ? (


                   <Carousel items={filteredItems} CardComponent={CardComponent || Card} />

            
            ) : (
             
              // When expanded, show a reusable Carousel instead of the grid
                <div className={styles.cardGrid}>
                {cardsToDisplay.map((album) => (
                  <Card
                    key={album.id}
                    image={album.image}
                    title={album.title}
                    follows={album.follows}
                  />
                ))}
              </div>
            )
          ) : (
            // For sections like Songs: always show carousel, no toggle
            <Carousel items={filteredItems} CardComponent={CardComponent || Card} />
          )}
        </div>
      )}
    </section>
  );
}

export default Section;
