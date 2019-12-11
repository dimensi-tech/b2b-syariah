import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class PromoProduct extends Component {
  render() {
    const { products } = this.props;
    console.log(products)

    return (
      <Fragment>
        <div className='main_title'>
          <h2>Special <span>Promo</span></h2>
          <p>Penawaran promo istimewa hanya untuk Anda!</p>
        </div>
        <div className='add_bottom_30 special-promo-section'>
          <div className="row">
            {products.length > 0
              && products.slice(0, 3).map(product =>
                <div className="col-lg-4">
                  <div className='item' key={product.id}>
                    <div className='tour_container'>
                      <div className='ribbon_3 top_rated'><span>Promo</span></div>
                      <div className='img_container'>
                        <Link to={`/product/${product.id}`}>
                          <img src={product.image_path} style={{height: 300}} className='img-fluid' alt={`Promo ${product.name}`} />
                          <div className="badge_save">Save<strong>20%</strong></div>
                          <div className='short_info'>
                            <span className='price'>
                              RP {parseFloat(product.package.price - product.package.price / 100 * 20).toLocaleString('id')}
                            </span>
                            <span className='normal_price_in'>RP {parseFloat(product.package.price).toLocaleString('id')}</span>
                          </div>
                        </Link>
                      </div>
                      <div className='tour_title'>
                        <h3>{product.name}</h3>
                        <div className='rating'>
                          <i className='icon-star voted' />
                          <i className='icon-star voted' />
                          <i className='icon-star voted' />
                          <i className='icon-star voted' />
                          <i className='icon-star' />
                          <small>(75)</small>
                        </div>
                        <div className='wishlist'>
                          <a className='tooltip_flip tooltip-effect-1' href='#!'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </Fragment>
    )
  }
}

export default PromoProduct;
