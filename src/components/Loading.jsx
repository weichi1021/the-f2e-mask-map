import React from 'react'

// css
import '../assets/css/Loading.sass'

const Loading = () => {
  return(
    <div className="loading-page flex-center">
      <div className="text-center">
        <i className="fa fa-spinner fa-spin fa-2x"></i>
        <div className="text-md mt-1">Loading...</div>
      </div>
    </div>
  )
}

export default Loading;
