import React from "react";
import { Ad } from "../../../models/IAds";
import "./Carousel.css";
import { CarouselProps } from "./Carousel.types";
import { Image } from "primereact/image";

const CarouselItem: React.FC<{ image: string; title: string }> = ({
  image,
  title,
}) => (
  <Image src={image} alt={title} className="max-w-full h-auto max-h-29rem" />
);

const Carousel: React.FC<CarouselProps> = ({ ads }) => (
  <div className="carousel-container">
    <div className="carousel-track">
      {ads.length > 0 &&
        ads.map((ad: Ad) => (
          <CarouselItem
            key={ad.title}
            image={ad.image ?? "https://via.placeholder.com/150"}
            title={ad.title}
          />
        ))}
      {ads.length > 0 &&
        ads.map((ad: Ad) => (
          <CarouselItem
            key={ad.title + "_repeat"}
            image={ad.image ?? "https://via.placeholder.com/150"}
            title={ad.title}
          />
        ))}
      {ads.length === 0 &&
        Array.from({ length: 25 }).map((_, index) => (
          <CarouselItem
            key={`placeholder_${index}`}
            image="https://via.placeholder.com/350"
            title="Placeholder"
          />
        ))}
    </div>
  </div>
);

export default Carousel;
