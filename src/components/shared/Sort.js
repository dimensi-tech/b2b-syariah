import React from 'react'

function Sort() {
  return (
    <div id="tools">
      <div className="row">
        <div className="col-md-3 col-sm-4 col-6">
          <div className="styled-select-filters">
            <select name="sort_price" id="sort_price">
              <option value="price">Sort by price</option>
              <option value="lower">Lowest price</option>
              <option value="higher">Highest price</option>
            </select>
          </div>
        </div>
        <div className="col-md-3 col-sm-4 col-6">
          <div className="styled-select-filters">
            <select name="sort_rating" id="sort_rating">
              <option value="ranking">Sort by ranking</option>
              <option value="lower">Lowest ranking</option>
              <option value="higher">Highest ranking</option>
            </select>
          </div>
        </div>
        <div className="col-md-6 col-sm-4 d-none d-sm-block text-right">
          <a href="#" className="bt_filters"><i className="icon-th" /></a> <a href="all_hotels_list.html" className="bt_filters"><i className=" icon-list" /></a>
        </div>
      </div>
    </div>
  )
}

export default Sort