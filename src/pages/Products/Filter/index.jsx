/** @jsx jsx */
import { useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Typography, Divider, Slider, DatePicker, Space, Rate } from 'antd'
import { css, jsx } from '@emotion/core'
import { thousandFormat } from 'services/TextFormat'
import './style.scss'

const { Title } = Typography

function Filter({ t, ...props }) {
  const [rangePrice, setRangePrice] = useState([1000000, 100000000])
  const [durationTrip, setDurationTrip] = useState([1, 30])
  const [departureDate, setDepartureDate] = useState()

  const onChangeRangePrice = (value) => {
    setRangePrice(value)
  }

  const onChangeDurationTrip = (value) => {
    setDurationTrip(value)
  }

  const onChangeDepartureDate = (value) => {
    console.log(value)
  }

  return (
    <div className="products-filter">
      <Card title="Filter" style={{ width: 300 }}>
        <Space direction="vertical" size={10} css={css`width: 100%`}>
          <Title level={5}>Waktu Keberangkatan</Title>
          <div className="datepicker-filter">
            <DatePicker onChange={onChangeDepartureDate} picker="month" />
          </div>
        </Space>
        <Divider />
        <Space direction="vertical" size={10} css={css`width: 100%`}>
          <Title level={5}>Range Harga</Title>
          <div>
            <div className="range-prices">
              <p>Rp. {thousandFormat(rangePrice[0])}</p>
              <p>-</p>
              <p>Rp. {thousandFormat(rangePrice[1])}</p>
            </div>
            <Slider tooltipVisible={false} onChange={onChangeRangePrice} range defaultValue={rangePrice} step={1000000} min={1000000} max={100000000} />
          </div>
        </Space>
        <Divider />
        <Space direction="vertical" size={10} css={css`width: 100%`}>
          <Title level={5}>Rating</Title>
          <div className="rate-filter">
            <Rate />
          </div>
        </Space>
        <Divider />
        <Space direction="vertical" size={10} css={css`width: 100%`}>
          <Title level={5}>Durasi Perjalanan</Title>
          <div>
            <div className="range-prices">
              <p>{durationTrip[0]} Hari</p>
              <p>-</p>
              <p>{durationTrip[1]} Hari</p>
            </div>
            <Slider tooltipVisible={false} onChange={onChangeDurationTrip} range defaultValue={durationTrip} step={1} min={1} max={30} />
          </div>
        </Space>
      </Card>
    </div>
  )
}

export default withTranslation('common')(Filter)


