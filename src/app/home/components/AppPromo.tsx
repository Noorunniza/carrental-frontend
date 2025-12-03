import React from "react";
import Image from "next/image";
import "./AppPromo.css";

/* -------------------------------
   TYPE DEFINITIONS (Optional now)
-------------------------------- */
interface AppPromoProps {}

/* -------------------------------
   FUNCTIONAL COMPONENT (TSX)
-------------------------------- */
const AppPromo: React.FC<AppPromoProps> = () => {
  return (
    <div className="app-promo">
      
      {/* LEFT PHONES */}
      <div className="phones-wrapper">
        
        {/* Phone 1 */}
        <Image
          src="/assets/ph1.png"
          alt="phone1"
          width={248.49}
          height={501.06}
          className="phone phone1"
        />

        {/* Phone 2 */}
        <Image
          src="/assets/ph2.png"
          alt="phone2"
          width={248.47}
          height={501.06}
          className="phone phone2"
        />

      </div>

      {/* RIGHT TEXT */}
      <div className="promo-text">
        <h2>Get the app now</h2>

        <p>
          Find and book amazing rental deals anytime, anywhere, <br />
          with the Rent80 app. Try it today!
        </p>

        <button className="install-btn">Install now</button>
      </div>
    </div>
  );
};

export default AppPromo;
