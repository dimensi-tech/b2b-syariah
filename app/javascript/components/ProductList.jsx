import React, { Component } from 'react'

class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
        <section className='parallax-window' data-parallax='scroll' data-image-src='img/home_bg_1.jpg' data-natural-width='1400' data-natural-height='470'>
          <div className='parallax-content-1'>
            <div className='animated fadeInDown'>
              <h1>Paris tours</h1>
              <p>Ridiculus sociosqu cursus neque cursus curae ante scelerisque vehicula.</p>
            </div>
          </div>
        </section>
        <main>
          <div id='position'>
            <div className='container'>
              <ul>
                <li><a href='#'>Home</a>
                </li>
                <li><a href='#'>Category</a>
                </li>
                <li>Page active</li>
              </ul>
            </div>
          </div>
          {/* Position */}
          <div className='collapse' id='collapseMap'>
            <div id='map' className='map' />
          </div>
          {/* End Map */}
          <div className='container margin_60'>
            <div className='row'>
              <aside className='col-lg-3'>
                <p>
                  <a className='btn_map' data-toggle='collapse' href='#collapseMap' aria-expanded='false' aria-controls='collapseMap' data-text-swap='Hide map' data-text-original='View on map'>View on map</a>
                </p>
                <div className='box_style_cat'>
                  <ul id='cat_nav'>
                    <li><a href='#' id='active'><i className='icon_set_1_icon-51' />All tours <span>(141)</span></a>
                    </li>
                    <li><a href='#'><i className='icon_set_1_icon-3' />City sightseeing <span>(20)</span></a>
                    </li>
                    <li><a href='#'><i className='icon_set_1_icon-4' />Museum tours <span>(16)</span></a>
                    </li>
                    <li><a href='#'><i className='icon_set_1_icon-44' />Historic Buildings <span>(12)</span></a>
                    </li>
                    <li><a href='#'><i className='icon_set_1_icon-37' />Walking tours <span>(11)</span></a>
                    </li>
                    <li><a href='#'><i className='icon_set_1_icon-14' />Eat &amp; Drink <span>(20)</span></a>
                    </li>
                    <li><a href='#'><i className='icon_set_1_icon-43' />Churces <span>(08)</span></a>
                    </li>
                    <li><a href='#'><i className='icon_set_1_icon-28' />Skyline tours <span>(11)</span></a>
                    </li>
                  </ul>
                </div>
                <div id='filters_col'>
                  <a data-toggle='collapse' href='#collapseFilters' aria-expanded='false' aria-controls='collapseFilters' id='filters_col_bt'><i className='icon_set_1_icon-65' />Filters</a>
                  <div className='collapse show' id='collapseFilters'>
                    <div className='filter_type'>
                      <h6>Price</h6>
                      <input type='text' id='range' name='range' defaultValue />
                    </div>
                    <div className='filter_type'>
                      <h6>Rating</h6>
                      <ul>
                        <li>
                          <label>
                            <input type='checkbox' /><span className='rating'>
                              <i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile voted' />
                            </span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type='checkbox' /><span className='rating'>
                              <i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile' />
                            </span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type='checkbox' /><span className='rating'>
                              <i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile' /><i className='icon-smile' />
                            </span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type='checkbox' /><span className='rating'>
                              <i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile' /><i className='icon-smile' /><i className='icon-smile' />
                            </span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type='checkbox' /><span className='rating'>
                              <i className='icon-smile voted' /><i className='icon-smile' /><i className='icon-smile' /><i className='icon-smile' /><i className='icon-smile' />
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div className='filter_type'>
                      <h6>Facility</h6>
                      <ul>
                        <li>
                          <label>
                            <input type='checkbox' />Pet allowed
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type='checkbox' />Groups allowed
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type='checkbox' />Tour guides
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type='checkbox' />Access for disabled
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/*End collapse */}
                </div>
                {/*End filters col*/}
                <div className='box_style_2'>
                  <i className='icon_set_1_icon-57' />
                  <h4>Need <span>Help?</span></h4>
                  <a href='tel://004542344599' className='phone'>+45 423 445 99</a>
                  <small>Monday to Friday 9.00am - 7.30pm</small>
                </div>
              </aside>
              {/*End aside */}
              <div className='col-lg-9'>
                <div id='tools'>
                  <div className='row'>
                    <div className='col-md-3 col-sm-4 col-6'>
                      <div className='styled-select-filters'>
                        <select name='sort_price' id='sort_price'>
                          <option value selected>Sort by price</option>
                          <option value='lower'>Lowest price</option>
                          <option value='higher'>Highest price</option>
                        </select>
                      </div>
                    </div>
                    <div className='col-md-3 col-sm-4 col-6'>
                      <div className='styled-select-filters'>
                        <select name='sort_rating' id='sort_rating'>
                          <option value selected>Sort by ranking</option>
                          <option value='lower'>Lowest ranking</option>
                          <option value='higher'>Highest ranking</option>
                        </select>
                      </div>
                    </div>
                    <div className='col-md-6 col-sm-4 d-none d-sm-block text-right'>
                      <a href='all_tours_grid.html' className='bt_filters'><i className='icon-th' /></a> <a href='#' className='bt_filters'><i className=' icon-list' /></a>
                    </div>
                  </div>
                </div>
                {/*/tools */}
                <div className='strip_all_tour_list wow fadeIn' data-wow-delay='0.1s'>
                  <div className='row'>
                    <div className='col-lg-4 col-md-4'>
                      <div className='ribbon_3 popular'><span>Popular</span>
                      </div>
                      <div className='wishlist'>
                        <a className='tooltip_flip tooltip-effect-1' href='#!'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                      </div>
                      <div className='img_list'>
                        <a href='/product/1'><img src='img/tour_box_1.jpg' alt='Image' />
                          <div className='short_info'><i className='icon_set_1_icon-4' />Museums </div>
                        </a>
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                      <div className='tour_list_desc'>
                        <div className='rating'><i className='icon-smile voted' /><i className='icon-smile  voted' /><i className='icon-smile  voted' /><i className='icon-smile  voted' /><i className='icon-smile' /><small>(75)</small>
                        </div>
                        <h3><strong>Arch Triomphe</strong> tour</h3>
                        <p>Lorem ipsum dolor sit amet, quem convenire interesset ut vix, ad dicat sanctus detracto vis. Eos modus dolorum ex, qui adipisci maiestatis inciderint no, eos in elit dicat.....</p>
                        <ul className='add_info'>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-83' /></span>
                              <div className='tooltip-content'>
                                <h4>Schedule</h4>
                                <strong>Monday to Friday</strong> 09.00 AM - 5.30 PM
                                <br />
                                <strong>Saturday</strong> 09.00 AM - 5.30 PM
                                <br />
                                <strong>Sunday</strong> <span className='label label-danger'>Closed</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-41' /></span>
                              <div className='tooltip-content'>
                                <h4>Address</h4> Musée du Louvre, 75058 Paris - France
                                <br />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-97' /></span>
                              <div className='tooltip-content'>
                                <h4>Languages</h4> English - French - Chinese - Russian - Italian
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-27' /></span>
                              <div className='tooltip-content'>
                                <h4>Parking</h4> 1-3 Rue Elisée Reclus
                                <br /> 76 Rue du Général Leclerc
                                <br /> 8 Rue Caillaux 94923
                                <br />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-25' /></span>
                              <div className='tooltip-content'>
                                <h4>Transport</h4>
                                <strong>Metro: </strong>Musée du Louvre station (line 1)
                                <br />
                                <strong>Bus:</strong> 21, 24, 27, 39, 48, 68, 69, 72, 81, 95
                                <br />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-lg-2 col-md-2'>
                      <div className='price_list'>
                        <div><sup>$</sup>39*<span className='normal_price_list'>$99</span><small>*Per person</small>
                          <p><a href='/product/1' className='btn_1'>Details</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*End strip */}
                <div className='strip_all_tour_list wow fadeIn' data-wow-delay='0.2s'>
                  <div className='row'>
                    <div className='col-lg-4 col-md-4'>
                      <div className='ribbon_3 popular'><span>Popular</span>
                      </div>
                      <div className='wishlist'>
                        <a className='tooltip_flip tooltip-effect-1' href='#!'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                      </div>
                      <div className='img_list'>
                        <a href='/product/1'><img src='img/tour_box_2.jpg' alt='Image' />
                          <div className='short_info'><i className='icon_set_1_icon-44' />Churches</div>
                        </a>
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                      <div className='tour_list_desc'>
                        <div className='rating'><i className='icon-smile voted' /><i className='icon-smile  voted' /><i className='icon-smile  voted' /><i className='icon-smile  voted' /><i className='icon-smile' /><small>(75)</small>
                        </div>
                        <h3><strong>Notredame</strong> tour</h3>
                        <p>Lorem ipsum dolor sit amet, quem convenire interesset ut vix, ad dicat sanctus detracto vis. Eos modus dolorum ex, qui adipisci maiestatis inciderint no, eos in elit dicat.....</p>
                        <ul className='add_info'>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-83' /></span>
                              <div className='tooltip-content'>
                                <h4>Schedule</h4>
                                <strong>Monday to Friday</strong> 09.00 AM - 5.30 PM
                                <br />
                                <strong>Saturday</strong> 09.00 AM - 5.30 PM
                                <br />
                                <strong>Sunday</strong> <span className='label label-danger'>Closed</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-41' /></span>
                              <div className='tooltip-content'>
                                <h4>Address</h4> Musée du Louvre, 75058 Paris - France
                                <br />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-97' /></span>
                              <div className='tooltip-content'>
                                <h4>Languages</h4> English - French - Chinese - Russian - Italian
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-27' /></span>
                              <div className='tooltip-content'>
                                <h4>Parking</h4> 1-3 Rue Elisée Reclus
                                <br /> 76 Rue du Général Leclerc
                                <br /> 8 Rue Caillaux 94923
                                <br />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-25' /></span>
                              <div className='tooltip-content'>
                                <h4>Transport</h4>
                                <strong>Metro: </strong>Musée du Louvre station (line 1)
                                <br />
                                <strong>Bus:</strong> 21, 24, 27, 39, 48, 68, 69, 72, 81, 95
                                <br />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-lg-2 col-md-2'>
                      <div className='price_list'>
                        <div><sup>$</sup>42*<span className='normal_price_list'>$99</span><small>*Per person</small>
                          <p><a href='/product/1' className='btn_1'>Details</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*End strip */}
                <div className='strip_all_tour_list wow fadeIn' data-wow-delay='0.3s'>
                  <div className='row'>
                    <div className='col-lg-4 col-md-4'>
                      <div className='ribbon_3'><span>Top rated</span>
                      </div>
                      <div className='wishlist'>
                        <a className='tooltip_flip tooltip-effect-1' href='#!'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                      </div>
                      <div className='img_list'>
                        <a href='/product/1'><img src='img/tour_box_3.jpg' alt='Image' />
                          <div className='short_info'><i className='icon_set_1_icon-44' />Historic Buildings</div>
                        </a>
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                      <div className='tour_list_desc'>
                        <div className='rating'><i className='icon-smile voted' /><i className='icon-smile  voted' /><i className='icon-smile  voted' /><i className='icon-smile  voted' /><i className='icon-smile' /><small>(75)</small>
                        </div>
                        <h3><strong>Versailles</strong> tour</h3>
                        <p>Lorem ipsum dolor sit amet, quem convenire interesset ut vix, ad dicat sanctus detracto vis. Eos modus dolorum ex, qui adipisci maiestatis inciderint no, eos in elit dicat.....</p>
                        <ul className='add_info'>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-83' /></span>
                              <div className='tooltip-content'>
                                <h4>Schedule</h4>
                                <strong>Monday to Friday</strong> 09.00 AM - 5.30 PM
                                <br />
                                <strong>Saturday</strong> 09.00 AM - 5.30 PM
                                <br />
                                <strong>Sunday</strong> <span className='label label-danger'>Closed</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-41' /></span>
                              <div className='tooltip-content'>
                                <h4>Address</h4> Musée du Louvre, 75058 Paris - France
                                <br />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-97' /></span>
                              <div className='tooltip-content'>
                                <h4>Languages</h4> English - French - Chinese - Russian - Italian
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-27' /></span>
                              <div className='tooltip-content'>
                                <h4>Parking</h4> 1-3 Rue Elisée Reclus
                                <br /> 76 Rue du Général Leclerc
                                <br /> 8 Rue Caillaux 94923
                                <br />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-25' /></span>
                              <div className='tooltip-content'>
                                <h4>Transport</h4>
                                <strong>Metro: </strong>Musée du Louvre station (line 1)
                                <br />
                                <strong>Bus:</strong> 21, 24, 27, 39, 48, 68, 69, 72, 81, 95
                                <br />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-lg-2 col-md-2'>
                      <div className='price_list'>
                        <div><sup>$</sup>39*<span className='normal_price_list'>$99</span><small>*Per person</small>
                          <p><a href='/product/1' className='btn_1'>Details</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*End strip */}
                <div className='strip_all_tour_list wow fadeIn' data-wow-delay='0.4s'>
                  <div className='row'>
                    <div className='col-lg-4 col-md-4'>
                      <div className='ribbon_3'><span>Top rated</span>
                      </div>
                      <div className='wishlist'>
                        <a className='tooltip_flip tooltip-effect-1' href='#!'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                      </div>
                      <div className='img_list'>
                        <a href='/product/1'><img src='img/tour_box_4.jpg' alt='Image' />
                          <div className='short_info'><i className='icon_set_1_icon-37' />Walking tour</div>
                        </a>
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                      <div className='tour_list_desc'>
                        <div className='rating'><i className='icon-smile voted' /><i className='icon-smile  voted' /><i className='icon-smile  voted' /><i className='icon-smile  voted' /><i className='icon-smile' /><small>(75)</small>
                        </div>
                        <h3><strong>Pompidue</strong> tour</h3>
                        <p>Lorem ipsum dolor sit amet, quem convenire interesset ut vix, ad dicat sanctus detracto vis. Eos modus dolorum ex, qui adipisci maiestatis inciderint no, eos in elit dicat.....</p>
                        <ul className='add_info'>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-83' /></span>
                              <div className='tooltip-content'>
                                <h4>Schedule</h4>
                                <strong>Monday to Friday</strong> 09.00 AM - 5.30 PM
                                <br />
                                <strong>Saturday</strong> 09.00 AM - 5.30 PM
                                <br />
                                <strong>Sunday</strong> <span className='label label-danger'>Closed</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-41' /></span>
                              <div className='tooltip-content'>
                                <h4>Address</h4> Musée du Louvre, 75058 Paris - France
                                <br />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-97' /></span>
                              <div className='tooltip-content'>
                                <h4>Languages</h4> English - French - Chinese - Russian - Italian
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-27' /></span>
                              <div className='tooltip-content'>
                                <h4>Parking</h4> 1-3 Rue Elisée Reclus
                                <br /> 76 Rue du Général Leclerc
                                <br /> 8 Rue Caillaux 94923
                                <br />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-25' /></span>
                              <div className='tooltip-content'>
                                <h4>Transport</h4>
                                <strong>Metro: </strong>Musée du Louvre station (line 1)
                                <br />
                                <strong>Bus:</strong> 21, 24, 27, 39, 48, 68, 69, 72, 81, 95
                                <br />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-lg-2 col-md-2'>
                      <div className='price_list'>
                        <div><sup>$</sup>69*<span className='normal_price_list'>$59</span><small>*Per person</small>
                          <p><a href='/product/1' className='btn_1'>Details</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*End strip */}
                <div className='strip_all_tour_list wow fadeIn' data-wow-delay='0.5s'>
                  <div className='row'>
                    <div className='col-lg-4 col-md-4'>
                      <div className='ribbon_3'><span>Top rated</span>
                      </div>
                      <div className='wishlist'>
                        <a className='tooltip_flip tooltip-effect-1' href='#!'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                      </div>
                      <div className='img_list'>
                        <a href='/product/1'><img src='img/tour_box_14.jpg' alt='Image' />
                          <div className='short_info'><i className='icon_set_1_icon-28' />Skyline tour</div>
                        </a>
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                      <div className='tour_list_desc'>
                        <div className='rating'><i className='icon-smile voted' /><i className='icon-smile  voted' /><i className='icon-smile  voted' /><i className='icon-smile  voted' /><i className='icon-smile' /><small>(75)</small>
                        </div>
                        <h3><strong>Tour Eiffel</strong> tour</h3>
                        <p>Lorem ipsum dolor sit amet, quem convenire interesset ut vix, ad dicat sanctus detracto vis. Eos modus dolorum ex, qui adipisci maiestatis inciderint no, eos in elit dicat.....</p>
                        <ul className='add_info'>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-83' /></span>
                              <div className='tooltip-content'>
                                <h4>Schedule</h4>
                                <strong>Monday to Friday</strong> 09.00 AM - 5.30 PM
                                <br />
                                <strong>Saturday</strong> 09.00 AM - 5.30 PM
                                <br />
                                <strong>Sunday</strong> <span className='label label-danger'>Closed</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-41' /></span>
                              <div className='tooltip-content'>
                                <h4>Address</h4> Musée du Louvre, 75058 Paris - France
                                <br />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-97' /></span>
                              <div className='tooltip-content'>
                                <h4>Languages</h4> English - French - Chinese - Russian - Italian
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-27' /></span>
                              <div className='tooltip-content'>
                                <h4>Parking</h4> 1-3 Rue Elisée Reclus
                                <br /> 76 Rue du Général Leclerc
                                <br /> 8 Rue Caillaux 94923
                                <br />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-25' /></span>
                              <div className='tooltip-content'>
                                <h4>Transport</h4>
                                <strong>Metro: </strong>Musée du Louvre station (line 1)
                                <br />
                                <strong>Bus:</strong> 21, 24, 27, 39, 48, 68, 69, 72, 81, 95
                                <br />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-lg-2 col-md-2'>
                      <div className='price_list'>
                        <div><sup>$</sup>49*<span className='normal_price_list'>$59</span><small>*Per person</small>
                          <p><a href='/product/1' className='btn_1'>Details</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*End strip */}
                <div className='strip_all_tour_list wow fadeIn' data-wow-delay='0.7s'>
                  <div className='row'>
                    <div className='col-lg-4 col-md-4'>
                      <div className='ribbon_3'><span>Top rated</span>
                      </div>
                      <div className='wishlist'>
                        <a className='tooltip_flip tooltip-effect-1' href='#!'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                      </div>
                      <div className='img_list'>
                        <a href='/product/1'><img src='img/tour_box_5.jpg' alt='Image' />
                          <div className='short_info'><i className='icon_set_1_icon-44' />Historic Building</div>
                        </a>
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                      <div className='tour_list_desc'>
                        <div className='rating'><i className='icon-smile voted' /><i className='icon-smile  voted' /><i className='icon-smile  voted' /><i className='icon-smile  voted' /><i className='icon-smile' /><small>(75)</small>
                        </div>
                        <h3><strong>Pantheon</strong> tour</h3>
                        <p>Lorem ipsum dolor sit amet, quem convenire interesset ut vix, ad dicat sanctus detracto vis. Eos modus dolorum ex, qui adipisci maiestatis inciderint no, eos in elit dicat.....</p>
                        <ul className='add_info'>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-83' /></span>
                              <div className='tooltip-content'>
                                <h4>Schedule</h4>
                                <strong>Monday to Friday</strong> 09.00 AM - 5.30 PM
                                <br />
                                <strong>Saturday</strong> 09.00 AM - 5.30 PM
                                <br />
                                <strong>Sunday</strong> <span className='label label-danger'>Closed</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-41' /></span>
                              <div className='tooltip-content'>
                                <h4>Address</h4> Musée du Louvre, 75058 Paris - France
                                <br />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-97' /></span>
                              <div className='tooltip-content'>
                                <h4>Languages</h4> English - French - Chinese - Russian - Italian
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-27' /></span>
                              <div className='tooltip-content'>
                                <h4>Parking</h4> 1-3 Rue Elisée Reclus
                                <br /> 76 Rue du Général Leclerc
                                <br /> 8 Rue Caillaux 94923
                                <br />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='tooltip_styled tooltip-effect-4'>
                              <span className='tooltip-item'><i className='icon_set_1_icon-25' /></span>
                              <div className='tooltip-content'>
                                <h4>Transport</h4>
                                <strong>Metro: </strong>Musée du Louvre station (line 1)
                                <br />
                                <strong>Bus:</strong> 21, 24, 27, 39, 48, 68, 69, 72, 81, 95
                                <br />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-lg-2 col-md-2'>
                      <div className='price_list'>
                        <div><sup>$</sup>49*<span className='normal_price_list'>$59</span><small>*Per person</small>
                          <p><a href='/product/1' className='btn_1'>Details</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*End strip */}
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
                {/* end pagination*/}
              </div>
              {/* End col lg-9 */}
            </div>
            {/* End row */}
          </div>
          {/* End container */}
        </main>
      </React.Fragment>
    )
  }
}

export default ProductList
