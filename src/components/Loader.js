import React from 'react';
import { Triangle } from  'react-loader-spinner';

const Loader = ({style = {}, isAbsolute=false}) => {
  return (
    <div style={Object.assign({position : isAbsolute ? "absolute" : 'fixed'}, style)} className='loader'>
        <Triangle
            height="80"
            width="80"
            color="#ffffff"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    </div>
  )
}

export default Loader