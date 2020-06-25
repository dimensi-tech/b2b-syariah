import React, { Component } from "react";
import "../../assets/css/packages/tabs.scss";
import "../../assets/css/booking_list.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GET_BOOKING_LIST_REQUEST } from "../../helpers/constant";
import Authorization from "../../helpers/Authorization";
import moment from "moment";
import Swal from "sweetalert2";
import Axios from "axios";
import { withTranslation } from "react-i18next";

const BASE_URL = process.env.REACT_APP_STATIC_FILE_URL;
const API_URL = process.env.REACT_APP_API_V1_URL;

class BookingList extends Component {
  componentDidMount() {
    this._getData();
  };

  _getData = (id) => {
    const { dispatch } = this.props;
    const token = Authorization().getAuthUser();
    dispatch({
      type: GET_BOOKING_LIST_REQUEST,
      config: {
        method: "get",
        headers: {
          "Authorization": token
        }
      },
      path: "/bookings/list_bookings"
    });
  };

  _cancelBooking = (id) => {
    const token = Authorization().getAuthUser();
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: "Cancel booking",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#f44336',
      confirmButtonText: 'Yes, cancel!'
    }).then((result) => {
      if (result.value) {
        Axios.post(`${API_URL}/bookings/cancel_booking?booking_id=${id}`, {}, {
          headers: {
            "Authorization": token
          }
        }).then(res => {
          this._getData();
          Swal.fire(
            'Cancelled!',
            'Order kamu telah dicancel',
            'success'
          )
        })
      }
    })
  }

  render() {
    const { data } = this.props.bookingList;
    const { t } = this.props;
    return (
      <div className="container margin_60">
        <div className="row">
          <div className="col-12 add_bottom_15">
            <section id="section-1">
              {/* <div id="tools">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-6">
                    <div className="styled-select-filters">
                      <select name="sort_type" id="sort_type">
                        <option value="">Sort by type</option>
                        <option value="tours">Tours</option>
                        <option value="hotels">Hotels</option>
                        <option value="transfers">Transfers</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-6">
                    <div className="styled-select-filters">
                      <select name="sort_date" id="sort_date">
                        <option value="">Sort by date</option>
                        <option value="oldest">Oldest</option>
                        <option value="recent">Recent</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div> */}
              {data.length === 0 && <div>Loading..</div>}
              {data.success === false && <div>Data not found!</div>}
              {
                data.length > 0 &&
                data.map((value, index) => (
                  <div key={index} className="strip_booking">
                    <div className="row">
                      <div className="col-lg-2 col-md-2">
                        <div className="date">
                          <span className="month">{moment(value.departure_date).format("MMM")}</span>
                          <span className="day">
                            <strong>{moment(value.departure_date).format("DD")}</strong>
                            {moment(value.departure_date).format("YYYY")}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <img src={BASE_URL + value.product.image.url} alt={value.product.name} width="100%" />
                      </div>
                      <div className="col-md-3">
                        <h3 className="tours_booking">
                          {value.product.name}
                          <span>{value.package.name}</span>
                        </h3>
                      </div>
                      <div className="col-md-3">
                        <ul className="info_booking">
                          <li>
                            <strong>{t("booking_list.order_id")}</strong>
                            <p>{value.id}</p>
                          </li>
                          <li>
                            <strong>{t("booking_list.order_status")}</strong>
                            <p>{value.booking_status}</p>
                          </li>
                          <li>
                            <h4>RP {parseFloat(value.price).toLocaleString("id")}</h4>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-2 col-md-2">
                        <div className="booking_buttons">
                          <Link to={`booking/${value.id}`} target="_blank" className="btn_1">
                            {t("booking_list.see_detail_order")}
                          </Link>
                          {value.booking_status !== "cancelled" &&
                            <Link to={`booking/${value.id}/modify`} target="_blank" className="btn_1 white">
                              {t("booking_list.reschedule")}
                            </Link>
                          }
                          {value.booking_status !== "cancelled" &&
                            <a href="#!" onClick={() => this._cancelBooking(value.id)} className="btn_1 red">
                              {t("booking_list.cancel_booking")}
                            </a>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(
  connect(
    state => ({
      bookingList: state.bookingList
    })
  )(BookingList)
);