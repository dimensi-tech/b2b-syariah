import React, { Component, Fragment } from "react";
import {Link} from "react-router-dom";
import Login from "../auth/Login";
import { connect } from "react-redux";
import { LOGIN_REQUEST } from "../../helpers/constant";
import Authorization from "../../helpers/Authorization";

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: Authorization().isLoggedIn(),
      showModal: false
    }
  }

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

  componentDidUpdate(prevProps) {
    const { login } = this.props;
    if (prevProps.login.success !== login.success) {
      if (login.success) {
        this.setState({
          isLoggedIn: true,
          showModal: false
        })
      }
    }
  };

  _showModal = () => {
    this.setState({
      showModal: true
    });
  };

  _closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  _logout = () => {
    Authorization().logout();
    this.setState({
      isLoggedIn: false
    });
  };

  render() {
    const { isLoggedIn, showModal } = this.state;
    console.log(this.props);
    return (
      <header id='plain'>
        {
          showModal &&
          <Fragment>
            <div className="mfp-bg my-mfp-zoom-in mfp-ready"></div>
            <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabIndex="-1" style={{overflow: "hidden auto"}}>
              <div className="mfp-container mfp-inline-holder" onClick={this._closeModal}>
                <div className="mfp-content">
                  <Login submitLogin={this._submitLogin}/>
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
                    <li onClick={this._logout}>Sign out</li>
                    :
                    <li onClick={this._showModal}>Sign in</li>
                  }
                  <li><a href="wishlist.html" id="wishlist_link">Wishlist</a></li>
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
                  <div className="dropdown dropdown-cart">
                    <a href="#" data-toggle="dropdown" className="cart_bt"><i className="icon_bag_alt" /><strong>3</strong></a>
                    <ul className="dropdown-menu" id="cart_items">
                      <li>
                        <div className="image"><img src="img/thumb_cart_1.jpg" alt="image" /></div>
                        <strong><a href="#">Louvre museum</a>1x $36.00 </strong>
                        <a href="#" className="action"><i className="icon-trash" /></a>
                      </li>
                      <li>
                        <div className="image"><img src="img/thumb_cart_2.jpg" alt="image" /></div>
                        <strong><a href="#">Versailles tour</a>2x $36.00 </strong>
                        <a href="#" className="action"><i className="icon-trash" /></a>
                      </li>
                      <li>
                        <div className="image"><img src="img/thumb_cart_3.jpg" alt="image" /></div>
                        <strong><a href="#">Versailles tour</a>1x $36.00 </strong>
                        <a href="#" className="action"><i className="icon-trash" /></a>
                      </li>
                      <li>
                        <div>Total: <span>$120.00</span></div>
                        <a href="cart.html" className="button_drop">Go to cart</a>
                        <a href="payment.html" className="button_drop outline">Check out</a>
                      </li>
                    </ul>
                  </div>
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
    login: state.login
  })
)(Header);
