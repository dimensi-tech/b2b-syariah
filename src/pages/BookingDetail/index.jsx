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
import { KYC_API_V1 } from 'helpers/Environment'
import { isLoggedIn } from 'helpers/Authorization'
import Biodata from './Biodata'
import './style.scss'

const { Title } = Typography
const { TabPane } = Tabs
const { Option } = Select

function ProductDetail({ t, ...props }) {
  const [booking, setBooking] = useState()
  const [adults, setAdults] = useState([])
  const biodataRef = useRef(null)

  useEffect(() => {
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

  const getBooking = async () => {
    const { match } = props
    try {
      const result = await getData(`/booking/${match.params.id}`)
      setBooking(result.data)
      console.log(result.data)
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

  // const submitBiodata = async () => {

  // }
  const fillBiodata = (index) => {
    biodataRef.current.handleIndex(index)
    biodataRef.current.showModal()
  }

  console.log(adults)

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
                      <Descriptions.Item label="Status Pemesanan" span={3}>
                        <Badge status="warning" text="Pending" />
                      </Descriptions.Item>
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
                              <Fragment>
                                <Button size="large" type="secondary">
                                  {t("booking_details.see_identity_button")}
                                </Button>
                                <Button size="large" type="secondary">
                                  {t("booking_details.see_passport_button")}
                                </Button>
                                <Button size="large" type="secondary">
                                  {t("booking_details.see_saving_button")}
                                </Button>
                              </Fragment>
                            ) : (
                              <Button size="large" block>
                                {t("booking_details.fill_identity_and_passport")}
                              </Button>
                            )}
                            {booking.adult_bio_ids[index] ? (
                              <Button size="large" type="primary">
                                {t("booking_details.see_biodata_button")}
                              </Button>
                            ) : (
                              <Button size="large" block onClick={() => fillBiodata(index)}>
                                {t("booking_details.fill_biodata")}
                              </Button>
                            )}
                          </Space>
                        </Card.Grid>
                      )}
                    </Card>
                    <p css={css`font-weight: 500;padding-bottom: 0.5rem`}>Anak</p>
                    <Card>
                      {adults.length > 0 && adults.map((adult, index) =>
                        <Card.Grid key={index}>
                          <h5>Peserta {index + 1}</h5>
                          {adult && typeof(adult) === 'object' ? (
                            <Fragment>
                              <Button type="secondary">
                                {t("booking_details.see_identity_button")}
                              </Button>
                              <Button type="secondary">
                                {t("booking_details.see_passport_button")}
                              </Button>
                              <Button type="secondary">
                                {t("booking_details.see_saving_button")}
                              </Button>
                            </Fragment>
                          ) : (
                            <Button type="primary">
                              {t("booking_details.fill_identity_and_passport")}
                            </Button>
                          )}
                          {booking.adult_bio_ids[index] ? (
                            <Button type="primary">
                              {t("booking_details.see_biodata_button")}
                            </Button>
                          ) : (
                            <Button type="primary">
                              {t("booking_details.fill_biodata")}
                            </Button>
                          )}
                        </Card.Grid>
                      )}
                    </Card>

                    {/* {adults.length > 0 && adults.map((adult, index) =>
                      <div className="col-lg-4" key={index}>
                        <div className="identity-item box_style_1">
                          <h3 className="inner">{t("booking_details.passenger")} {index + 1}</h3>
                          {adult && typeof(adult) === "object" ? (
                            <Fragment>
                              <button className="btn_full" onClick={() => this._toggleIdentityModal(adult)}>
                                {t("booking_details.see_identity_button")}
                              </button>
                              <button className="btn_full" onClick={() => this._togglePassportModal(passports[index])}>
                                {t("booking_details.see_passport_button")}
                              </button>
                              {data.booking_type === "savings" &&
                                <button className="btn_full" onClick={() => this._toggleSavingModal(data.identity_ids[index], 'adult')}>
                                  {t("booking_details.see_saving_button")}
                                </button>
                              }
                            </Fragment>
                          ) : (
                            <a
                              href={`${KYC_URL}?referrer=${window.location.href}/${index}`}
                              className="btn_full_outline"
                              style={{marginBottom: '10px'}}
                            >
                                {t("booking_details.fill_identity_and_passport")}
                              </a>
                          )}
                          {data.adult_bio_ids[index] ? (
                            <button className="btn_full" onClick={() => this._toggleBiodataModal(data.adult_bio_ids[index])}>
                              {t("booking_details.see_biodata_button")}
                            </button>
                          ) : (
                            <button
                              className="btn_full_outline"
                              style={{width: '100%', marginBottom: '10px'}}
                              onClick={() => this._toggleCreateBioModal(index, "adult")}
                            >
                              {t("booking_details.fill_biodata")}
                            </button>
                          )}
                        </div>
                      </div>
                    )} */}
                  </div>
                </Space>
              </div>
              <Affix offsetTop={89}>
                <div className="selected-packages">
                  <div className="package-info">
                    <Title level={5}>Status Pesanan</Title>
                  </div>
                </div>
              </Affix>
            </Space>
            <Biodata
              t={t}
              ref={biodataRef}
              {...props}
            />
          </Fragment>
        }
      </div>
    </MainPage>
  )
}

export default withTranslation('common')(ProductDetail)