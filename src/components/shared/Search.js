import React, {Component} from 'react'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }

  _handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  _handleSubmit = e => {
    e.preventDefault()
    const {value} = this.state
    let params = value ? `?searchresults=${value}` : ''
    this.props.history.push(`/products${params}`)
  }

  render() {
    return (
      <form>
        <div className='row no-gutters custom-search-input-2'>
          <div className='col-lg-10'>
            <div className='form-group'>
              <input className='form-control' type='text' placeholder='Turki' onChange={this._handleChange} />
              <i className='icon_pin_alt' />
            </div>
          </div>
          <div className='col-lg-2'>
            <input type='submit' className='btn_search' value='Cari' onClick={this._handleSubmit} />
          </div>
        </div>
      </form>
    )
  }
}

export default Search