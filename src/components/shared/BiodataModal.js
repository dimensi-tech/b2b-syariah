import React, { Fragment, Component } from 'react';
import Authorization from "../../helpers/Authorization";
import Axios from "axios";

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
    return (
      <Fragment>
        <div className="mfp-bg my-mfp-zoom-in mfp-ready" />
        <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabIndex="-1" style={{overflow: "hidden auto"}}>
          <div className="mfp-container mfp-inline-holder">
            <div className="mfp-content">
              <div id='sign-in-dialog' className='zoom-anim-dialog'>
                <div className='small-dialog-header'>
                  <h3>BIODATA PENUMPANG</h3>
                  <button className="mfp-close" onClick={this.props.toggle} />
                </div>
                  {biodata &&
                    <form>
                      <div className='sign-in-wrapper'>
                        <dl>
                          <dt>Nama</dt>
                          <dd>{biodata.name}</dd>
                          <dt>Email</dt>
                          <dd>{biodata.email}</dd>
                          <dt>No. HP</dt>
                          <dd>{biodata.phone}</dd>
                          <dt>Ahli Waris</dt>
                          <dd>{biodata.heir_name}</dd>
                          <dt>Kontak Ahli Waris</dt>
                          <dd>{biodata.heir_contact}</dd>
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

export default BiodataModal;