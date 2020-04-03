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
      persons: []
    }
  };

  componentDidMount() {
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

  render() {
    const { data } = this.props.bookingDetails;
    const { paymentStatus, persons } = this.state;
    if (!Object.keys(data).length) {
      return <Preloader />
    } else {
      if (data.success === false) {
        return <div>Product not found</div>
      } else {
        return (
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
                            <td>{dateFormatter(data.departure_date)}</td>
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
                            <dl>
                              <p className="text-center">PROVINSI {person.province_name}</p>
                              <p className="text-center">{person.city_name}</p>
                              <dt>NIK</dt>
                              <dd>{person.nik}</dd>
                              <dt>Nama</dt>
                              <dd>{person.name}</dd>
                              <dt>Tempat/Tgl Lahir</dt>
                              <dd>{person.birth_place}, {moment(person.birth_date).format("DD MMMM YYYY")}</dd>
                              <dt>Jenis Kelamin</dt>
                              <dd>{person.gender}</dd>
                              <dt>Alamat</dt>
                              <dd>{person.address}</dd>
                              <dt>RT/RW</dt>
                              <dd>{person.rt} / {person.rw}</dd>
                              <dt>Kel/Desa</dt>
                              <dd>{person.vilage_name}</dd>
                              <dt>Kecamatan</dt>
                              <dd>{person.district_name}</dd>
                              <dt>Agama</dt>
                              <dd>{person.religion}</dd>
                              <dt>Status Perkawinan</dt>
                              <dd>{person.martial_status}</dd>
                              <dt>Pekerjaan</dt>
                              <dd>{person.occupation}</dd>
                            </dl>
                          ) : (
                            <a href={`${KYC_URL}?referrer=${window.location.href}/${index}`} className="btn_full_outline">Isi Data</a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
