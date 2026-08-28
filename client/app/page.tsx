'use client'
import axios from 'axios'
import React, { useEffect } from 'react'

function page() {
  useEffect(()=>{
    axios.post('http://localhost:5000/api/user/get')
    .then((res)=>console.log(res))
  },[])
  return (
    <div className='mx-60'>..Cat..</div>
  )
}

export default page