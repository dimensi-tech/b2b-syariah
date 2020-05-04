import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";

class CreateBioModal extends Component {
  _onChange = evt => {
    this.props.onChange(evt);
  };

  _submitBiodata = async () => {
    this.props.submitBiodata();
  };

  render() {
    const { formControl } = this.props;
    return (
      <Fragment>
        <div className="mfp-bg my-mfp-zoom-in mfp-ready" />
        <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabIndex="-1" style={{overflow: "hidden auto"}}>
          <div className="mfp-container mfp-inline-holder">
            <div className="mfp-content">
              <div id='sign-in-dialog' className='zoom-anim-dialog'>
                <div className='small-dialog-header'>
                  <h3>ISI BIODATA</h3>
                  <button className="mfp-close" onClick={this.props.toggle} />
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label>
                        Nama
                      </label>
                      <input
                        className="form-control"
                        style={{paddingLeft: '0.75rem'}}
                        name="name"
                        onChange={this._onChange}
                        value={formControl.name}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Email
                      </label>
                      <input
                        className="form-control"
                        style={{paddingLeft: '0.75rem'}}
                        name="email"
                        onChange={this._onChange}
                        value={formControl.email}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Nomor HP
                      </label>
                      <input
                        className="form-control"
                        style={{paddingLeft: '0.75rem'}}
                        name="phone"
                        onChange={this._onChange}
                        value={formControl.phone}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn_full" onClick={this._submitBiodata}>Simpan Biodata</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default connect(
  state => ({
    biodata: state.biodata
  })
)(CreateBioModal);