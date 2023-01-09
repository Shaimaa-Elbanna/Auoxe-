import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function TV() {

  let Nums = new Array(10).fill(1).map((el,i)=>i+1 )
  let [TvData, setTv] = useState([])
  let [TvCat, setTvCat] = useState('popular')
let[loading,setLoding]=useState(false)


  function chosetv(e) {

    let cat = e.target.id
    setTvCat(cat);
    getTv(TvCat,1)


  }
  function getPage(i){
    getTv(TvCat,i)


  }

  useEffect(() => {
    getTv(TvCat,1)

  }, [])

  async function getTv(category = 'popular',page='1') {
    setLoding(false)

    let { data } = await axios(`https://api.themoviedb.org/3/tv/${category}?api_key=d76ea95e34731a9a8d4c48ff66be413f&language=en-US&page=${page}`
    )
    console.log(data.results);
    setTv(data.results)
    setLoding(true)

  }









  return (
    <>
     {loading?
      <div className="container">
      <div className='my-5 d-flex btn-group btn-group-lg justify-content-center  col-3 m-auto '>
        <span className='btn btn-outline-info  ' id='popular' onClick={chosetv} >popular</span>
        <span className='btn btn-outline-info  ' id='top_rated' onClick={chosetv}>Top rated</span>
      </div>
    
      <div className='row g-3  '>
        <div className="col-md-4  ">
          <div className="bdr w-25   ">
          </div>
          <h2 className="my-4">New <br />Trending <br />movie list</h2>
          <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, vero?</p>
          <div className="bdr w-100 "></div>
        </div>
    
    
    
    
    
        {TvData.filter((img)=> img.backdrop_path !== null).map((el, i) =>
    
    <div className="col-md-2     " key={i}>
    
    <Link to={'/tvdetails/' + el.id} >
      <div className=" item item-zoom ">
        <div className='  '>
          <img src={"https://image.tmdb.org/t/p/w500" + el.backdrop_path} className=" border rounded-3  border-secondary mb-2 w-100 "  alt="" />
    
        </div>
    
        <div className=' '>
          <h3 className="h6">{el.namen}</h3  >
    
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
