import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { connect } from "react-redux";
import { LOGIN_REQUEST, REGISTER_REQUEST } from "../../helpers/constant";
import Authorization from "../../helpers/Authorization";
import jwtDecode from "jwt-decode";
import { loginSuccessToast, logoutSuccessToast } from '../static/Toast';

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

  render() {
    const { isLoggedIn, showModal, displayLogin, success, errors, bookingError } = this.state;
    const token = Authorization().getAuthUser();
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
              <div className="col-6"><i className="icon-phone" /><strong>0045 043204434</strong></div>
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
                        <a href="#">Logout</a>
                      </li>
                    </Fragment>
                    :
                    <li name="login-label-clickable" onClick={this._showModal}>
                      <a href="#">Login</a>
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
                    City Tours travel template
                  </Link>
                </h1>
              </div>
            </div>
            <nav className="col-9">
              <a className="cmn-toggle-switch cmn-toggle-switch__htx open_close" href="#"><span>Menu mobile</span></a>
              <div className="main-menu">
                <div id="header_menu">
                  <img src="img/logo_sticky.png" width={160} height={34} alt="City tours" data-retina="true" />
                </div>
                <a href="#" className="open_close" id="close_in"><i className="icon_set_1_icon-77" /></a>
                <ul>
                  <li>
                    <Link to="/">
                      Beranda&nbsp;
                    </Link>
                  </li>
                  <li className="submenu">
                    <Link to="#" className="show-submenu">
                      Kategori
                      <i className="icon-down-open-mini" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/" href="#">Umroh</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/">
                      Savings&nbsp;
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Bantuan&nbsp;
                    </Link>
                  </li>
                </ul>
              </div>
              <ul id="top_tools">
                <li>
                 {
                  isLoggedIn &&
                    <Link to="/booking-list">Booking History</Link>
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

export default connect(
  state => ({
    login: state.login,
    register: state.register,
    booking: state.booking
  })
)(Header);
