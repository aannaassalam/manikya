import React from 'react'
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();

  history.push('/orders');
  
  return (
    <div>Profile</div>
  )
}

export default Profile