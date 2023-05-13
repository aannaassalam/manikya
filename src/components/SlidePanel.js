import React from 'react';
import { AiOutlineClose } from "react-icons/ai";

const SlidePanel = ({title = "", dir = "right", onclose = () => {}, ...rest}) => {

 return (
    <div className={`slidePanel ${dir}`} style={{}}>
        <div className='row'>
            <div className="col-lg-10 col-10">
                <h3 className='card-title'>{title ?? '' }</h3>
            </div>
            <div className="col-lg-2 col-2">
                <div className='closeSidePanel' onClick={onclose}><AiOutlineClose /></div>
            </div>
        </div>
        <div className='row'>
            <div className="col-lg-12">{rest.children}</div>
        </div>
    </div>
  )
}

export default SlidePanel