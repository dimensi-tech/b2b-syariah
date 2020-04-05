import React, { Fragment } from 'react';
import moment from "moment";

function IdentityModal(props) {
  return (
    <Fragment>
      <div className="mfp-bg my-mfp-zoom-in mfp-ready" />
      <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabIndex="-1" style={{overflow: "hidden auto"}}>
        <div className="mfp-container mfp-inline-holder">
          <div className="mfp-content">
            <div id='sign-in-dialog' className='zoom-anim-dialog'>
              <div className='small-dialog-header'>
                <h3>DATA KTP</h3>
                <button className="mfp-close" onClick={props.toggle} />
              </div>
              <form>
                <div className='sign-in-wrapper'>
                  <dl>
                    <p className="text-center">PROVINSI {props.identity.province_name}</p>
                    <p className="text-center">{props.identity.city_name}</p>
                    <dt>NIK</dt>
                    <dd>{props.identity.nik}</dd>
                    <dt>Nama</dt>
                    <dd>{props.identity.name}</dd>
                    <dt>Tempat/Tgl Lahir</dt>
                    <dd>{props.identity.birth_place}, {moment(props.identity.birth_date).format("DD MMMM YYYY")}</dd>
                    <dt>Jenis Kelamin</dt>
                    <dd>{props.identity.gender}</dd>
                    <dt>Alamat</dt>
                    <dd>{props.identity.address}</dd>
                    <dt>RT/RW</dt>
                    <dd>{props.identity.rt} / {props.identity.rw}</dd>
                    <dt>Kel/Desa</dt>
                    <dd>{props.identity.vilage_name}</dd>
                    <dt>Kecamatan</dt>
                    <dd>{props.identity.district_name}</dd>
                    <dt>Agama</dt>
                    <dd>{props.identity.religion}</dd>
                    <dt>Status Perkawinan</dt>
                    <dd>{props.identity.martial_status}</dd>
                    <dt>Pekerjaan</dt>
                    <dd>{props.identity.occupation}</dd>
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

export default IdentityModal;