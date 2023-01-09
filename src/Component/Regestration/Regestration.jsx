import React ,{useState}from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Joi from 'joi'



export default function Regestration() {
 
  let[user,setuserApi]=useState({
    first_name:"",
    last_name:"",
     email:"",
     password:"",
    age:""
    
  })
let navigate = useNavigate()
let [apiErr,setApiErr]=useState('')
let [loading,setloding]=useState(false)
let[FnErr,setFnErr]=useState("")
let[LnErr,setLnErr]=useState("")
let[EmailErr,setEmailErr]=useState("")
let[PasswordErr,setPasswordErr]=useState("")
let[AgeErr,setAgeErr]=useState("")



  function userData(e){
    

    user = {...user}
    user[e.target.name] =e.target.value
    setuserApi(user)
  }
  async function sbumitUserData(e){
    e.preventDefault()

    let valid =validation()
console.log(valid);



    if (valid.error == null){
      setloding(true)
    



      let {data} = await axios.post ("https://sticky-note-fe.vercel.app/signup",user)
      console.log(data );


   if (data.message === "success"){
     navigate('/login')
     setloding(false)

   }
   else{
     setApiErr(data.message)
     setloding(false)


   }

    }
    else{
      
      valid.error.details.forEach( (el)=>{
        if(el.path[0]==='password'){
          setPasswordErr(el.message)
        }
      } )
      // FirstNAme VAlid 
      valid.error.details.forEach( (el)=>{
        if(el.path[0]==="first_name"){
          setFnErr(el.message)
        }
      })
  // LastNAme VAlid 
  valid.error.details.forEach((el)=>{
   if( el.path[0]=== "last_name"){
    setLnErr(el.message)
  
   }
  })
  // Age valid 
  valid.error.details.forEach((el)=>{
  
    if(el.path[0]==="age"){
      setAgeErr(el.message)
    }
  
  })
  // email VAlid 
  
  valid.error.details.forEach((el)=>{
    if(el.context.key==='email'){
      setEmailErr(el.message)
    }
  })
  



     
    }

    

  }

function validation(){
  let scheme = Joi.object({
    first_name: Joi.string().required().min(3).max(10).alphanum(),
    last_name:Joi.string().required().min(3).max(10).alphanum(),
    email: Joi.string().required().email({tlds:{allow:['com','net']}}),
    age: Joi.number().required().min(18).max(50),
    password:Joi.string().required().pattern(new RegExp ('^[A-Z][a-z]{2,10}[0-9]?$'))

  })
 return scheme.validate(user,{abortEarly:false })
} 


  return (
    <div className='container my-5'>
      <h2 className='text-center'>Regestraion form</h2>




<form className='my-4 shadow col-8 m-auto' onSubmit={sbumitUserData}>

<div className='my-2'>
  <label htmlFor="first_name">Enter your first name</label>
  <input type="text"onChange={userData}  id='first_name' name='first_name' className='form-control bg-transparent text-white mt-2'/>
{FnErr?<div className='alert alert-info mt-2 p-1'>{FnErr}</div>: ""}
</div>
<div className='my-2'>
  <label htmlFor="last_name"> Enter your last name</label>
  <input type="text" onChange={userData} id='last_name' name='last_name' className='form-control bg-transparent text-white mt-2'/>
  {LnErr?<div className='alert alert-info mt-2 p-1'>{LnErr}</div>: ""}

</div>
<div className='my-2'>
  <label htmlFor="email"> Enter your email</label>
  <input type="text" onChange={userData} id='email' name='email' className='form-control bg-transparent text-white mt-2'/>
  {EmailErr?<div className='alert alert-info mt-2 p-1'>{EmailErr}</div>: ""}

</div>
<div className='my-2'>
  <label htmlFor="age"> Enter you age</label>
  <input type="number"  id='age' onChange={userData} name='age' className='form-control bg-transparent text-white mt-2'/>
  {AgeErr?<div className='alert alert-info mt-2 p-1'>{AgeErr}</div>: ""}

</div>
 <div className='my-2'>
  <label htmlFor="password"> Enter your password</label>
  <input type="password"  id='password' onChange={userData} name='password'className='form-control bg-transparent text-white mt-2'/>
  {PasswordErr?<div className='alert alert-info mt-2 p-1'>Not valid Password</div>: ""}

{/*   
  {submitErr.filter((err)=> err.context.lable ==='password' )[0]?  submitErr.filter((err)=> err.context.lable ==='password' )[0]?.message :"" } */}
    
</div> 

{apiErr===""? "" : <div className='alert alert-primary'> {apiErr}</div>}

{/* {loading? <button className='btn btn-outline-info my-2 ' type='submit'><i className='fa-solid fa-spinner fa-spin'></i></button> :  <button className='btn btn-outline-info my-2 ' type='submit'>Regester</button>} */}

{/* or have another way  */}

<button className="btn btn-outline-info my-2 " type='submit '>{loading? <i className='fa fa-spinner fa-spin'></i>:"Regester" }</button>
</form>




{/* <form className='my-4' onSubmit={sbumitUserData}> 
{apiErr===""? "" : <div className='alert alert-primary my-2' > {apiErr}</div>}

<div className='my-2'>
  <label htmlFor="first_name">Enter your first name</label>
  <input type="text"onChange={userData}  id='first_name' name='first_name' className='form-control bg-transparent text-white mt-2'/>
  <div className='alert alert-info my-2'>{submitErr[0].message>0}</div>

</div>
<div className='my-2'>
  <label htmlFor="last_name"> Enter your last name</label>
  <input type="text" onChange={userData} id='last_name' name='last_name' className='form-control bg-transparent text-white mt-2'/>
  <div className='alert alert-info my-2'>{submitErr[1].message}</div>

</div>
<div className='my-2'>
  <label htmlFor="email"> Enter your email</label>
  <input type="text" onChange={userData} id='email' name='email' className='form-control bg-transparent text-white mt-2'/>
  <div className='alert alert-info my-2'>{submitErr[2].message}</div>

</div>
<div className='my-2'>
  <label htmlFor="age"> Enter you age</label>
  <input type="number"  id='age' onChange={userData} name='age' className='form-control bg-transparent text-white mt-2'/>
  <div className='alert alert-info my-2'>{submitErr[3].message}</div>

</div>
<div className='my-2'>
  <label htmlFor="password"> Enter your password</label>
  <input type="password"  id='password' onChange={userData} name='password'className='form-control bg-transparent text-white mt-2'/>
  <div className='alert alert-info my-2'>{submitErr[4].message}</div>

</div>



{loading? <button className='btn btn-outline-info my-2 ' type='submit'><i className='fa-solid fa-spinner fa-spin'></i></button> :  <button className='btn btn-outline-info my-2 ' type='submit'>Regester</button>}



</form>  */}
      
      
    </div>
  )
}
