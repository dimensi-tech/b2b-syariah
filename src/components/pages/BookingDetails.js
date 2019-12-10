import React, { Component } from "react";
import "../../assets/css/booking_details.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GET_BOOKING_DETAILS_REQUEST, ID_MONTH } from "../../helpers/constant";
import Authorization from "../../helpers/Authorization";
import Preloader from "../static/Preloader";

const BASE_URL = process.env.REACT_APP_STATIC_FILE_URL;

class BookingDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.product_id;
    const { data } = this.props.bookingDetails;
    if (Object.keys(data).length === 0 || Object.keys(data).includes("message") || id !== data.id) {
      this._getData(id);
    }
  };

  _getData = (id) => {
    const { dispatch } = this.props;
    const token = Authorization().getAuthUser();
    dispatch({
      type: GET_BOOKING_DETAILS_REQUEST,
      config: {
        method: "get",
        headers: {
          "Authorization": token
        }
      },
      path: "/booking/" + id
    });
  };

  render() {
    const { data } = this.props.bookingDetails;
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
                          Menunggu Pembayaran
                        </p>
                        <hr />
                        <button className="btn_full_outline">Bayar Sekarang</button>
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
                            <td>Lunas <i className="icon-ok"></i></td>
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
                    <div className="col-lg-4">
                      <div className="identity-item box_style_1">
                        <h3 className="inner">Penumpang 1</h3>
                        <button className="btn_full_outline">Isi Data</button>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="identity-item box_style_1">
                        <h3 className="inner">Penumpang 2</h3>
                        <button className="btn_full_outline">Isi Data</button>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="identity-item box_style_1">
                        <h3 className="inner">Penumpang 3</h3>
                        <button className="btn_full_outline">Isi Data</button>
                      </div>
                    </div>
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
