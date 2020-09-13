/** @jsx jsx */
import { useState, forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Form, Input, Button, Checkbox, notification } from 'antd'
import { css, jsx } from '@emotion/core'
import { postData } from 'helpers/FetchData'

const Login = forwardRef(({ t, ...props}, ref) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleIndex = (index) => {
    setIndex(index)
  }

  useImperativeHandle(ref, () => {
    return {
      showModal: showModal,
      handleIndex: handleIndex
    }
  })

  const onFinish = async (values) => {
    setLoading(true)
    const response = await postData('/biodatas/create_biodata', {
      biodata: values
    })

    if (response) {
      console.log(response)
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
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          name: 'Json'
        }}
      >
        <Form.Item rules={[{ required: true, message: 'Tidak boleh kosong' }]} name="name" label="Nama Peserta">
          <Input placeholder="John" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Tidak boleh kosong' }]} name="email" label="Email">
          <Input placeholder="john@mail.com" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Tidak boleh kosong' }]} name="phone" label="Nomor HP">
          <Input placeholder="contoh: +6282215156988" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Tidak boleh kosong' }]} name="heir_name" label="Nama Ahli Waris">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Tidak boleh kosong' }]} name="heir_contact" label="Kontak Ahli Waris">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Tidak boleh kosong' }]} name="family_relation" label="Hubungan Ahli Waris">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={loading} htmlType="submit">Simpan</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default Login