"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./results.css"; 

interface Car {
  id: number;
  make: string;
  model: string;
  price_per_day: number;
  image: string;
  provider: string;
  location: string;
  car_type?: string;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get("q") || "";
  const pickup = searchParams.get("pickup") || "";
  const ret = searchParams.get("return") || "";

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const [carType, setCarType] = useState("All");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("none");
  const [page, setPage] = useState(1);

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://car-rental-backend-kc40.onrender.com";

  useEffect(() => {
    async function loadCars() {
      const url = new URL(`${API_BASE}/search`);
      url.searchParams.append("q", q);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("per_page", "6");

      if (pickup) url.searchParams.append("pickup", pickup);
      if (ret) url.searchParams.append("return", ret);
      if (carType !== "All") url.searchParams.append("car_type", carType);
      if (priceMin) url.searchParams.append("price_min", priceMin);
      if (priceMax) url.searchParams.append("price_max", priceMax);

      const res = await fetch(url.toString());
      const data = await res.json();

      let sorted = data;
      if (sort === "low") sorted = [...data].sort((a, b) => a.price_per_day - b.price_per_day);
      if (sort === "high") sorted = [...data].sort((a, b) => b.price_per_day - a.price_per_day);

      setCars(sorted);
      setLoading(false);
    }

    loadCars();
  }, [q, page, carType, priceMin, priceMax, sort, pickup, ret]);

  if (loading) return <div className="loading-screen">Loading cars...</div>;

  return (
    <div className="results-container">

     
      <button className="back-btn" onClick={() => window.history.back()}>
        ← Modify Search
      </button>

      <h1 className="page-title">Available Cars</h1>
      <p className="subtitle">Pickup Location: <strong>{q}</strong></p>

      <p className="date-text">
        {pickup && <>Pickup: <b>{new Date(pickup).toDateString()}</b></>}
        <br />
        {ret && <>Return: <b>{new Date(ret).toDateString()}</b></>}
      </p>

      
      <div className="filter-box">
        <div className="filter-item">
          <label>Car Type</label>
          <select value={carType} onChange={(e) => setCarType(e.target.value)}>
            <option>All</option>
            <option>Economy</option>
            <option>Compact</option>
            <option>SUV</option>
            <option>Luxury</option>
            <option>Special</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Min Price</label>
          <input
            type="number"
            value={priceMin}
            placeholder="₹ Min"
            onChange={(e) => setPriceMin(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label>Max Price</label>
          <input
            type="number"
            value={priceMax}
            placeholder="₹ Max"
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label>Sort By</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="none">None</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>

        <button
          className="clear-btn"
          onClick={() => {
            setCarType("All");
            setPriceMin("");
            setPriceMax("");
            setSort("none");
            setPage(1);
          }}
        >
          Reset
        </button>
      </div>

    
      <div className="cars-grid">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>
            <div className="car-img-box">
                       <img
  src={
    car.image &&
    car.image.trim() !== "" &&
    car.image.trim().toLowerCase() !== "null" &&
    car.image.trim().length > 10
      ? car.image
      : "/assets/no-car.png"
  }
                alt={car.make}
                onError={(e) => (e.currentTarget.src = "/assets/no-car.png")}
              />
            </div>

            <div className="car-info">
              <h2>{car.make} {car.model}</h2>
              <p className="provider">{car.provider} • {car.car_type}</p>

              <div className="price-row">
                <span className="price">₹{car.price_per_day}</span>
                <span className="per-day">/day</span>
              </div>

              <button
                className="details-btn"
                onClick={() => router.push(`/car/${car.id}`)}
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

     
      <div className="pagination">
        <button
          className="page-btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ← Previous
        </button>

        <button
          className="page-btn"
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
