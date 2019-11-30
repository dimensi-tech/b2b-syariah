import React, {Component, Fragment} from 'react';
import axios from 'axios';

class PromoProduct extends Component {
  render() {
    const {products} = this.props;
    return (
      <Fragment>
        <div className='main_title'>
          <h2>Special <span>Promo</span></h2>
          <p>Quisque at tortor a libero posuere laoreet vitae sed arcu. Curabitur consequat.</p>
        </div>
        <div className='owl-carousel owl-theme list_carousel add_bottom_30'>
          {products.length > 0
            && products.map((product, key) =>
              <div className='item' key={key}>
                <div className='tour_container'>
                  <div className='ribbon_3 popular'><span>Promo</span></div>
                  <div className='img_container'>
                    <a href='single_tour.html'>
                      <img src='https://via.placeholder.com/300' width={800} height={533} className='img-fluid' alt='image' />
                      <div className="badge_save">Save<strong>20%</strong></div>
                      <div className='short_info'>
                        <i className='icon_set_1_icon-44' />Historic Buildings<span className='price'><sup>Rp </sup>2.000.000</span>
                      </div>
                    </a>
                  </div>
                  <div className='tour_title'>
                    <h3>{product.name}</h3>
                    <div className='rating'>
                      <i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile' /><small>(75)</small>
                    </div>
                    <div className='wishlist'>
                      <a className='tooltip_flip tooltip-effect-1' href='#!'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
        <p className='text-center add_bottom_30'>
          <a href='all_tours_list.html' className='btn_1'>View all Tours</a>
        </p>
      </Fragment>
    )
  }
}

export default PromoProduct;
