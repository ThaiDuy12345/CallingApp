import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../components/Login'
import Signin from '../components/Signin'
import MainBody from '../components/MainBody'
import axios from 'axios'
export default function Body() {
  function Checking(){
    if(localStorage.getItem('AccountID') == null){
      console.log('null localstorage')
      return false
    }else{
      axios.get(`https://sirikakire-chat.herokuapp.com/api/Account/getAccountWithId/${localStorage.getItem("AccountID")}`)
      .then(res => {
        if (res.data == null) {
          console.log('id not found') 
          return false
        }else{
          console.log('id found') 
          return true
        }
      })
    }
  }
  const CheckingHome = () => {
    if(Checking() === false) return <Navigate to="/login"/>
    return <MainBody/>
  }
  const CheckingLogin = () => {
    if(Checking() === false) return <Login/>
    return <Navigate to="/"/>
  }
  const CheckingSignin = () => {
    if(Checking() === false) return <Signin/>
    return <Navigate to="/"/>
  }
  return (
    <Routes>
      <Route path="*" element={<CheckingHome/>}/>
      <Route path="/login" element={<CheckingLogin/>} />
      <Route path="/signin" element={<CheckingSignin/>} />
    </Routes>
  )
}
