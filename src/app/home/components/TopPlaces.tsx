import React from "react";
import Image from "next/image";
import "./TopPlaces.css";

/* Optional: Define structure for each place card */
interface Place {
  name: string;
  image: string;
}

const places: Place[] = [
  { name: "Paris", image: "/assets/paris.jpg" },
  { name: "Rome", image: "/assets/rome.jpg" },
  { name: "Amsterdam", image: "/assets/amsterdam.jpg" },
  { name: "Barcelona", image: "/assets/barcelona.jpg" },
  { name: "London", image: "/assets/london.jpg" },
  { name: "Berlin", image: "/assets/berlin.jpg" },
  { name: "Lisbon", image: "/assets/lisbon.jpg" },
  { name: "Prague", image: "/assets/prague.jpg" },
];

const TopPlaces: React.FC = () => {
  return (
    <div className="top-places-section">
      <h2 className="tp-title">Top places to visit</h2>

      <div className="tp-grid">
        {places.map((place) => (
          <div className="tp-card" key={place.name}>
            <Image
              src={place.image}
              alt={place.name}
              width={250}
              height={250}
            />
            <p>{place.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPlaces;
