import React from "react";
import Image from "next/image";
import "./BrandStrip.css";

/* ------------------------------------
   Types (optional, but good practice)
------------------------------------- */
interface BrandStripProps {}

/* ------------------------------------
   Component
------------------------------------- */
const BrandStrip: React.FC<BrandStripProps> = () => {
  return (
    <div className="brand-strip">
      <Image
        src="/assets/avis_car_rental_logo.svg.png"
        width={70.38}
        height={23}
        alt="Avis"
      />

      <Image
        src="/assets/national_car_rental_logo.svg.png"
        width={113.69}
        height={23}
        alt="National"
      />

      <Image
        src="/assets/budget_car_rental_logo.svg.png"
        width={101.05}
        height={23}
        alt="Budget"
      />

      <Image
        src="/assets/alamocom_logo.svg.png"
        width={46.73}
        height={23}
        alt="Alamo"
      />

      <Image
        src="/assets/enterprise_rent-a-car_logo.svg.png"
        width={102.86}
        height={23}
        alt="Enterprise"
      />

      <Image
        src="/assets/sixt_group_logo.svg.png"
        width={53.57}
        height={23}
        alt="Sixt"
      />

      <Image
        src="/assets/hertz_logo.svg.png"
        width={60.4}
        height={23}
        alt="Hertz"
      />

      <Image
        src="/assets/europcar_logo.svg.png"
        width={61.54}
        height={23}
        alt="Europcar"
      />
    </div>
  );
};

export default BrandStrip;
