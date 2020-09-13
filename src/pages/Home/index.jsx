/** @jsx jsx */
import { Fragment, useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { Typography } from 'antd'
import { css, jsx } from '@emotion/core'
import Header from 'shared/Header'
import Slider from 'shared/Slider'
import Search from 'shared/Search'
import Footer from 'shared/Footer'
import Mosque from 'assets/images/mosque.jpg'
import Popular from './Popular'
import Partner from './Partner'
import { getData } from 'helpers/FetchData'
import './style.scss'

const { Title } = Typography

function Home({ t, ...props }) {
  const [slider, setSlider] = useState([])

  useEffect(() => {
    getSlider()
  }, [])

  async function getSlider() {
    const result = await getData('/ads/active_ads')
    result && setSlider(result.data)
  }

  return (
    <Fragment>
      <Header />
      <div className="container" css={css`padding-top: 64px`}>
        {slider?.length > 0 &&
          <Slider
            data={slider}
            options={{
              autoPlay: 5000,
              pauseAutoPlayOnHover: true,
              pageDots: false,
              wrapAround: true,
              contain: true,
              adaptiveHeight: false,
              lazyLoad: true
            }}
          >
            {slider.map((slide, index) => (
              <div
                key={index}
                className='slider-item'
                style={{
                  width: '100%'
                }}
              >
                <div className='slider-content'>
                  <img data-flickity-lazyload={slide.image_path} alt={slide.name} />
                </div>
              </div>
            ))}
          </Slider>
        }
        <div className="home-content">
          <div className="home-search">
            <Title level={3}>{t('home.search.title')}</Title>
            <Search t={t} />
          </div>
          <Popular {...props} />
          <div className="home-quote">
            <Title>Yuk Menabung Untuk Umroh Mulai Dari Sekarang!</Title>
            <img src={Mosque} alt="Mosque" />
          </div>
          <Partner />
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default withTranslation('common')(Home)