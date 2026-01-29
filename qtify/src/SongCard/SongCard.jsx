import React from "react";
import styles from "./SongCard.module.css";

function SongCard({ image, title, artists }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.artists}>{artists && artists.join(", ")}</p>
      </div>
    </div>
  );
}

export default SongCard;
