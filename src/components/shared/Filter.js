import React, { Fragment } from 'react'

function Filter() {
  return (
    <Fragment>
      <div className="box_style_cat">
        <ul id="cat_nav">
          <li><a href="#" id="active"><i className="icon_set_1_icon-51"></i>All tours <span>(141)</span></a>
          </li>
          <li><a href="#"><i className="icon_set_1_icon-3"></i>City sightseeing <span>(20)</span></a>
          </li>
          <li><a href="#"><i className="icon_set_1_icon-4"></i>Museum tours <span>(16)</span></a>
          </li>
          <li><a href="#"><i className="icon_set_1_icon-44"></i>Historic Buildings <span>(12)</span></a>
          </li>
          <li><a href="#"><i className="icon_set_1_icon-37"></i>Walking tours <span>(11)</span></a>
          </li>
          <li><a href="#"><i className="icon_set_1_icon-14"></i>Eat & Drink <span>(20)</span></a>
          </li>
          <li><a href="#"><i className="icon_set_1_icon-43"></i>Churces <span>(08)</span></a>
          </li>
          <li><a href="#"><i className="icon_set_1_icon-28"></i>Skyline tours <span>(11)</span></a>
          </li>
        </ul>
      </div>
      <div id="filters_col">
        <a data-toggle="collapse" href="#collapseFilters" aria-expanded="false" aria-controls="collapseFilters" id="filters_col_bt">
          <i className="icon_set_1_icon-65" />
          Filters
        </a>
        <div className="collapse show" id="collapseFilters">
          <div className="filter_type">
            <h6>Price</h6>
            <input type="text" id="range" name="range" defaultValue />
          </div>
          <div className="filter_type">
            <h6>Rating</h6>
            <ul>
              <li>
                <label>
                  <input type="checkbox" /><span className="rating">
                    <i className="icon-smile voted" /><i className="icon-smile voted" /><i className="icon-smile voted" /><i className="icon-smile voted" /><i className="icon-smile voted" />
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /><span className="rating">
                    <i className="icon-smile voted" /><i className="icon-smile voted" /><i className="icon-smile voted" /><i className="icon-smile voted" /><i className="icon-smile" />
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /><span className="rating">
                    <i className="icon-smile voted" /><i className="icon-smile voted" /><i className="icon-smile voted" /><i className="icon-smile" /><i className="icon-smile" />
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /><span className="rating">
                    <i className="icon-smile voted" /><i className="icon-smile voted" /><i className="icon-smile" /><i className="icon-smile" /><i className="icon-smile" />
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /><span className="rating">
                    <i className="icon-smile voted" /><i className="icon-smile" /><i className="icon-smile" /><i className="icon-smile" /><i className="icon-smile" />
                  </span>
                </label>
              </li>
            </ul>
          </div>
          <div className="filter_type">
            <h6>Facility</h6>
            <ul>
              <li>
                <label>
                  <input type="checkbox" />Pet allowed
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />Groups allowed
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />Tour guides
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />Access for disabled
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Filter