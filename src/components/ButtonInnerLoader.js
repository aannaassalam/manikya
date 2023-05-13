import React from 'react'
import { Triangle } from "react-loader-spinner";

function ButtonInnerLoader({label = ''}) {
  return (
    <div className="buttonInnerLoader">
        <Triangle
            height="20"
            width="20"
            color="#ffffff"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
        <p>{label}</p>
    </div>
  )
}

export default ButtonInnerLoader