import React from 'react'
import { Row, Col, Typography, Space, Button } from 'antd'
import { FacebookFilled, TwitterSquareFilled, InstagramFilled, YoutubeFilled } from '@ant-design/icons'
import Vector from 'assets/images/footer/vector1.jpg'
import Logo from 'assets/images/logo.png'
import './style.scss'

const { Title } = Typography

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <Row>
          <Col span={8}>
            <Space direction="vertical">
              <img src={Logo} alt="Footer Logo" />
              <p>
                Kami adalah penyedia jasa Tour & Travel yang memberikan pelayanan dalam bidang paket Islamic Tour, kami memberikan harga yang murah dengan tetap memberikan kualitas terbaik.
              </p>
            </Space>
          </Col>
          <Col span={4}>
            <Space direction="vertical">
              <Title level={4}>
                Produk
              </Title>
              <a href="#!">Halal Trip</a>
              <a href="#!">Souvenir</a>
              <a href="#!">Voucher</a>
            </Space>
          </Col>
          <Col span={6}>
            <Space direction="vertical">
              <Title level={4}>
                Social Media
              </Title>
              <Button type="default" icon={<FacebookFilled />}>Facebook.com/majreha</Button>
              <Button type="default" icon={<TwitterSquareFilled />}>@majreha_com</Button>
              <Button type="default" icon={<InstagramFilled />}>@majreha_official</Button>
              <Button type="default" icon={<YoutubeFilled />}>Majreha Channel</Button>
            </Space>
          </Col>
          <Col span={6}>
            <Space direction="vertical">
              <Title level={4}>
                Partner Pembayaran
              </Title>
              <div className="payment-partners">
                <div className="partner-item">
                  <img src="https://alpha12.pusat.baznas.go.id/application/views/assets/link/linkaja-logo.png" alt="partner1" />
                </div>
                <div className="partner-item">
                  <img src="https://www.fahmidev.com/wp-content/uploads/2019/10/Logo-GoPay-Vector-CDR-dan-PNG.png" alt="partner1" />
                </div>
                <div className="partner-item">
                  <img src="https://1.bp.blogspot.com/-cnqbyNUAhE8/Xcodaak_3PI/AAAAAAAABJ4/pWOFZNTwReEyBUt6XIjy5Sk_yWrh76ytACLcBGAsYHQ/s1600/Logo%2BBank%2BBCA.png" alt="partner1" />
                </div>
                <div className="partner-item">
                  <img src="https://img2.pngdownload.id/20180810/gsp/kisspng-logo-bank-cimb-niaga-surabaya-global-sentra-solusi-5b6d9aa79c7787.9060909815339096716409.jpg" alt="partner1" />
                </div>
                <div className="partner-item">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Danamon.svg/1200px-Danamon.svg.png" alt="partner1" />
                </div>
                <div className="partner-item">
                  <img src="https://logos-download.com/wp-content/uploads/2016/06/Bank_Mandiri_logo_white_bg.png" alt="partner1" />
                </div>
              </div>
            </Space>
          </Col>
        </Row>
      </div>
      <img src={Vector} alt="Footer Vector" />
      <p className="copyright">© 2020 PT. Majreha Halal Travel. All rights reserved</p>
    </footer>
  )
}

export default Footer