import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Button, Typography, Badge, Space, Select, Pagination, Popconfirm, message } from 'antd'
import queryString from 'query-string'
import moment from 'moment'
import MainPage from 'services/MainPage'
import { thousandFormat } from 'services/TextFormat'
import { getData, postData } from 'helpers/FetchData'
import { STATIC_FILE_URL } from 'helpers/Environment'
import './style.scss'

const { Title } = Typography
const { Meta } = Card
const { Option } = Select

function BookingHistory({ t, ...props }) {
  const [bookings, setBookings] = useState([])
  const [page, setPage] = useState(1)
  const [metaPage, setMetaPage] = useState({})
  const { location } = props
  const params = queryString.parse(location.search)

  useEffect(() => {
    getBookings()
  }, [location, page])

  const getBookings = async () => {
    const parameters = []
    if (params.search) {
      parameters.push(`q[name_cont]=${params.search}`)
    }
    try {
      const result = await postData('/bookings/list_bookings', {
        page
      })
      setBookings(result.data?.booking)
      setMetaPage(result.data?.meta)
    } catch(e) {
      console.log(e)
    }
  }

  const cancelBooking = async (id) => {
    const response = await postData(`/bookings/cancel_booking?booking_id=${id}`)
    if (response) {
      message.success('Pesanan berhasil dibatalkan')
      getBookings()
    }
  }

  const redirectToDetail = (id) => {
    props.history.push(`/booking/${id}`)
  }

  const handleChangeSort = (value) => {
    console.log(`selected ${value}`)
  }

  return (
    <MainPage>
      <div className="bookings-content">
        <div className="bookings-body">
          <div>
            <div className="booking-options">
              <Title level={4}>{t('booking_history.title')}</Title>
              <Select defaultValue="popular" size="large" dropdownMatchSelectWidth={false} bordered={false} onChange={handleChangeSort}>
                <Option value="popular">Berdasarkan Pesanan Terakhir</Option>
              </Select>
            </div>
            <div className="list-bookings">
              {bookings?.length > 0 && bookings.map((booking, index) =>
                <Card
                  key={index}
                  cover={
                    <img
                      alt="example"
                      src={STATIC_FILE_URL + booking.product.image.url}
                    />
                  }
                  actions={[
                    <Button type="link" onClick={() => redirectToDetail(booking.id)}>{t('booking_history.detail_link')}</Button>,
                    // <Button type="link" disabled>Ganti Tgl Keberangkatan</Button>,
                    <p></p>,
                    <Popconfirm
                      title="Yakin ingin membatalkan pesanan?"
                      onConfirm={() => cancelBooking(booking.id)}
                      okText="Ya, Yakin"
                      cancelText="Tidak"
                      disabled={['paid', 'cancelled'].includes(booking.booking_status)}
                    >
                      <Button
                        type="link"
                        disabled={['paid', 'cancelled'].includes(booking.booking_status)}
                        danger
                      >
                        Batalkan Pesanan
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <Space direction="vertical">
                    <Meta
                      title={booking.product.name}
                    />
                    <div className="booking-info">
                      <p>Nama Paket</p>
                      <p>{booking.package.name}</p>
                    </div>
                    <div className="booking-info">
                      <p>Total Harga Pesanan</p>
                      <Title level={5} style={{ margin: 0 }}>Rp {thousandFormat(parseInt(booking.price))}</Title>
                    </div>
                    <div className="booking-info">
                      <p>Tipe Pembayaran</p>
                      <p>{booking.booking_type === 'savings' ? 'Bayar Nabung' : 'Bayar Penuh'}</p>
                    </div>
                    <div className="booking-info">
                      <p>Tanggal Keberangkatan</p>
                      <p>{moment(booking.departure_date, 'YYYY-MM-DD').format('DD MMMM YYYY')}</p>
                    </div>
                    <div className="booking-info">
                      <p>Berangkat Dari</p>
                      <p>Jakarta</p>
                    </div>
                    <div className="booking-info">
                      <p>Tanggal Pemesanan</p>
                      <p>{moment(booking.created_at).format('DD MMMM YYYY')}</p>
                    </div>
                    <div className="booking-info">
                      <p>Status Pesanan</p>
                      {booking.booking_status &&
                        <Badge
                          color={['cancelled', 'pending'].includes(booking.booking_status) ? 'red' : 'blue' }
                          text={t(`booking_details.${booking.booking_type}.${booking.booking_status}`)}
                        />
                      }
                    </div>
                  </Space>
                </Card>
              )}
            </div>
            <Pagination
              defaultCurrent={page}
              total={metaPage.total_pages}
              onChange={(page) => setPage(page)}
              style={{ marginTop: '1rem' }}
            />
          </div>
        </div>
      </div>
    </MainPage>
  )
}

export default withTranslation('common')(BookingHistory)