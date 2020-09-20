/** @jsx jsx */
import { useState, useEffect, Fragment, useRef } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Typography, Divider, Space, Badge, Select, Tabs, Button, Descriptions, Affix, PageHeader } from 'antd'
import { TagTwoTone, IdcardTwoTone, RocketTwoTone, EnvironmentTwoTone } from '@ant-design/icons'
import { css, jsx } from '@emotion/core'
import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'
import MainPage from 'services/MainPage'
import { thousandFormat } from 'services/TextFormat'
import { getData } from 'helpers/FetchData'
import { HOST_URL, KYC_URL, KYC_API_V1, B2B_API_V1, MIDTRANS_SERVER } from 'helpers/Environment'
import Biodata from './Biodata'
import Identity from './Identity'
import Passport from './Passport'
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

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute('data-client-key', "SB-Mid-server-YAxhhaXZP5u3MJchUadi296f")
    document.body.appendChild(script)
    getBooking()
  }, [])

  useEffect(() => {
    if (!_.isEmpty(booking) && _.isEmpty(adults)) {
      if (booking.identity_ids.length > 0) {
        setAdults(booking.identity_ids);
        [...Array(booking.adult).keys()].map(adult =>
          booking.identity_ids[adult] !== null ? showDataAdult(adult) : null
        )
      } else {
        const adults = [...Array(booking.adult).keys()].map(adult => null)
        setAdults(adults)
      }
    }
  }, [booking, adults])

  useEffect(() => {
    if (!_.isEmpty(booking) && _.isEmpty(childs)) {
      if (booking.identity_ids.length > 0) {
        setChilds(booking.identity_ids);
        [...Array(booking.child).keys()].map(child =>
          booking.identity_ids[child] !== null ? showDatachild(child) : null
        )
      } else {
        const childs = [...Array(booking.child).keys()].map(child => null)
        setChilds(childs)
      }
    }
  }, [booking, childs])

  useEffect(() => {
    if (booking?.midtrans_id && Object.keys(midtrans).length === 0) {
      axios.get(`${PROXY}/https://api.sandbox.midtrans.com/v2/${booking.midtrans_id}/status`, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }).then(res => {
        setMidtrans(res)
        const expireDate = moment(res.data.transacation_time).add(1, 'days').format('DD MMMM YYYY, h:mm:ss a')
        switch (res.data?.transaction_status) {
          case 'pending':
            setPaymentStatus(`Status pembayaran pending, mohon bayar sebelum tanggal ${expireDate}`)
            break
          case 'settlement':
            setPaymentStatus('Pembayaran telah selesai')
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

  const showDataAdult = (adult) => {
    if (!_.isEmpty(booking)) {
      if (booking.identity_ids.length > 0) {
        const identity = booking.identity_ids[adult];
        if (identity) {
          axios.get(`${KYC_API_V1}/identities/find_identity?id=${identity}`).then(res => {
            let clone = [...adults]
            clone[adult] = res.data
            setAdults(clone)
          })
        }
      }
    }
  }

  const showDatachild = (child) => {
    if (!_.isEmpty(booking)) {
      if (booking.child_passport_ids.length > 0) {
        const passport = booking.child_passport_ids[child];
        if (passport) {
          axios.get(`${KYC_API_V1}/passports/find_passport?id=${passport}&child=true`).then(res => {
            let clone = [...childs]
            clone[child] = res.data
            setChilds(clone)
          })
        }
      }
    }
  }

  const handleBiodata = (index, type, action) => {
    biodataRef.current.showModal(action, index, type)
  }

  const pay = () => {
    setOpenPayment(true)
    const grossAmount = booking.price
    let parameter = {
      "transaction_details": {
        "order_id": `${booking.id}${Date.now()}`,
        "gross_amount": grossAmount
      }, "credit_card":{
        "secure" : true
      }
    };
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
      axios.post(`${B2B_API_V1}/bookings/update_midtrans`, updateMidtrans, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('authUser'))?.token || ''
        }
      })
      window.snap.pay(`${res.data.token}`)
      setOpenPayment(false)
    })
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
                        {booking.product.name} - {booking.package.name}<br />
                        <Button type="link" href={`/product/${booking.product.id}`} target="_blank" css={css`padding: 0`}>
                          Lihat detail
                        </Button>
                      </Descriptions.Item>
                      <Descriptions.Item label="Tanggal Keberangkatan" span={3}>
                        {moment(booking.departure_date, 'YYYY-MM-DD').format('DD MMMM YYYY')}
                      </Descriptions.Item>
                      <Descriptions.Item label="Lama Perjalanan" span={3}>
                        {booking.package.duration_trip} hari
                      </Descriptions.Item>
                      <Descriptions.Item label="Jumlah Peserta" span={3}>
                        Dewasa: {booking.adult} orang<br />
                        {booking.child && `Anak: ${booking.child} orang`}
                      </Descriptions.Item>
                      <Descriptions.Item label="Status Pesanan" span={3}>
                        {booking.booking_status}
                      </Descriptions.Item>
                      {booking.booking_status !== 'cancelled' &&
                        <Descriptions.Item label="Status Pesanan" span={3}>
                          <Badge status="warning" text={paymentStatus} />
                        </Descriptions.Item>
                      }
                      <Descriptions.Item label="Total Harga Paket" span={3}>
                        Rp {thousandFormat(parseInt(booking.price))}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                  <div className="person-information">
                    <h5>Informasi Peserta</h5>
                    <p css={css`font-weight: 500;padding-bottom: 0.5rem`}>Dewasa</p>
                    <Card css={css`margin-bottom: 1rem`}>
                      {adults.length > 0 && adults.map((adult, index) =>
                        <Card.Grid key={index}>
                          <h5>Peserta {index + 1}</h5>
                          <Space direction="vertical" size={14}>
                            {adult && typeof(adult) === 'object' ? (
                              <Space direction="vertical" size={14}>
                                <Button size="large" type="primary" onClick={() => identityRef.current.showModal(index)} block>
                                  {t("booking_details.see_identity_button")}
                                </Button>
                                <Button size="large" type="primary" onClick={() => passportRef.current.showModal(index)} block>
                                  {t("booking_details.see_passport_button")}
                                </Button>
                                {/* <Button size="large" type="secondary" block>
                                  {t("booking_details.see_saving_button")}
                                </Button> */}
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
                    <p css={css`font-weight: 500;padding-bottom: 0.5rem`}>Anak</p>
                    <Card>
                      {childs.length > 0 && childs.map((child, index) =>
                        <Card.Grid key={index}>
                          <h5>Peserta {index + 1}</h5>
                          <Space direction="vertical" size={14}>
                            {child && typeof(child) === 'object' ? (
                              <Fragment>
                                <Button size="large" type="primary" onClick={() => passportRef.current.showModal(index, 'child')} block>
                                  {t("booking_details.see_passport_button")}
                                </Button>
                              </Fragment>
                            ) : (
                              <Button size="large" block>
                                <a href={`${KYC_URL}?referrer=${HOST_URL}/assign_passport/${booking.id}/${index}&passport_only=true`}>
                                  {t("booking_details.fill_identity_and_passport")}
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
                  </div>
                </Space>
              </div>
              <Affix offsetTop={89}>
                <div className="selected-packages">
                  <div className="package-info">
                    <Title level={5}>Status Pesanan</Title>
                    <p>{booking.booking_status !== 'cancelled' && paymentStatus}</p>
                  </div>
                  {booking.booking_type === 'full' ? (
                    booking.booking_status !== 'cancelled' ? (
                      <Fragment>
                        {paymentStatus === 'Menunggu Pembayaran' &&
                          <Button
                            className="secondary"
                            onClick={pay}
                            loading={openPayment}
                            size="large"
                            block
                          >
                            {t('booking_details.pay_now')}
                            
                          </Button>
                        }
                      </Fragment>
                    ) : (
                      <Title level={3}>{t('booking_details.cancelled')}</Title>
                    )
                  ) : (
                    booking.booking_status !== 'cancelled' ? (
                      <Fragment>
                        <Title level={3}>{t('booking_details.data_filling')}</Title>
                      </Fragment>
                    ) : (
                      <Title level={3} danger>{t('booking_details.cancelled')}</Title>
                    )
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
          </Fragment>
        }
      </div>
    </MainPage>
  )
}

export default withTranslation('common')(ProductDetail)