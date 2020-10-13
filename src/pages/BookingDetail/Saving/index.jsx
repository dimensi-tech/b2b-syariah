/** @jsx jsx */
import { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Table, Button } from 'antd'
import { jsx } from '@emotion/core'
import axios from 'axios'
import { B2B_API_V1, MIDTRANS_SERVER } from 'helpers/Environment'
import { getData } from 'helpers/FetchData'
import { thousandFormat } from 'services/TextFormat'

const PROXY = 'https://cors-anywhere.herokuapp.com'

const Saving = forwardRef(({ t, ...props}, ref) => {
  const [visible, setVisible] = useState(false)
  const [openPayment, setOpenPayment] = useState(undefined)
  const [index] = useState(0)
  const [saving, setSaving] = useState()

  const columns = [
    {
      title: 'Nabung ke',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: 'Nilai Tabungan',
      dataIndex: 'savingAmount',
      key: 'savingAmount',
      render: (text) => <span style={{ whiteSpace: 'nowrap' }}>{text}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => t(`booking_details.dataSaving.${text}`)
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (record.status === 'unpaid' &&
        <Button
          type="primary"
          onClick={() => pay(record)}
          loading={openPayment === record.id}
          size="large"
          block
        >
          Bayar Tabungan
        </Button>
      ),
    }
  ]

  const showModal = async (propsIndex, propsType) => {
    setVisible(true)
    getSavings(propsIndex, propsType)
    // const isChild = propsType === 'child'
    // const passport = isChild ? props.booking.child_passport_ids[propsIndex] : props.booking.identity_ids[propsIndex]
    // axios.get(`${KYC_API_V1}/passports/find_passport?id=${passport}${isChild ? '&child=true' : ''}`).then(res => {
    //   setPassport(res.data)
    // })
  }

  const handleCancel = () => {
    setVisible(false)
    setSaving(undefined)
  }

  const pay = (data) => {
    setOpenPayment(data.id)
    const { booking } = props
    const grossAmount = data.amount
    let parameter = {
      "transaction_details": {
        "order_id": `${booking.id}${data.id}${Date.now()}`,
        "gross_amount": grossAmount
      }, "credit_card": {
        "secure" : true
      }
    }
    let updateMidtrans = {
      id: data.id,
      midtrans_id: `${booking.id}${data.id}${Date.now()}`,
      status: 0,
      bookingId: booking.id
    }
    localStorage.setItem('saving', JSON.stringify(updateMidtrans))
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
      window.snap.pay(`${res.data.token}`)
      setOpenPayment(undefined)
    })
  }

  const getSavings = async (childId, type) => {
    // const { saving } = this.props;
    // const config = {
    //   booking_id: saving.booking_id
    // }
    // config[saving.type === "adult" ? "identity_id" : "passport_id"] = saving.identity_id

    // Axios.get(`${API_URL}/bookings/savings_customer`, {
    //   params: config,
    //   headers: {
    //     "Authorization": TOKEN
    //   }
    // }).then(res => {
    //   const savings = res.data;
    //   this.setState({ savings });
    // })

    const result = await getData('/bookings/savings_customer', {
      booking_id: props.booking.id,
      [`${type === 'adult' ? 'identity_id' : 'passport_id'}`]: childId  
    })

    // console.log(result.data)
    if (result) {
      const data = result.data?.map((saving, index) => {
        let item = {}
        item.key = index
        item.id = saving.id
        item.number = saving.payment_for
        item.amount = saving.amount
        item.savingAmount = `Rp ${thousandFormat(parseInt(saving.amount))}`
        item.status = saving.status
        return item
      })
      setSaving(data)
      console.log(data)
    }
  }
  
  useImperativeHandle(ref, () => {
    return {
      showModal: showModal
    }
  })

  return (
    <Modal
      title={`${t('booking_details.passport.title')} ${index + 1}`}
      visible={visible}
      onCancel={handleCancel}
      footer={false}
      wrapClassName="saving-modal"
    >
      {saving &&
        <Table columns={columns} dataSource={saving} />
      }
      {/* {passport &&
        <Space className="identities-modal" direction="vertical">
          <div className="identity-info">
            <Title level={5}>No Paspor</Title>
            <p>{passport.number}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Nama Lengkap</Title>
            <p>{passport.full_name}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Tempat, Tanggal Lahir</Title>
            <p>{passport.birth_place}, {moment(passport.birth_date).format('DD MMMM YYYY')}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Jenis Kelamin</Title>
            <p>{passport.gender}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Nama Ibu</Title>
            <p>{passport.mother_name}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Nama Ayah</Title>
            <p>{passport.father_name}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Tanggal Habis Berlaku</Title>
            <p>{moment(passport.expired_date).format('DD MMMM YYYY')}</p>
          </div>
        </Space>
      } */}
    </Modal>
  )
})

export default Saving