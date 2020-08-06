import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { connect } from "react-redux";
import { LOGIN_REQUEST, REGISTER_REQUEST } from "../../helpers/constant";
import Authorization from "../../helpers/Authorization";
import jwtDecode from "jwt-decode";
import { loginSuccessToast, logoutSuccessToast } from '../static/Toast';
import { ReactComponent as IdLogo } from '../../assets/img/svg/id.svg';
import { ReactComponent as EnLogo } from '../../assets/img/svg/en.svg';
import LoginIcon from '../../assets/img/login-rounded-right.png'
import { withTranslation } from 'react-i18next';
import Swal from "sweetalert2";

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: Authorization().isLoggedIn(),
      showModal: false,
      displayLogin: true,
      errors: [],
      success: [],
      bookingError: {
        status: false,
        message: ""
      }
    };
  };

  _submitLogin = credentials => {
    const { dispatch } = this.props;
    dispatch({
      type: LOGIN_REQUEST,
      config: {
        method: "post",
        data: credentials
      },
      path: "/tokens"
    });
  };

  _submitRegister = credentials => {
    const { dispatch } = this.props;
    dispatch({
      type: REGISTER_REQUEST,
      config: {
        method: "post",
        data: credentials
      },
      path: "/customers"
    });
  };

  componentDidUpdate(prevProps) {
    const { login, register, booking } = this.props;
    const { errors, success, bookingError } = this.state;
    if (prevProps.login.success !== login.success) {
      if (login.success) {
        this.setState({
          isLoggedIn: true,
          showModal: false,
          errors: [],
          success: [],
          bookingError: Object.assign({}, this.state.bookingError, {
            status: false,
            message: ""
          })
        });
        loginSuccessToast()
      }
    }
    if (prevProps.login.error !== login.error) {
      if (login.error) {
        let clone = [...errors];
        clone.push({
          type: "LOGIN",
          message: login.message
        });
        this.setState({
          errors: clone,
          success: []
        })
      }
    }
    if (prevProps.register.success !== register.success) {
      if (register.success) {
        let clone = [...success];
        clone.push({
          type: "REGISTER",
          message: register.message
        });
        this.setState({
          success: clone,
          displayLogin: true,
          errors: []
        });
      }
    }
    if (prevProps.register.error !== register.error) {
      if (register.error) {
        let clone = [...errors];
        clone.push({
          type: "REGISTER",
          message: register.message
        });
        this.setState({
          errors: clone,
          success: []
        })
      }
    }
    if (prevProps.booking.error !== booking.error) {
      if (booking.error) {
        this.setState({
          bookingError: Object.assign({}, bookingError, {
            status: true,
            message: booking.message
          })
        });
      }
    }
  };

  _showModal = () => {
    this.setState({showModal: true});
  };

  _closeModal = () => {
    this.setState({
      showModal: false,
      displayLogin: true,
      success: [],
      errors: []
    });
  };

  _logout = () => {
    Authorization().logout();
    this.setState({
      isLoggedIn: false
    });
    logoutSuccessToast()
  };

  _switchView = () => {
    this.setState({
      displayLogin: !this.state.displayLogin,
      success: [],
      errors: []
    });
  };

  _changeLanguage = (language) => {
    const { i18n } = this.props;
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }

  render() {
    const { isLoggedIn, showModal, displayLogin, success, errors, bookingError } = this.state;
    const token = Authorization().getAuthUser();
    const { t } = this.props;
    return (
      <header id='plain'>
        {
          showModal &&
          <Fragment>
            <div className="mfp-bg my-mfp-zoom-in mfp-ready"></div>
            <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabIndex="-1" style={{overflow: "hidden auto"}}>
              <div className="mfp-container mfp-inline-holder">
                <div className="mfp-content">
                  {
                    displayLogin
                    ?
                    <Login
                      closeModal={this._closeModal}
                      switchView={this._switchView}
                      submitLogin={this._submitLogin}
                      errors={errors}
                      success={success}
                      bookingError={bookingError}
                      />
                    :
                    <Register
                      closeModal={this._closeModal}
                      switchView={this._switchView}
                      submitRegister={this._submitRegister}
                      errors={errors}
                      />
                  }
                </div>
              </div>
            </div>
          </Fragment>
        }
        <div id="top_line">
          <div className="container">
            <div className="row">
              <div className="col-6 header-info">
                <div>
                  <i className="icon-phone" />
                  <strong>022 043204434</strong>
                </div>
                <div>
                  <button onClick={() => this._changeLanguage('id')}>
                    <IdLogo />
                  </button>
                  <button onClick={() => this._changeLanguage('en')}>
                    <EnLogo />
                  </button>
                </div>
              </div>
              <div className="col-6">
                <ul id="top_links">
                  {
                    isLoggedIn
                    ?
                    <Fragment>
                      {
                        typeof(token) === "string" &&
                        <li><i className="icon-user-3"></i>{jwtDecode(token).customer_email}</li>
                      }
                      <li name="logout-label-clickable" onClick={this._logout}>
                        <a href="#!" className="logout-button">{t('header.logout')}</a>
                      </li>
                    </Fragment>
                    :
                    <li name="login-label-clickable" onClick={this._showModal}>
                      <a href="#!" className="login-button">
                        <img src={LoginIcon} alt="login" />
                        {t('header.login')}
                      </a>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div id="logo_home">
                <h1>
                  <Link to="/">
                    Majreha
                  </Link>
                </h1>
              </div>
            </div>
            <nav className="col-9">
              <a href="#!" className="cmn-toggle-switch cmn-toggle-switch__htx open_close"><span>Menu mobile</span></a>
              <div className="main-menu">
                <div id="header_menu">
                  <img src="img/logo_sticky.png" width={160} height={34} alt="City tours" data-retina="true" />
                </div>
                <a href="#!" className="open_close" id="close_in"><i className="icon_set_1_icon-77" /></a>
                <ul>
                  <li>
                    <Link to="/">
                      {t('header.home')}&nbsp;
                    </Link>
                  </li>
                  <li className="submenu">
                    <Link to="#" className="show-submenu">
                      {t('header.categories')}
                      <i className="icon-down-open-mini" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/" href="#">Umroh</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#" onClick={() =>
                      Swal.fire({
                        imageUrl: 'https://static.thenounproject.com/png/21053-200.png',
                        imageAlt: 'Souvenir',
                        title: 'Souvenir',
                        text: 'Coming Soon'
                      })
                    }>
                      {/* {t('header.home')}&nbsp; */}
                      Souvenir
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      {t('header.savings')}&nbsp;
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      {t('header.help')}&nbsp;
                    </Link>
                  </li>
                </ul>
              </div>
              <ul id="top_tools">
                <li>
                 {
                  isLoggedIn &&
                    <Link to="/booking-list">{t('header.booking_history')}</Link>
                  }
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    )
  }
}

export default withTranslation('common')(
  connect(
    state => ({
      login: state.login,
      register: state.register,
      booking: state.booking
    })
  )(Header)
);
