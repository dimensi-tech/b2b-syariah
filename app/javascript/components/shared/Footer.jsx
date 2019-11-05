import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer className='revealed'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 col-md-4'>
              <h3>Need help?</h3>
              <a href='tel://004542344599' id='phone'>+45 423 445 99</a>
              <a href='mailto:help@citytours.com' id='email_footer'>help@citytours.com</a>
              <p><img src='/img/payments.png' width={231} height={30} alt='Image' data-retina='true' className='img-fluid' /></p>
            </div>
            <div className='col-lg-2 col-md-3 ml-md-auto'>
              <h3>About</h3>
              <ul>
                <li><a href='#'>About us</a>
                </li>
                <li><a href='#'>FAQ</a>
                </li>
                <li><a href='#'>Blog</a>
                </li>
                <li><a href='#'>Contacts</a>
                </li>
                <li><a href='#'>Login</a>
                </li>
                <li><a href='#'>Register</a>
                </li>
                <li><a href='#'>Terms and condition</a>
                </li>
              </ul>
            </div>
            <div className='col-lg-3 col-md-4' id='newsletter'>
              <h3>Newsletter</h3>
              <p>Join our newsletter to keep be informed about offers and news.</p>
              <div id='message-newsletter_2' />
              <form method='post' action='assets/newsletter.php' name='newsletter_2' id='newsletter_2'>
                <div className='form-group'>
                  <input name='email_newsletter_2' id='email_newsletter_2' type='email' defaultValue='' placeholder='Your mail' className='form-control' />
                </div>
                <input type='submit' defaultValue='Subscribe' className='btn_1' id='submit-newsletter_2' />
              </form>
            </div>
            <div className='col-lg-2 ml-lg-auto'>
              <h3>Settings</h3>
              <div className='styled-select'>
                <select defaultValue='English' name='lang' id='lang'>
                  <option value='English'>English</option>
                  <option value='French'>French</option>
                  <option value='Spanish'>Spanish</option>
                  <option value='Russian'>Russian</option>
                </select>
              </div>
              <div className='styled-select'>
                <select defaultValue='USD' name='currency' id='currency'>
                  <option value='USD'>USD</option>
                  <option value='EUR'>EUR</option>
                  <option value='GBP'>GBP</option>
                  <option value='RUB'>RUB</option>
                </select>
              </div>
            </div>
          </div>
          {/* End row */}
          <div className='row'>
            <div className='col-lg-12'>
              <div id='social_footer'>
                <ul>
                  <li><a href='#'><i className='icon-facebook' /></a>
                  </li>
                  <li><a href='#'><i className='icon-twitter' /></a>
                  </li>
                  <li><a href='#'><i className='icon-google' /></a>
                  </li>
                  <li><a href='#'><i className='icon-instagram' /></a>
                  </li>
                  <li><a href='#'><i className='icon-pinterest' /></a>
                  </li>
                  <li><a href='#'><i className='icon-vimeo' /></a>
                  </li>
                  <li><a href='#'><i className='icon-youtube-play' /></a>
                  </li>
                </ul>
                <p>© Citytours 2018</p>
              </div>
            </div>
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </footer>

    )
  }
}

export default Footer
