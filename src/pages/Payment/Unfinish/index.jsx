import React from 'react'
import LogoPNG from 'assets/images/logo.png'
import { Result, Button } from 'antd'

export default function PaymentUnfinish() {
  const booking = JSON.parse(localStorage.getItem('booking'))
  return (
    <div className="callback-payment">
      <div>
        <img src={LogoPNG} alt="logo" />
        <Result
          status="warning"
          title="Pembayaran Belum Berhasil"
          subTitle={`Silahkan coba lagi, No Booking: ${booking.id}`}
          extra={[
            <Button href={`/booking/${booking.id}`} type="primary" key="console">
              Kembali ke detail pesanan
            </Button>,
            <Button href="/" key="buy">Beranda</Button>,
          ]}
        />
      </div>
    </div>
  )
}