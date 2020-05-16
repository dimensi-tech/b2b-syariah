import React, { Component, Fragment } from 'react';
import Authorization from "../../helpers/Authorization";
import Axios from "axios";
import { withTranslation } from "react-i18next";

const API_URL = process.env.REACT_APP_API_V1_URL;
const TOKEN = Authorization().getAuthUser();
const MIDTRANS_SERVER = process.env.REACT_APP_MIDTRANS_SERVER;
const PROXY = "https://cors-anywhere.herokuapp.com";
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

class SavingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      savings: [],
      paymentStatus: '',
      openPayment: false,
      midtransStatus: {},
    }
  };

  componentDidMount() {
    this._getSavings();
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"
    script.setAttribute("data-client-key", "SB-Mid-server-YAxhhaXZP5u3MJchUadi296f")
    document.body.appendChild(script);
  }

  _getSavings = () => {
    const { saving } = this.props;
    const config = {
      booking_id: saving.booking_id
    }
    config[saving.type === "adult" ? "identity_id" : "passport_id"] = saving.identity_id

    Axios.get(`${API_URL}/bookings/savings_customer`, {
      params: config,
      headers: {
        "Authorization": TOKEN
      }
    }).then(res => {
      const savings = res.data;
      this.setState({ savings });
    })
  }

  _pay = (data) => {
    this.setState({ openPayment: true })
    const grossAmount = data.amount
    let parameter = {
      "transaction_details": {
        "order_id": `${data.id}${Date.now()}`,
        "gross_amount": grossAmount
      }, "credit_card":{
        "secure" : true
      }
    };
  
    Axios.post(`${PROXY}/https://app.sandbox.midtrans.com/snap/v1/transactions`, parameter, HEADERS).then(res => {
      Axios.post(`${API_URL}/bookings/saving_paid`, {
        id: data.id
      }, {
        headers: {
          "Authorization": TOKEN
        }
      });
      window.snap.pay(`${res.data.token}`, {
        onSuccess: function(result){console.log('success');console.log(result);},
        onPending: function(result){console.log('pending');console.log(result);},
        onError: function(result){console.log('error');console.log(result);},
        onClose: function(){console.log('customer closed the popup without finishing the payment');}
      });
      this.setState({ openPayment: false })
    })
  }

  render() {
    const { savings } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <div className="mfp-bg my-mfp-zoom-in mfp-ready" />
        <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabIndex="-1" style={{overflow: "hidden auto"}}>
          <div className="mfp-container mfp-inline-holder">
            <div className="mfp-content">
              <div id='sign-in-dialog' className='zoom-anim-dialog'>
                <div className='small-dialog-header'>
                  <h3>{t("saving_modal.data_saving")}</h3>
                  <button className="mfp-close" onClick={this.props.toggle} />
                </div>
                <div className='sign-in-wrapper'>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th colSpan="3">{t("saving_modal.amount_saved")}</th>
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
                                <button
                                  onClick={() => this._pay(saving)}
                                  className="btn_1"
                                  disabled={this.state.openPayment}
                                >
                                  {t("saving_modal.pay")}
                                </button>
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

export default withTranslation('common')(SavingModal);