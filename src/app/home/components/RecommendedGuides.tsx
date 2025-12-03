import React from "react";
import Image from "next/image";
import "./RecommendedGuides.css";

/* -----------------------------
   Optional Type Definitions
------------------------------ */
interface RecommendedGuidesProps {}

/* -----------------------------
   Component (TSX)
------------------------------ */
const RecommendedGuides: React.FC<RecommendedGuidesProps> = () => {
  return (
    <div className="guides-section">

      <h2 className="guides-title">Recommended Travel Guides</h2>

      <p className="guides-sub">
        Car rentals have surged in popularity for their affordability and convenience,
        offering options
      </p>

      <p className="guides-sub1">
        from luxury to practical rides. Before you book, here are key tips
        to keep in mind.
      </p>

      <div className="guides-grid">

        {/* Row 1 — Four Cards */}
        <div className="guide-card">
          <Image src="/assets/guide1.png" width={280} height={158} alt="guide1" />
          <h3>Rental Company's Contact Information</h3>
          <p>
            Always have the rental company phone number handy. Most offer 24/7
            support for emergencies or questions.
          </p>
        </div>

        <div className="guide-card">
          <Image src="/assets/guide2.png" width={280} height={158} alt="guide2" />
          <h3>Fuel Up Before Returning</h3>
          <p>
            Make sure to fill the gas tank before returning the car to avoid
            additional refueling and service fees.
          </p>
        </div>

        <div className="guide-card">
          <Image src="/assets/guide3.png" width={280} height={158} alt="guide3" />
          <h3>Choose the Right Fuel Type</h3>
          <p>
            In some countries, diesel engines are more cost-efficient than gasoline.
            Check fuel types when selecting your car.
          </p>
        </div>

        <div className="guide-card">
          <Image src="/assets/guide4.png" width={280} height={158} alt="guide4" />
          <h3>Return the Car on Time</h3>
          <p>
            Late returns can result in added fees. Plan for extra buffer time,
            especially in unfamiliar areas.
          </p>
        </div>

        {/* Row 2 — Two Cards */}
        <div className="guide-card">
          <Image src="/assets/guide5.png" width={280} height={158} alt="guide5" />
          <h3>Inspect the Vehicle Before Departure</h3>
          <p>
            Before you drive off, check the car for any pre-existing damage and
            ensure everything is in working order.
          </p>
        </div>

        <div className="guide-card">
          <Image src="/assets/guide6.png" width={280} height={158} alt="guide6" />
          <h3>Adapt to Driving Conditions</h3>
          <p>
            Adjust your driving and car selection to match the terrain and weather.
            When in doubt, ask the rental company.
          </p>
        </div>

        {/* Advertisement Card */}
        <div className="advert-card">
          <Image
            src="/assets/advertisment.png"
            width={584}
            height={262}
            alt="advertisement"
            className="advert-img"
          />
        </div>

      </div>
    </div>
  );
};

export default RecommendedGuides;
