import React, { Component } from 'react'

class Pricing extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <section className="parallax-window" data-parallax="scroll" data-image-src="img/header_bg.jpg" data-natural-width={1400} data-natural-height={470}>
            <div className="parallax-content-1">
              <div className="animated fadeInDown">
                <h1>Pricing tables</h1>
                <p>Ridiculus sociosqu cursus neque cursus curae ante scelerisque vehicula.</p>
              </div>
            </div>
          </section>
          {/* End Section */}
          <main>
            <div id="position">
              <div className="container">
                <ul>
                  <li><a href="#">Home</a>
                  </li>
                  <li><a href="#">Category</a>
                  </li>
                  <li>Page active</li>
                </ul>
              </div>
            </div>
            {/* End Position */}
            <div className="container margin_60">
              <div className="main_title">
                <h2><span>Affordable </span>packages for travellers</h2>
                <p>
                  Quisque at tortor a libero posuere laoreet vitae sed arcu. Curabitur consequat.
                </p>
              </div>
              <hr />
              <div className="row text-center plans">
                <div className="plan col-lg-4">
                  <h2 className="plan-title">Bronze</h2>
                  <p className="plan-price">$99<span>/00</span>
                  </p>
                  <ul className="plan-features">
                    <li><strong>Check and go</strong> included</li>
                    <li><strong>3 tours</strong> included</li>
                    <li><strong>3 months</strong> valid</li>
                  </ul>
                  <p className="text-center"><a href="payment.html" className=" btn_1">Subscribe now</a>
                  </p>
                </div>
                {/* End col */}
                <div className="plan plan-tall col-lg-4">
                  <span className="ribbon_table" />
                  <h2 className="plan-title">Silver</h2>
                  <p className="plan-price">$199<span>/00</span>
                  </p>
                  <ul className="plan-features">
                    <li><strong>30 Day money back</strong> guarantee</li>
                    <li><strong>Check and go</strong> included</li>
                    <li><strong>6 tours</strong> included</li>
                    <li><strong>6 months</strong> valid</li>
                  </ul>
                  <p className="text-center"><a href="payment.html" className=" btn_1 green">Subscribe now</a>
                  </p>
                </div>
                {/* End col */}
                <div className="plan col-lg-4">
                  <h2 className="plan-title">Gold</h2>
                  <p className="plan-price">$299<span>/00</span>
                  </p>
                  <ul className="plan-features">
                    <li><strong>30 Day money back</strong> guarantee</li>
                    <li><strong>Check and go</strong> included</li>
                    <li><strong>3 tours</strong> inclued</li>
                    <li><strong>6 months</strong> valid</li>
                    <li><strong>Travel guide</strong> included</li>
                  </ul>
                  <p className="text-center"><a href="payment.html" className=" btn_1">Subscribe now</a>
                  </p>
                </div>
                {/* End col */}
              </div>
              {/* End row plans*/}
              <hr />
              <div className="row">
                <div className="col-lg-12">
                  <h3>Other pricing tables</h3>
                </div>
              </div>
              {/* end row */}
              <div className="row" id="pricing_2">
                <div className="col-lg-3 col-md-6">
                  <div className="pricing-table black ">
                    <div className="pricing-table-header">
                      <span className="heading">Single Tour</span>
                      <span className="price-value"><span>30</span><span className="mo">$</span></span>
                    </div>
                    <div className="pricing-table-space" />
                    <div className="pricing-table-features">
                      <p><strong>One month</strong> valid</p>
                      <p><strong> Saving</strong> %</p>
                      <p><strong>Saving price</strong> 0$</p>
                      <p>-</p>
                    </div>
                    <div className="pricing-table-sign-up">
                      <a href="payment.html" className="btn_1">BUY NOW!</a>
                    </div>
                  </div>
                  {/* End pricing-table*/}
                </div>
                {/* End col */}
                <div className="col-lg-3 col-md-6">
                  <div className="pricing-table black">
                    <div className="pricing-table-header">
                      <span className="heading">4 Tours</span>
                      <span className="price-value"><span>280</span><span className="mo">$</span></span>
                    </div>
                    <div className="pricing-table-space " />
                    <div className="pricing-table-features">
                      <p><strong>Three month</strong> valid</p>
                      <p><strong> Saving </strong> 20%</p>
                      <p><strong>Saving price</strong> 40$</p>
                      <p><strong>Unlimited</strong>access</p>
                    </div>
                    <div className="pricing-table-sign-up">
                      <a href="payment.html" className="btn_1">BUY NOW!</a>
                    </div>
                  </div>
                  {/* End pricing-table*/}
                </div>
                {/* End col */}
                <div className="col-lg-3 col-md-6">
                  <div className="pricing-table green ">
                    <span className="ribbon_2" />
                    <div className="pricing-table-header">
                      <span className="heading">Full Access</span>
                      <span className="price-value"><span>39</span><span className="mo">$ monthly</span></span>
                    </div>
                    <div className="pricing-table-space" />
                    <div className="pricing-table-features">
                      <p><strong>12 month</strong> valid</p>
                      <p><strong> Saving </strong> 30%</p>
                      <p><strong>Saving price</strong> 80$</p>
                      <p><strong>Unlimited</strong>access</p>
                    </div>
                    <div className="pricing-table-sign-up">
                      <a href="payment.html" className="btn_1">BUY NOW!</a>
                    </div>
                  </div>
                  {/* End pricing-table*/}
                </div>
                {/* End col */}
                <div className="col-lg-3 col-md-6">
                  <div className="pricing-table black">
                    <div className="pricing-table-header">
                      <span className="heading">Full + Travel guide</span>
                      <span className="price-value"><span>800</span><span className="mo">$</span></span>
                    </div>
                    <div className="pricing-table-space " />
                    <div className="pricing-table-features">
                      <p><strong>Nine month</strong> valid</p>
                      <p><strong> Saving </strong> 40%</p>
                      <p><strong>Saving price</strong> 120$</p>
                      <p><strong>Unlimited</strong>access + Extra</p>
                    </div>
                    <div className="pricing-table-sign-up">
                      <a href="payment.html" className="btn_1">BUY NOW!</a>
                    </div>
                  </div>
                  {/* End pricing-table*/}
                </div>
                {/* End col */}
              </div>
              {/* end row */}
              <hr />
              <div className="row">
                <div className="col-md-12">
                  <h3>Membership FAQ</h3>
                </div>
              </div>
              {/* end row */}
              <div className="row">
                <div className="col-md-4">
                  <div className="question_box">
                    <h3>No sit debitis meliore postulant, per ex prompta alterum sanctus?</h3>
                    <p>
                      Lorem ipsum dolor sit amet, in porro albucius qui, in nec quod novum accumsan, mei ludus tamquam dolores id. No sit debitis meliore postulant, per ex prompta alterum sanctus, pro ne quod dicunt sensibus.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="question_box">
                    <h3>Autem putent singulis usu ea, bonorum suscipit eum?</h3>
                    <p>
                      Lorem ipsum dolor sit amet, in porro albucius qui, in nec quod novum accumsan, mei ludus tamquam dolores id. No sit debitis meliore postulant, per ex prompta alterum sanctus, pro ne quod dicunt sensibus.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="question_box">
                    <h3>Pro moderatius philosophia ad, ad mea mupercipitur?</h3>
                    <p>
                      Lorem ipsum dolor sit amet, in porro albucius qui, in nec quod novum accumsan, mei ludus tamquam dolores id. No sit debitis meliore postulant, per ex prompta alterum sanctus, pro ne quod dicunt sensibus.
                    </p>
                  </div>
                </div>
              </div>
              {/* end row */}
            </div>
            {/* End container */}
          </main>
        </div>
      </React.Fragment>
    )
  }
}

export default Pricing
