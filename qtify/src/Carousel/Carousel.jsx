import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Carousel.module.css";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";

const Carousel = ({ items, CardComponent }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className={styles.carouselContainer}>
      {!isBeginning && (
        <button
          onClick={handlePrevClick}
          className={styles.navButton + " " + styles.prevButton}
          aria-label="previous"
          ref={prevRef}
        >
          <LeftArrow />
        </button>
      )}
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={5}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className={styles.carousel}
        onSwiper={(swiper) => {
          // initialize state based on swiper
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <CardComponent {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {!isEnd && (
        <button
          onClick={handleNextClick}
          className={styles.navButton + " " + styles.nextButton}
          aria-label="next"
          ref={nextRef}
        >
          <RightArrow />
        </button>
      )}
    </div>
  );
};

export default Carousel;
