import React, { Component } from 'react'

class Search extends Component {
  render() {
    return (
      <div className='search-overlay-menu'>
        <span className='search-overlay-close'><i className='icon_set_1_icon-77' /></span>
        <form role='search' id='searchform' method='get'>
          <input defaultValue='' name='q' type='search' placeholder='Search...' />
          <button type='submit'><i className='icon_set_1_icon-78' />
          </button>
        </form>
      </div>
    )
  }
}

export default Search
