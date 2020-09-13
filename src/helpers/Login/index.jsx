/** @jsx jsx */
import { useState, forwardRef, useImperativeHandle } from 'react'
import { Alert, Modal, Form, Input, Button, Checkbox, notification } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { css, jsx } from '@emotion/core'
import { postData } from 'helpers/FetchData'
import { login } from 'helpers/Authorization'

const Login = forwardRef(({ t, ...props}, ref) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)

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
    const redirectStorage = localStorage.getItem('redirectStorage')
    const { history } = props
    setLoading(true)
    setLoginError(false)
    try {
      const result = await postData('/tokens', {
        email: values.email,
        password: values.password
      })
      login(result.data)
      props.success()
      setVisible(false)
      setLoading(false)
      notification.success({
        message: t('login.notification.success.title'),
        description: t('login.notification.success.description'),
        placement: 'bottomLeft'
      })
      redirectStorage && history.push(redirectStorage)
    } catch (e) {
      setLoading(false)
      notification.error({
        message: t('login.notification.error.title'),
        description: t('login.notification.error.description'),
        placement: 'bottomLeft'
      })
      setLoginError(true)
      console.log(e)
    }
  }

  const handleRegisterLink = () => {
    setVisible(false)
    props.openRegister()
  }

  return (
    <Modal
      title={t('login.title')}
      visible={visible}
      confirmLoading={loading}
      onCancel={handleCancel}
      footer={false}
    >
      {loginError && <Alert message={t('login.notification.error.description')} type="error" showIcon css={css`margin-bottom: 1rem`} />}
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: t('login.error.email') }]}
          css={css`margin-bottom: 1rem`}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: t('login.error.password') }]}
          css={css`margin-bottom: 1rem`}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t('register.password')}
          />
        </Form.Item>

        <Form.Item css={css`margin: 0`}>
          <Form.Item name="remember" valuePropName={false} css={css`float: left`}>
            <Checkbox>{t('login.rememberMe')}</Checkbox>
          </Form.Item>

          {/* <a className="login-form-forgot" href="#!" css={css`float: right`}>
            Forgot password
          </a> */}
        </Form.Item>

        <Form.Item>
          <Button type="primary" loading={loading} htmlType="submit" css={css`width: 100%`}>
            {t('login.submit')}
          </Button>
          <Button type="link" onClick={() => handleRegisterLink()} css={css`margin-top: 1rem; padding: 0`}>
            {t('login.registerLink')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default Login