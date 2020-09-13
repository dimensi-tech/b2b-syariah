/** @jsx jsx */
import { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { css, jsx } from '@emotion/core'
import Header from 'shared/Header'
import Footer from 'shared/Footer'

function MainPage({ t, ...props }) {
  localStorage.removeItem('redirectStorage')
  return (
    <Fragment>
      <Header />
      <div className="container" css={css`padding-top: 64px`}>
        {props.children}
      </div>
      <Footer />
    </Fragment>
  )
}

export default withTranslation('common')(MainPage)


