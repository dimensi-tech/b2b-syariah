import React, { Component, Fragment } from "react";
import "../../assets/css/booking_details.scss";
import "../../assets/css/booking_modify.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GET_BOOKING_DETAILS_REQUEST, ID_MONTH } from "../../helpers/constant";
import Authorization from "../../helpers/Authorization";
import Preloader from "../static/Preloader";
import Axios from "axios";
import moment from "moment";
import { withTranslation } from "react-i18next";

const API_URL = process.env.REACT_APP_API_V1_URL;
const TOKEN = Authorization().getAuthUser();

class BookingModify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      departure_date: ''
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const id = this.props.match.params.product_id;
    const { data } = this.props.bookingDetails;
    if (Object.keys(data).length === 0 || Object.keys(data).includes("message") || id !== data.id) {
      this._getData(id);
    }
  };

  _getData = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: GET_BOOKING_DETAILS_REQUEST,
      config: {
        method: "get",
        headers: {
          "Authorization": TOKEN
        }
      },
      path: "/booking/" + id
    });
  };

  _onChange = (e) => {
    this.setState({
      departure_date: e.target.value
    })
  };

  _submitModify = () => {
    const { params } = this.props.match;
    const { departure_date } = this.state;
    if (departure_date) {
      Axios.post(`${API_URL}/bookings/modify_booking`, {
        booking_id: params.product_id,
        departure_date: departure_date
      }, {
        headers: {
          Authorization: TOKEN
        }
      }).then(res =>
        this.props.history.push(`/booking/${res.data.id}`)
      )
    } else {
      alert('Silahkan coba lagi');
    }
  };

  render() {
    const { data } = this.props.bookingDetails;
    const { departure_date } = this.state;
    const { t } = this.props;
    if (!Object.keys(data).length) {
      return <Preloader />
    } else {
      if (data.success === false) {
        return <div>Product not found</div>
      } else {
        return (
          <Fragment>
            <div className="container margin_60">
              <div className="row">
                <div className="col-12">
                  <Link className="back-link" to={`/booking/${data.id}`}>
                    <i className="icon-left-open" />
                    {t("booking_modify.back_url")}
                  </Link>
                </div>
                <div className="col-12 add_bottom_15">
                  <div className="form_title">
                    <h3>
                      <strong>
                        <i className="icon-bookmark" />
                      </strong>
                      {t("booking_modify.title")}
                    </h3>
                    <p>
                      {t("booking_modify.title_description")}
                    </p>
                  </div>
                  <div className="step">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className='strip_all_tour_list'>
                          <div className='row'>
                            <div className='col-md-12'>
                              <div className='tour_list_desc'>
                                <span>{t("booking_modify.current_departure_date")}</span>
                                <select name="departure_date" className="form-control" disabled={true}>
                                  <option>{dateFormatter(data.departure_date)}</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className='strip_all_tour_list'>
                          <div className='row'>
                            <div className='col-md-12'>
                              <div className='tour_list_desc'>
                                <span>{t("booking_modify.departure_date")}</span>
                                <select name="departure_date" value={departure_date} onChange={this._onChange} className="form-control">
                                  <option value="">{t("booking_modify.select_date")}</option>
                                  {
                                    data &&
                                    data.package.available_date.map((value, i) => (
                                      <option
                                        value={moment(value).format('YYYY-MM-DD')}
                                        key={i}
                                      >
                                        {dateFormatter(moment(value).format('YYYY-MM-DD'))}
                                      </option>
                                    ))
                                  }
                                </select>
                                {departure_date &&
                                  <button onClick={() => this._submitModify()} className="btn_1">
                                    {t("booking_modify.submit_reschedule")}
                                  </button>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form_title">
                    <h3><strong><i className="icon-tag-1" /></strong>{t("booking_modify.current_order")}</h3>
                    <p>
                    {t("booking_modify.current_order_description")}
                    </p>
                  </div>
                  <div className="step">
                    <div className="row">
                      <div className="col-lg-8">
                        <table className="table table-striped confirm">
                          <tbody>
                            <tr>
                              <td>
                                <strong>{t("booking_details.package_name")}</strong>
                              </td>
                              <td>{data.package.name}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>{t("booking_details.package_price")}</strong>
                              </td>
                              <td>RP {parseFloat(data.price).toLocaleString()}/pax</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>{t("booking_details.person_number")}</strong>
                              </td>
                              <td>
                                <ul className="mb-0" style={{paddingLeft: '15px'}}>
                                  <li>
                                  {t("adult")} {data.adult} {t("person")}
                                  </li>
                                  {data.child ? <li>{t("child")} {data.child} {t("person")}</li> : null}
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>{t("booking_details.departure_date")}</strong>
                              </td>
                              <td>
                                {dateFormatter(data.departure_date)}
                                {data.booking_status !== "cancelled" &&
                                  <Fragment>
                                    &nbsp;
                                    <Link to={`/booking/${data.id}/modify`}>
                                      ({t("booking_details.modify_date")})
                                    </Link>
                                  </Fragment>
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>{t("booking_details.duration_trip")}</strong>
                              </td>
                              <td>{data.package.duration_trip} {t("day")}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>{t("itinerary")}</strong>
                              </td>
                              <td>
                                <Link to={`/product/${data.package.product_id}`} target="_blank">
                                  {t("booking_details.see_itinerary_on_package_detail")}
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )
      }
    }
  }
};

const dateFormatter = (data) => {
  const raw = data.split("-");
  return `${raw[2]}-${ID_MONTH[raw[1] -1]}-${raw[0]}`;
};

export default withTranslation('common')(
  connect(
    state => ({
      bookingDetails: state.bookingDetails
    })
  )(BookingModify)
);