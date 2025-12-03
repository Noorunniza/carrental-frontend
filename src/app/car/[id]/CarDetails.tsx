"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Car {
  id: number;
  make: string;
  model: string;
  price_per_day: number;
  image: string;
  provider: string;
  location: string;
  car_type?: string;
  seats?: number;
  transmission?: string;
  fuel_type?: string;
}

export default function CarDetails() {
  const { id } = useParams(); // ⭐ FIXED — correct Next.js way
  const router = useRouter();

  

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://car-rental-backend-kc40.onrender.com";

  useEffect(() => {
    if (!id) return; // wait until id exists

    async function fetchCar() {
      try {
       const res = await fetch(`${API_BASE}/car/${id}`);

        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error("Error fetching car:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCar();
  }, [id]);

  if (loading) return <h2 style={{ padding: 40 }}>Loading...</h2>;
  if (!car) return <h2 style={{ padding: 40 }}>Car not found</h2>;

  return (
    <div style={{ padding: "40px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* BACK BUTTON */}
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
        ← Back to results
      </button>

      {/* IMAGE */}
      <div
        style={{
          width: "100%",
          height: "350px",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#f5f5f5",
          marginBottom: "30px",
        }}
      >
        <img
          src={car.image || "/assets/no-car.png"}
          onError={(e) => (e.currentTarget.src = "/assets/no-car.png")}
          alt={car.make}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* CAR INFO */}
      <h1>
        {car.make} {car.model}
      </h1>

      <p style={{ color: "#777" }}>
        {car.provider} • {car.car_type}
      </p>

      <h2 style={{ color: "#0f8f62", marginTop: "15px" }}>
        ₹{car.price_per_day} <span style={{ fontSize: 16 }}>/day</span>
      </h2>

      {/* FEATURES */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Feature label="Seats" value={car.seats || "N/A"} />
        <Feature label="Transmission" value={car.transmission || "N/A"} />
        <Feature label="Fuel" value={car.fuel_type || "N/A"} />
        <Feature label="Pickup Location" value={car.location} />
      </div>

      {/* BOOK BUTTON */}
     <button
  onClick={() => router.push(`/book?car_id=${id}`)}
  style={{
    marginTop: "40px",
    width: "100%",
    padding: "15px 0",
    borderRadius: "12px",
    background: "#0f8f62",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: 600,
  }}
>
  Book Now
</button>

    </div>
  );
}

function Feature({ label, value }: { label: string; value: any }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "15px 20px",
        borderRadius: "14px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        minWidth: "200px",
      }}
    >
      <strong>{label}:</strong> {value}
    </div>
  );
}
