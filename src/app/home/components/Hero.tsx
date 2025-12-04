"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import { DatePicker } from "./DatePicker";
import { useRouter } from "next/navigation";   

interface LocationItem {
  title: string;
  subtitle: string;
  code: string;
  icon: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://car-rental-backend-kc40.onrender.com";



const useDebounce = (value: string, delay = 250) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
};

const Hero: React.FC = () => {

  const router = useRouter();   

  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const deb = useDebounce(location);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

 
  useEffect(() => {
    if (!deb) {
      setSuggestions([]);
      return;
    }

    let cancel = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/locations?q=${encodeURIComponent(deb)}&limit=10`);
        const data = await res.json();

        if (!cancel) {
          setSuggestions(data);
          setShowSuggestions(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    load();
    return () => { cancel = true; };
  }, [deb]);

 
  const selectLocation = (title: string) => {
    setLocation(title);
    setShowSuggestions(false);
  };


  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !boxRef.current?.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  
  const handleKey = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      selectLocation(suggestions[activeIndex].title);
    }
  };

  
  const formatDate = (d: Date | null) => {
    if (!d) return "";
    const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${m[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  
  const handleSearch = () => {
    if (!location) return alert("Please enter a pickup location.");
    if (!pickupDate) return alert("Please select pickup date.");
    if (!returnDate) return alert("Please select return date.");

    router.push(
      `/results?q=${encodeURIComponent(location)}&pickup=${pickupDate.toISOString()}&return=${returnDate.toISOString()}`
    );
  };

  return (
    <div className="page">

     
      <div className="left-area">

        
        <div className="logo-row">
          <div className="car-icon-box">
            <Image src="/assets/cariconfrontpage.jpg" width={36} height={36} alt="logo" />
          </div>
          <div className="logo-text">
            <span className="logo-bold">Airport</span>
            <span className="logo-light">Rental Cars</span>
          </div>
        </div>

       
        <div className="form-card">
          <h1 className="title">
            Quick car hire,<br/>No delays
          </h1>

        
          <div className="input-box" style={{ position: "relative" }}>
            <Image src="/assets/location.png" width={18} height={18} alt="loc" />
            
            <input
              ref={inputRef}
              value={location}
              placeholder="Enter pick up location"
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKey}
              onFocus={() => location && setShowSuggestions(true)}
            />

       
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestion-box" ref={boxRef}>
                {loading && <div className="loading">Loading...</div>}

                {!loading && suggestions.map((item, i) => (
                  <div
                    key={i}
                    className={`suggestion-row ${i === activeIndex ? "active" : ""}`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectLocation(item.title);
                    }}
                  >
                    <div className="left-col">
                      <div className="icon-container">
                        {(item.icon === "airport" || item.icon === "default") && (
                          <Image src="/assets/plane.png" width={24} height={24} alt="plane" />
                        )}
                        {item.icon === "city" && (
                          <Image src="/assets/location2.png" width={24} height={24} alt="city" />
                        )}
                      </div>
                      <div className="txt">
                        <div className="row-title">{item.title}</div>
                        <div className="row-subtitle">{item.subtitle}</div>
                      </div>
                    </div>

                    <div className="right-code">{item.code}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

        
          <div className="dropoff-wrapper">
            <div className="dropoff-line" />
            <div className="dropoff-row">
              <Image src="/assets/plus-circle.jpg" width={20} height={20} alt="plus" />
              <span>Add Different Drop Off</span>
            </div>
          </div>

        
          <div className="date-row">
            <div className="date-item" onClick={() => setShowDatePicker(true)}>
              <Image src="/assets/pickup.png" width={20} height={20} alt="pickup" />
              <span>{pickupDate ? formatDate(pickupDate) : "Pickup"}</span>
            </div>

            <div className="date-item" onClick={() => setShowDatePicker(true)}>
              <Image src="/assets/pickup.png" width={20} height={20} alt="return" />
              <span>{returnDate ? formatDate(returnDate) : "Return"}</span>
            </div>
          </div>

        
          <div className="alert-row">
            <Image src="/assets/vector.png" width={16} height={16} alt="check" />
            <span>Alert me when price drops</span>
          </div>

          
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

     
      <div className="right-area">
        <Image src="/assets/subtract.png" width={550} height={550} className="road" alt="road" />
        <Image src="/assets/phimage.png" width={520} height={620} className="phone" alt="phone" />
      </div>

     
      <div className="lang-btn">
        <Image src="/assets/lang.png" width={70} height={35} alt="lang" />
      </div>

     
      {showDatePicker && (
        <DatePicker
          onClose={() => setShowDatePicker(false)}
          onSelectPickup={(d) => setPickupDate(d)}
          onSelectReturn={(d) => setReturnDate(d)}
        />
      )}
    </div>
  );
};

export default Hero;
