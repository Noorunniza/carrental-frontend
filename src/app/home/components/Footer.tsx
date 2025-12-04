import React from "react";
import Image from "next/image";
import "./Footer.css";


interface FooterProps {}


const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="footer">

     
      <div className="footer-top">

        
        <div className="ft-left">
          <h3>Be the first one to know when the price drops</h3>
          <p>Unsubscribe any time</p>
        </div>

       
        <div className="ft-right">
          <input type="text" placeholder="Enter your mail" />
          <button className="join-btn">Join</button>
        </div>

      </div>

      <hr className="footer-line" />

     
      <div className="footer-bottom">

     
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

       
        <div className="fb-right">

         
          <div className="fb-links">
            <a>Privacy policy</a>
            <a>Terms & conditions</a>
            <a>Cookies policy</a>
            <a>About us</a>
            <a>Contact</a>
          </div>

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
