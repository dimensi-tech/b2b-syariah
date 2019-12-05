import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { GET_PRODUCTS_REQUEST } from '../../helpers/constant'
import { Link } from 'react-router-dom'
import Filter from '../shared/Filter'
import Breadcrumb from '../shared/Breadcrumb'
import Sort from '../shared/Sort'
import '../../assets/css/products.scss'

class Products extends Component {
  componentDidMount() {
    this._getProducts()
  }

  _getProducts = () => {
    const { dispatch, location } = this.props;
    const queryParams = location.search.replace('?searchresults=', '');
    dispatch({
      type: GET_PRODUCTS_REQUEST,
      config: {
        method: 'get',
        headers: {
          "Content-Type": "multipart/form-data"
        }
      },
      path: '/products/list_products?q[name_cont]=' + queryParams
    })
  }

  render() {
    const { data } = this.props.products;
    return(
      <Fragment>
        <main>
          <Breadcrumb />
          <div className='collapse' id='collapseMap'>
            <div id='map' className='map' />
          </div>
          <div className='container margin_60'>
            <div className='row'>
              <aside className='col-lg-3'>
                <p>
                  <a className='btn_map' data-toggle='collapse' href='#collapseMap' aria-expanded='false' aria-controls='collapseMap' data-text-swap='Hide map' data-text-original='View on map'>View on map</a>
                </p>
                <Filter />
                <div className='box_style_2'>
                  <i className='icon_set_1_icon-57' />
                  <h4>Need <span>Help?</span></h4>
                  <a href='tel://004542344599' className='phone'>+45 423 445 99</a>
                  <small>Monday to Friday 9.00am - 7.30pm</small>
                </div>
              </aside>
              <div className='col-lg-9'>
                <Sort />
                {
                  data.length > 0 &&
                  data.map((product, index) => (
                    <div key={index} className='strip_all_tour_list wow fadeIn' data-wow-delay='0.1s'>
                      <div className='row'>
                        <div className='col-lg-4 col-md-4'>
                          <div className='wishlist'>
                            <div className='tooltip_flip tooltip-effect-1'>
                              +
                              <span className='tooltip-content-flip'>
                                <span className='tooltip-back'>Add to wishlist</span>
                              </span>
                            </div>
                          </div>
                          <div className='img_list'>
                            <Link to={`/product/${product.id}`}>
                              <img src={product.image_path} alt={product.name} />
                              <div className='short_info'>
                                <i className='icon_set_1_icon-4'></i>
                                Museums
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className='col-lg-5 col-md-5'>
                          <div className='tour_list_desc'>
                            <div className='rating'>
                              <i className='icon-smile voted'></i>
                              <i className='icon-smile voted'></i>
                              <i className='icon-smile voted'></i>
                              <i className='icon-smile voted'></i>
                              <i className='icon-smile'></i>
                              <small>(75)</small>
                            </div>
                            <h3>{product.name}</h3>
                            {
                              product.package &&
                              <p dangerouslySetInnerHTML={{ __html: product.package.description }} />
                            }
                            <ul className='add_info'>
                              <li>
                                <div className='tooltip-1' data-placement='top' title='Free Wifi'><i className='icon_set_1_icon-86' /></div>
                              </li>
                              <li>
                                <div className='tooltip-1' data-placement='top' title='Plasma TV with cable channels'><i className='icon_set_2_icon-116' /></div>
                              </li>
                              <li>
                                <div className='tooltip-1' data-placement='top' title='Swimming pool'><i className='icon_set_2_icon-110' /></div>
                              </li>
                              <li>
                                <div className='tooltip-1' data-placement='top' title='Fitness Center'><i className='icon_set_2_icon-117' /></div>
                              </li>
                              <li>
                                <div className='tooltip-1' data-placement='top' title='Restaurant'><i className='icon_set_1_icon-58' /></div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className='col-lg-3 col-md-3'>
                          <div className='price_list'>
                            <div>
                              <p className='package-name'>{product.package && product.package.name}</p>
                              <p className='package-price'>RP {product.package && parseFloat(product.package.price).toLocaleString()}</p>
                              {/* <span className='normal_price_list'>$99</span> */}
                              <small>Per pax</small>
                              <Link to={`/product/${product.id}`}>
                                <p>
                                  <span className='btn_1'>Lihat Detail & Paket Lainnya</span>
                                </p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
                <hr />
                <nav aria-label='Page navigation'>
                  <ul className='pagination justify-content-center'>
                    <li className='page-item'>
                      <a className='page-link' href='#' aria-label='Previous'>
                        <span aria-hidden='true'>«</span>
                        <span className='sr-only'>Previous</span>
                      </a>
                    </li>
                    <li className='page-item active'><span className='page-link'>1<span className='sr-only'>(current)</span></span>
                    </li>
                    <li className='page-item'><a className='page-link' href='#'>2</a></li>
                    <li className='page-item'><a className='page-link' href='#'>3</a></li>
                    <li className='page-item'>
                      <a className='page-link' href='#' aria-label='Next'>
                        <span aria-hidden='true'>»</span>
                        <span className='sr-only'>Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </Fragment>
    )
  }
}
export default connect(
  state => ({
    products: state.products
  })
)(Products);
