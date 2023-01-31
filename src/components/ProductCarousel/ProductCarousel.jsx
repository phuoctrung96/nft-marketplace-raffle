import React from "react";
import RaffleCard from "../RaffleCard/RaffleCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "./ProductCarousel.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";

const ProductCarousel = ({ title }) => {
  return (
    <>
      <h3 className="text-3xl text-center font-clashDisplay font-medium mb-4">
        {title}
      </h3>
      <Swiper
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{ delay: 3000 }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={10}
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
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide>
          <RaffleCard additionalClass="min-w-[250px]" />
        </SwiperSlide>
        <SwiperSlide>
          <RaffleCard additionalClass="min-w-[250px]" />
        </SwiperSlide>
        <SwiperSlide>
          <RaffleCard additionalClass="min-w-[250px]" />
        </SwiperSlide>
        <SwiperSlide>
          <RaffleCard additionalClass="min-w-[250px]" />
        </SwiperSlide>
        <SwiperSlide>
          <RaffleCard additionalClass="min-w-[250px]" />
        </SwiperSlide>
        <SwiperSlide>
          <RaffleCard additionalClass="min-w-[250px]" />
        </SwiperSlide>
        <SwiperSlide>
          <RaffleCard additionalClass="min-w-[250px]" />
        </SwiperSlide>
        <SwiperSlide>
          <RaffleCard additionalClass="min-w-[250px]" />
        </SwiperSlide>
        <SwiperSlide>
          <RaffleCard additionalClass="min-w-[250px]" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default ProductCarousel;
