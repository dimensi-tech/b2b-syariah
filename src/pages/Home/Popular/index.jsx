import React, { useState, useEffect } from 'react'
import { Typography, Space, Card, Divider, Rate } from 'antd'
import { postData } from 'helpers/FetchData'
import { thousandFormat } from 'services/TextFormat'

const { Title } = Typography
const { Meta } = Card

function Popular(props) {
  const [popular, setPopular] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const result = await postData('/products/list_products')
      setPopular(result.data?.product)
    } catch(e) {
      console.log(e)
    }
  }

  const redirectToDetail = (id) => {
    const { history } = props
    history.push(`/product/${id}`)
  }

  return (
    <Space direction="vertical" style={{ padding: '0 2rem 2rem' }}>
      <Title level={2}>Popular Trip</Title>
      <div className="product-items">
        {popular?.length > 0 && popular.slice(0,8).map((product, index) =>
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
                <Title level={5}>Rp {thousandFormat(parseInt(product.package?.adult_price))}</Title>
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
                <p>{product.package?.duration_trip} hari</p>
              </div>
              <div className="product-info">
                <p>Berangkat Dari</p>
                <p>Jakarta</p>
              </div>
            </Space>
          </Card>
        )}
      </div>
    </Space>
  )
}

export default Popular