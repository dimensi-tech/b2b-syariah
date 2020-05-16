import React, { Component } from "react";
import moment from "moment";
import { withTranslation } from 'react-i18next';

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

  currency = (amount) => {
    return parseFloat(amount).toLocaleString('id');
  }

  render() {
    const { formControl, data, index, t } = this.props;
    const { invalid } = this.state;
    const minPerson = index ? data[index].min_adult : 1;
    const minChild = index ? data[index].min_child : 1;
    const { adult, child } = formControl;
    const personValue = (adult < minPerson) ? minPerson : adult;
    const childValue = (child < minChild) ? minChild : child;
    return (
      <div className="box_style_1 expose">
        <h3 className="inner">{t("booking_form.title")}</h3>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label>
                <i className="icon-location-2 mr-2" />
                {t("booking_form.select_package")}
              </label>
              <select onChange={this._onChange} name="package_id" value={formControl.package_id + "@" + index} className="form-control">
                <option value="">{t("booking_form.title")}</option>
                {
                  data &&
                  data.map((value, i) => (
                    <option key={i} value={value.id + "@" + i}>{value.name}</option>
                  ))
                }
              </select>
              {invalid &&
                <span style={{fontSize: 11, color: "red"}}>
                  {t("booking_form.package_alert")}
                </span>
              }
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>
                <i className="icon-adult mr-2" />
                {t("booking_form.adult")} {index && `(${minPerson} - ${data[index].max_adult} ${t("booking_form.person")})`}
              </label>
              <input
                className="time-pick form-control"
                type="number"
                name="adult"
                onChange={this._onChange}
                value={personValue}
                disabled={!index}
                min={minPerson}
                max={index ? data[index].max_adult : 1}
                ref={input => this.personCount = input}
                onFocus={this._blurThis}
              />
              {index && personValue >= minPerson &&
                <small className="mt-1">
                  {t("booking_form.price")} per pax : Rp {`${index && parseInt(data[index].adult_price, 10).toLocaleString()}`}
                </small>
              }
            </div>
          </div>
          {index && data[index].min_child &&
            <div className="col-12">
              <div className="form-group">
                <label>
                  <i className="icon-child mr-2" />
                  {t("booking_form.child")} {index && `(${minChild} - ${data[index].max_child} orang)`}
                </label>
                <input
                  className="time-pick form-control"
                  type="number"
                  name="child"
                  onChange={this._onChange}
                  value={childValue}
                  disabled={!index}
                  min={minChild}
                  max={index ? data[index].max_child : 1}
                  ref={input => this.personCount = input}
                  onFocus={this._blurThis}
                />
                {childValue >= minChild &&
                  <small className="mt-1">
                    {t("booking_form.price")} per pax : Rp {`${index && parseInt(data[index].child_price, 10).toLocaleString()}`}
                  </small>
                }
              </div>
            </div>
          }
          <div className="col-12">
            <div className="form-group">
              <label>
                <i className="icon-calendar-1 mr-2" />
                {t("booking_form.select_departure_date")}
              </label>
              <select name="departure_date" value={formControl.departure_date} onChange={this._onChange} disabled={index === null} className="form-control">
                {
                  index &&
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
                <i className="icon-docs-1 mr-2" />
                {t("booking_form.payment_type")}
              </label>
              <select name="booking_type" value={formControl.booking_type} onChange={this._onChange} disabled={index === null} className="form-control">
                {
                  index &&
                  data[index].booking_options.map((value, i) => (
                    <option value={value} key={i}>{value === 1 ? t("booking_form.direct") : t("booking_form.saving")}</option>
                  ))
                }
              </select>
            </div>
          </div>
          {parseInt(formControl.booking_type) === 2 &&
            <div className="col-12">
              <div className="form-group">
                <label>
                  <i className="icon-magic mr-2" />
                  {t("booking_form.saving_duration")}
                </label>
                <select name="saving_package_id" value={formControl.saving} onChange={this._onChange} disabled={index === null} className="form-control">
                  {
                    index &&
                    data[index].saving_packages.map((saving, i) => (
                      <option value={saving.id} key={i}>
                        {`${saving.sort} ${t("booking_form.month")}`}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
          }
          <div className="col-12">
            <div className="form-group">
              <label>
                <i className="icon-ticket-2 mr-2" />
                {t("booking_form.voucher_code")}
              </label>
              <div className="d-flex align-items-center">
                <input className="form-control mr-2" type="text" />
                <button className="btn_full_outline" style={{padding: '8px'}}>{t("booking_form.use_button")}</button>
              </div>
            </div>
          </div>
        </div>
        <br />
        {
          index &&
          <table className="table table_summary">
            <tbody>
              <tr className="total text-center">
                <td colSpan="2">
                  {t("booking_form.total_payment")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("booking_form.adult")} ({`${formControl.adult}`} pax)
                </td>
                <td className="text-right">
                  Rp {`${index && parseFloat(data[index].adult_price * formControl.adult).toLocaleString('id')}`}
                </td>
              </tr>
              {formControl.child >= 1 &&
                <tr>
                  <td>
                   {t("booking_form.child")} ({`${formControl.child}`} pax)
                  </td>
                  <td className="text-right">
                    Rp {`${index && parseFloat(data[index].child_price * formControl.child).toLocaleString('id')}`}
                  </td>
                </tr>
              }
              <tr>
                <td>
                  Voucher
                </td>
                <td className="text-right">
                  -
                </td>
              </tr>
              <tr className="total">
                <td colSpan="2" className="text-right">
                  <p>
                    Rp&nbsp;
                    {formControl.child >= 1
                      ? this.currency((data[index].adult_price * formControl.adult) + (data[index].child_price * formControl.child))
                      : this.currency(data[index].adult_price * formControl.adult)
                    }
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        }
        <button className="btn_full" onClick={this._submitBooking}>
          {t("booking_form.book_button")}
        </button>
      </div>
    )
  }
}

export default withTranslation('common')(BookingForm);
