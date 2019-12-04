import React, { Component } from "react";
import { connect } from "react-redux";
import { GET_PRODUCT_DETAILS_REQUEST } from "../../helpers/constant";

class ProductDetails extends Component {

  componentDidMount() {
    this._getProductDetails();
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

  render() {
    const { productDetails } = this.props;
    if (productDetails.processing) {
      return <div>Loading ..</div>
    }else{
      if (productDetails.data.message) {
        return <div>Product not found</div>
      }else{
        return(
          <div>
            Product {productDetails.data.name}
          </div>
        )
      }
    }
  }
};

export default connect(
  state => ({
    productDetails: state.productDetails
  })
)(ProductDetails);
