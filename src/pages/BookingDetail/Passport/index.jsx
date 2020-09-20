/** @jsx jsx */
import { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Space, Typography } from 'antd'
import { jsx } from '@emotion/core'
import axios from 'axios'
import moment from 'moment'
import { KYC_API_V1 } from 'helpers/Environment'

const { Title } = Typography

const Passport = forwardRef(({ t, ...props}, ref) => {
  const [visible, setVisible] = useState(false)
  const [index] = useState(0)
  const [passport, setPassport] = useState()

  const showModal = async (propsIndex, propsType) => {
    setVisible(true)
    const isChild = propsType === 'child'
    const passport = isChild ? props.booking.child_passport_ids : props.booking.identity_ids[propsIndex]
    axios.get(`${KYC_API_V1}/passports/find_passport?id=${passport}${isChild ? '&child=true' : ''}`).then(res => {
      setPassport(res.data)
    })
  }

  const handleCancel = () => {
    setVisible(false)
    setPassport(undefined)
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
    >
      {passport &&
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
      }
    </Modal>
  )
})

export default Passport