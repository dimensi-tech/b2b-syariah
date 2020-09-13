/** @jsx jsx */
import { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import {
  Modal,
  Form,
  Input,
  Button,
  notification
} from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { css, jsx } from '@emotion/core'
import { postData } from 'helpers/FetchData'

const Register = forwardRef(({ t, ...props}, ref) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const emailInput = useRef(null)
  const [form] = Form.useForm()

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  useImperativeHandle(ref, () => {
    return {
      showModal: showModal
    }
  })

  const onFinish = async values => {
    setLoading(true)
    try {
      const result = await postData('/customers', {
        email: values.email,
        password: values.password
      })
      if (result.data.message?.length > 0) {
        setLoading(false)
        notification.error({
          message: t('register.notification.error.title'),
          description: t('register.notification.error.description'),
          placement: 'bottomLeft'
        })
        form.setFieldsValue({ email: '' })
        emailInput.current.focus()
      } else {
        setLoading(false)
        notification.success({
          message: t('register.notification.success.title'),
          description: t('register.notification.success.description'),
          placement: 'bottomLeft'
        })
        handleLoginLink()
      }
    } catch(e) {
      console.log(e)
    }
  }

  const handleLoginLink = () => {
    setVisible(false)
    props.openLogin()
  }

  return (
    <Modal
      title={t('register.title')}
      visible={visible}
      confirmLoading={loading}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          css={css`margin-bottom: 1rem`}
          name="email"
          hasFeedback
          rules={[
            {
              type: 'email',
              message: t('register.error.email.type'),
            },
            {
              required: true,
              message: t('register.error.email.required'),
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" ref={emailInput} />
        </Form.Item>

        <Form.Item
          css={css`margin-bottom: 1rem`}
          name="password"
          rules={[
            {
              required: true,
              message: t('register.error.password'),
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t('register.password')}
          />
        </Form.Item>

        <Form.Item
          css={css`margin-bottom: 2rem`}
          name="password_confirmation"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: t('register.error.passwordConfirmation.required'),
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(t('register.error.passwordConfirmation.match'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t('register.passwordConfirmation')}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" loading={loading} htmlType="submit" css={css`width: 100%`}>
            {t('register.submit')}
          </Button>
          <Button type="link" onClick={() => handleLoginLink()} css={css`margin-top: 1rem; padding: 0`}>
            {t('register.loginLink')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default Register