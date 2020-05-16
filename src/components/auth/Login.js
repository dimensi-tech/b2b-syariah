import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
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
    this.props.submitLogin({
      email, password
    });
  };

  _closeModal = () => {
    this.props.closeModal();
  };

  _switchView = () => {
    this.props.switchView();
  };

  render() {
    const { email, password } = this.state;
    const { errors, success, bookingError, t } = this.props;
    return (
      <div id='sign-in-dialog' className='zoom-anim-dialog'>
        <div className='small-dialog-header'>
          <h3>{t('login.title')}</h3>
          <div className="mfp-close" onClick={this._closeModal} />
        </div>
        {errors.map(x => x.type).includes("LOGIN") && <div className="alert-error">{errors.filter(x => x.type === "LOGIN")[0].message}</div>}
        {success.map(x => x.type).includes("REGISTER") && <div className="alert-success">{success.filter(x => x.type === "REGISTER")[0].message}</div>}
        {bookingError.status && <div className="alert-error">{bookingError.message}</div>}
        <form onSubmit={this._handleSubmit}>
          <div className='sign-in-wrapper'>
            {/* <a href='#0' className='social_bt facebook'>Login with Facebook</a>
            <a href='#0' className='social_bt google'>Login with Google</a>
            <div className='divider'><span>Or</span></div> */}
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' name='email' value={email} className='form-control' onChange={this._onChange} />
              <i className='icon_mail_alt' />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>{t('login.password')}</label>
              <input type='password' id='password' name='password' value={password} className='form-control' onChange={this._onChange} />
              <i className='icon_lock_alt' />
            </div>
            <div className='clearfix add_bottom_15'>
              <div className='checkboxes float-left'>
                <input id='remember-me' type='checkbox' name='check' />
                <label htmlFor='remember-me'>{t('login.remember_me')}</label>
              </div>
              {/* <div className='float-right'><a id='forgot' href='#!'>{t('login.forgot_password')}</a></div> */}
            </div>
            <div className='text-center'>
              <button type='submit' className='btn_login'>
                {t('login.login_button')}
              </button>
            </div>
            <div className='text-center'>
              {t('login.dont_have_an_account_yet')} <a href="#!" onClick={this._switchView}>{t('login.register_here')}</a>
            </div>
            <div id='forgot_pw'>
              <div className='form-group'>
                <label>Please confirm login email below</label>
                <input type='email' className='form-control' name='email_forgot' id='email_forgot' />
                <i className='icon_mail_alt' />
              </div>
              <p>You will receive an email containing a link allowing you to reset your password to a new preferred one.</p>
              <div className='text-center'><input type='submit' defaultValue='Reset Password' className='btn_1' /></div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withTranslation('common')(Login);
