import React from 'react'
import {Link} from 'react-router-dom'

function NotFound() {
  return (
    <section id='hero' style={{background: '#4d536d url(../../../assets/img/packages/slide_hero.jpg) no-repeat center center'}}>
      <div className='intro_title error'>
        <h1 className='animated fadeInDown'>404</h1>
        <p className='animated fadeInDown'>Halaman tidak ditemukan</p>
        <Link to='/' className='animated fadeInUp button_intro'>Kembali ke Beranda</Link>
      </div>
    </section>
  )
}

export default NotFound