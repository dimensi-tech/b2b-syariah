import React, { Component, Fragment } from "react";
import "../../assets/css/booking_details.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GET_BOOKING_DETAILS_REQUEST, ID_MONTH } from "../../helpers/constant";
import Authorization from "../../helpers/Authorization";
import Preloader from "../static/Preloader";
import Axios from "axios";
import moment from "moment";
import _ from "lodash";
import IdentityModal from "../shared/IdentityModal";
import PassportModal from "../shared/PassportModal";
import SavingModal from "../shared/SavingModal";

const API_URL = process.env.REACT_APP_API_V1_URL;
const BASE_URL = process.env.REACT_APP_STATIC_FILE_URL;
const MIDTRANS_SERVER = process.env.REACT_APP_MIDTRANS_SERVER;
const KYC_URL = process.env.REACT_APP_KYC_URL;
const KYC_API_V1 = process.env.REACT_APP_KYC_API_V1;
const PROXY = "https://cors-anywhere.herokuapp.com";
const TOKEN = Authorization().getAuthUser();
const HEADERS = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  auth: {
    username: MIDTRANS_SERVER,
    password: ""
  }
};

class BookingDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openPayment: false,
      paymentStatus: 'Loading...',
      midtransStatus: {},
      persons: [],
      passports: [],
      showIdentityModal: [false, {}],
      showPassportModal: [false, {}],
      showSavingModal: [false, {}]
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0)
    const id = this.props.match.params.product_id;
    const { data } = this.props.bookingDetails;
    if (Object.keys(data).length === 0 || Object.keys(data).includes("message") || id !== data.id) {
      this._getData(id);
    }

    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"
    script.setAttribute("data-client-key", "SB-Mid-server-YAxhhaXZP5u3MJchUadi296f")
    document.body.appendChild(script);
  };

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props.bookingDetails;
    const { midtransStatus } = this.state;
    if (!_.isEmpty(data) && _.isEmpty(this.state.persons)) {
      if (data.identity_ids.length > 0) {
        this.setState({persons: data.identity_ids});
        [...Array(data.person).keys()].map(person =>
          data.identity_ids[person] !== null ? this._showDataPerson(person) : null
        )
      } else {
        const persons = [...Array(data.person).keys()].map(person => null)
        this.setState({persons: persons});
      }
    }
    if (!_.isEmpty(data) && _.isEmpty(this.state.passports)) {
      if (data.identity_ids.length > 0) {
        this.setState({passports: data.identity_ids});
        [...Array(data.person).keys()].map(person =>
          data.identity_ids[person] !== null ? this._showDataPassport(person) : null
        )
      } else {
        const passports = [...Array(data.person).keys()].map(person => null)
        this.setState({passports: passports});
      }
    }
    if (data.midtrans_id && Object.keys(midtransStatus).length === 0) {
      Axios
      .get(`${PROXY}/https://api.sandbox.midtrans.com/v2/${data.midtrans_id}/status`, HEADERS)
      .then(res => {
        this.setState({midtransStatus: res})
        const expireDate = moment(res.data.transacation_time).add(1, 'days').format('DD MMMM YYYY, h:mm:ss a');
        if (prevState.paymentStatus === "Loading...") {
          if (res.data.transaction_status === "pending") {
            this.setState({
              paymentStatus: `Status pembayaran pending, mohon bayar sebelum tanggal ${expireDate}`
            })
          } else if (res.data.transaction_status === "settlement") {
            this.setState({
              paymentStatus: "Pembayaran telah selesai"
            })
          } else if (res.data.transaction_status === "deny" || res.data.status_code === "404") {
            this.setState({
              paymentStatus: "Menunggu Pembayaran"
            })
          }
        }
      })
    } else if (data.midtrans_id === null) {
      if (prevState.paymentStatus === "Loading...") {
        this.setState({
          paymentStatus: "Menunggu Pembayaran"
        })
      }
    }
  }

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

  _pay = () => {
    this.setState({
      openPayment: true
    })
    const { data } = this.props.bookingDetails;
    const grossAmount = data.price * data.person
    let parameter = {
      "transaction_details": {
        "order_id": `${data.id}${Date.now()}`,
        "gross_amount": grossAmount
      }, "credit_card":{
        "secure" : true
      }
    };
    let updateMidtrans = {
      booking_id: data.id,
      midtrans_id: `${data.id}${Date.now()}`,
      status: 0
    }
    Axios.post(`${PROXY}/https://app.sandbox.midtrans.com/snap/v1/transactions`, parameter, HEADERS).then(res => {
      Axios.post(`${API_URL}/bookings/update_midtrans`, updateMidtrans, {
        headers: {
          Authorization: TOKEN
        }
      })
      window.snap.pay(`${res.data.token}`);
      this.setState({
        openPayment: false
      })
    })
  }

  _showDataPerson = (person) => {
    const { data } = this.props.bookingDetails;
    if (!_.isEmpty(data)) {
      if (data.identity_ids.length > 0) {
        const identity = data.identity_ids[person];
        if (identity) {
          Axios.get(`${KYC_API_V1}/identities/find_identity?id=${identity}`).then(res => {
            let clone = [...this.state.persons];
            clone[person] = res.data;
            this.setState({
              persons: clone
            })
          })
        }
      }
    }
  }

  _showDataPassport = (passport) => {
    const { data } = this.props.bookingDetails;
    if (!_.isEmpty(data)) {
      if (data.identity_ids.length > 0) {
        const identity = data.identity_ids[passport];
        if (identity) {
          Axios.get(`${KYC_API_V1}/passports/find_passport?id=${identity}`).then(res => {
            let clone = [...this.state.passports];
            clone[passport] = res.data;
            this.setState({passports: clone})
          })
        }
      }
    }
  }

  _toggleIdentityModal = (identity) => {
    const { showIdentityModal } = this.state;
    if (showIdentityModal[0]) {
      this.setState({showIdentityModal: [!showIdentityModal[0], {}]})
    } else {
      this.setState({showIdentityModal: [!showIdentityModal[0], identity]})
    }
  }

  _togglePassportModal = (passport) => {
    const { showPassportModal } = this.state;
    if (showPassportModal[0]) {
      this.setState({showPassportModal: [!showPassportModal[0], {}]})
    } else {
      this.setState({showPassportModal: [!showPassportModal[0], passport]})
    }
  }

  _toggleSavingModal = (identity_id) => {
    const { showSavingModal } = this.state;
    const id = this.props.match.params.product_id;
    if (showSavingModal[0]) {
      this.setState({showSavingModal: [!showSavingModal[0], {}]})
    } else {
      this.setState({showSavingModal: [!showSavingModal[0], {booking_id: id, identity_id: identity_id}]})
    }
  }

  render() {
    const { data } = this.props.bookingDetails;
    const { paymentStatus, persons, passports, showIdentityModal, showPassportModal, showSavingModal } = this.state;
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
                <div className="col-12 add_bottom_15">
                  <div className="form_title">
                    <h3>
                      <strong>
                        <i className="icon-bookmark" />
                      </strong>
                      Produk Yang Dipilih
                    </h3>
                    <p>
                      Spesifikasi produk yang Anda pilih.
                    </p>
                  </div>
                  <div className="step">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className='strip_all_tour_list'>
                          <div className='row'>
                            <div className='col-lg-4 col-md-4'>
                              <div className='img_list'>
                                <img src={BASE_URL + data.product.image.url} alt="Turki" />
                                <div className='short_info'>
                                  <i className='icon_set_1_icon-4'></i>
                                  Islamic Tour
                                </div>
                              </div>
                            </div>
                            <div className='col-lg-8 col-md-8'>
                              <div className='tour_list_desc'>
                                <h3>{data.product.name}</h3>
                                <p dangerouslySetInnerHTML={{ __html: data.product.description }} />
                                <ul className='add_info'>
                                  <li>
                                    <div className='tooltip-1' data-placement='top' title='Free Wifi'><i className='icon_set_1_icon-86' /></div>
                                  </li>
                                  <li>
                                    <div className='tooltip-1' data-placement='top' title='Plasma TV with cable channels'><i className='icon_set_2_icon-116' /></div>
                                  </li>
                                  <li>
                                    <div className='tooltip-1' data-placement='top' title='Swimming pool'><i className='icon_set_2_icon-110' /></div>
                                  </li>
                                  <li>
                                    <div className='tooltip-1' data-placement='top' title='Fitness Center'><i className='icon_set_2_icon-117' /></div>
                                  </li>
                                  <li>
                                    <div className='tooltip-1' data-placement='top' title='Restaurant'><i className='icon_set_1_icon-58' /></div>
                                  </li>
                                </ul>
                                <Link to={`/product/${data.package.product_id}`} target="_blank" className="mt-4">
                                  <p>
                                    <span className='btn_1'>Lihat Detail Paket</span>
                                  </p>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="box_style_3">
                          <h3 className="inner">Status Pemesanan</h3>
                          {data.booking_type === "full" ? (
                            data.booking_status !== "cancelled" ? (
                              <Fragment>
                                <p>
                                  {paymentStatus}
                                </p>
                                {paymentStatus === "Menunggu Pembayaran" &&
                                  <Fragment>
                                    <hr />
                                    <button
                                      className="btn_full_outline"
                                      onClick={this._pay}
                                      disabled={this.state.openPayment}
                                      >
                                      Bayar Sekarang
                                    </button>
                                  </Fragment>
                                }
                              </Fragment>
                            ) : (
                              <p>Cancelled</p>
                            )
                          ) : (
                            <p>Pengisian Data</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form_title">
                    <h3><strong><i className="icon-tag-1" /></strong>Rincian Pemesanan</h3>
                    <p>
                      Rincian data-data pesanan.
                    </p>
                  </div>
                  <div className="step">
                    <div className="row">
                      <div className="col-lg-8">
                        <table className="table table-striped confirm">
                          <tbody>
                            <tr>
                              <td>
                                <strong>Nama Paket</strong>
                              </td>
                              <td>{data.package.name}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Harga Paket</strong>
                              </td>
                              <td>RP {parseFloat(data.price).toLocaleString()}/pax</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Jumlah Orang</strong>
                              </td>
                              <td>{data.person} orang</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Hari Keberangkatan</strong>
                              </td>
                              <td>
                                {dateFormatter(data.departure_date)}
                                {data.booking_status !== "cancelled" &&
                                  <Fragment>
                                    &nbsp;
                                    <Link to={`/booking/${data.id}/modify`}>(Reschedule Tanggal)</Link>
                                  </Fragment>
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Lama Hari</strong>
                              </td>
                              <td>{data.package.duration_trip} hari</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Rincian Perjalanan</strong>
                              </td>
                              <td>
                                <Link to={`/product/${data.package.product_id}`} target="_blank">
                                  Lihat Rincian Perjalanan di Detail Paket
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Status Pembayaran</strong>
                              </td>
                              <td>
                                {paymentStatus}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {data.booking_status !== "cancelled" &&
                    <Fragment>
                      <div className="form_title">
                        <h3><strong><i className="icon-users-3" /></strong>Data Penumpang Keberangkatan</h3>
                        <p>Input identitas data KTP dan Passport.</p>
                      </div>
                      <div className="step">
                        <div className="row">
                          {persons.length > 0 && persons.map((person, index) =>
                            <div className="col-lg-4" key={index}>
                              <div className="identity-item box_style_1">
                                <h3 className="inner">Penumpang {index + 1}</h3>
                                {person && typeof(person) === "object" ? (
                                  <Fragment>
                                    <button className="btn_full" onClick={() => this._toggleIdentityModal(person)}>LIHAT KTP</button>
                                    <button className="btn_full" onClick={() => this._togglePassportModal(passports[index])}>LIHAT PASSPORT</button>
                                    {data.booking_type === "savings" &&
                                      <button className="btn_full" onClick={() => this._toggleSavingModal(data.identity_ids[index])}>LIHAT TABUNGAN</button>
                                    }
                                  </Fragment>
                                ) : (
                                  <a href={`${KYC_URL}?referrer=${window.location.href}/${index}`} className="btn_full_outline">Isi Data</a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Fragment>
                  }
                </div>
              </div>
            </div>
            {showIdentityModal[0] &&
              <IdentityModal toggle={() => this._toggleIdentityModal()} identity={showIdentityModal[1]} />
            }
            {showPassportModal[0] &&
              <PassportModal toggle={() => this._togglePassportModal()} passport={showPassportModal[1]} />
            }
            {showSavingModal[0] &&
              <SavingModal toggle={() => this._toggleSavingModal()} saving={showSavingModal[1]} />
            }
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

export default connect(
  state => ({
    bookingDetails: state.bookingDetails
  })
)(BookingDetails);
