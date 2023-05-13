import React from 'react'
import { useSelector } from 'react-redux';
import ImgMission from '../assets/images/mission.png';
import ImgVision from '../assets/images/vision.png';

function About() {
    const appConfig = useSelector(state => state.app_config);
    
  return (
    <div>
        <section>
            <br/>
            <br/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h4 className='text-center text-primary'>Why Manikya Fashion?</h4>
                        <p className='text-center text-muted'>
                            A name worth 5 decades of passion for excellence, finesse and affordable fashion in costume jewelry.
                            Established in a city famous for its craft “KOLKATA” the company has been continuously evolving under
                            the hands of <b>Mr Md. Qasim (Founder)</b> in the wholesale and retail markets for over 54 years, a very renowned
                            name in the circle of costume and artificial jewelry industry of the country, and now successfully taken to
                            Online shopping platforms by his Son Md. Usman.
                        </p>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="col-lg-12"><h3 className='text-center'>About Company</h3></div>
                <br/>
                <div className="row justify-content-center">
                    <div className="col-lg-6" style={{
                        background: "#322002",
                        padding: "20px",
                    }}>
                        <h4 className='text-white'>Brand Description</h4>
                        <br/>
                        <p className='text-white' style={{
                            fontSize: "14px",
                            textAlign: 'justify'
                        }}>
                            {appConfig.data.company_details.brand_desecription}
                        </p>
                    </div>
                    <div className="col-lg-6" style={{
                        background: "#433010",
                        padding: "20px",
                    }}>
                        <h4 className='text-white'>
                        {/* Brand Highlites */}
                        </h4>
                        <br/>
                        <p className='text-white' style={{
                            fontSize: "14px",
                            textAlign: 'justify'
                        }} dangerouslySetInnerHTML={{__html: appConfig.data.company_details.highlites}}>
                            
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <br/>
                        <br/>
                        {/* <center>
                            <img src={ImgMission} alt='mission' width="65px" style={{marginBottom: "10px"}} />
                        </center> */}
                        <h4 className='text-primary text-center'>{appConfig.data.company_details.founder.name}</h4>
                        <h6 className='text-primary text-center'>Founder</h6>
                        <p className='text-muted text-center'>
                        {appConfig.data.company_details.founder.bio}
                        </p>
                    </div>
                    <div className="col-lg-6">
                    <br/>
                        <br/>
                        {/* <center>
                            <img src={ImgVision} alt='vissopm' width="65px" style={{marginBottom: "10px"}} />
                        </center> */}
                        <h4 className='text-primary text-center'>{appConfig.data.company_details.ceo.name}</h4>
                        <h6 className='text-primary text-center'>CEO</h6>
                        <p className='text-muted text-center'>
                        {appConfig.data.company_details.ceo.bio}
                        </p>
                    </div>
                </div>
                <br/>
                <hr/>
                <br/>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <center>
                            <img src={ImgMission} alt='mission' width="65px" style={{marginBottom: "10px"}} />
                        </center>
                        <h4 className='text-primary text-center'>Our Mission</h4>
                        <p className='text-muted text-center'>
                        At Manikya Fashion. we are trying To Connect and build a life long relationship with our customers To offer them Magnificent jewellery at several affordable price points and styles to celebrate and mark life's key Moments. 
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <center>
                            <img src={ImgVision} alt='vissopm' width="65px" style={{marginBottom: "10px"}} />
                        </center>
                        <h4 className='text-primary text-center'>Our Vision</h4>
                        <p className='text-muted text-center'>
                        We are working continuously in fulfilling the vision Of catering Good Quality Jewellery to Women from all the classes Of the Society, and to continue building upon the heritage Of Our Company Manikya Fashion and provide an unmatched customer experience in each and every piece of our jewellery. 
                        </p>
                    </div>
                </div>
                <br/>
                <br/>
            </div>
        </section>
    </div>
  )
}

export default About