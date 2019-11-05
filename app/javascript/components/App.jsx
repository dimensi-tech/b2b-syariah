import React from 'react'
import Routes from '../routes/Index'
import Header from './shared/Header'
import Footer from './shared/Footer'
import Search from './shared/Search'
import Login from './auth/Login'

export default props => (
  <React.Fragment>
    <div id='preloader'>
      <div className='sk-spinner sk-spinner-wave'>
        <div className='sk-rect1'></div>
        <div className='sk-rect2'></div>
        <div className='sk-rect3'></div>
        <div className='sk-rect4'></div>
        <div className='sk-rect5'></div>
      </div>
    </div>
    <div className='layer'></div>
    <Header />
    {Routes}
    <Footer />
    <Search />
    <Login />
  </React.Fragment>
)
