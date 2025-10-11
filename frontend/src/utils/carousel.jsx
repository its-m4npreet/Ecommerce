
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    img: "https://m.media-amazon.com/images/I/61Yx5-N155L._SX3000_.jpg",
    alt: "Banner 1"
  },
  {
    img: "https://m.media-amazon.com/images/I/81hIlE5xocL._SX3000_.jpg",
    alt: "Banner 2"
  },
  {
    img: "https://m.media-amazon.com/images/I/71qcoYgEhzL._SX3000_.jpg",
    alt: "Banner 3"
  }
];

function BannerCarousel({ imagePosition = 'top' }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000 // 3 seconds
  };
  return (
    <div className="my-4 sm:my-6 lg:my-8 relative max-w-7xl mx-auto px-2 sm:px-4">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} className="relative">
          <img
            src={slide.img}
            alt={slide.alt}
            className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 object-cover rounded-lg sm:rounded-xl shadow-lg drop-shadow-2xl opacity-[80%]"
            style={{ objectPosition: imagePosition }}
          />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BannerCarousel;

