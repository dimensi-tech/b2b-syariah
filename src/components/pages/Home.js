import React, { Component, Fragment } from 'react'
import '../../assets/css/home.scss'

import AbuDhabi from '../../assets/img/featured_countries/abu_dhabi.jpg'
import Madina from '../../assets/img/featured_countries/madina.jpg'
import Istanbul from '../../assets/img/featured_countries/istanbul.jpg'
import Mecca from '../../assets/img/featured_countries/mecca.jpg'

import Search from '../shared/Search'
import PromoProduct from '../shared/PromoProduct'
import Slider from '../shared/Slider'

import { connect } from 'react-redux'
import { GET_PRODUCTS_REQUEST, GET_ADS_REQUEST } from '../../helpers/constant'

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
    const { products, ads } = this.props
    return (
      <Fragment>
        <div id='search_container_2'>
          <div id='search_2'>
            <div className='ads-collections'>
              <Slider
                data={ads}
                options={{
                  autoPlay: 5000,
                  pauseAutoPlayOnHover: true
                }}>
                {
                  ads.data.length > 0 &&
                  ads.data.map((ad, index) => (
                    <div key={index}
                         style={{height: 300, width: 'calc(70% + 20px)'}}
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
            <h1>Cari tujuan travelmu</h1>
            <div className='tab-content'>
              <div className='tab-pane fade active show' id='tours'>
                <Search history={this.props.history}/>
              </div>
            </div>
          </div>
        </div>
        <main>
          <div className='white_bg'>
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
            <PromoProduct products={products.data} />
            <div className='white_bg'>
              <div className='container margin_60'>
                <div className='main_title'>
                  <h2>Plan <span>Your Tour</span> Easly</h2>
                  <p>
                    Quisque at tortor a libero posuere laoreet vitae sed arcu. Curabitur consequat.
                  </p>
                </div>
                <div className='row feature_home_2'>
                  <div className='col-md-4 text-center'>
                    <img src='img/adventure_icon_1.svg' alt='' width={75} height={75} />
                    <h3>Itineraries studied in detail</h3>
                    <p>Suscipit invenire petentium per in. Ne magna assueverit vel. Vix movet perfecto facilisis in, ius ad maiorum corrumpit, his esse docendi in.</p>
                  </div>
                  <div className='col-md-4 text-center'>
                    <img src='img/adventure_icon_2.svg' alt='' width={75} height={75} />
                    <h3>Room and food included</h3>
                    <p> Cum accusam voluptatibus at, et eum fuisset sententiae. Postulant tractatos ius an, in vis fabulas percipitur, est audiam phaedrum electram ex.</p>
                  </div>
                  <div className='col-md-4 text-center'>
                    <img src='img/adventure_icon_3.svg' alt='' width={75} height={75} />
                    <h3>Everything organized</h3>
                    <p>Integre vivendo percipitur eam in, graece suavitate cu vel. Per inani persius accumsan no. An case duis option est, pro ad fastidii contentiones.</p>
                  </div>
                </div>
                <div className='banner_2'>
                  <div className='wrapper d-flex align-items-center opacity-mask' data-opacity-mask='rgba(0, 0, 0, 0.3)' style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                    <div>
                      <h3>Your Perfect<br />Tour Experience</h3>
                      <p>Activities and accommodations</p>
                      <a href='all_tours_list.html' className='btn_1'>Read more</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container margin_60'>
            <div className='main_title'>
              <h2>Lates <span>Blog</span> News</h2>
              <p>Quisque at tortor a libero posuere laoreet vitae sed arcu. Curabitur consequat.</p>
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                <a className='box_news' href='blog.html'>
                  <figure><img src='img/news_home_1.jpg' alt='' />
                  <figcaption><strong>28</strong>Dec</figcaption>
                </figure>
                <ul>
                  <li>Mark Twain</li>
                  <li>20.11.2017</li>
                </ul>
                <h4>Pri oportere scribentur eu</h4>
                <p>Cu eum alia elit, usu in eius appareat, deleniti sapientem honestatis eos ex. In ius esse ullum vidisse....</p>
              </a>
            </div>
            <div className='col-lg-6'>
              <a className='box_news' href='blog.html'>
                <figure><img src='img/news_home_2.jpg' alt='' />
                <figcaption><strong>28</strong>Dec</figcaption>
              </figure>
              <ul>
                <li>Jhon Doe</li>
                <li>20.11.2017</li>
              </ul>
              <h4>Duo eius postea suscipit ad</h4>
              <p>Cu eum alia elit, usu in eius appareat, deleniti sapientem honestatis eos ex. In ius esse ullum vidisse....</p>
            </a>
          </div>
          <div className='col-lg-6'>
            <a className='box_news' href='blog.html'>
              <figure><img src='img/news_home_3.jpg' alt='' />
              <figcaption><strong>28</strong>Dec</figcaption>
            </figure>
            <ul>
              <li>Luca Robinson</li>
              <li>20.11.2017</li>
            </ul>
            <h4>Elitr mandamus cu has</h4>
            <p>Cu eum alia elit, usu in eius appareat, deleniti sapientem honestatis eos ex. In ius esse ullum vidisse....</p>
          </a>
        </div>
        <div className='col-lg-6'>
          <a className='box_news' href='blog.html'>
            <figure><img src='img/news_home_4.jpg' alt='' />
            <figcaption><strong>28</strong>Dec</figcaption>
          </figure>
          <ul>
            <li>Paula Rodrigez</li>
            <li>20.11.2017</li>
          </ul>
          <h4>Id est adhuc ignota delenit</h4>
          <p>Cu eum alia elit, usu in eius appareat, deleniti sapientem honestatis eos ex. In ius esse ullum vidisse....</p>
        </a>
      </div>
    </div>
    <p className='btn_home_align'><a href='blog.html' className='btn_1 rounded'>View all news</a></p>
  </div>
</main>
</Fragment>
)
}
}
export default connect(
  state => ({
    products: state.products,
    ads: state.ads
  })
)(Home);
