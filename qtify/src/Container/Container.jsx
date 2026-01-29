import React, { useState } from "react";
import styles from "./Container.module.css";

function Container({ title, data, CardComponent }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const cardsToDisplay = isCollapsed ? data.slice(0, 7) : data;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {data && data.length > 7 && (
          <button
            className={styles.toggleButton}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "Show All" : "Collapse"}
          </button>
        )}
      </div>
      <div className={styles.cardGrid}>
        {cardsToDisplay.map((item) => (
          <CardComponent
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Container;
