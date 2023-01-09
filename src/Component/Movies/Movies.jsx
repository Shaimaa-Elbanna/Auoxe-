import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Movies() {
let Nums = new Array(10).fill(1).map((el,i)=>i+1 )
  let [movieData, setMovie] = useState([])
  let [movieCat, setMovieCat] = useState('now_playing')
let[loading,setLoding]=useState(false)
  function choseCat(e) {

    let cat = e.target.id
    setMovieCat(cat);
    getMovies(movieCat,1)


  }
  function getPage(i){
    getMovies(movieCat,i)


  }

  useEffect(() => {
    getMovies()

  }, [])

  async function getMovies(category = 'now_playing',page='1') {
    setLoding(false)

    let { data } = await axios(`https://api.themoviedb.org/3/movie/${category}?api_key=d76ea95e34731a9a8d4c48ff66be413f&language=en-US&page=${page}`)
    console.log(data.results);
    setMovie(data.results)
    setLoding(true)

  }

  return (
    <>
{loading?
  <div className="container">
  <div className='my-5 d-flex btn-group btn-group-lg justify-content-center  '>
    <span className='btn btn-outline-info  ' id='now_playing' onClick={choseCat} >Now playing</span>
    <span className='btn btn-outline-info  ' id='popular' onClick={choseCat}>popular</span>
    <span className='btn btn-outline-info  ' id='top_rated' onClick={choseCat}>top_rated</span>
    <span className='btn btn-outline-info  ' id='upcoming' onClick={choseCat}>upcoming</span>
  </div>

  <div className='row g-3  '>
    <div className="col-md-4  ">
      <div className="bdr w-25   ">
      </div>
      <h2 className="my-4">New <br />Trending <br />movie list</h2>
      <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, vero?</p>
      <div className="bdr w-100 "></div>
    </div>





    {movieData.map((el, i) =>

<div className="col-md-2     " key={i}>

<Link to={'/moviedetails/' + el.id} >
  <div className=" item item-zoom ">
    <div className='  '>
      <img src={"https://image.tmdb.org/t/p/w500" + el.poster_path} className=" border rounded-3  border-secondary mb-2 " style={{ width: 166, height: 270 }} alt="" />

    </div>

    <div className=' '>
      <h3 className="h6">{el.title}</h3  >

    </div>
  </div>
</Link>
</div>

    )}



  </div>
  <nav aria-label="Page navigation example ">
<ul className="pagination d-flex justify-content-center   ">

{Nums.map((el)=>  <li className="page-item cursor"><a className="page-link" onClick={() => getPage(el)}>{el}</a></li> )}



</ul>
</nav>
  </div>

:
  <section className='loading '>
    <i className="fa-solid fa-spinner fa-spin fa-2xl text-info "></i>
  </section>


}
    

    </>
  )
}
