import React from "react";
import { Chip } from "@mui/material";
import styles from "./SongCard.module.css";

function SongCard({ image, title, artists, likes }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        {likes && (
          <Chip
            label={`${likes} Likes`}
            className={styles.chip}
            size="small"
          />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.artists}>{artists && artists.join(", ")}</p>
      </div>
    </div>
  );
}

export default SongCard;
