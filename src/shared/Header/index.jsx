/** @jsx jsx */
import { Fragment, useState, useRef } from 'react'
import { withRouter } from 'react-router'
import { withTranslation } from 'react-i18next'
import { Layout, Menu, Row, Col, Dropdown, Button, Drawer, Modal, Divider } from 'antd'
import { HomeOutlined, ShoppingOutlined, UserOutlined, MenuOutlined, PercentageOutlined, WalletOutlined } from '@ant-design/icons'
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import Login from 'helpers/Login'
import Register from 'helpers/Register'
import { isLoggedIn, logout } from 'helpers/Authorization'
import LogoPNG from 'assets/images/logo.png'

function Header({ t, ...props }) {
  const [menu, setMenu] = useState(false)
  const [login, setLogin] = useState(isLoggedIn())
  const loginRef = useRef(null)
  const registerRef = useRef(null)

  const handleLogout = () => {
    logout(t)
    setLogin(false)
  }
  
  const publicMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => registerRef.current.showModal()}>
        {t('header.register')}
      </Menu.Item>
      <Menu.Item key="2" onClick={() => loginRef.current.showModal()}>
        {t('header.login')}
      </Menu.Item>
    </Menu>
  )

  const privateMenu = (
    <Menu>
      <Menu.Item key="1">
        <a href="/booking-history">{t('header.booking_history')}</a>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleLogout()}>
        {t('header.logout')}
      </Menu.Item>
    </Menu>
  )

  const menuComingSoon = (type) => {
    Modal.info({
      title: 'Coming Soon',
      content: (
        <div>
          <p>Fitur <b>{type}</b> masih dalam tahap pengembangan</p>
        </div>
      ),
      onOk() {},
    })
  }

  return (
    <Fragment>
      <Layout className="layout">
        <HeaderLayout
          css={css`
            position: fixed;
            width: 100%;
            background: #fff;
            box-shadow: 0 2px 8px #f0f1f2;
            z-index: 100;
          `}
        >
          <Row justify="center" css={css`max-width: 1920px;margin: 0 auto;`}>
            <Col
              xs={14}
              lg={6}
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <Logo href="/" />
            </Col>
            <Col xs={0} lg={12}>
              <Menu
                mode="horizontal"
                css={css`
                  border: 0;
                  text-align: center;
                `}
              >
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <a href="/">{t('header.home')}</a>
                </Menu.Item>
                <Menu.Item key="2" icon={<ShoppingOutlined />} onClick={() => menuComingSoon('Souvenir')}>
                  {t('header.souvenir')}
                </Menu.Item>
                <Menu.Item key="3" icon={<PercentageOutlined />} onClick={() => menuComingSoon('Voucher')}>
                  {t('header.voucher')}
                </Menu.Item>
                <Menu.Item key="4" icon={<WalletOutlined />} onClick={() => menuComingSoon('Tabungan')}>
                  {t('header.saving')}
                </Menu.Item>
              </Menu>
            </Col>
            <Col
              xs={0}
              lg={6}
              css={css`text-align: right`}
            >
              {!login && (
                <button type="button" onClick={() => loginRef.current.showModal()} id="majreha-login" css={css`display: none`}>
                  {t('header.login')}
                </button>
              )}
              <Dropdown overlay={login ? privateMenu : publicMenu} placement="bottomRight" arrow>
                <Button shape="round" size="large" icon={<UserOutlined />}>
                  <MenuOutlined />
                </Button>
              </Dropdown>
            </Col>
            <Col
              xs={10}
              lg={0}
              css={css`text-align: right`}
            >
              <Button
                shape="circle"
                size="large"
                icon={<MenuOutlined />}
                onClick={() => setMenu(true)}
              />
              <Drawer
                title="Menu"
                placement="right"
                closable={true}
                onClose={() => setMenu(false)}
                visible={menu}
              >

                <p>
                  <a href="/">{t('header.home')}</a>
                </p>
                <p>
                  <a href="#!" onClick={() => menuComingSoon('Souvenir')}>{t('header.souvenir')}</a>
                </p>
                <p>
                  <a href="#!" onClick={() => menuComingSoon('Voucher')}>{t('header.voucher')}</a>
                </p>
                <p>
                  <a href="#!" onClick={() => menuComingSoon('Tabungan')}>{t('header.saving')}</a>
                </p>
                <Divider />
                {login ? (
                  <Fragment>
                    <p>
                      <a href="/booking-history">{t('header.booking_history')}</a>
                    </p>
                    <p>
                      <a href="#!" onClick={() => handleLogout()}>{t('header.logout')}</a>
                    </p>
                  </Fragment>
                ) : (
                  <Fragment>
                    <p>
                      <a href="#!" onClick={() => registerRef.current.showModal()}>{t('header.register')}</a>
                    </p>
                    <p>
                      <a href="#!" onClick={() => loginRef.current.showModal()}>{t('header.login')}</a>
                    </p>
                  </Fragment>
                )}
              </Drawer>
            </Col>
          </Row>
        </HeaderLayout>
      </Layout>
      <Login
        t={t}
        ref={loginRef}
        success={() => setLogin(true)}
        openRegister={() => registerRef.current.showModal()}
        {...props}
      />
      <Register
        t={t}
        ref={registerRef}
        openLogin={() => loginRef.current.showModal()}
        {...props}
      />
    </Fragment>
  )
}

const { Header: HeaderLayout } = Layout
const Logo = styled.a`
  width: 100%;
  height: calc(64px - 1.5rem);
  background-image: url(${LogoPNG});
  background-repeat: no-repeat;
  background-size: auto 100%;
`

export default withTranslation('common')(withRouter(Header))