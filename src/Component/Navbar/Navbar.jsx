import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import'./Navbar.css'

export default function Navbar({tokenDetails,logOut}) {
  return (

    <nav className="navbar Navindex navbar-expand-lg bg-transparent navbar-dark ">
    <div className="container">
      <Link className="navbar-brand h1 pt-2 prand" to="home">Auoxe</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">

 {tokenDetails ? <>
<ul className="navbar-nav m-auto mb-2 mb-lg-0   w-50">
          
          <li className="nav-item ">
           <NavLink className={({isActive})=> isActive? "nav-link active":"nav-link"} to='home' >Home</NavLink>
          </li>
         


          <li className="nav-item">
           <NavLink className={({isActive})=> isActive? "nav-link active":"nav-link"}  to='movies'>Movies</NavLink>
          </li>
          <li className="nav-item">
           <NavLink className={({isActive})=> isActive? "nav-link active":"nav-link"}  to='tv'>TV</NavLink>
          </li>
          

          {/* <li class="nav-item dropdown">
          <NavLink className={({isActive})=> isActive? "nav-link active nav-link dropdown-toggle":"nav-link nav-link dropdown-toggle" }   >Movies
            
          </NavLink>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to='movies'>popular</Link></li>
            <li><Link class="dropdown-item" to='movies'>now playing</Link></li>
            <li><Link class="dropdown-item" to='movies'>top rated</Link></li>
            <li><Link class="dropdown-item" to='movies'>upcoming</Link></li>
          </ul>
        </li> */}
          {/* <li className="nav-item">
           <NavLink className={({isActive})=> isActive? "nav-link active":"nav-link"}  to='public'>Public</NavLink>
          </li> */}
          {/* <li className="nav-item">
           <NavLink className={({isActive})=> isActive? "nav-link active":"nav-link"}  to='network'>Network</NavLink>
          </li> */}

          
        
         
        </ul> 


        <ul className='navbar-nav ms-auto mb-2 mb-lg-0 '>
       
<li className='mt-2'>
  <i className='fab fa-facebook mx-1 fa-xl '></i>
</li>
<li className='mt-2'>
  <i className='fab fa-twitter mx-1 fa-xl'></i>
</li>
<li className='mt-2'>
  <i className='fab fa-instagram mx-1 fa-xl'></i>
</li>
<li className='mt-2'>
  <i className='fab fa-spotify mx-1 fa-xl'></i>
</li>
<li className="nav-item">

<span className='nav-link btn btn-info  mx-5 cursor' onClick={logOut}> logout</span>          </li>
        </ul>

        </>
        : 

        <ul  className="navbar-nav ms-auto mb-2 mb-lg-0 " >
        <li className="nav-item">
           <NavLink className={({isActive})=> isActive? "nav-link active":"nav-link"}  to='regestration'>Regestration</NavLink>
          </li>
          <li className="nav-item">
           <NavLink className={({isActive})=> isActive? "nav-link active":"nav-link"}  to='login'>Login</NavLink>
          </li>
        </ul>
       } 

     

       

      

       
        
      </div>
    </div>
  </nav>
  )
}
