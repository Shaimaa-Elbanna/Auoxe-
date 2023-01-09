import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
export default function TvDetails() {



    let {id}= useParams()
    let [tv,setTvDetails]=useState(null)
    
    let[similar,setSimilar]=useState([])






    useEffect(()=>{ 

        getTvDetails(id)
        getSimillar(id)

    },
    [  ])

    async function getTvDetails(tvID){
        let {data}= await axios(`https://api.themoviedb.org/3/tv/${tvID}?api_key=d76ea95e34731a9a8d4c48ff66be413f&language=en-US`)
        setTvDetails(data)
console.log(data);

    }
    async function getSimillar(mediaID){

      let {data}= await axios.get(`https://api.themoviedb.org/3/tv/${mediaID}/similar?api_key=d76ea95e34731a9a8d4c48ff66be413f&language=en-US&page=1`)
  
      setSimilar(data.results)
  
  }





  return (
<div className="container">
<div className='row mt-4'>
        {tv?  <>
            <div className="col-md-4">

<img src={"https://image.tmdb.org/t/p/w500" + tv.poster_path}  className="w-100" alt="" />

   
    
          </div>
          <div className="col-md-8">
            <div className="item">
            <h2> {tv.name}</h2>
            
            <div className="btn btn-warning">{tv.vote_average.toFixed(1)}</div>
            <p className='text-muted my-3'> {tv.overview}</p>


            {tv.genres.map( (element)=> 
            <span className='btn btn-outline-info btn-sm mx-2' id={element.id}>{element.name}</span>
            )}
            <br />
            
            <a className="btn btn-danger mx-2 my-3"  href={tv.homepage} target='blank'>tv site</a>
           
          </div>
          </div>

          <h3 className='my-5'>Recommended of same category</h3>

                          <div className="row g-3">
                          
                          {similar?.slice(0,8).map((el)=>  
                          <div className="col-md-3">
     <Link to={'/tvdetails/' + el.id} >

<div className="item item-zoom position-relative">
  <div className=''>
    <img src={"https://image.tmdb.org/t/p/w500" + el.poster_path} style={{ width: 166, height: 270 }} className=" border rounded-3  border-secondary mb-2" alt="" />
  </div>

  <h3 className="h6">{el.name}</h3>
  <div className="position-absolute top-0 right-0 p-2 bg-warning rounded-pill ">
    {el.vote_average.toFixed(1)} </div>
</div>
</Link>                         </div>
                          )}
                          </div>

         
          </>
       :''
        
         }

       
    </div>
</div>  )
}
