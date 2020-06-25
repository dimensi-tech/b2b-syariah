import React, { Fragment, Component } from 'react';
import Authorization from "../../helpers/Authorization";
import Axios from "axios";
import { withTranslation } from "react-i18next";

const API_URL = process.env.REACT_APP_API_V1_URL;
const TOKEN = Authorization().getAuthUser();

class BiodataModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      biodata: '',
    }
  };

  componentDidMount() {
    this._getBiodata();
  }

  _getBiodata() {
    const { id } = this.props;
    Axios.get(`${API_URL}/biodatas/detail_biodata`, {
      params: {
        biodata_id: id,
      },
      headers: {
        "Authorization": TOKEN
      }
    }).then(res => {
      const biodata = res.data;
      this.setState({ biodata });
    })
  }

  render() {
    const { biodata } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <div className="mfp-bg my-mfp-zoom-in mfp-ready" />
        <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabIndex="-1" style={{overflow: "hidden auto"}}>
          <div className="mfp-container mfp-inline-holder">
            <div className="mfp-content">
              <div id='sign-in-dialog' className='zoom-anim-dialog'>
                <div className='small-dialog-header'>
                  <h3>{t("biodata_modal.passenger_biodata")}</h3>
                  <button className="mfp-close" onClick={this.props.toggle} />
                </div>
                  {biodata &&
                    <form>
                      <div className='sign-in-wrapper'>
                        <dl>
                          <dt>{t("biodata_modal.name")}</dt>
                          <dd>{biodata.name}</dd>
                          <dt>{t("biodata_modal.email")}</dt>
                          <dd>{biodata.email}</dd>
                          <dt>{t("biodata_modal.phone")}</dt>
                          <dd>{biodata.phone}</dd>
                          <dt>{t("biodata_modal.heir_name")}</dt>
                          <dd>{biodata.heir_name}</dd>
                          <dt>{t("biodata_modal.heir_contact")}</dt>
                          <dd>{biodata.heir_contact}</dd>
                          <dt>{t("biodata_modal.family_relation")}</dt>
                          <dd>{biodata.family_relation}</dd>
                        </dl>
                      </div>
                    </form>
                  }
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withTranslation('common')(BiodataModal);