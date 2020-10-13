import React, { useState, useEffect } from 'react'
import LogoPNG from 'assets/images/logo.png'
import { Result, Button } from 'antd'
import { postData } from 'helpers/FetchData'

export default function PaymentFinish() {
  const booking = JSON.parse(localStorage.getItem('booking'))
  const saving = JSON.parse(localStorage.getItem('saving'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    changeStatus()
  }, [])

  const changeStatus = async () => {
    if (saving) {
      const result = await postData('/bookings/saving_paid', saving)
      result && setLoading(false)
    } else if (booking) {
      const bookingStatus = booking.booking_type === 'savings' ? 'saving_progress' : 'paid'
      const result = await postData('/bookings/update_booking_status', {
        booking_id: booking.id,
        booking_status: bookingStatus
      })
      result && setLoading(false)
    } else {
      setLoading(false)
    }
  }

  return (
    <div className="callback-payment">
      <div>
        <img src={LogoPNG} alt="logo" />
        {!loading ? (
          <Result
            status="success"
            title="Pembayaran Berhasil"
            subTitle={`No Booking: ${booking?.id || saving?.bookingId}`}
            extra={[
              <Button href={`/booking/${booking?.id || saving?.bookingId}`} type="primary" key="booking">
                Kembali ke detail pesanan
              </Button>,
              <Button href="/" key="home">Beranda</Button>,
            ]}
          />
        ) : (
          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem'
          }}>
            Loading...
          </p>
        )}
      </div>
    </div>
  )
}