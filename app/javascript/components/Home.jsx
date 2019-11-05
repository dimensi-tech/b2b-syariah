import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Banner1 from './images/Banner/banner_1.jpg'
import Banner2 from './images/Banner/banner_2.jpg'
import Banner3 from './images/Banner/banner_3.jpg'

import Product_1_1 from './images/Product/product_1_1.jpg'
import Product_1_2 from './images/Product/product_1_2.jpg'
import Product_1_3 from './images/Product/product_1_3.jpg'

import Product_2_1 from './images/Product/product_2_1.jpg'
import Product_2_2 from './images/Product/product_2_2.jpg'
import Product_2_3 from './images/Product/product_2_3.jpg'

import Product_3_1 from './images/Product/product_3_1.jpg'
import Product_3_2 from './images/Product/product_3_2.jpg'
import Product_3_3 from './images/Product/product_3_3.jpg'

class Home extends Component {
  render() {
    return (
      <main>
        <div id='carousel-home'>
          <div className='owl-carousel owl-theme'>
            <div className='owl-slide cover' style={{backgroundImage: `url(${Banner1})`}}>
              <div className='opacity-mask d-flex align-items-center' data-opacity-mask='rgba(0, 0, 0, 0.5)'>
                <div className='container'>
                  <div className='row justify-content-center justify-content-md-start'>
                    <div className='col-lg-12 static'>
                      <div className='slide-text text-center white'>
                        <h2 className='owl-slide-animated owl-slide-title'>Going Inside<br />The Louvre Museum</h2>
                        <p className='owl-slide-animated owl-slide-subtitle'>
                          Discover hidden wonders on trips curated by Citytours Tours Experts
                        </p>
                        <div className='owl-slide-animated owl-slide-cta'><a className='btn_1' href='all_tours_list.html' role='button'>Read more</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*/owl-slide*/}
            <div className='owl-slide cover' style={{backgroundImage: `url(${Banner2})`}}>
              <div className='opacity-mask d-flex align-items-center' data-opacity-mask='rgba(0, 0, 0, 0.6)'>
                <div className='container'>
                  <div className='row justify-content-center justify-content-md-end'>
                    <div className='col-lg-6 static'>
                      <div className='slide-text text-right white'>
                        <h2 className='owl-slide-animated owl-slide-title'>Discover<br />Vatican Museum</h2>
                        <p className='owl-slide-animated owl-slide-subtitle'>
                          Discover hidden wonders on trips curated by Citytours Tours Experts
                        </p>
                        <div className='owl-slide-animated owl-slide-cta'><a className='btn_1' href='all_tours_list.html' role='button'>Read more</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*/owl-slide*/}
            <div className='owl-slide cover' style={{backgroundImage: `url(${Banner3})`}}>
              <div className='opacity-mask d-flex align-items-center' data-opacity-mask='rgba(0, 0, 0, 0.5)'>
                <div className='container'>
                  <div className='row justify-content-center justify-content-md-start'>
                    <div className='col-lg-6 static'>
                      <div className='slide-text white'>
                        <h2 className='owl-slide-animated owl-slide-title'>Love Paris<br />Arch de Triomphe</h2>
                        <p className='owl-slide-animated owl-slide-subtitle'>
                          Discover hidden wonders on trips curated by Citytours Tours Experts
                        </p>
                        <div className='owl-slide-animated owl-slide-cta'><a className='btn_1' href='all_tours_list.html' role='button'>Read more</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*/owl-slide*/}
          </div>
          <div id='icon_drag_mobile' />
        </div>
        {/*/carousel*/}
        <div className='container margin_60'>
          <div className='main_title'>
            <h2>Paris <span>Top</span> Tours</h2>
            <p>Each item listed with Carousel and Lazy Load Feature.</p>
          </div>
          <div className='row'>
            <div className='col-lg-4 col-md-6 wow zoomIn' data-wow-delay='0.1s'>
              <div className='tour_container'>
                <div className='ribbon_3 popular'><span>Popular</span></div>
                <div className='img_container_2'>
                  <div className='owl-carousel owl-theme carousel_item'>
                    <div className='item'>
                      <a href='/product/1'>
                        <img data-src={Product_1_1} width={800} height={533} alt='image' className='img-fluid owl-lazy' />
                      </a>
                    </div>
                    {/*/item*/}
                    <div className='item'>
                      <a href='/product/1'>
                        <img data-src={Product_1_2} width={800} height={533} alt='image' className='img-fluid owl-lazy' />
                      </a>
                    </div>
                    {/*/item*/}
                    <div className='item'>
                      <a href='/product/1'>
                        <img data-src={Product_1_3} width={800} height={533} alt='image' className='img-fluid owl-lazy' />
                      </a>
                    </div>
                    {/*/item*/}
                  </div>
                  {/*/carousel*/}
                  <div className='short_info'>
                    <i className='icon_set_1_icon-24' />Nature & Wildlife<span className='price'><sup>$</sup>39</span>
                  </div>
                </div>
                <div className='tour_title'>
                  <h3>Falcon Hospital Tour</h3>
                  <div className='rating'>
                    <i className='icon-smile voted' />
                    <i className='icon-smile voted' />
                    <i className='icon-smile voted' />
                    <i className='icon-smile voted' />
                    <i className='icon-smile' /><small>(75)</small>
                  </div>
                  {/* end rating */}
                  <div className='wishlist'>
                    <a className='tooltip_flip tooltip-effect-1' href='#!'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                  </div>
                  {/* End wish list*/}
                </div>
              </div>
              {/* End box tour */}
            </div>
            {/* End col */}
            <div className='col-lg-4 col-md-6 wow zoomIn' data-wow-delay='0.2s'>
              <div className='tour_container'>
                <div className='ribbon_3 popular'><span>Popular</span></div>
                <div className='img_container_2'>
                  <div className='owl-carousel owl-theme carousel_item'>
                    <div className='item'>
                      <a href='/product/1'>
                        <img data-src={Product_2_1} width={800} height={533} alt='image' className='img-fluid owl-lazy' />
                      </a>
                    </div>
                    {/*/item*/}
                    <div className='item'>
                      <a href='/product/1'>
                        <img data-src={Product_2_2} width={800} height={533} alt='image' className='img-fluid owl-lazy' />
                      </a>
                    </div>
                    {/*/item*/}
                    <div className='item'>
                      <a href='/product/1'>
                        <img data-src={Product_2_3} width={800} height={533} alt='image' className='img-fluid owl-lazy' />
                      </a>
                    </div>
                    {/*/item*/}
                  </div>
                  {/*/carousel*/}
                  <div className='short_info'>
                    <i className='icon_set_1_icon-3' />Attraction Tickets<span className='price'><sup>$</sup>45</span>
                  </div>
                </div>
                <div className='tour_title'>
                  <h3>Louvre Abu Dhabi</h3>
                  <div className='rating'>
                    <i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile' /><small>(75)</small>
                  </div>
                  {/* end rating */}
                  <div className='wishlist'>
                    <a className='tooltip_flip tooltip-effect-1' href='#!'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                  </div>
                  {/* End wish list*/}
                </div>
              </div>
              {/* End box tour */}
            </div>
            {/* End col */}
            <div className='col-lg-4 col-md-6 wow zoomIn' data-wow-delay='0.3s'>
              <div className='tour_container'>
                <div className='ribbon_3 popular'><span>Popular</span></div>
                <div className='img_container_2'>
                  <div className='owl-carousel owl-theme carousel_item'>
                    <div className='item'>
                      <a href='/product/1'>
                        <img data-src={Product_3_1} width={800} height={533} alt='image' className='img-fluid owl-lazy' />
                      </a>
                    </div>
                    {/*/item*/}
                    <div className='item'>
                      <a href='/product/1'>
                        <img data-src={Product_3_2} width={800} height={533} alt='image' className='img-fluid owl-lazy' />
                      </a>
                    </div>
                    {/*/item*/}
                    <div className='item'>
                      <a href='/product/1'>
                        <img data-src={Product_3_3} width={800} height={533} alt='image' className='img-fluid owl-lazy' />
                      </a>
                    </div>
                    {/*/item*/}
                  </div>
                  {/*/carousel*/}
                  <div className='short_info'>
                    <i className='icon_set_1_icon-44' />Sights & Landmarks<span className='price'><sup>$</sup>48</span>
                  </div>
                </div>
                <div className='tour_title'>
                  <h3>Syeikh Zayed Grand Mosque Tour</h3>
                  <div className='rating'>
                    <i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile voted' /><i className='icon-smile' /><small>(75)</small>
                  </div>
                  {/* end rating */}
                  <div className='wishlist'>
                    <a className='tooltip_flip tooltip-effect-1' href='#!'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                  </div>
                  {/* End wish list*/}
                </div>
              </div>
              {/* End box tour */}
            </div>
            {/* End col */}
          </div>
          {/* End row */}
          <p className='text-center add_bottom_30'>
            <a href='/product-list' className='btn_1'>View all Tours</a>
          </p>
          <hr className='mt-5 mb-5' />
          <div className='main_title'>
            <h2>Paris <span>Top</span> Hotels</h2>
            <p>Quisque at tortor a libero posuere laoreet vitae sed arcu. Curabitur consequat.</p>
          </div>
          <div className='owl-carousel owl-theme list_carousel add_bottom_30'>
            <div className='item'>
              <div className='hotel_container'>
                <div className='ribbon_3 popular'><span>Popular</span></div>
                <div className='img_container'>
                  <a href='single_hotel.html'>
                    <img src='img/hotel_1.jpg' width={800} height={533} className='img-fluid' alt='image' />
                    <div className='score'><span>7.5</span>Good</div>
                    <div className='short_info hotel'>
                      From/Per night<span className='price'><sup>$</sup>59</span>
                    </div>
                  </a>
                </div>
                <div className='hotel_title'>
                  <h3><strong>Park Hyatt</strong> Hotel</h3>
                  <div className='rating'>
                    <i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star-empty' />
                  </div>
                  {/* end rating */}
                  <div className='wishlist'>
                    <a className='tooltip_flip tooltip-effect-1' href='#'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                  </div>
                  {/* End wish list*/}
                </div>
              </div>
              {/* End box */}
            </div>
            {/* /item */}
            <div className='item'>
              <div className='hotel_container'>
                <div className='ribbon_3 popular'><span>Popular</span></div>
                <div className='img_container'>
                  <a href='single_hotel.html'>
                    <img src='img/hotel_2.jpg' width={800} height={533} className='img-fluid' alt='image' />
                    <div className='score'><span>9.0</span>Superb</div>
                    <div className='short_info hotel'>
                      From/Per night<span className='price'><sup>$</sup>45</span>
                    </div>
                  </a>
                </div>
                <div className='hotel_title'>
                  <h3><strong>Mariott</strong> Hotel</h3>
                  <div className='rating'>
                    <i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star-empty' />
                  </div>
                  {/* end rating */}
                  <div className='wishlist'>
                    <a className='tooltip_flip tooltip-effect-1' href='#'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                  </div>
                  {/* End wish list*/}
                </div>
              </div>
              {/* End box */}
            </div>
            {/* /item */}
            <div className='item'>
              <div className='hotel_container'>
                <div className='ribbon_3'><span>Top rated</span></div>
                <div className='img_container'>
                  <a href='single_hotel.html'>
                    <img src='img/hotel_3.jpg' width={800} height={533} className='img-fluid' alt='image' />
                    <div className='score'><span>9.5</span>Superb</div>
                    <div className='short_info hotel'>
                      From/Per night<span className='price'><sup>$</sup>39</span>
                    </div>
                  </a>
                </div>
                <div className='hotel_title'>
                  <h3><strong>Lumiere</strong> Hotel</h3>
                  <div className='rating'>
                    <i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star-empty' />
                  </div>
                  {/* end rating */}
                  <div className='wishlist'>
                    <a className='tooltip_flip tooltip-effect-1' href='#'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                  </div>
                  {/* End wish list*/}
                </div>
              </div>
              {/* End box */}
            </div>
            {/* /item */}
            <div className='item'>
              <div className='hotel_container'>
                <div className='ribbon_3'><span>Top rated</span></div>
                <div className='img_container'>
                  <a href='single_hotel.html'>
                    <img src='img/hotel_4.jpg' width={800} height={533} className='img-fluid' alt='image' />
                    <div className='score'><span>7.5</span>Good</div>
                    <div className='short_info hotel'>
                      From/Per night<span className='price'><sup>$</sup>45</span>
                    </div>
                  </a>
                </div>
                <div className='hotel_title'>
                  <h3><strong>Novelle</strong> Hotel</h3>
                  <div className='rating'>
                    <i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star-empty' />
                  </div>
                  {/* end rating */}
                  <div className='wishlist'>
                    <a className='tooltip_flip tooltip-effect-1' href='#!'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                  </div>
                  {/* End wish list*/}
                </div>
              </div>
              {/* End box */}
            </div>
            {/* /item */}
            <div className='item'>
              <div className='hotel_container'>
                <div className='ribbon_3'><span>Top rated</span></div>
                <div className='img_container'>
                  <a href='single_hotel.html'>
                    <img src='img/hotel_5.jpg' width={800} height={533} className='img-fluid' alt='image' />
                    <div className='score'><span>8.0</span>Good</div>
                    <div className='short_info hotel'>
                      From/Per night<span className='price'><sup>$</sup>39</span>
                    </div>
                  </a>
                </div>
                <div className='hotel_title'>
                  <h3><strong>Louvre</strong> Hotel</h3>
                  <div className='rating'>
                    <i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star voted' /><i className='icon-star-empty' />
                  </div>
                  {/* end rating */}
                  <div className='wishlist'>
                    <a className='tooltip_flip tooltip-effect-1' href='#'>+<span className='tooltip-content-flip'><span className='tooltip-back'>Add to wishlist</span></span></a>
                  </div>
                  {/* End wish list*/}
                </div>
              </div>
              {/* End box */}
            </div>
            {/* /item */}
          </div>
          {/* /carousel */}
          <p className='text-center nopadding'>
            <a href='all_hotels_list.html' className='btn_1'>View all Hotels</a>
          </p>
        </div>
        {/* End container */}
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
              {/* /wrapper */}
            </div>
            {/* /banner_2 */}
          </div>
          {/* End container */}
        </div>
        {/* End white_bg */}
        <div className='container margin_60'>
          <div className='main_title'>
            <h2>Lates <span>Blog</span> News</h2>
            <p>Quisque at tortor a libero posuere laoreet vitae sed arcu. Curabitur consequat.</p>
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <a className='box_news' href='#0'>
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
            {/* /box_news */}
            <div className='col-lg-6'>
              <a className='box_news' href='#0'>
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
            {/* /box_news */}
            <div className='col-lg-6'>
              <a className='box_news' href='#0'>
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
            {/* /box_news */}
            <div className='col-lg-6'>
              <a className='box_news' href='#0'>
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
            {/* /box_news */}
          </div>
          {/* /row */}
          <p className='btn_home_align'><a href='blog.html' className='btn_1 rounded'>View all news</a></p>
        </div>
        {/* End container */}
      </main>
    )
  }
}

export default Home
