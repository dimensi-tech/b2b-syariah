import React, { Component } from "react";
import moment from "moment";

class BookingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invalid: false
    };
  };

  _onChange = evt => {
    this.props.onChange(evt);
    this.setState({ invalid: false });
  };

  _blurThis = () => {
    this.personCount.blur();
  };

  _submitBooking = () => {
    const { index } = this.props;
    if (index === null) {
      this.setState({ invalid: true });
    }else{
      this.setState({ invalid: false });
      this.props.submitBooking();
    }
  };

  render() {
    const { formControl, data, index } = this.props;
    const { invalid } = this.state;
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
              <select onChange={this._onChange} name="package_id" value={formControl.package_id + "@" + index} className="form-control">
                <option value="">Pilih Paket</option>
                {
                  data &&
                  data.map((value, i) => (
                    <option key={i} value={value.id + "@" + i}>{value.name}</option>
                  ))
                }
              </select>
              {invalid && <span style={{fontSize: 11, color: "red"}}>Anda belum memilih paket!</span>}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>
                <i className="icon-users-1 mr-2" />
                Jumlah Orang {index !== null && `(${data[index].min_person} - ${data[index].max_person} orang)`}
              </label>
              <input
                className="time-pick form-control"
                type="number"
                name="person"
                onChange={this._onChange}
                value={formControl.person}
                disabled={index === null}
                min={index === null ? 1 : data[index].min_person}
                max={index === null ? 1 : data[index].max_person}
                ref={input => this.personCount = input }
                onFocus={this._blurThis}
                />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>
                <i className="icon-calendar-1 mr-2" />
                Pilih Tanggal Berangkat
              </label>
              <select name="departure_date" value={formControl.departure_date} onChange={this._onChange} disabled={index === null} className="form-control">
                {
                  index !== null &&
                  data[index].available_date.map((value, i) => (
                    <option value={moment(new Date(value)).format("DD-MM-YYYY")} key={i}>{moment(new Date(value)).format("DD-MMM-YYYY")}</option>
                  ))
                }
              </select>
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
        {
          index !== null &&
          <table className="table table_summary">
            <tbody>
              <tr className="total text-center">
                <td colSpan="2">
                  Total Pembayaran
                </td>
              </tr>
              <tr>
                <td>
                  {`${index !== null && data[index].name}`}
                </td>
                <td className="text-right nowrap">
                  Rp {`${index !== null && parseInt(data[index].normal_price, 10).toLocaleString()}`}/pax
                </td>
              </tr>
              <tr>
                <td>
                  Jumlah Orang
                </td>
                <td className="text-right">
                  {`${formControl.person}`}x
                </td>
              </tr>
              <tr>
                <td>
                  VOUCHER
                </td>
                <td className="text-right">
                  -
                </td>
              </tr>
              <tr className="total">
                <td colSpan="2" className="text-right">
                  <p>Rp {`${index !== null && parseInt(data[index].normal_price).toLocaleString()}`}</p>
                </td>
              </tr>
            </tbody>
          </table>
        }
        <button className="btn_full" onClick={this._submitBooking}>Pesan</button>
        <a className="btn_full_outline" href="#">
          <i className=" icon-heart" />
          Tambah ke wishlist
        </a>
      </div>
    )
  }
}

export default BookingForm;
