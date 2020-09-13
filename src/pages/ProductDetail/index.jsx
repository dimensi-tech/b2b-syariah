/** @jsx jsx */
import { useState, useEffect, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { Row, Col, Typography, Divider, Space, Rate, Select, Tabs, Button, Timeline, Affix } from 'antd'
import { ClockCircleTwoTone, IdcardTwoTone, RocketTwoTone, EnvironmentTwoTone } from '@ant-design/icons'
import { css, jsx } from '@emotion/core'
import _ from 'lodash'
import MainPage from 'services/MainPage'
import { thousandFormat } from 'services/TextFormat'
import { getData } from 'helpers/FetchData'
import { isLoggedIn } from 'helpers/Authorization'
import './style.scss'

const { Title } = Typography
const { TabPane } = Tabs
const { Option } = Select

function ProductDetail({ t, ...props }) {
  const [product, setProduct] = useState()
  const [selectedPackage, setSelectedPackage] = useState()
  const [packageKey, setPackageKey] = useState("0")

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    const { match } = props
    try {
      const result = await getData(`/product/${match.params.id}`)
      setProduct(result.data)
      setSelectedPackage(result.data.packages[0])
      console.log(result.data)
    } catch(e) {
      console.log(e)
    }
  }

  const changePackageTab = (key) => {
    setSelectedPackage(product.packages[key])
    setPackageKey(key)
  }

  const handleChangePackage = (value) => {
    const currentPackage = _.find(product.packages, (productPackage) => productPackage.id === value)
    setSelectedPackage(currentPackage)
    setPackageKey(_.findIndex(product.packages, { id: currentPackage.id }))
  }

  const bookingNow = () => {
    const { history, match } = props
    if (isLoggedIn()) {
      history.push(`/product/${match.params.id}/package/${selectedPackage.id}`)
    } else {
      document.getElementById('majreha-login').click()
    }
  }

  return (
    <MainPage>
      <div className="product-content">
        {product &&
          <Fragment>
            <div className="product-header">
              <Title level={2}>{product.name}</Title>
              <Space direction="horizontal" className="product-header-info">
                <div className="product-rate">
                  <Rate disabled defaultValue={4} />
                  <span css={css`margin-left: 0.25rem`}><b>4.0</b></span>
                </div>
                <a href="#!">{product.category.name}</a>
                <a href="#!" className="product-destination">
                  {product.travel_destination.destination}
                </a>
              </Space>
            </div>
            <div className="product-gallery">
              <img src={product.image_path} alt={product.name} />
            </div>
            <Space className="product-body">
              <Tabs activeKey={`${packageKey}`} onChange={changePackageTab} size="large">
                {product.packages.map((productPackage, index) =>
                  <TabPane tab={productPackage.name} key={index}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col className="gutter-row" span={12}>
                        <div className="product-info">
                          <IdcardTwoTone twoToneColor="#52c41a" />
                          <div>
                            <Title level={5}>Jumlah Orang</Title>
                            <p>Dewasa {productPackage.min_adult} - {productPackage.max_adult} orang</p>
                            {productPackage.min_child && productPackage.max_child &&
                              <p>Anak-anak {productPackage.min_child} - {productPackage.max_child} orang</p>
                            }
                          </div>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={12}>
                        <div className="product-info">
                          <ClockCircleTwoTone twoToneColor="#52c41a" />
                          <div>
                            <Title level={5}>Durasi Perjalanan</Title>
                            <p>{productPackage.duration_trip} hari</p>
                          </div>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={12}>
                        <div className="product-info">
                          <RocketTwoTone twoToneColor="#52c41a" />
                          <div>
                            <Title level={5}>Berangkat Dari</Title>
                            <p>Jakarta</p>
                          </div>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={12}>
                        {/* <div className="product-info">
                          <ClockCircleTwoTone twoToneColor="#52c41a" />
                          <div>
                            <Title level={5}>Durasi Perjalanan</Title>
                            <p>{productPackage.duration_trip} hari</p>
                          </div>
                        </div> */}
                      </Col>
                    </Row>
                    <Divider />
                    <div dangerouslySetInnerHTML={{__html: product.description}} />
                    <Divider />
                    <Timeline>
                      {productPackage.package_details.map(packageDetail =>
                        <Timeline.Item dot={<EnvironmentTwoTone twoToneColor="#52c41a"/>} key={packageDetail.id}>
                          <Space direction="vertical">
                            <Title level={3}>Hari ke {packageDetail.day}</Title>
                            <p dangerouslySetInnerHTML={{__html: packageDetail.description}} />
                            <img src={packageDetail.image_path} alt={packageDetail.id} />
                          </Space>
                        </Timeline.Item>
                      )}
                    </Timeline>
                  </TabPane>
                )}
              </Tabs>
              {selectedPackage &&
                <Affix offsetTop={106}>
                  <div className="select-packages">
                    <div className="package-price">
                      <Title level={5}>Mulai Dari</Title>
                      <div>
                        <Title level={4}>Rp {thousandFormat(parseInt(selectedPackage.adult_price))}</Title>
                        /pax
                      </div>
                    </div>
                    <Select value={selectedPackage.id} onChange={handleChangePackage}>
                      {product.packages.map((productPackage, index) =>
                        <Option key={index} value={productPackage.id}>{productPackage.name}</Option>
                      )}
                    </Select>
                    <Button type="primary" onClick={() => bookingNow()}>Pesan Sekarang</Button>
                  </div>
                </Affix>
              }
            </Space>
          </Fragment>
        }
      </div>
    </MainPage>
  )
}

export default withTranslation('common')(ProductDetail)