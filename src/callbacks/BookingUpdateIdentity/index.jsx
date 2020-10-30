import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import axios from 'axios'
import { B2B_API_V1 } from 'helpers/Environment'
import { getData } from 'helpers/FetchData'

function BookingUpdateIdenity(props) {
  const [booking, setBooking] = useState()
  
  useEffect(() => {
    if (booking) {
      const { location, match, history } = props
      const parameters = queryString.parse(location.search)
      let identities = []
      if (booking.identity_ids?.length > 0) {
        identities = [...Array(booking.adult).keys()].map((index) => booking.identity_ids[index] !== null ? booking.identity_ids[index] : '')
        identities[match.params.index] = parameters.identity_callback
      } else {
        identities = [...Array(booking.adult).keys()].map(() => '')
        identities[match.params.index] = parameters.identity_callback
      }
      axios.post(`${B2B_API_V1}/bookings/assign_identities`, {
        booking_id: match.params.product_id,
        booking: {
          identity_ids: identities
        }
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(res =>
        history.push(`/booking/${match.params.product_id}`)
      )
    } else {
      const id = props.match.params.product_id
      getBooking(id)
    }
  }, [booking])

  const getBooking = async (id) => {
    const response = await getData(`/booking/${id}`)
    console.log(response)
    response && setBooking(response.data)
  }

  return (
    <p></p>
  )
}

export default BookingUpdateIdenity