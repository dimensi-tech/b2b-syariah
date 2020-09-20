/** @jsx jsx */
import { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Space, Typography } from 'antd'
import { jsx } from '@emotion/core'
import axios from 'axios'
import moment from 'moment'
import { KYC_API_V1 } from 'helpers/Environment'

const { Title } = Typography

const Identity = forwardRef(({ t, ...props}, ref) => {
  const [visible, setVisible] = useState(false)
  const [index] = useState(0)
  const [identity, setIdentity] = useState()

  const showModal = async (propsIndex) => {
    setVisible(true)
    const identity = props.booking.identity_ids[propsIndex]
    axios.get(`${KYC_API_V1}/identities/find_identity?id=${identity}`).then(res => {
      setIdentity(res.data)
    })
  }

  const handleCancel = () => {
    setVisible(false)
    setIdentity(undefined)
  }
  
  useImperativeHandle(ref, () => {
    return {
      showModal: showModal
    }
  })

  return (
    <Modal
      title={`${t('booking_details.identity.title')} ${index + 1}`}
      visible={visible}
      onCancel={handleCancel}
      footer={false}
    >
      {identity &&
        <Space className="identities-modal" direction="vertical">
          <div className="identity-info">
            <Title level={5}>NIK</Title>
            <p>{identity.nik}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Nama</Title>
            <p>{identity.name}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Tempat, Tanggal Lahir</Title>
            <p>{identity.birth_place}, {moment(identity.birth_date).format('DD MMMM YYYY')}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Jenis Kelamin</Title>
            <p>{identity.gender}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Alamat</Title>
            <p>{identity.address}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>RT/RW</Title>
            <p>{identity.rt}/{identity.rw}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Kelurahan/Desa</Title>
            <p>{identity.vilage_name}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Kecamatan</Title>
            <p>{identity.district_name}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Kota/Kabupaten</Title>
            <p>{identity.city_name}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Agama</Title>
            <p>{identity.religion}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Status Perkawinan</Title>
            <p>{identity.martial_status}</p>
          </div>
          <div className="identity-info">
            <Title level={5}>Pekerjaan</Title>
            <p>{identity.occupation}</p>
          </div>
        </Space>
      }
    </Modal>
  )
})

export default Identity