/** @jsx jsx */
import { useState, useEffect, Fragment, useRef } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Typography, Divider, Space, Badge, Button, Descriptions, Affix, PageHeader, Alert } from 'antd'
import { TagTwoTone, LoadingOutlined } from '@ant-design/icons'
import { css, jsx } from '@emotion/core'
import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'
import MainPage from 'services/MainPage'
import { thousandFormat } from 'services/TextFormat'
import { getData } from 'helpers/FetchData'
import { HOST_URL, KYC_URL, B2B_API_V1, MIDTRANS_SERVER } from 'helpers/Environment'
import Biodata from './Biodata'
import Identity from './Identity'
import Passport from './Passport'
import Saving from './Saving'
import './style.scss'

const { Title } = Typography
const PROXY = 'https://cors-anywhere.herokuapp.com'

function ProductDetail({ t, ...props }) {
  const [booking, setBooking] = useState()
  const [adults, setAdults] = useState([])
  const [childs, setChilds] = useState([])
  const [paymentStatus, setPaymentStatus] = useState('Loading...')
  const [midtrans, setMidtrans] = useState({})
  const [openPayment, setOpenPayment] = useState(false)
  const biodataRef = useRef(null)
  const identityRef = useRef(null)
  const passportRef = useRef(null)
  const savingRef = useRef(null)

  useEffect(() => {
    localStorage.removeItem('saving')
    localStorage.removeItem('booking')
    const script = document.createElement('script')
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute('data-client-key', "SB-Mid-server-YAxhhaXZP5u3MJchUadi296f")
    document.body.appendChild(script)
    getBooking()
  }, [])

  useEffect(() => {
    if (!_.isEmpty(booking) && _.isEmpty(adults)) {
      if (booking.identity_ids?.length > 0) {
        const currentAdults = [...Array(booking.adult).keys()].map(adult =>
          booking.identity_ids[adult] || null
        )
        setAdults(currentAdults)
      } else {
        const currentAdults = [...Array(booking.adult).keys()].map(adult => null)
        setAdults(currentAdults)
      }
    }
  }, [booking, adults])

  useEffect(() => {
    if (!_.isEmpty(booking) && _.isEmpty(childs)) {
      if (booking.child_passport_ids?.length > 0) {
        const currentChilds = [...Array(booking.child).keys()].map(child =>
          booking.child_passport_ids[child] || null
        )
        setChilds(currentChilds)
      } else {
        const currentChilds = [...Array(booking.child).keys()].map(child => null)
        setChilds(currentChilds)
      }
    }
  }, [booking, childs])

  useEffect(() => {
    if (booking?.midtrans_id && Object.keys(midtrans).length === 0) {
      axios.get(`${PROXY}/https://api.sandbox.midtrans.com/v2/${booking.midtrans_id}/status`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        auth: {
          username: MIDTRANS_SERVER,
          password: ''
        }
      }).then(res => {
        setMidtrans(res)
        const expireDate = moment(res.data.transacation_time).add(1, 'days').format('DD MMMM YYYY, h:mm:ss a')
        const isSaving = booking.booking_type === 'savings'
        switch (res.data?.transaction_status) {
          case 'pending':
            setPaymentStatus(`Status pembayaran pending, mohon bayar sebelum tanggal ${expireDate}`)
            break
          case 'settlement':
            setPaymentStatus(!isSaving ? 'DP sudah dibayarkan' : 'Pembayaran telah selesai')
            break
          case 'deny':
            setPaymentStatus('Menunggu Pembayaran')
            break
          case '404':
            setPaymentStatus('404')
            break
          default:
            setPaymentStatus('Menunggu Pembayaran')
            break
        }
      })
    } else if (booking?.midtrans_id === null) {
      setPaymentStatus('Menunggu Pembayaran')
    }
  }, [booking, midtrans])

  const getBooking = async () => {
    const { match } = props
    try {
      const result = await getData(`/booking/${match.params.id}`)
      setBooking(result.data)
    } catch(e) {
      console.log(e)
    }
  }

  const handleBiodata = (index, type, action) => {
    biodataRef.current.showModal(action, index, type)
  }

  const pay = () => {
    setOpenPayment(true)
    let grossAmount = booking.price
    switch (booking.booking_status) {
      case 'pending':
        grossAmount = getDownPayment()
        break
      case 'payment_50':
        grossAmount = (booking.price - getDownPayment()) / 2
        break
      case 'payment_final':
        grossAmount = (booking.price - getDownPayment()) / 2
        break
      default:
        grossAmount = booking.price
        break
    }
    let parameter = {
      "transaction_details": {
        "order_id": `${booking.id}${Date.now()}`,
        "gross_amount": grossAmount
      }, "credit_card": {
        "secure" : true
      }
    }
    let updateMidtrans = {
      booking_id: booking.id,
      midtrans_id: `${booking.id}${Date.now()}`,
      status: 0
    }
    axios.post(`${PROXY}/https://app.sandbox.midtrans.com/snap/v1/transactions`, parameter, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      auth: {
        username: MIDTRANS_SERVER,
        password: ''
      }
    }).then(res => {
      localStorage.setItem('booking', JSON.stringify(booking))
      axios.post(`${B2B_API_V1}/bookings/update_midtrans`, updateMidtrans, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('authUser'))?.token || ''
        }
      })
      window.snap.pay(`${res.data.token}`)
      setOpenPayment(false)
    })
  }

  const getDownPayment = () => {
    const selectedPackage = booking.package
    if (selectedPackage.down_payment_type === 'percentage') {
      return booking.price * selectedPackage.down_payment_percentage / 100
    } else {
      return selectedPackage.down_payment_flat
    }
  }

  const getStatus = () => {
    switch (booking.booking_status) {
      case 'pending':
        return <Badge color="red" text={t(`booking_details.${booking.booking_type}.pending`)} />
      case 'saving_progress':
        return <Badge color="blue" text={t(`booking_details.${booking.booking_type}.saving_progress`)} />
      case 'cancelled':
        return <Badge color="red" text={t(`booking_details.${booking.booking_type}.cancelled`)} />
      case 'payment_50':
        return <Badge color="yellow" text={t(`booking_details.${booking.booking_type}.payment_50`)} />
      case 'payment_final':
        return <Badge color="yellow" text={t(`booking_details.${booking.booking_type}.payment_final`)} />
      case 'paid':
        return <Badge color="green" text={t(`booking_details.${booking.booking_type}.paid`)} />
      default:
        // props.history.push('/')
        break
    }
  }

  return (
    <MainPage>
      <div className="booking-detail-content">
        {booking &&
          <Fragment>
            <Space className="booking-body">
              <div className="booking-detail-wrapper">
                <div className="booking-header">
                  <TagTwoTone twoToneColor="#52c41a" />
                  <PageHeader
                    className="site-page-header"
                    title="Detail Pesanan"
                    subTitle="Halaman informasi untuk detail pesanan anda"
                    css={css`padding: 0`}
                  />
                </div>
                <Divider />
                <Space direction="vertical" size={20}>
                  <div className="booking-information">
                    <Descriptions title="Informasi Pesanan" bordered>
                      <Descriptions.Item label="Paket" span={3}>
                        {booking.product?.name} - {booking.package?.name}<br />
                        <Button type="link" href={`/product/${booking.product?.id}`} target="_blank" css={css`padding: 0`}>
                          Lihat detail
                        </Button>
                      </Descriptions.Item>
                      <Descriptions.Item label="Tanggal Keberangkatan" span={3}>
                        {moment(booking.departure_date, 'YYYY-MM-DD').format('DD MMMM YYYY')}
                      </Descriptions.Item>
                      <Descriptions.Item label="Lama Perjalanan" span={3}>
                        {booking.package?.duration_trip} hari
                      </Descriptions.Item>
                      <Descriptions.Item label="Jumlah Penumpang" span={3}>
                        Dewasa: {booking.adult} orang<br />
                        {booking.child && `Anak: ${booking.child} orang`}
                      </Descriptions.Item>
                      <Descriptions.Item label="Status Pesanan" span={3}>
                        {getStatus()}
                      </Descriptions.Item>
                      {/* {booking.booking_status !== 'cancelled' &&
                        <Descriptions.Item label="Status Pesanan" span={3}>
                          <Badge status="warning" text={paymentStatus} />
                        </Descriptions.Item>
                      } */}
                      {booking.booking_type === 'full' &&
                        <Descriptions.Item label="Total Down Payment (DP)" span={3}>
                          Rp {thousandFormat(parseInt(getDownPayment()))} {booking.booking_status !== 'pending' && '(Lunas)'}
                        </Descriptions.Item>
                      }
                      <Descriptions.Item label="Total Harga Paket" span={3}>
                        Rp {thousandFormat(parseInt(booking.price))}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                  <div className="person-information">
                    <h5>Informasi Penumpang</h5>
                    <p css={css`font-weight: 500;padding-bottom: 0.5rem`}>Dewasa</p>
                    {booking.booking_status !== 'cancelled' ? (
                      <Card css={css`margin-bottom: 1rem`}>
                        {adults?.length > 0 && adults.map((adult, index) =>
                          <Card.Grid key={index}>
                            <h5>Penumpang {index + 1}</h5>
                            <Space direction="vertical" size={14}>
                              {adult && typeof(adult) === 'number' ? (
                                <Space direction="vertical" size={14}>
                                  <Button size="large" type="primary" onClick={() => identityRef.current.showModal(index)} block>
                                    {t("booking_details.see_identity_button")}
                                  </Button>
                                  <Button size="large" type="primary" onClick={() => passportRef.current.showModal(index)} block>
                                    {t("booking_details.see_passport_button")}
                                  </Button>
                                  {booking.booking_type === "savings" &&
                                    <Button size="large" type="primary" onClick={() => savingRef.current.showModal(adult, 'adult')} block>
                                      {t("booking_details.see_saving_button")}
                                    </Button>
                                  }
                                </Space>
                              ) : (
                                <Button size="large" block>
                                  <a href={`${KYC_URL}?referrer=${window.location.href}/${index}`}>
                                    {t("booking_details.fill_identity_and_passport")}
                                  </a>
                                </Button>
                              )}
                              {booking.adult_bio_ids[index] ? (
                                <Button size="large" type="primary" onClick={() => handleBiodata(index, 'adult', 'show')} block>
                                  {t("booking_details.see_biodata_button")}
                                </Button>
                              ) : (
                                <Button size="large" onClick={() => handleBiodata(index, 'adult', 'create')} block>
                                  {t("booking_details.fill_biodata")}
                                </Button>
                              )}
                            </Space>
                          </Card.Grid>
                        )}
                      </Card>
                    ) : (
                      <p>-</p>
                    )}
                    <p css={css`font-weight: 500;padding-bottom: 0.5rem`}>Anak</p>
                    {booking.booking_status !== 'cancelled' ? (
                      <Card>
                        {childs?.length > 0 && childs.map((child, index) =>
                          <Card.Grid key={index}>
                            <h5>Penumpang {index + 1}</h5>
                            <Space direction="vertical" size={14}>
                              {child && typeof(child) === 'number' ? (
                                <Fragment>
                                  <Button size="large" type="primary" onClick={() => passportRef.current.showModal(index, 'child')} block>
                                    {t("booking_details.see_passport_button")}
                                  </Button>
                                  {booking.booking_type === "savings" && booking.booking_status !== "pending" &&
                                    <Button style={{ marginTop: 14 }} size="large" type="primary" onClick={() => savingRef.current.showModal(child, 'child')} block>
                                      {t("booking_details.see_saving_button")}
                                    </Button>
                                  }
                                </Fragment>
                              ) : (
                                <Button size="large" block>
                                  <a href={`${KYC_URL}?referrer=${HOST_URL}/assign_passport/${booking.id}/${index}&passport_only=true`}>
                                    {t("booking_details.fill_passport")}
                                  </a>
                                </Button>
                              )}
                              {booking.child_bio_ids[index] ? (
                                <Button size="large" type="primary" onClick={() => handleBiodata(index, 'child', 'show')} block>
                                  {t("booking_details.see_biodata_button")}
                                </Button>
                              ) : (
                                <Button size="large" onClick={() => handleBiodata(index, 'child', 'create')} block>
                                  {t("booking_details.fill_biodata")}
                                </Button>
                              )}
                            </Space>
                          </Card.Grid>
                        )}
                      </Card>
                    ) : (
                      <p>-</p>
                    )}
                  </div>
                </Space>
              </div>
              <Affix offsetTop={89}>
                <div className="selected-packages">
                  {booking.booking_status !== 'cancelled' &&
                    <div className="package-info">
                      <Title level={5}>Status Pembayaran</Title>
                      <p style={{ maxWidth: 414 }}>
                        {booking.booking_status !== 'cancelled' && paymentStatus}
                      </p>
                    </div>
                  }
                  {paymentStatus !== 'Loading...' ? (
                    <Fragment>
                      {booking.booking_status === 'pending' &&
                        <Button
                          className="secondary"
                          onClick={pay}
                          loading={openPayment}
                          size="large"
                          block
                        >
                          {t(`booking_details.${booking.booking_type}.pay_now`)}
                        </Button>
                      }
                      {booking.booking_status === 'saving_progress' &&
                        <Alert
                          message="Memproses Tabungan"
                          description={t('booking_details.data_filling')}
                          type="warning"
                          showIcon
                        />
                      }
                      {booking.booking_status === 'cancelled' &&
                        <Alert
                          message="Pesanan Dibatalkan"
                          description={t('booking_details.cancelled')}
                          type="error"
                          showIcon
                        />
                      }
                      {booking.booking_status === 'paid' &&
                        <Alert
                          message="Pesanan Berhasil"
                          description={t('booking_details.paid')}
                          type="success"
                          showIcon
                        />
                      }
                    </Fragment>
                  ) : (
                    <p align="center">
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    </p>
                  )}
                </div>
              </Affix>
            </Space>
            <Biodata
              t={t}
              ref={biodataRef}
              booking={booking}
              refreshData={() => getBooking()}
              {...props}
            />
            <Identity
              t={t}
              ref={identityRef}
              booking={booking}
              {...props}
            />
            <Passport
              t={t}
              ref={passportRef}
              booking={booking}
              {...props}
            />
            <Saving
              t={t}
              ref={savingRef}
              booking={booking}
              {...props}
            />
          </Fragment>
        }
      </div>
    </MainPage>
  )
}

export default withTranslation('common')(ProductDetail)