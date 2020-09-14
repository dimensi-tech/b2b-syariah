import React, { useState, useEffect } from 'react'
import { Typography, Space, Card, Divider, Rate } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { getData } from 'helpers/FetchData'
import { thousandFormat } from 'services/TextFormat'
import './style.scss'

const { Title } = Typography

function Partner() {
  return (
    <Space direction="vertical" style={{ width: '100%', padding: '4rem 2rem 8rem' }}>
      <Title level={2}>Partner Travel</Title>
      <div className="partner-content">
        <div className="partner-info">
          <p><b>Partner Travel Paling Terbaik</b></p>
          <p>Kami bekerja sama dengan berbagai jaringan travel di seluruh dunia untuk memastikan kenyamanan perjalanan anda kemanapun!</p>
        </div>
        <div className="partner-logos">
          <div className="partner-logo">
            <img src="https://3.bp.blogspot.com/-jZjY3C_OHn8/VlVpDeroSpI/AAAAAAAAAGI/s2L8jJNbaMs/s1600/logo-alhijaz-indowisata-2015-2016.jpg" alt="logo" />
          </div>
          <div className="partner-logo">
            <img src="https://travelumrohaji.com/wp-content/uploads/2020/03/logo-jejakimani-black-white-934x1024.png" alt="logo" />
          </div>
          <div className="partner-logo">
            <img src="https://res.cloudinary.com/umrohcom/image/upload/v1554698641/biro_cover/kujjtacyjzxmcttzpgr0.png" alt="logo" />
          </div>
          <div className="partner-logo">
            <img src="https://aliago.id/assets/travelix/images/logo%20(1).png" alt="logo" />
          </div>
          <div className="partner-logo">
            <img src="https://pbs.twimg.com/profile_images/734656343055835136/x3wZWfLQ_400x400.jpg" alt="logo" />
          </div>
          <div className="partner-logo">
            <img src="https://res.cloudinary.com/umrohcom/image/upload/v1555389707/biro_cover/hnghrlrokmjzkajk2qbm.jpg" alt="logo" />
          </div>
          <div className="partner-logo">
            <img src="https://www.bmw2002tour.com/wp-content/uploads/2018/01/Logo-Pariwisata-Halal-Indonesia-01.png" alt="logo" />
          </div>
        </div>
      </div>
    </Space>
  )
}

export default Partner