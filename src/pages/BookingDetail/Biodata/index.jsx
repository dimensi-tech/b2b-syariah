/** @jsx jsx */
import { useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { jsx } from '@emotion/core'
import { getData, postData } from 'helpers/FetchData'

const Login = forwardRef(({ t, ...props}, ref) => {
  const formRef = useRef(null)
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState('create')
  const [index, setIndex] = useState(0)
  const [type, setType] = useState('adult')
  const [loading, setLoading] = useState(false)
  const [biodata, setBiodata] = useState()

  useEffect(() => {
    if (formRef.current) {
      form.resetFields()
    }
  }, [visible])

  const showModal = async (propsAction, propsIndex, propsType) => {
    setBiodata(undefined)
    setIndex(propsIndex)
    setType(propsType)
    setAction(propsAction)
    setVisible(true)
    if (propsAction === 'show') {
      const response = await getData(`/biodatas/detail_biodata`, {
        biodata_id: props.booking[`${propsType}_bio_ids`][propsIndex]
      })

      if (response) {
        setBiodata(response?.data)
      }
    } else {
      setBiodata({})
    }
  }

  const handleCancel = () => {
    setVisible(false)
    setBiodata(undefined)
  }
  
  useImperativeHandle(ref, () => {
    return {
      showModal: showModal
    }
  })

  const onFinish = async (values) => {
    setLoading(true)
    const { booking } = props
    let bioCollection = []

    const responseBiodata = await postData('/biodatas/create_biodata', {
      biodata: values
    })

    if (responseBiodata) {
      const arrayPerson = [...Array(booking[type]).keys()]
      if (booking[`${type}_bio_ids`].length > 0) {
        bioCollection = arrayPerson.map((index) => booking[`${type}_bio_ids`][index] !== null ? booking[`${type}_bio_ids`][index] : '')
        bioCollection[index] = responseBiodata.data.id
      } else {
        bioCollection = arrayPerson.map(() => '')
        bioCollection[index] = responseBiodata.data.id
      }

      const reponseAssignBio = await postData(`/bookings/assign_${type}_bio`, {
        booking_id: booking.id,
        booking: {
          [`${type}_bio_ids`]: bioCollection
        }
      })

      if (reponseAssignBio) {
        setLoading(false)
        setVisible(false)
        props.refreshData()
      }
    }
  }

  return (
    <Modal
      title={`${t('booking_details.biodata.title')} ${index + 1}`}
      visible={visible}
      confirmLoading={loading}
      onCancel={handleCancel}
      footer={false}
    >
      {biodata &&
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={biodata}
          ref={formRef}
        >
          <Form.Item
            rules={[{ required: true, message: 'Tidak boleh kosong' }]}
            name="name"
            label="Nama Peserta"
          >
            <Input placeholder="John" readOnly={action === 'show'} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Tidak boleh kosong' }]}
            name="email"
            label="Email"
          >
            <Input placeholder="john@mail.com" readOnly={action === 'show'} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Tidak boleh kosong' }]}
            name="phone"
            label="Nomor HP"
          >
            <Input placeholder="contoh: +6282215156988" readOnly={action === 'show'} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Tidak boleh kosong' }]}
            name="heir_name"
            label="Nama Ahli Waris"
          >
            <Input placeholder="" readOnly={action === 'show'} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Tidak boleh kosong' }]}
            name="heir_contact"
            label="Kontak Ahli Waris"
          >
            <Input placeholder="" readOnly={action === 'show'} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Tidak boleh kosong' }]}
            name="family_relation"
            label="Hubungan Ahli Waris"
          >
            <Input placeholder="" readOnly={action === 'show'} />
          </Form.Item>
          {action === 'create' &&
            <Form.Item>
              <Button type="primary" loading={loading} htmlType="submit">Simpan</Button>
            </Form.Item>
          }
        </Form>
      }
    </Modal>
  )
})

export default Login