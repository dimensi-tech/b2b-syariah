import React from "react";
import Loading from "../../assets/img/loading.svg";

function Preloader() {
  return (
    <div className="preloader">
      <img src={Loading} alt="loading" />
    </div>
  )
}

export default Preloader;