import React from "react";
import Image from "next/image";
import "./Footer.css";

/* ----------------------------
   Type definitions (optional)
----------------------------- */
interface FooterProps {}

/* ----------------------------
   Component (TSX)
----------------------------- */
const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="footer">

      {/* ▬▬▬ TOP SUBSCRIBE BAR ▬▬▬ */}
      <div className="footer-top">

        {/* LEFT TEXT */}
        <div className="ft-left">
          <h3>Be the first one to know when the price drops</h3>
          <p>Unsubscribe any time</p>
        </div>

        {/* RIGHT EMAIL INPUT */}
        <div className="ft-right">
          <input type="text" placeholder="Enter your mail" />
          <button className="join-btn">Join</button>
        </div>

      </div>

      <hr className="footer-line" />

      {/* ▬▬▬ BOTTOM SECTION ▬▬▬ */}
      <div className="footer-bottom">

        {/* LEFT SIDE: LOGO + CURRENCY */}
        <div className="fb-left">
          <div className="fb-logo">
            <Image 
              src="/assets/cariconfrontpage.jpg" 
              width={36} 
              height={36} 
              alt="logo" 
            />
            <div>
              <span className="fb-airport">Airport</span>
              <span className="fb-rental">Rental Cars</span>
            </div>
          </div>

          <select className="currency-select">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="EUR">INR</option>

          </select>
  
        </div>

        {/* RIGHT SIDE (links + copyright + icons) */}
        <div className="fb-right">

          {/* LINKS */}
          <div className="fb-links">
            <a>Privacy policy</a>
            <a>Terms & conditions</a>
            <a>Cookies policy</a>
            <a>About us</a>
            <a>Contact</a>
          </div>

          {/* COPYRIGHT + SOCIAL (same row) */}
          <div className="copy-social-row">
            <p className="copyright">
              © Copyright 2025 – Airport rental car
            </p>

            <div className="fb-social">
              <Image src="/assets/facebook.png" width={20} height={20} alt="Facebook" />
              <Image src="/assets/twitter.png" width={20} height={20} alt="Twitter" />
              <Image src="/assets/instagram.png" width={20} height={20} alt="Instagram" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Footer;
