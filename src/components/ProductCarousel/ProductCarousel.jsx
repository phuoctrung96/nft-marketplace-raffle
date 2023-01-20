import React from "react";
import RaffleCard from "../RaffleCard/RaffleCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "./ProductCarousel.scss";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";

const ProductCarousel = ({ raffles, swipeClass, slideClass, cardClass }) => {

  console.log(raffles)
  return (
    <>
      <Swiper
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{ delay: 3000 }}
        modules={[Pagination, Navigation, Autoplay]}
        className={`${swipeClass} mySwiper`}
        slidesPerGroup={1}
        // Responsive breakpoints
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 480px
          520: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 640px
          770: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1040: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1300: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {raffles?.length && raffles.map((raffle) => (
          <SwiperSlide className={slideClass}>
            <RaffleCard raffle={raffle} additionalClass={`${cardClass} min-w-[250px] p-4 card-border`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default ProductCarousel;
