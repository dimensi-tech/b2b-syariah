import React from 'react'
import './style.scss'

export default function Preloader() {
  return (
    <div className="preloader">
      <div className="cssload-bell">
        <div className="cssload-circle">
          <div className="cssload-inner"></div>
        </div>
        <div className="cssload-circle">
          <div className="cssload-inner"></div>
        </div>
        <div className="cssload-circle">
          <div className="cssload-inner"></div>
        </div>
        <div className="cssload-circle">
          <div className="cssload-inner"></div>
        </div>
        <div className="cssload-circle">
          <div className="cssload-inner"></div>
        </div>
      </div>
    </div>
  )
}