import React, { Fragment } from 'react';
import moment from "moment";

function PassportModal(props) {
  return (
    <Fragment>
      <div className="mfp-bg my-mfp-zoom-in mfp-ready" />
      <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabIndex="-1" style={{overflow: "hidden auto"}}>
        <div className="mfp-container mfp-inline-holder">
          <div className="mfp-content">
            <div id='sign-in-dialog' className='zoom-anim-dialog'>
              <div className='small-dialog-header'>
                <h3>DATA PASSPORT</h3>
                <button className="mfp-close" onClick={props.toggle} />
              </div>
              <form>
                <div className='sign-in-wrapper'>
                  <dl>
                    <dt>No Passport</dt>
                    <dd>{props.passport.number}</dd>
                    <dt>Nama Lengkap</dt>
                    <dd>{props.passport.full_name}</dd>
                    <dt>Tempat Lahir</dt>
                    <dd>{props.passport.birth_place}</dd>
                    <dt>Tanggal Lahir</dt>
                    <dd>{moment(props.passport.birth_date).format("DD MMMM YYYY")}</dd>
                    <dt>Jenis Kelamin</dt>
                    <dd>{props.passport.gender}</dd>
                    <dt>Nama Ibu</dt>
                    <dd>{props.passport.mother_name}</dd>
                    <dt>Nama Ayah</dt>
                    <dd>{props.passport.father_name}</dd>
                    <dt>Tanggal Habis Berlaku</dt>
                    <dd>{moment(props.passport.expired_date).format("DD MMMM YYYY")}</dd>
                  </dl>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default PassportModal;