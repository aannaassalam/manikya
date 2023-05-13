import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Base64 } from 'js-base64';
function TestPage() {

  const {url} = useParams();
  const iFrameRef = useRef(null);

  useEffect(() => {
    window.addEventListener('message', function(event) {
      console.log("TEST PAGE Message received from the child: " + event.data);
      // alert(event.data) // Message received from child
    });
  }, []);


  return (
    <>
      {console.log(Base64.decode(url))}
      <iframe ref={iFrameRef} src={Base64.decode(url)} width="900px" height="700px"></iframe>
    </>
  )
}

export default TestPage