import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

class CreateBioModal extends Component {
  _onChange = evt => {
    this.props.onChange(evt);
  };

  _submitBiodata = async () => {
    this.props.submitBiodata();
  };

  render() {
    const { formControl, t } = this.props;
    return (
      <Fragment>
        <div className="mfp-bg my-mfp-zoom-in mfp-ready" />
        <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabIndex="-1" style={{overflow: "hidden auto"}}>
          <div className="mfp-container mfp-inline-holder">
            <div className="mfp-content">
              <div id='sign-in-dialog' className='zoom-anim-dialog'>
                <div className='small-dialog-header'>
                  <h3>{t("biodata_modal_create.fill_biodata")}</h3>
                  <button className="mfp-close" onClick={this.props.toggle} />
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label>
                      {t("biodata_modal_create.name")}
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
                      {t("biodata_modal_create.email")}
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
                      {t("biodata_modal_create.phone")}
                      </label>
                      <input
                        className="form-control"
                        style={{paddingLeft: '0.75rem'}}
                        name="phone"
                        onChange={this._onChange}
                        value={formControl.phone}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                      {t("biodata_modal_create.heir_name")}
                      </label>
                      <input
                        className="form-control"
                        style={{paddingLeft: '0.75rem'}}
                        name="heir_name"
                        onChange={this._onChange}
                        value={formControl.heir_name}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                      {t("biodata_modal_create.heir_contact")}
                      </label>
                      <input
                        className="form-control"
                        style={{paddingLeft: '0.75rem'}}
                        name="heir_contact"
                        onChange={this._onChange}
                        value={formControl.heir_contact}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                      {t("biodata_modal_create.family_relation")}
                      </label>
                      <input
                        className="form-control"
                        style={{paddingLeft: '0.75rem'}}
                        name="family_relation"
                        onChange={this._onChange}
                        value={formControl.family_relation}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn_full" onClick={this._submitBiodata}>{t("biodata_modal_create.save_button")}</button>
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

export default withTranslation('common')(
  connect(
    state => ({
      biodata: state.biodata
    })
  )(CreateBioModal)
);
