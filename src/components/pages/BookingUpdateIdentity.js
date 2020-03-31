import React from "react";
import { connect } from "react-redux";
import { GET_BOOKING_DETAILS_REQUEST } from "../../helpers/constant";
import Authorization from "../../helpers/Authorization";
import Axios from "axios";
import _ from "lodash";

const querySearch = require("stringquery");
const API_URL = process.env.REACT_APP_API_V1_URL;
const TOKEN = Authorization().getAuthUser();

class BookingUpdateIdenity extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.product_id;
    const { data } = this.props.bookingDetails;
    if (Object.keys(data).length === 0 || Object.keys(data).includes("message") || id !== data.id) {
      this._getData(id);
    }
  }

  componentDidUpdate() {
    const { location, match, history } = this.props;
    const parameters = querySearch(location.search)
    const { data } = this.props.bookingDetails;
    if (!_.isEmpty(data)) {
      let identities = [];
      if (data.identity_ids.length > 0) {
        identities = data.identity_ids;
        identities[match.params.index] = parameters.identity_callback;
      } else {
        identities = [...Array(data.person).keys()].map(() => "");
        identities[match.params.index] = parameters.identity_callback;
      }
      Axios.post(`${API_URL}/bookings/assign_identities`, {
        booking_id: match.params.product_id,
        booking: {
          identity_ids: identities
        }
      }, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      }).then(res =>
        history.push(`/booking/${match.params.product_id}`)
      )
    }
  }

  _getData = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: GET_BOOKING_DETAILS_REQUEST,
      config: {
        method: "get",
        headers: {
          "Authorization": TOKEN
        }
      },
      path: "/booking/" + id
    });
  };

  render() {
    return (
      <p></p>
    )
  }
}

export default connect(
  state => ({
    bookingDetails: state.bookingDetails
  })
)(BookingUpdateIdenity);