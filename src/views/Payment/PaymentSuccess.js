import React from 'react'
import { useEffect } from 'react';

function PaymentSuccess() {
  
  useEffect(()=>{
      window.opener.postMessage({ msg: "NEW MSG" }, '*');
      console.log(window.opener);
      setTimeout(() => {
        window.close();
      }, 3000)
  }, [])

  return (
    <div>
      <div className="p-5">
          <h1 className="text-center">
            <i className="pi pi-check-circle" style={{fontSize: "80px", color: "#28a745"}}></i>
          </h1>
          <h1 className="text-center text-success">Payment Success</h1>
          <h4 className="text-center">Redirecting ...</h4>
          <br />
        </div>
    </div>
  )
}

export default PaymentSuccess;