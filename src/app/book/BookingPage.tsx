"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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

export default function BookingPage() {
  const params = useSearchParams();
  const car_id = params.get("car_id");

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://car-rental-backend-kc40.onrender.com";


  useEffect(() => {
    if (!car_id) return;

    async function fetchCar() {
     const res = await fetch(`${API_BASE}/car/${car_id}`);

      const data = await res.json();
      setCar(data);
      setLoading(false);
    }

    fetchCar();
  }, [car_id]);

  if (loading) return <h2 style={{ padding: 40 }}>Loading booking...</h2>;
  if (!car) return <h2 style={{ padding: 40 }}>Car not found</h2>;

  if (confirmed) {
    return (
      <div style={{ padding: 40, textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
        <div style={{
          background: "#eef9f4",
          padding: 40,
          borderRadius: 20,
          boxShadow: "0 6px 20px rgba(15, 143, 98, 0.15)"
        }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
          <h1 style={{ color: "#0f8f62", marginBottom: 10 }}>Booking Confirmed!</h1>
          <p style={{ fontSize: 18, color: "#555", marginTop: 20 }}>
            Thank you <strong>{name}</strong> for booking the{" "}
            <strong>
              {car.make} {car.model}
            </strong>
          </p>
          <p style={{ color: "#666", marginTop: 15 }}>
            We'll contact you at <strong>{phone}</strong> to confirm the details.
          </p>

          <button
            onClick={() => (window.location.href = "/")}
            style={{
              marginTop: 30,
              padding: "14px 30px",
              borderRadius: 10,
              background: "#0f8f62",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(15, 143, 98, 0.3)",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, maxWidth: 700, margin: "0 auto" }}>
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
        ← Back
      </button>

      
      <div
        style={{
          padding: 20,
          borderRadius: 15,
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          background: "#fff",
          marginBottom: 30,
        }}
      >
        <img
          src={car.image || "/assets/no-car.png"}
          onError={(e) => (e.currentTarget.src = "/assets/no-car.png")}
          style={{ width: "100%", maxHeight: 220, objectFit: "contain" }}
        />
        <h2>
          {car.make} {car.model}
        </h2>
        <p style={{ color: "#555" }}>{car.provider} • {car.car_type}</p>
        <h3 style={{ color: "#0f8f62" }}>
          ₹{car.price_per_day} <span style={{ fontSize: 14 }}>/day</span>
        </h3>
      </div>

     
      <div
        style={{
          padding: 20,
          background: "#fff",
          borderRadius: 15,
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Booking Details</h2>

        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <label>Phone Number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={() => {
            if (!name || !phone) {
              alert("Please fill all details");
              return;
            }
            setConfirmed(true);
          }}
          style={{
            width: "100%",
            padding: "15px 0",
            marginTop: 20,
            borderRadius: 12,
            background: "#0f8f62",
            color: "white",
            border: "none",
            fontSize: 18,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0 20px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
};