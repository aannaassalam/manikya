import React from 'react'
import { useHistory } from 'react-router-dom'

function PageNotFond() {

    const history = useHistory();

  return (
    <div>
        <div className="p-5">
            <center>
                <h1 className="text-center">
                    <i className="pi pi-exclamation-triangle" style={{fontSize: "60px", color: "#3f311b"}}></i>
                </h1>
                <h1 className="text-center text-warning" style={{
                    fontSize: "70px",
                    fontFamily: "'Roboto' !important",
                    color: "#3f311b !important",
                    margin: "0px"
                }}>404</h1>
                <h1 className="text-center text-warning" style={{
                    fontSize: "25px",
                    fontFamily: "'Roboto' !important",
                    color: "#3f311b !important",
                    margin: "0px"
                }}>Opps, Page not found!</h1>
                <br />
                <button className='btn btn-primary' onClick={() => { history.push('/') }}>Go Home</button>
            </center>
        </div>
    </div>
  )
}

export default PageNotFond
