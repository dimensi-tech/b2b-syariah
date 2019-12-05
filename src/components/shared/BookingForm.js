import React from "react";

function BookingForm() {
  return (
    <div className="box_style_1 expose">
      <h3 className="inner">Formulir Pemesanan</h3>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label>
              <i className="icon-location-2 mr-2" />
              Pilih Paket
            </label>
            <input className="form-control" type="text" />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label>
              <i className="icon-users-1 mr-2" />
              Jumlah Orang
            </label>
            <input className="time-pick form-control" type="number" />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label>
              <i className="icon-calendar-1 mr-2" />
              Pilih Tanggal Berangkat
            </label>
            <input className="form-control" type="text" />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label>
              <i className="icon-ticket-2 mr-2" />
              Kode Voucher
            </label>
            <div className="d-flex align-items-center">
              <input className="form-control mr-2" type="text" />
              <a className="" href="/">Gunakan</a>
            </div>
          </div>
        </div>
      </div>
      <br />
      <table className="table table_summary">
        <tbody>
          <tr className="total text-center">
            <td colspan="2">
              Total Pembayaran
            </td>
          </tr>
          <tr>
            <td>
              Paket 1
            </td>
            <td className="text-right nowrap">
              Rp 20.000.000/pax
            </td>
          </tr>
          <tr>
            <td>
              Jumlah Orang
            </td>
            <td className="text-right">
              3x
            </td>
          </tr>
          <tr>
            <td>
              VOUCHER (UNTUNGJABAR)
            </td>
            <td className="text-right">
              -Rp 50.000
            </td>
          </tr>
          <tr className="total">
            <td colspan="2" className="text-right">
              <p>Rp 60.000.000</p>
            </td>
          </tr>
        </tbody>
      </table>
      <a className="btn_full" href="cart.html">Pesan</a>
      <a className="btn_full_outline" href="#">
        <i className=" icon-heart" />
        Tambah ke wishlist
      </a>
    </div>
  )
}

export default BookingForm;