import React from "react";
import "../../assets/css/booking_details.scss";
import { Link } from "react-router-dom";

function BookingDetails() {
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
                        <img src="http://178.128.93.232:88/uploads/product/image/5/Turkey.jpg" alt="Turki" />
                        <div className='short_info'>
                          <i className='icon_set_1_icon-4'></i>
                          Islamic Tour
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-8 col-md-8'>
                      <div className='tour_list_desc'>
                        <h3>TURKI</h3>
                        <p>
                          Umroh - juga disebut sebagai "ziarah kecil," adalah Ziarah Islam yang dapat dilakukan kapan saja dalam kalender bulan Islam. Ini adalah bentuk "Ibadah" yang tidak wajib, tetapi sangat dianjurkan di kalangan umat Islam.
                        </p>
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
                        <Link to={`/product/1`} className="mt-4">
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
                      <td>TURKI (TURKI EXPRESS TOUR)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Harga Paket</strong>
                      </td>
                      <td>RP 30.000.000/pax</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Jumlah Orang</strong>
                      </td>
                      <td>3 orang</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Hari Keberangkatan</strong>
                      </td>
                      <td>10 April 2020</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Lama Hari</strong>
                      </td>
                      <td>4 hari</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Rincian Perjalanan</strong>
                      </td>
                      <td>
                        <Link to="/product/1">
                          Lihat Rincian Perjalanan di Detail Paket
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Status Pembayaran</strong>
                      </td>
                      <td>Lunas <i class="icon-ok"></i></td>
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

export default BookingDetails;