import React, {useEffect} from 'react'

const Success = () => {


  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('message', function(event) {
        console.log("Message received from the child: " + event.data);
        // alert(event.data) // Message received from child
      });
    }, 500);
  }, [])

  return (
    <>
      <h1>Please Wait</h1>
    </>
  )
}

export default Success
