import React from 'react'

function Search() {
  return (
    <form>
      <div className='row no-gutters custom-search-input-2'>
        <div className='col-lg-4'>
          <div className='form-group'>
            <input className='form-control' type='text' placeholder='Where...' />
            <i className='icon_pin_alt' />
          </div>
        </div>
        <div className='col-lg-3'>
          <div className='form-group'>
            <input className='form-control date-pick' type='text' name='dates' placeholder='When..' />
            <i className='icon_calendar' />
          </div>
        </div>
        <div className='col-lg-3'>
          <div className='panel-dropdown'>
            <a href='#'>Guests <span className='qtyTotal tours'>1</span></a>
            <div className='panel-dropdown-content'>
              <div className='qtyButtons tours'>
                <label>Adults</label>
                <input type='text' name='qtyInput_tours' defaultValue={1} />
              </div>
              <div className='qtyButtons tours'>
                <label>Childrens</label>
                <input type='text' name='qtyInput_tours' defaultValue={0} />
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-2'>
          <input type='submit' className='btn_search' defaultValue='Search' />
        </div>
      </div>
    </form>
  )
}

export default Search