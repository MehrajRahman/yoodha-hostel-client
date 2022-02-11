import React from 'react'
import Food from '../Food/Food'
import Appbar from '../Reusable/Appbar/Appbar'
import Student from '../Student/Student'
import Header from './Header/Header'

const Home = () => {
  return (
    <div>
        <Appbar></Appbar>
        <Header></Header>
        {/* <Food></Food>
        <Student></Student> */}
       
    </div>
  )
}

export default Home