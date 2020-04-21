import React, { Component, Fragment } from 'react';
import Authorization from "../../helpers/Authorization";
import Axios from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.REACT_APP_API_V1_URL;
const TOKEN = Authorization().getAuthUser();

class SavingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      savings: []
    }
  };

  componentDidMount() {
    this._getSavings();
  }

  _getSavings = () => {
    const { saving } = this.props;
    Axios.get(`${API_URL}/bookings/savings_customer`, {
      params: {
        booking_id: saving.booking_id,
        identity_id: saving.identity_id
      },
      headers: {
        "Authorization": TOKEN
      }
    }).then(res => {
      const savings = res.data;
      this.setState({ savings });
    })
  }

  _pay = (savingId) => {
    Axios.post(`${API_URL}/bookings/saving_paid`, {
      id: savingId
    }, {
      headers: {
        "Authorization": TOKEN
      }
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Tabungan telah disimpan'
      }).then(() => {
        this._getSavings();
      })
    })
  }

  render() {
    const { savings } = this.state;
    return (
      <Fragment>
        <div className="mfp-bg my-mfp-zoom-in mfp-ready" />
        <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabIndex="-1" style={{overflow: "hidden auto"}}>
          <div className="mfp-container mfp-inline-holder">
            <div className="mfp-content">
              <div id='sign-in-dialog' className='zoom-anim-dialog'>
                <div className='small-dialog-header'>
                  <h3>DATA TABUNGAN</h3>
                  <button className="mfp-close" onClick={this.props.toggle} />
                </div>
                <div className='sign-in-wrapper'>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th colSpan="3">Jumlah yang ditabungkan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savings.length > 0 &&
                        savings.map(saving =>
                          <tr key={saving.id}>
                            <td>{saving.payment_for}</td>
                            <td>RP {parseFloat(saving.amount).toLocaleString('id')}</td>
                            <td
                              align="center"
                              style={{
                                fontWeight: saving.status !== "unpaid" && 'bold',
                                color: saving.status !== "unpaid" && 'green'
                              }}
                            >
                              {saving.status}
                            </td>
                            <td>
                              {saving.status === "unpaid" &&
                                <button onClick={() => this._pay(saving.id)} className="btn_1">Bayar</button>
                              }
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default SavingModal;