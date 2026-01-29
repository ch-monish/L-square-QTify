import React, { useState } from "react";
import Card from "../Card/Card";
import styles from "./Section.module.css";

function Section({ title, data }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const cardsToDisplay = isCollapsed ? data.slice(0, 7) : data;

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button
          className={styles.toggleButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Show All" : "Collapse"}
        </button>
      </div>
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
    </div>
  );
}

export default Section;
