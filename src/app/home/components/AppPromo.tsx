import React from "react";
import Image from "next/image";
import "./AppPromo.css";


interface AppPromoProps {}


const AppPromo: React.FC<AppPromoProps> = () => {
  return (
    <div className="app-promo">
      
    
      <div className="phones-wrapper">
        
       
        <Image
          src="/assets/ph1.png"
          alt="phone1"
          width={248.49}
          height={501.06}
          className="phone phone1"
        />

       
        <Image
          src="/assets/ph2.png"
          alt="phone2"
          width={248.47}
          height={501.06}
          className="phone phone2"
        />

      </div>

     
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
