import React, { Component, Fragment } from 'react'
import '../../assets/css/home.scss'

import AbuDhabi from '../../assets/img/featured_countries/abu_dhabi.jpg'
import Madina from '../../assets/img/featured_countries/madina.jpg'
import Istanbul from '../../assets/img/featured_countries/istanbul.jpg'
import Mecca from '../../assets/img/featured_countries/mecca.jpg'

import Search from '../shared/Search'
import PromoProduct from '../shared/PromoProduct'
import Slider from '../shared/Slider'

import { isMobileOnly, isMobile } from 'react-device-detect';
import { connect } from 'react-redux'
import { GET_PRODUCTS_REQUEST, GET_ADS_REQUEST } from '../../helpers/constant'

import { withTranslation } from 'react-i18next';

class Home extends Component {
  componentDidMount() {
    this._getProducts();
    this._getAds();
  };

  _getProducts = () => {
    const { dispatch } = this.props
    dispatch({
      type: GET_PRODUCTS_REQUEST,
      config: {
        method: 'get'
      },
      path: '/products/list_products'
    });
  };

  _getAds = () => {
    const { dispatch } = this.props
    dispatch({
      type: GET_ADS_REQUEST,
      config: {
        method: 'get'
      },
      path: '/ads/active_ads'
    });
  };

  render() {
    const { products, ads, t } = this.props
    return (
      <Fragment>
        <main className="with-bg">
          <div id='search_container_2'>
            <div id='search_2'>
              <div className='banners-collections'>
                <Slider
                  data={ads}
                  options={{
                    autoPlay: 5000,
                    pauseAutoPlayOnHover: true,
                    pageDots: false,
                    contain: isMobile ? true : false
                  }}>
                  {
                    ads.data.length > 0 &&
                    ads.data.map((ad, index) => (
                      <div key={index}
                          style={{
                            height: isMobileOnly ? 150 : 450,
                            width: isMobile ? '100%' : 'calc(70% + 20px)'
                            }}
                          className='ads-item'
                      >
                        <div className='ads-content'>
                          <span>{ad.name}</span>
                          <img src={ad.image_path} alt={ad.name} />
                        </div>
                      </div>
                    ))
                  }
                </Slider>
              </div>
              <h1>
                {t('home.search_label')}
              </h1>
              <div className='tab-content'>
                <div className='tab-pane fade active show' id='tours'>
                  <Search history={this.props.history}/>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='container margin_60'>
              <div className='row small-gutters categories_grid'>
                <div className='col-sm-12 col-md-4'>
                  <a className='categories_left' href='all_tours_list.html'>
                    <img src={Madina} alt='' className='img-fluid' />
                    <div className='wrapper'>
                      <h2>Madinah</h2>
                      <p>1150 Locations</p>
                    </div>
                  </a>
                </div>
                <div className='col-sm-12 col-md-8'>
                  <div className='row small-gutters mt-md-0 mt-sm-2'>
                    <div className='col-sm-6'>
                      <a className='categories_right' href='all_tours_list.html'>
                        <img src={AbuDhabi} alt='' className='img-fluid' />
                        <div className='wrapper'>
                          <h2>Madinah</h2>
                          <p>800 Locations</p>
                        </div>
                      </a>
                    </div>
                    <div className='col-sm-6'>
                      <a className='categories_right' href='all_hotels_list.html'>
                        <img src={Istanbul} alt='' className='img-fluid' />
                        <div className='wrapper'>
                          <h2>Istanbul</h2>
                          <p>650 Locations</p>
                        </div>
                      </a>
                    </div>
                    <div className='col-sm-12 mt-sm-2'>
                      <a className='categories_right' href='all_restaurants_list.html'>
                        <img src={Mecca} alt='' className='img-fluid' />
                        <div className='wrapper'>
                          <h2>Mekkah</h2>
                          <p>1132 Locations</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container margin_60'>
            {
              products.data &&
              <PromoProduct products={products.data} />
            }
          </div>
        </main>
      </Fragment>
    )
  }
}
export default withTranslation('common')(
  connect(state => ({products: state.products, ads: state.ads}))(Home)
)
