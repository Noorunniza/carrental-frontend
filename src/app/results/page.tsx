"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  // Filters
  const [carType, setCarType] = useState("All");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  // Sorting
  const [sort, setSort] = useState("none");

  // Pagination
  const [page, setPage] = useState(1);
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://car-rental-backend-kc40.onrender.com";
  useEffect(() => {
    async function fetchCars() {
     const url = new URL(`${API_BASE}/search`);



      url.searchParams.append("q", q);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("per_page", "6");

      // ⭐ Include pickup + return so backend can use them
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

    fetchCars();
  }, [q, carType, priceMin, priceMax, sort, page, pickup, ret]);

  if (loading) return <h2 style={{ padding: 40 }}>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        style={{
          background: "#eef9f4",
          border: "1px solid #0f8f62",
          padding: "10px 20px",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "25px",
        }}
      >
        ← Modify search
      </button>

      <h1 style={{ marginBottom: "10px" }}>Available cars</h1>

      <p style={{ color: "#666", marginBottom: "5px" }}>
        Pickup location: <strong>{q}</strong>
      </p>

      {/* ⭐ Added dates under the location */}
      <p style={{ color: "#666", marginBottom: "30px" }}>
        {pickup && (
          <>
            Pickup: <strong>{new Date(pickup).toDateString()}</strong>
          </>
        )}
        <br />
        {ret && (
          <>
            Return: <strong>{new Date(ret).toDateString()}</strong>
          </>
        )}
      </p>

      {/* FILTERS + SORT */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "16px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          marginBottom: "35px",
          flexWrap: "wrap",
        }}
      >
        {/* Car Type */}
        <div>
          <label style={{ fontSize: 14 }}>Car Type</label>
          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            style={{
              width: 160,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "#fafafa",
            }}
          >
            <option>All</option>
            <option>Economy</option>
            <option>Compact</option>
            <option>Special</option>
            <option>SUV</option>
            <option>Luxury</option>
          </select>
        </div>

        {/* Price Min */}
        <div>
          <label style={{ fontSize: 14 }}>Min Price</label>
          <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            placeholder="Min"
            style={{
              width: 120,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "#fafafa",
            }}
          />
        </div>

        {/* Price Max */}
        <div>
          <label style={{ fontSize: 14 }}>Max Price</label>
          <input
            value={priceMax}
            type="number"
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder="Max"
            style={{
              width: 120,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "#fafafa",
            }}
          />
        </div>

        {/* Clear Button */}
        <button
          onClick={() => {
            setCarType("All");
            setPriceMin("");
            setPriceMax("");
            setSort("none");
            setPage(1);
          }}
          style={{
            background: "#ff4d67",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            marginLeft: "auto",
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* RESULTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "35px",
        }}
      >
        {cars.map((car) => (
          <div
            key={car.id}
            style={{
              background: "#fff",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              transition: "0.2s",
            }}
          >
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
  style={{
    width: "100%",
    height: "200px",
    objectFit: "contain",
    background: "#f9f9f9",
  }}
/>


            <div style={{ padding: "18px" }}>
              <h3 style={{ marginBottom: 6 }}>
                {car.make} {car.model}
              </h3>

              <p style={{ margin: 0, color: "#777" }}>
                {car.provider} • {car.car_type || "Unspecified"}
              </p>

              <h2 style={{ color: "#0f8f62", marginTop: 12 }}>
                ₹{car.price_per_day} <span style={{ fontSize: 14 }}>/day</span>
              </h2>

              <button
                onClick={() => router.push(`/car/${car.id}`)}
                style={{
                  marginTop: 15,
                  width: "100%",
                  padding: "12px 0",
                  borderRadius: "12px",
                  background: "#0f8f62",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                View details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            cursor: page === 1 ? "not-allowed" : "pointer",
            background: "#fff",
          }}
        >
          ← Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
