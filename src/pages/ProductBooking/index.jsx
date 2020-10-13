/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { useState, useEffect, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { Typography, Space, Select, Button, Input, Affix, PageHeader, Radio } from 'antd'
import { CalendarTwoTone, IdcardTwoTone, WalletTwoTone, GiftTwoTone } from '@ant-design/icons'
import { css, jsx } from '@emotion/core'
import _ from 'lodash'
import moment from 'moment'
import MainPage from 'services/MainPage'
import { thousandFormat } from 'services/TextFormat'
import { getData, postData } from 'helpers/FetchData'
import { currentUser } from 'helpers/Authorization'
import './style.scss'

const { Title } = Typography
const { Option } = Select

function ProductBooking({ t, ...props }) {
  const [product, setProduct] = useState()
  const [selectedPackage, setSelectedPackage] = useState()
  const [loadingBooking, setLoadingBooking] = useState(false)
  const { register, handleSubmit, watch, errors, control, setValue } = useForm()
  const { history, match } = props

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    try {
      const result = await getData(`/product/${match.params.id}`)
      const packageId = parseInt(match.params.package_id)
      setProduct(result.data)
      const thePackage = _.find(result.data.packages, (productPackage) => productPackage.id === packageId)
      setSelectedPackage(thePackage)
      setValue('adult', thePackage.min_adult)
      thePackage.min_child && setValue('child', thePackage.min_child)
    } catch(e) {
      history.push('/')
    }
  }

  const getTotalPrice = () => {
    const adultPrice = parseInt(selectedPackage.adult_price) * watch('adult')
    const childPrice = parseInt(selectedPackage.child_price) * watch('child')
    return watch('child') ? (adultPrice + childPrice) : adultPrice
  }

  const getDownPayment = () => {
    const totalPrice = getTotalPrice()
    if (selectedPackage.down_payment_type === 'percentage') {
      return totalPrice * selectedPackage.down_payment_percentage / 100
    } else {
      return selectedPackage.down_payment_flat
    }
  }

  const getSavingPrice = (type) => {
    const currentSavingId = watch('saving_package_id') || selectedPackage.saving_packages[0]?.id
    const saving = _.find(selectedPackage.saving_packages, (sp) => sp.id === currentSavingId)
    const isDpPercentage = selectedPackage.down_payment_type === 'percentage'
    const price = parseInt(selectedPackage[`${type}_price`]) * watch(type)
    const savingPrice =  price - (isDpPercentage ? getDpPercentageValue(price) : (selectedPackage.down_payment_flat / 2))
    return savingPrice / watch(type) / saving.sort
  }

  const getSavingPreview = () => {
    const currentSavingId = watch('saving_package_id') || selectedPackage.saving_packages[0]?.id
    const saving = _.find(selectedPackage.saving_packages, (sp) => sp.id === currentSavingId)
    return (
      [...Array(saving.sort).keys()].map(index =>
        <tr key={index}>
          <td>Nabung ke-{index + 1}</td>
          <td><b>Rp {thousandFormat(getSavingPrice('adult'))}</b> per orang</td>
          <td><b>Rp {thousandFormat(getSavingPrice('child'))}</b> per orang</td>
        </tr>
      )
    )
  }

  const getDpPercentageValue = (value) => {
    return value * selectedPackage.down_payment_percentage / 100
  }
  
  const onSubmit = async data => {
    setLoadingBooking(true)
    const response = await postData('/bookings/create_booking', {
      booking: data
    })
    response?.data && history.push(`/booking/${response?.data.id}`)
  }

  return (
    <MainPage>
      <div className="product-booking-content">
        {selectedPackage &&
          <Fragment>
            <Space className="product-body">
              <form onSubmit={handleSubmit(onSubmit)} className="product-booking-form">
                <input type="hidden" name="customer_id" ref={register} value={currentUser().customer_id} />
                <input type="hidden" name="package_id" ref={register} value={match.params.package_id} />
                <input type="hidden" name="booking_status" ref={register} value='pending' />
                {parseInt(watch('booking_type')) === 2 &&
                  <Fragment>
                    <input type="hidden" name="adult_amount_saving" ref={register} value={getSavingPrice('adult')} />
                    <input type="hidden" name="child_amount_saving" ref={register} value={getSavingPrice('child')} />
                    <input type="hidden" name="dp_amount" ref={register} value={getDownPayment()} />
                  </Fragment>
                }
                <Space direction="vertical" size={20}>
                  <PageHeader
                    className="site-page-header"
                    onBack={() => history.push(`/product/${match.params.id}`)}
                    title="Pesan Paket"
                    subTitle="Pastikan data pesanan anda sudah benar"
                    css={css`padding: 0`}
                  />
                  <div className="form-group">
                    <div className="form-header">
                      <CalendarTwoTone twoToneColor="#52c41a" />
                      <PageHeader
                        className="site-page-header"
                        title="Pilih Tanggal Berangkat"
                        css={css`padding: 0`}
                      />
                    </div>
                    <Controller
                      name="departure_date"
                      control={control}
                      rules={{ required: true }}
                      defaultValue=""
                      render={({ onChange }) => (
                      <Select
                        showSearch
                        placeholder="Pilih tanggal"
                        onChange={onChange}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {selectedPackage.available_date.map((date) =>
                          <Option key={date} value={moment(date, 'MM/DD/YYYY').format('DD-MM-YYYY')}>
                            {moment(date, 'MM/DD/YYYY').locale('id').format('DD MMMM YYYY')}
                          </Option>
                        )}
                      </Select>
                      )}
                    />
                    {errors.departure_date && <span className="input-error">Anda belum memilih tanggal berangkat</span>}
                  </div>
                  <div className="form-group">
                    <div className="form-header">
                      <IdcardTwoTone twoToneColor="#52c41a" />
                      <PageHeader
                        className="site-page-header"
                        title="Jumlah Peserta"
                        css={css`padding: 0`}
                      />
                    </div>
                    <Space direction="vertical" css={css`width: 100%`} size={20}>
                      <div className="select-person">
                        <span>Dewasa</span>
                        <Controller
                          name="adult"
                          control={control}
                          rules={{ required: true }}
                          defaultValue=""
                          render={({ onChange }) => (
                          <Select
                            placeholder="Pilih jumlah peserta"
                            defaultValue={selectedPackage.min_adult}
                            onChange={onChange}
                          >
                            {_.range(selectedPackage.min_adult, selectedPackage.max_adult + 1).map((person) =>
                              <Option key={person} value={person}>
                                {person}
                              </Option>
                            )}
                          </Select>
                          )}
                        />
                        <span className="person-price">
                          Harga Dewasa - Rp {thousandFormat(parseInt(selectedPackage.adult_price))}/pax
                        </span>
                      </div>
                      {errors.adult && <span className="input-error">Anda belum memilih jumlah perserta (Dewasa)</span>}
                      {selectedPackage.min_child && selectedPackage.max_child &&
                        <div className="select-person">
                          <span>Anak</span>
                          <Controller
                            name="child"
                            control={control}
                            rules={{ required: true }}
                            defaultValue=""
                            render={({ onChange }) => (
                            <Select
                              defaultValue={selectedPackage.min_child}
                              placeholder="Pilih jumlah peserta"
                              onChange={onChange}
                            >
                              {_.range(selectedPackage.min_child, selectedPackage.max_child + 1).map((person) =>
                                <Option key={person} value={person}>
                                  {person}
                                </Option>
                              )}
                            </Select>
                            )}
                          />
                          <span className="person-price">
                            Harga Anak - Rp {thousandFormat(parseInt(selectedPackage.adult_price))}/pax
                          </span>
                        </div>
                      }
                      {errors.child && <span className="input-error">Anda belum memilih jumlah perserta (Anak)</span>}
                    </Space>
                  </div>
                  <div className="form-group">
                    <div className="form-header">
                      <WalletTwoTone twoToneColor="#52c41a" />
                      <PageHeader
                        className="site-page-header"
                        title="Tipe Pembayaran"
                        css={css`padding: 0`}
                      />
                    </div>
                    <div className="select-booking-type">
                      <Controller
                        name="booking_type"
                        control={control}
                        rules={{ required: true }}
                        defaultValue={1}
                        render={({ value }) => (
                          <Radio.Group onChange={(e) => setValue('booking_type', e.target.value)} value={value} size="large">
                            <Radio css={css`display: block;height: 30px;line-height: 30px;`} value={1}>
                              Bayar Penuh
                            </Radio>
                            <Radio css={css`display: block;height: 30px;line-height: 30px;`} value={2}>
                              Bayar Nabung
                            </Radio>
                          </Radio.Group>
                        )}
                      />
                      {parseInt(watch('booking_type')) === 2 &&
                        <Fragment>
                          <Controller
                            name="saving_package_id"
                            control={control}
                            rules={{ required: true }}
                            defaultValue={selectedPackage.saving_packages[0]?.id}
                            render={({ value }) => (
                              <Radio.Group onChange={(e) => setValue('saving_package_id', e.target.value)} value={value} buttonStyle="solid">
                                {selectedPackage.saving_packages.map(savingPackage =>
                                  <Radio key={savingPackage.id} value={savingPackage.id}>
                                    {savingPackage.sort} bulan
                                  </Radio>
                                )}
                              </Radio.Group>
                            )}
                          />
                          <div className="down-payment-amount">
                            <p>Down Payment (DP)</p>
                            <span>Rp {thousandFormat(getDownPayment())}</span>
                          </div>
                          <div className="savings-preview">
                            <table>
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Dewasa</th>
                                  <th>Anak</th>
                                </tr>
                              </thead>
                              <tbody>
                                {getSavingPreview()}
                              </tbody>
                            </table>
                          </div>
                        </Fragment>
                      }
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-header">
                      <GiftTwoTone twoToneColor="#52c41a" />
                      <PageHeader
                        className="site-page-header"
                        title="Kode Voucher"
                        css={css`padding: 0`}
                      />
                    </div>
                    <Input placeholder="Masukan kode voucher" />
                  </div>
                  <Button type="primary" htmlType="submit" className="submit-package" loading={loadingBooking}>
                    Pesan Paket
                  </Button>
                </Space>
              </form>
              <Affix offsetTop={89}>
                <div className="selected-packages">
                  <div className="package-info">
                    <Title level={5}><p>{product.name}</p>{selectedPackage.name}</Title>
                    <Button type="link" href={`/product/${match.params.id}`} target="_blank">Lihat detail</Button>
                  </div>
                  <div className="package-price-summary">
                    {watch('adult') &&
                      <dl>
                        <dt>{watch('adult')}x Dewasa</dt>
                        <dd>Rp {thousandFormat(parseInt(selectedPackage.adult_price) * watch('adult'))}</dd>
                      </dl>
                    }
                    {watch('child') &&
                      <dl>
                        <dt>{watch('child')}x Anak</dt>
                        <dd>Rp {thousandFormat(parseInt(selectedPackage.child_price) * watch('child'))}</dd>
                      </dl>
                    }
                    {watch('adult') &&
                      <dl className="total-package-price">
                        <dt>Total Harga</dt>
                        <dd>
                          Rp {thousandFormat(getTotalPrice())}
                          <input type="hidden" name="price" ref={register} value={getTotalPrice()} />
                        </dd>
                      </dl>
                    }
                  </div>
                </div>
              </Affix>
            </Space>
          </Fragment>
        }
      </div>
    </MainPage>
  )
}

export default withTranslation('common')(ProductBooking)