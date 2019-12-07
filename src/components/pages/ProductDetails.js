import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import { connect } from "react-redux";
import { GET_PRODUCT_DETAILS_REQUEST, CREATE_BOOKING_REQUEST } from "../../helpers/constant";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import moment from "moment";
import Authorization from "../../helpers/Authorization";

import BookingForm from "../shared/BookingForm";
import CustomerCare from "../shared/CustomerCare";
import jwtDecode from "jwt-decode";

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
            <div id="position">
              <div className="container">
                <ul>
                  <li><a href="#">Home</a>
                  </li>
                  <li><a href="#">Category</a>
                  </li>
                  <li>Page active</li>
                </ul>
              </div>
            </div>
            {/* End Position */}

            {/* End Map */}
            <div className="container margin_60">
              <div className="row">
                <div className="col-lg-8" id="single_tour_desc">
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
                              <li><i className="icon_set_1_icon-4" />Museum</li>
                              <li><i className="icon_set_1_icon-83" />3 Hours</li>
                              <li><i className="icon_set_1_icon-13" />Accessibiliy</li>
                              <li><i className="icon_set_1_icon-82" />144 Likes</li>
                              <li><i className="icon_set_1_icon-22" />Pet allowed</li>
                              <li><i className="icon_set_1_icon-97" />Audio guide</li>
                              <li><i className="icon_set_1_icon-29" />Tour guide</li>
                            </ul>
                          </div>

                          <div className="row">
                            <div className="col-lg-3">
                              <h3>Deskripsi</h3>
                            </div>
                            <div className="col-lg-9"
                                 dangerouslySetInnerHTML={{ __html: pack.description }}
                            />
                          </div>
                          <hr />
                        </TabPanel>
                      ))
                    }
                  </Tabs>

                  <div className="row">
                    <div className="col-lg-3">
                      <h3>Schedule</h3>
                    </div>
                    <div className="col-lg-9">
                      <ul className="cbp_tmtimeline">
                        <li>
                          <time className="cbp_tmtime" dateTime="09:30"><span>30 minutes</span> <span>09:30</span>
                          </time>
                          <div className="cbp_tmicon timeline_icon_point" />
                          <div className="cbp_tmlabel">
                            <div className="float-right d-none d-md-block">Guide <strong>John Doe</strong><img src="img/guide_1.jpg" alt="Image" className="rounded-circle speaker" />
                            </div>
                            <h2><span>Lorem ipsum</span>Meeting point</h2>
                            <p>Winter purslane courgette pumpkin quandong komatsuna fennel green bean cucumber watercress. Pea sprouts wattle seed rutabaga okra yarrow cress avocado grape radish bush tomato ricebean black-eyed pea maize eggplant. </p>
                          </div>
                        </li>
                        <li>
                          <time className="cbp_tmtime" dateTime="11:30"><span>2 hours</span> <span>11:30</span>
                          </time>
                          <div className="cbp_tmicon timeline_icon_pic" />
                          <div className="cbp_tmlabel">
                            <div className="float-right d-none d-md-block">Guide <strong>John Doe</strong><img src="img/guide_2.jpg" alt="Image" className="rounded-circle speaker" />
                            </div>
                            <h2><span>Lorem ipsum</span>Exhibitions</h2>
                            <p>Caulie dandelion maize lentil collard greens radish arugula sweet pepper water spinach kombu courgette lettuce. Celery coriander bitterleaf epazote radicchio shallot winter purslane collard greens spring onion squash lentil. Artichoke salad bamboo shoot black-eyed pea brussels sprout garlic kohlrabi.</p>
                          </div>
                        </li>
                        <li>
                          <time className="cbp_tmtime" dateTime="13:30"><span>1 hour</span> <span>13:30</span>
                          </time>
                          <div className="cbp_tmicon timeline_icon_break" />
                          <div className="cbp_tmlabel">
                            <h2><span>Lorem ipsum</span>Lunch and coffee break</h2>
                            <p>Parsnip lotus root celery yarrow seakale tomato collard greens tigernut epazote ricebean melon tomatillo soybean chicory broccoli beet greens peanut salad. </p>
                          </div>
                        </li>
                        <li>
                          <time className="cbp_tmtime" dateTime="14:30"><span>2 hours</span> <span>14:30</span>
                          </time>
                          <div className="cbp_tmicon timeline_icon_audio" />
                          <div className="cbp_tmlabel">
                            <div className="float-right d-none d-md-block">Guide <strong>John Doe</strong><img src="img/guide_1.jpg" alt="Image" className="rounded-circle speaker" />
                            </div>
                            <h2><span>Lorem ipsum</span>The auditorium Louvre</h2>
                            <p>Peanut gourd nori welsh onion rock melon mustard jícama. Desert raisin amaranth kombu aubergine kale seakale brussels sprout pea. Black-eyed pea celtuce bamboo shoot salad kohlrabi leek squash prairie turnip catsear rock melon chard taro broccoli turnip greens. Fennel quandong potato watercress ricebean swiss chard garbanzo. Endive daikon brussels sprout lotus root silver beet epazote melon shallot.</p>
                          </div>
                        </li>
                        <li>
                          <time className="cbp_tmtime" dateTime="16:30"><span>2 hours</span> <span>16:30</span>
                          </time>
                          <div className="cbp_tmicon timeline_icon_pic" />
                          <div className="cbp_tmlabel">
                            <div className="float-right d-none d-md-block">Guide <strong>John Doe</strong><img src="img/guide_2.jpg" alt="Image" className="rounded-circle speaker" />
                            </div>
                            <h2><span>Lorem ipsum</span>Modern art</h2>
                            <p>Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.</p>
                          </div>
                        </li>
                      </ul>

                    </div>
                  </div>
                  <hr />
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
