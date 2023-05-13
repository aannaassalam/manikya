import React from 'react'
import { useSelector } from 'react-redux';
import ImgMission from '../assets/images/mission.png';
import ImgVision from '../assets/images/vision.png';

function Contact() {
    const appConfig = useSelector(state => state.app_config);
    
  return (
    <div>
        <section>
            <br/>
            <br/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h3 className=''>Get in touch</h3>
                        <h5>{appConfig.data.brand_name}</h5>
                        <br />
                        <ContactAttrList label='Phone' data={appConfig.data.contact_data.phone}/>
                        <ContactAttrList label='Support Email' data={appConfig.data.contact_data.personal_email}/>
                        <ContactAttrList label='Sales Email' data={appConfig.data.contact_data.sales_email}/>
                        <ContactAttrList label='Address' data={`${appConfig.data.brand_name}, ${appConfig.data.contact_data.address}`}/>
                    </div>
                    <div className="col-lg-6">
                        <iframe width="100%" height="380" id="gmap_canvas" src={appConfig.data.map_link} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </section>
    </div>
  )
}

const ContactAttrList = ({label = "", data = ""}) => (<p style={{marginBottom: "2px", fontSize: "14px"}}>
    <span style={{fontWeight: "500"}}>{label} :</span>
    <span>&nbsp;&nbsp;{data}</span>
</p>)

export default Contact