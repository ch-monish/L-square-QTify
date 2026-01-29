import React from "react";
import styles from "./Hero.module.css";
import heroHeadphones from "../assets/hero_headphones.svg";

function Hero() {
  return (
    <div className={styles.hero}>
    
        <img src={heroHeadphones} width={212} alt="headphones" />
      {/* </div> */}
    </div>
  );
}

export default Hero;

