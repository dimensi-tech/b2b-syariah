import React from "react";
import Logo from "../../assets/img/Logo.png";

function Footer() {
  return (
    <footer id="footer_3" className="revealed">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <p>
              <img src={Logo} width={160} alt="Majreha" data-retina="complete" id="logo" />
            </p>
            <p>Kami adalah penyedia jasa Tour & Travel yang memberikan pelayanan dalam bidang paket Islamic Tour, kami memberikan harga yang murah dengan tetap memberikan kualitas terbaik.</p>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <h3>Destinasi Terpopuler</h3>
            <ul>
              <li>
                <a href="#">Mekkah</a>
              </li>
              <li>
                <a href="#">Turki</a>
              </li>
              <li>
                <a href="#">Arab Saudi</a>
              </li>
              <li>
                <a href="#">Madinah</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <h3>Discover</h3>
            <ul>
              <li>
                <a href="#">Berita</a>
              </li>
              <li>
                <a href="#">Kontak</a>
              </li>
              <li>
                <a href="#">Wishlist</a>
              </li>
              <li>
                <a href="#">Terms and condition</a>
              </li>
            </ul>
          </div>
          {/* <div className="col-lg-2 col-md-4 col-sm-12">
            <h3>Settings</h3>
            <div className="styled-select">
              <select name="lang" id="lang">
                <option value="English" selected>English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
                <option value="Russian">Russian</option>
              </select>
            </div>
            <div className="styled-select">
              <select name="currency" id="currency">
                <option value="USD" selected>USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="RUB">RUB</option>
              </select>
            </div>
          </div> */}
        </div>
        <div className="row">
          <div className="col-md-12">
            <div id="social_footer">
              <ul>
                <li><a href="#"><i className="icon-facebook" /></a>
                </li>
                <li><a href="#"><i className="icon-twitter" /></a>
                </li>
                <li><a href="#"><i className="icon-google" /></a>
                </li>
                <li><a href="#"><i className="icon-instagram" /></a>
                </li>
                <li><a href="#"><i className="icon-pinterest" /></a>
                </li>
                <li><a href="#"><i className="icon-vimeo" /></a>
                </li>
                <li><a href="#"><i className="icon-youtube-play" /></a>
                </li>
              </ul>
              <p>© Majreha 2020</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;