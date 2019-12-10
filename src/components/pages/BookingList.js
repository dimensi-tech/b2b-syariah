import React, { Component } from "react";
import "../../assets/css/packages/tabs.scss";
import "../../assets/css/booking_list.scss";

class BookingList extends Component {
  render() {
    return (
      <div className="container margin_60">
        <div className="row">
          <div className="col-12 add_bottom_15">
            <section id="section-1">
              <div id="tools">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-6">
                    <div className="styled-select-filters">
                      <select name="sort_type" id="sort_type">
                        <option value selected>Sort by type</option>
                        <option value="tours">Tours</option>
                        <option value="hotels">Hotels</option>
                        <option value="transfers">Transfers</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-6">
                    <div className="styled-select-filters">
                      <select name="sort_date" id="sort_date">
                        <option value selected>Sort by date</option>
                        <option value="oldest">Oldest</option>
                        <option value="recent">Recent</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="strip_booking">
                <div className="row">
                  <div className="col-lg-2 col-md-2">
                    <div className="date">
                      <span className="month">Dec</span>
                      <span className="day"><strong>23</strong>2019</span>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-5">
                    <h3 className="tours_booking">HAJI<span>Gold</span></h3>
                  </div>
                  <div className="col-lg-3 col-md-3">
                    <ul className="info_booking">
                      <li><strong>ID Pesanan</strong> 23442</li>
                      <li><strong>Status Pesanan</strong>Menunggu Pembayaran</li>
                    </ul>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="booking_buttons">
                      <a href="#0" className="btn_full_outline">Lihat detail pesanan</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="strip_booking">
                <div className="row">
                  <div className="col-lg-2 col-md-2">
                    <div className="date">
                      <span className="month">Dec</span>
                      <span className="day"><strong>27</strong>2019</span>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-5">
                    <h3 className="tours_booking">TURKI<span>TURKI EXPRESS TOUR</span></h3>
                  </div>
                  <div className="col-lg-3 col-md-3">
                    <ul className="info_booking">
                      <li><strong>ID Pesanan</strong> 23442</li>
                      <li><strong>Status Pesanan</strong>Menunggu Pembayaran</li>
                    </ul>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="booking_buttons">
                      <a href="#0" className="btn_full_outline">Lihat detail pesanan</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="strip_booking">
                <div className="row">
                  <div className="col-lg-2 col-md-2">
                    <div className="date">
                      <span className="month">Dec</span>
                      <span className="day"><strong>28</strong>2019</span>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-5">
                    <h3 className="tours_booking">Tour Eiffel<span>TURKI EXPRESS TOUR</span></h3>
                  </div>
                  <div className="col-lg-3 col-md-3">
                    <ul className="info_booking">
                      <li><strong>ID Pesanan</strong> 23442</li>
                      <li><strong>Status Pesanan</strong>Menunggu Pembayaran</li>
                    </ul>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="booking_buttons">
                      <a href="#0" className="btn_full_outline">Lihat detail pesanan</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="strip_booking">
                <div className="row">
                  <div className="col-lg-2 col-md-2">
                    <div className="date">
                      <span className="month">Dec</span>
                      <span className="day"><strong>30</strong>2019</span>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-5">
                    <h3 className="tours_booking">Orly Airport<span>TURKI EXPRESS TOUR</span></h3>
                  </div>
                  <div className="col-lg-3 col-md-3">
                    <ul className="info_booking">
                      <li><strong>ID Pesanan</strong> 23442</li>
                      <li><strong>Status Pesanan</strong>Menunggu Pembayaran</li>
                    </ul>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="booking_buttons">
                      <a href="#0" className="btn_full_outline" style={{fontSize: 9}}>Lihat detail pesanan</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingList;