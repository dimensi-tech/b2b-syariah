import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header>
        <div id='top_line'>
          <div className='container'>
            <div className='row'>
              <div className='col-6'><i className='icon-phone' /><strong>0045 043204434</strong></div>
              <div className='col-6'>
                <ul id='top_links'>
                  <li><a href='#sign-in-dialog' id='access_link'>Sign in</a></li>
                  <li><a href='wishlist.html' id='wishlist_link'>Wishlist</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-3'>
              <div id='logo_home'>
                <h1><a href='/' title='City tours travel template'>City Tours travel template</a></h1>
              </div>
            </div>
            <nav className='col-9'>
              <a className='cmn-toggle-switch cmn-toggle-switch__htx open_close' href='#!'><span>Menu mobile</span></a>
              <div className='main-menu'>
                <div id='header_menu'>
                  <img src='/img/logo_sticky.png' width={160} height={34} alt='City tours' data-retina='true' />
                </div>
                <a href='#' className='open_close' id='close_in'><i className='icon_set_1_icon-77' /></a>
                <ul>
                  <li className='submenu'>
                    <a href='/' className='show-submenu'>Home</a>
                  </li>
                  <li className='submenu'>
                    <a href='/product-list' className='show-submenu'>Products</a>
                  </li>
                  <li className='submenu'>
                    <a href='/pricing' className='show-submenu'>Pricing</a>
                  </li>
                  {/*
                    <li className='submenu'>
                      <a href='#!' className='show-submenu'>Hotels <i className='icon-down-open-mini' /></a><ul>
                        <li><a href='all_hotels_list.html'>All hotels list</a></li>
                        <li><a href='all_hotels_grid.html'>All hotels grid</a></li>
                        <li><a href='all_hotels_map_listing.html'>All hotels map listing</a></li>
                        <li><a href='single_hotel.html'>Single hotel page</a></li>
                        <li><a href='single_hotel_datepicker_adv.html'>Single hotel datepicker adv</a></li>
                        <li><a href='single_hotel_datepicker_v2.html'>Date and time picker V2</a></li>
                        <li><a href='single_hotel_working_booking.php'>Single hotel working booking</a></li>
                        <li><a href='single_hotel_contact.php'>Single hotel contact working</a></li>
                        <li><a href='cart_hotel.html'>Cart hotel</a></li>
                        <li><a href='payment_hotel.html'>Booking hotel</a></li>
                        <li><a href='confirmation_hotel.html'>Confirmation hotel</a></li>
                      </ul>
                    </li>
                    <li className='submenu'>
                      <a href='#!' className='show-submenu'>Transfers <i className='icon-down-open-mini' /></a>
                      <ul>
                        <li><a href='all_transfer_list.html'>All transfers list</a></li>
                        <li><a href='all_transfer_grid.html'>All transfers grid</a></li>
                        <li><a href='single_transfer.html'>Single transfer page</a></li>
                        <li><a href='single_transfer_datepicker_v2.html'>Date and time picker V2</a></li>
                        <li><a href='cart_transfer.html'>Cart transfers</a></li>
                        <li><a href='payment_transfer.html'>Booking transfers</a></li>
                        <li><a href='confirmation_transfer.html'>Confirmation transfers</a></li>
                      </ul>
                    </li>
                    <li className='submenu'>
                      <a href='#!' className='show-submenu'>Restaurants <i className='icon-down-open-mini' /></a>
                      <ul>
                        <li><a href='all_restaurants_list.html'>All restaurants list</a></li>
                        <li><a href='all_restaurants_grid.html'>All restaurants grid</a></li>
                        <li><a href='all_restaurants_map_listing.html'>All restaurants map listing</a></li>
                        <li><a href='single_restaurant.html'>Single restaurant page</a></li>
                        <li><a href='single_restaurant_datepicker_v2.html'>Date and time picker V2</a></li>
                        <li><a href='payment_restaurant.html'>Booking restaurant</a></li>
                        <li><a href='confirmation_restaurant.html'>Confirmation transfers</a></li>
                      </ul>
                    </li>
                    <li className='megamenu submenu'>
                      <a href='#!' className='show-submenu-mega'>Bonus<i className='icon-down-open-mini' /></a>
                      <div className='menu-wrapper'>
                        <div className='row'>
                          <div className='col-lg-4'>
                            <h3>Header styles</h3>
                            <ul>
                              <li><a href='index.html'>Default transparent</a></li>
                              <li><a href='header_2.html'>Plain color</a></li>
                              <li><a href='header_3.html'>Plain color on scroll</a></li>
                              <li><a href='header_4.html'>With socials on top</a></li>
                              <li><a href='header_5.html'>With language selection</a></li>
                              <li><a href='header_6.html'>With lang and conversion</a></li>
                              <li><a href='header_7.html'>With full horizontal menu</a></li>
                            </ul>
                          </div>
                          <div className='col-lg-4'>
                            <h3>Footer styles</h3>
                            <ul>
                              <li><a href='index.html'>Footer default</a></li>
                              <li><a href='footer_2.html'>Footer style 2</a></li>
                              <li><a href='footer_3.html'>Footer style 3</a></li>
                              <li><a href='footer_4.html'>Footer style 4</a></li>
                              <li><a href='footer_5.html'>Footer style 5</a></li>
                              <li><a href='footer_6.html'>Footer style 6</a></li>
                              <li><a href='footer_7.html'>Footer style 7</a></li>
                            </ul>
                          </div>
                          <div className='col-lg-4'>
                            <h3>Shop section</h3>
                            <ul>
                              <li><a href='shop.html'>Shop</a></li>
                              <li><a href='shop-single.html'>Shop single</a></li>
                              <li><a href='shopping-cart.html'>Shop cart</a></li>
                              <li><a href='checkout.html'>Shop Checkout</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='megamenu submenu'>
                      <a href='#!' className='show-submenu-mega'>Pages<i className='icon-down-open-mini' /></a>
                      <div className='menu-wrapper'>
                        <div className='row'>
                          <div className='col-lg-4'>
                            <h3>Pages</h3>
                            <ul>
                              <li><a href='about.html'>About us</a></li>
                              <li><a href='general_page.html'>General page</a></li>
                              <li><a href='tourist_guide.html'>Tourist guide</a></li>
                              <li><a href='wishlist.html'>Wishlist page</a></li>
                              <li><a href='faq.html'>Faq</a></li>
                              <li><a href='faq_2.html'>Faq smooth scroll</a></li>
                              <li><a href='pricing_tables.html'>Pricing tables</a></li>
                              <li><a href='gallery_3_columns.html'>Gallery 3 columns</a></li>
                              <li><a href='gallery_4_columns.html'>Gallery 4 columns</a></li>
                              <li><a href='grid_gallery_1.html'>Grid gallery</a></li>
                              <li><a href='grid_gallery_2.html'>Grid gallery with filters</a></li>
                            </ul>
                          </div>
                          <div className='col-lg-4'>
                            <h3>Pages</h3>
                            <ul>
                              <li><a href='contact_us_1.html'>Contact us 1</a></li>
                              <li><a href='contact_us_2.html'>Contact us 2</a></li>
                              <li><a href='blog_right_sidebar.html'>Blog</a></li>
                              <li><a href='blog.html'>Blog left sidebar</a></li>
                              <li><a href='login.html'>Login</a></li>
                              <li><a href='register.html'>Register</a></li>
                              <li><a href='invoice.html' target='_blank'>Invoice</a></li>
                              <li><a href='404.html'>404 Error page</a></li>
                              <li><a href='site_launch/index.html'>Site launch / Coming soon</a></li>
                              <li><a href='timeline.html'>Tour timeline</a></li>
                              <li><a href='page_with_map.html'><i className='icon-map' />  Full screen map</a></li>
                            </ul>
                          </div>
                          <div className='col-lg-4'>
                            <h3>Elements</h3>
                            <ul>
                              <li><a href='footer_2.html'><i className='icon-columns' /> Footer with working newsletter</a></li>
                              <li><a href='footer_5.html'><i className='icon-columns' /> Footer with Twitter feed</a></li>
                              <li><a href='icon_pack_1.html'><i className='icon-inbox-alt' /> Icon pack 1 (1900)</a></li>
                              <li><a href='icon_pack_2.html'><i className='icon-inbox-alt' /> Icon pack 2 (100)</a></li>
                              <li><a href='icon_pack_3.html'><i className='icon-inbox-alt' /> Icon pack 3 (30)</a></li>
                              <li><a href='icon_pack_4.html'><i className='icon-inbox-alt' /> Icon pack 4 (200)</a></li>
                              <li><a href='icon_pack_5.html'><i className='icon-inbox-alt' /> Icon pack 5 (360)</a></li>
                              <li><a href='shortcodes.html'><i className='icon-tools' /> Shortcodes</a></li>
                              <li><a href='newsletter_template/newsletter.html' target='blank'><i className=' icon-mail' /> Responsive email template</a></li>
                              <li><a href='admin.html'><i className='icon-cog-1' />  Admin area</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  */}
                </ul>
              </div>
              <ul id='top_tools'>
                <li>
                  <a href='#!' className='search-overlay-menu-btn'><i className='icon_search' /></a>
                </li>
                <li>
                  <div className='dropdown dropdown-cart'>
                    <a href='#' data-toggle='dropdown' className='cart_bt'><i className='icon_bag_alt' /><strong>3</strong></a>
                    <ul className='dropdown-menu' id='cart_items'>
                      <li>
                        <div className='image'><img src='/img/thumb_cart_1.jpg' alt='image' /></div>
                        <strong><a href='#'>Louvre museum</a>1x $36.00 </strong>
                        <a href='#' className='action'><i className='icon-trash' /></a>
                      </li>
                      <li>
                        <div className='image'><img src='/img/thumb_cart_2.jpg' alt='image' /></div>
                        <strong><a href='#'>Versailles tour</a>2x $36.00 </strong>
                        <a href='#' className='action'><i className='icon-trash' /></a>
                      </li>
                      <li>
                        <div className='image'><img src='/img/thumb_cart_3.jpg' alt='image' /></div>
                        <strong><a href='#'>Versailles tour</a>1x $36.00 </strong>
                        <a href='#' className='action'><i className='icon-trash' /></a>
                      </li>
                      <li>
                        <div>Total: <span>$120.00</span></div>
                        <a href='cart.html' className='button_drop'>Go to cart</a>
                        <a href='payment.html' className='button_drop outline'>Check out</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
