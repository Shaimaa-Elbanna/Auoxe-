import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'

export default function Login({loginToken}) {
  let [user, setuserApi] = useState({

    email: "",
    password: "",
  })
  let navigate = useNavigate()
  let [apiErr, setApiErr] = useState('')
  let [loading, setloding] = useState(false)
  let[EmailErr,setEmailErr]=useState('')



  function userData(e) {


    user = { ...user }
    user[e.target.name] = e.target.value
    setuserApi(user)
  }
  async function sbumitUserData(e) {
    e.preventDefault()

    let valid = validation()



    if (valid.error == null) {
      setloding(true)




      let { data } = await axios.post(`https://sticky-note-fe.vercel.app/signin`, user)


      if (data.message === "success") {
        navigate('/home')
        setloding(false)
        localStorage.setItem("token", data.token)
        loginToken()

      }
      else {
        setApiErr(data.message)
        setloding(false)


      }

    }
    else {
     valid.error.details.forEach((el)=>{
      if(el.path[0]==='email'){
        setEmailErr(el.message)
      }
     })

    }



  }

  function validation() {
    let scheme = Joi.object({


      email: Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),

      password: Joi.string().required().pattern(new RegExp('^[A-Z][a-z]{2,10}[0-9]?$'))

    })
    return scheme.validate(user, { abortEarly: false })
  }


  return (
    <div className='container my-5'>
      <h2 className='text-center'>Login form</h2>

    


      <form className='my-4 shadow col-8 m-auto'   onSubmit={sbumitUserData}>


        <div className='my-2'>
          <label htmlFor="email"> Enter your email</label>
          <input type="text" onChange={userData} id='email' name='email' className='form-control bg-transparent text-white mt-2' />
          {EmailErr?<div className='alert alert-info mt-2 p-1'>{EmailErr}</div>: ""}

        </div>

        <div className='my-2'>
          <label htmlFor="password"> Enter your password</label>
          <input type="password" id='password' onChange={userData} name='password' className='form-control bg-transparent text-white mt-2' />
        </div>

        {apiErr === "" ? "" : <div className='alert alert-primary'> {apiErr}</div>}

        {loading ? <button className='btn btn-outline-info my-2 ' type='submit'><i className='fa-solid fa-spinner fa-spin'></i></button> : <button className='btn btn-outline-info my-2 ' type='submit'>Login</button>}



      </form>







    </div>
  )
}
