import React from 'react'
import UserProfile from '../components/profile/user-profile'
import UserProfileDetails from '../components/profile/user-profile-details'
// import back from '../images/bacl.jpg'

export default function UserProfilePage() {
  
  return (
    <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap'}}>
        <UserProfile/>
        <UserProfileDetails/>
    </div>
  )
}