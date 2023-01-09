import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PeopleDetails() {

  let {id}= useParams()
  let [people,setpeopleDetails]=useState(null)



useEffect(()=>{ 

  getPeopleDetails(id)

},
[  ])

async function getPeopleDetails(peopleID){
  let {data}= await axios(`https://api.themoviedb.org/3/person/${peopleID}?api_key=d76ea95e34731a9a8d4c48ff66be413f&language=en-US
  `)
  setpeopleDetails(data)
console.log(data);

}




  return (
<div className="container ">


{/* <div className="w-50 h-50  d-flex justfy-content-center align-item-center shadow shadow-lg bg-danger"> */}

<div className='row mt-4'>
        {people?  <>
            <div className="col-md-4">

<img src={"https://image.tmdb.org/t/p/w500" + people.profile_path}  className="w-100" alt="" />

   
    
          </div>
          <div className="col-md-8">
            <div className="item">
            <h2> {people.name}</h2>
            
            <div className="btn btn-warning">{people.popularity.toFixed(1)}</div>
            <p className='text-muted my-3'> {people.overview}</p>


            {people.also_known_as.map( (element)=> 
            <span className='btn btn-outline-info btn-sm mx-2' >{element}</span>
            )}
            <br />
            
            <a className="btn btn-danger mx-2 my-3"  href={people.homepage} target='blank'>people site</a>
           
          </div>
          </div>

         

         
          </>
       :''
        
         }

       
    </div>

    {/* </div> */}

</div>  )
}
