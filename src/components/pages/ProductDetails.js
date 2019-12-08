import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import "../../assets/css/product_details.scss";
import { connect } from "react-redux";
import { GET_PRODUCT_DETAILS_REQUEST, CREATE_BOOKING_REQUEST } from "../../helpers/constant";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import moment from "moment";
import ImageZoom from 'react-medium-image-zoom'

import Authorization from "../../helpers/Authorization";
import BookingForm from "../shared/BookingForm";
import CustomerCare from "../shared/CustomerCare";
import Breadcrumb from "../shared/Breadcrumb";

const initialState = {
  package_id: "",
  price: "",
  person: "1",
  departure_date: "",
  voucher_id: ""
};

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formControl: {
        ...initialState
      },
      selected_index: null
    };
  };

  componentDidMount() {
    this._getProductDetails();
  };

  _onChange = evt => {
    const { name, value } = evt.target;
    const { packages } = this.props.productDetails.data;
    if (name === "package_id") {
      const id = value.split("@")[0];
      const index = value.split("@")[1];
      if (id === "") {
        this.setState({
          formControl: Object.assign({}, this.state.formControl, {
            package_id: id,
          }),
          selected_index: null
        });
      }else{
        this.setState({
          formControl: Object.assign({}, this.state.formControl, {
            package_id: id,
            departure_date: moment(new Date(packages[index].available_date[0])).format("DD-MM-YYYY"),
            price: packages[index].normal_price
          }),
          selected_index: index
        });
      }
    }else{
      this.setState({
        formControl: Object.assign({}, this.state.formControl, {
          [name]: value
        })
      });
    }
  };

  _submitBooking = async () => {
    const token = Authorization().getAuthUser();
    const { dispatch } = this.props;
    const { formControl } = this.state;
    if (typeof token === "string") {
      dispatch({
        type: CREATE_BOOKING_REQUEST,
        config: {
          method: "post",
          headers: {
            "Authorization": token,
            "Content-Type": "multipart/form-data"
          }
        },
        path: "/bookings/create_booking",
        data: formControl
      });
    }else{
      document.getElementsByName("login-label-clickable")[0].click();
    }
  };

  _getProductDetails = () => {
    const { dispatch, match } = this.props;
    dispatch({
      type: GET_PRODUCT_DETAILS_REQUEST,
      config: {
        method: "get"
      },
      path: "/product/" + match.params.product_id
    });
  };

  componentDidUpdate(prevProps) {
    const { booking } = this.props;
    if (prevProps.booking.error !== booking.error) {
      if (booking.error) {
        document.getElementsByName("logout-label-clickable")[0].click();
        setTimeout(() => {
          document.getElementsByName("login-label-clickable")[0].click();
        }, 500)
      }
    }
    if (prevProps.booking.success !== booking.success) {
      if (booking.success) {
        this.setState({
          formControl: {
            ...initialState
          },
          selected_index: null
        });
      }
    }
  };

  render() {
    const { data } = this.props.productDetails;
    const { formControl, selected_index } = this.state;
    if (!Object.keys(data).length) {
      return <div>Loading ..</div>
    } else {
      if (data.success === false) {
        return <div>Product not found</div>
      } else {
        return(
          <main>
            <Breadcrumb />
            <div className="container margin_60">
              <div className="row">
                <div className="col-lg-8" id="single_tour_desc">
                  <h1>{data.name}</h1>
                  <img src={data.image_path} alt={data.name} className="img-fluid styled mb-4" />
                  <Tabs>
                    <TabList>
                      {
                        data.packages.length > 0 &&
                        data.packages.map(pack => (
                          <Tab key={pack.id}>{pack.name}</Tab>
                        ))
                      }
                    </TabList>
                    {
                      data.packages.length > 0 &&
                      data.packages.map(pack => (
                        <TabPanel key={pack.id}>
                          <div id="single_tour_feat">
                            <ul>
                              <li>
                                <i className="icon_set_1_icon-4" />
                                {data.category ? data.category.name : 'Semua Kategori'}
                              </li>
                              <li>
                                <i className="icon_set_1_icon-83" />
                                {pack.duration_trip} Hari
                              </li>
                              <li>
                                <i className="icon_set_1_icon-30" />
                                Min. {pack.min_person} orang
                              </li>
                              <li>
                                <i className="icon_set_1_icon-82" />
                                144 Likes
                              </li>
                              <li>
                                <i className="icon_set_1_icon-18" />
                                Recommended
                              </li>
                              <li>
                                <i className="icon_set_1_icon-89" />
                                24/7 Servis Bantuan
                              </li>
                            </ul>
                          </div>

                          <div className="row">
                            <div className="col-lg-3">
                              <h3>Harga</h3>
                            </div>
                            <div className="col-lg-9">
                              <h4>RP {parseFloat(pack.normal_price).toLocaleString('id')}/pax</h4>
                              <p>Down Payment = RP {parseFloat(pack.down_payment).toLocaleString('id')}</p>
                            </div>
                          </div>
                          
                          <hr />

                          <div className="row">
                            <div className="col-lg-3">
                              <h3>Deskripsi</h3>
                            </div>
                            <div className="col-lg-9"
                                 dangerouslySetInnerHTML={{ __html: pack.description }}
                            />
                          </div>
                          
                          <hr />

                          <div className="row">
                            <div className="col-lg-3">
                              <h3>Rencana Perjalanan</h3>
                            </div>
                            <div className="col-lg-9">
                              <ul className="cbp_tmtimeline">
                                {
                                  pack.package_details.length > 0 &&
                                  pack.package_details.map(package_detail => (
                                    <li>
                                      <div className="cbp_tmicon timeline_icon_point" />
                                      <div className="cbp_tmlabel">
                                        <div className="row">
                                          <div className="col-lg-6">
                                            <h2>
                                              <span>Hari ke</span>
                                              {package_detail.day}
                                            </h2>
                                            <p>{package_detail.description}</p>
                                          </div>
                                          <div className="col-lg-6">
                                            <ImageZoom
                                              image={{
                                                src: package_detail.image_path,
                                                alt: package_detail.day,
                                                className: "img-fluid"
                                              }}
                                              zoomImage={{
                                                src: package_detail.image_path,
                                                alt: package_detail.day
                                              }}
                                            />
                                            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcToT-aCXNqcYDwgEk0n9TljwgjNLPVDBomczRMLoFf1Em1zUrml" alt={package_detail.day} className="img-fluid" /> */}
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                          </div>
                        </TabPanel>
                      ))
                    }
                  </Tabs>
                  
                </div>
                <aside className="col-lg-4">
                  <BookingForm
                    data={data.packages}
                    formControl={formControl}
                    onChange={this._onChange}
                    index={selected_index}
                    submitBooking={this._submitBooking}
                    />
                  <CustomerCare />
                </aside>
              </div>
            </div>
          </main>
        )
      }
    }
  }
};

export default connect(
  state => ({
    productDetails: state.productDetails,
    booking: state.booking
  })
)(ProductDetails);
