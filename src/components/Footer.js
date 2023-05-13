import { Link } from "react-router-dom";
import React from "react";
import styles from "../styles/Footer.module.css";
import { useSelector } from "react-redux";
import mastercard from "../assets/images/master-card.png";
import americanexpress from "../assets/images/american-express.png";
import visa from "../assets/images/visa.png";
import upi from "../assets/images/upi.png";

function Footer() {
  const appConfig = useSelector((state) => state.app_config);

  return (
    <footer id="contact">
      <div className="container">
        <div className="row no-gutters">
          <div className="col-lg-3">
            <div className={styles.footerLogo}>
              <img
                src={appConfig.data.app_logo_round}
                alt="manikya"
                width="40%"
              />
            </div>
          </div>
          <div className="col-lg-3">
            <h4 className={styles.title}>Polices</h4>
            <ul className={styles.links}>
              <li>
                <Link to="/refundpolicy" className={styles.footerLink}>
                  Refund Policy{" "}
                </Link>
              </li>
              <li>
                <Link to="/termsandcondition" className={styles.footerLink}>
                  Terms & Conditions{" "}
                </Link>
              </li>
              <li>
                <Link to="/privacypolicy" className={styles.footerLink}>
                  Privacy Policy{" "}
                </Link>
              </li>
              <li>
                <Link to="/shipingpolicy" className={styles.footerLink}>
                  Shipping Policy{" "}
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3">
            <h4 className={styles.title}>Informations</h4>
            <ul className={styles.links}>
              <li>
                <Link to="/" className={styles.footerLink}>
                  About Us{" "}
                </Link>
              </li>
              <li>
                <Link to="/" className={styles.footerLink}>
                  Contact Us{" "}
                </Link>
              </li>
            </ul>
            <div style={{ marginBottom: 20 }}>
              <h4 className={styles.title}>We Accept</h4>
              <div className="d-flex align-items-center">
                <img
                  src={mastercard}
                  alt=""
                  style={{
                    width: 40,
                    height: 25,
                    objectFit: "contain",
                    marginRight: 10,
                  }}
                />
                <img
                  src={americanexpress}
                  alt=""
                  style={{
                    width: 40,
                    height: 25,
                    objectFit: "contain",
                    marginRight: 10,
                  }}
                />
                <img
                  src={visa}
                  alt=""
                  style={{
                    width: 40,
                    height: 25,
                    objectFit: "contain",
                    marginRight: 10,
                  }}
                />
                <img
                  src={upi}
                  alt=""
                  style={{
                    width: 40,
                    height: 25,
                    objectFit: "contain",
                    marginRight: 10,
                  }}
                />
              </div>
            </div>
          </div>
          {/* <div className='col-lg-3'>
                        <h4 className={styles.title}>Customer Care</h4>
                        <ul className={styles.links}>
                            <li><Link to='/' className={styles.footerLink}>Track your Order </Link></li>
                            <li><Link to='/' className={styles.footerLink}>Customer Service </Link></li>
                            <li><Link to='/' className={styles.footerLink}>News & Events </Link></li>
                            <li><Link to='/' className={styles.footerLink}>FAQs </Link></li>
                        </ul>
                    </div> */}
          <div className="col-lg-3">
            <h4 className={styles.title}>Contact Us</h4>
            <p>Call us 24/7</p>
            <h2 className={styles.phone}>
              (+91) {appConfig.data.contact_data.phone ?? ""}
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#fff",
              }}
            >
              {appConfig.data.contact_data.address},<br />
              <a href={`mailto:${appConfig.data.contact_data.personal_email}`}>
                {appConfig.data.contact_data.personal_email}
              </a>
            </p>
            {/* <ul>
                        <li>Track your Order</li>
                        <li>Customer Service</li>
                        <li>News & Events</li>
                        <li>FAQs</li>
                    </ul> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
