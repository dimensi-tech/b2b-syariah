import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Typography, Divider, Space, Rate, Select, Pagination } from 'antd'
import queryString from 'query-string'
import Filter from './Filter'
import MainPage from 'services/MainPage'
import Search from 'shared/Search'
import { thousandFormat } from 'services/TextFormat'
import { getData } from 'helpers/FetchData'
import './style.scss'

const { Title } = Typography
const { Meta } = Card
const { Option } = Select

function Products({ t, ...props }) {
  const [products, setProducts] = useState([])
  const { location } = props
  const params = queryString.parse(location.search)

  useEffect(() => {
    getProducts()
  }, [location])

  const getProducts = async () => {
    try {
      const result = await getData('/products/list_products?q[name_cont]=' + params.search)
      setProducts(result.data)
      console.log(result.data)
    } catch(e) {
      console.log(e)
    }
  }

  const redirectToDetail = (id) => {
    props.history.push(`/product/${id}`)
  }

  const handleChangeSort = (value) => {
    console.log(`selected ${value}`)
  }

  return (
    <MainPage>
      <div className="products-content">
        <Search t={t} />
        <div className="products-body">
          <Filter />
          <div>
            <div className="product-options">
              <Title level={4}>{t('products.result')}</Title>
              <Select defaultValue="popular" size="large" dropdownMatchSelectWidth={false} bordered={false} onChange={handleChangeSort}>
                <Option value="popular">Popular</Option>
                <Option value="min">Harga Terendah</Option>
                <Option value="max">Harga Tertinggi</Option>
                <Option value="departure">Waktu Keberangkatan Terdekat</Option>
              </Select>
            </div>
            <div className="list-products">
              {products.length > 0 && products.map((product, index) =>
                <Card
                  key={index}
                  hoverable
                  onClick={() => redirectToDetail(product.id)}
                  cover={
                    <img
                      alt="example"
                      src={product.image_path}
                    />
                  }
                >
                  <Space direction="vertical">
                    <Meta
                      title={product.name}
                    />
                    <div className="product-info">
                      <p>Mulai dari</p>
                      <Title level={5}>Rp {thousandFormat(parseInt(product.package.price))}</Title>
                    </div>
                    <Divider style={{ margin: 0 }} />
                    <div className="product-info">
                      <p>Kategori</p>
                      <p>{product.category?.name || 'N/A'}</p>
                    </div>
                    <div className="product-info">
                      <p>Rating</p>
                      <Rate disabled defaultValue={5} />
                    </div>
                    <div className="product-info">
                      <p>Durasi Perjalanan</p>
                      <p>{product.package.duration_trip} hari</p>
                    </div>
                    <div className="product-info">
                      <p>Berangkat Dari</p>
                      <p>Jakarta</p>
                    </div>
                  </Space>
                </Card>
              )}
            </div>
            <Pagination defaultCurrent={1} total={50} style={{ marginTop: '1rem' }} />
          </div>
        </div>
      </div>
    </MainPage>
  )
}

export default withTranslation('common')(Products)