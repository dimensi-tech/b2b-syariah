import React, {Component} from "react";
import { registerValidation } from "../../helpers/Validation";
import { withTranslation } from 'react-i18next';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      retypePassword: "",
      invalid: []
    };
  };

  _onChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  };

  _handleSubmit = evt => {
    evt.preventDefault();
    const { email, password } = this.state;
    const invalid = registerValidation(this.state);
    this.setState({ invalid });
    if (invalid.length === 0) {
      this.setState({ invalid: [] });
      this.props.submitRegister({
        email, password
      });
    }
  };

  _closeModal = () => {
    this.props.closeModal();
  };

  _switchView = () => {
    this.props.switchView();
  };

  render() {
    const { email, password, retypePassword, invalid } = this.state;
    const { errors, t } = this.props;
    return (
      <div id="sign-in-dialog" className="zoom-anim-dialog">
        <div className="small-dialog-header">
          <h3>{t('register.title')}</h3>
          <div className="mfp-close" onClick={this._closeModal} />
        </div>
        {errors.map(x => x.type).includes("REGISTER") && <div className="alert-error">{errors.filter(x => x.type === "REGISTER")[0].message}</div>}
        <form onSubmit={this._handleSubmit}>
          <div className="sign-in-wrapper">
            {/* <a href="#0" className="social_bt facebook">Login with Facebook</a>
            <a href="#0" className="social_bt google">Login with Google</a>
            <div className="divider"><span>Or</span></div> */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" autoComplete="off" value={email} className="form-control" onChange={this._onChange} />
              {invalid.map(x => x.type).includes("EMAIL") && <span className="err-message">{invalid.filter(x => x.type === "EMAIL")[0].message}</span>}
              <i className="icon_mail_alt" />
            </div>
            <div className="form-group">
              <label htmlFor="password">{t('register.password')}</label>
              <input type="password" id="password" name="password" autoComplete="off" value={password} className="form-control" onChange={this._onChange} />
              {invalid.map(x => x.type).includes("PASSWORD") && <span className="err-message">{invalid.filter(x => x.type === "PASSWORD")[0].message}</span>}
              <i className="icon_lock_alt" />
            </div>
            <div className="form-group">
              <label htmlFor="password">{t('register.password_confirmation')}</label>
              <input type="password" id="retype-password" name="retypePassword" autoComplete="off" value={retypePassword} className="form-control" onChange={this._onChange} />
              {invalid.map(x => x.type).includes("RETYPE_PASSWORD") && <span className="err-message">{invalid.filter(x => x.type === "RETYPE_PASSWORD")[0].message}</span>}
              <i className="icon_lock_alt" />
            </div>
            <div className="text-center">
              <button type="submit" className="btn_login">
                {t('register.register_button')}
              </button>
            </div>
            <div className="text-center">
             {t('register.already_have_and_account')}
             <a href="#!" onClick={this._switchView}>{t('register.login_here')}</a>
            </div>
            <div id="forgot_pw">
              <div className="form-group">
                <label>Please confirm login email below</label>
                <input type="email" className="form-control" name="email_forgot" id="email_forgot" />
                <i className="icon_mail_alt" />
              </div>
              <p>You will receive an email containing a link allowing you to reset your password to a new preferred one.</p>
              <div className="text-center"><input type="submit" defaultValue="Reset Password" className="btn_1" /></div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withTranslation('common')(Register);
