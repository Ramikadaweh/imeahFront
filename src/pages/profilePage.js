import React from 'react'
import  AccountProfile  from '../components/profile/account-profile'
import  AccountProfileDetails  from '../components/profile/account-profile-details'
// import back from '../images/bacl.jpg'

export default function ProfilePage() {
  
  return (
    <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap'}}>
        <AccountProfile/>
        <AccountProfileDetails/>
    </div>
  )
}
