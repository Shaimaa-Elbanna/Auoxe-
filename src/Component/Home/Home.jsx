import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import spare from "../../img/testimonial-4.jpg"
// import {$} from 'jquery/dist/jquery.min.js'



export default function Home() {


  let [movieData, setMovie] = useState([])
  let [tvData, setTv] = useState([])
  let [peopleData, setPeople] = useState([])


  useEffect(() => {
    getData("movie", setMovie)
    getData("tv", setTv)
    getData("person", setPeople)
  }, [])

  async function getData(type = 'movie', category) {

    let { data } = await axios(`https://api.themoviedb.org/3/trending/${type}/day?api_key=d76ea95e34731a9a8d4c48ff66be413f`)
    console.log(data.results);
    category(data.results.slice(0, 10))

  }


  // $(document).ready(function(){
  //   $('.owl-carousel').owlCarousel();
  // });

  return (<>

   <div className='vh-50 w-100 ' >
<div class="">

  
</div>


</div> 



<div className="container border-bottom border-white">
      <div className='row   mb-5   g-3  mt-5  '>
        <div className="col-md-4 mt-5 ">
          <div className="bdr w-25   ">
          </div>
          <h2 className="my-4">New <br />Trending <br />movie list</h2>
          <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, vero?</p>
          <div className="bdr w-100 "></div>
        </div>
        {movieData.map((el, i) =>

          <div className="col-md-2     " key={i}>

            <Link to={'/moviedetails/' + el.id} >
              <div className=" item item-zoom position-relative ">
                <div className='  '>
                  <img src={"https://image.tmdb.org/t/p/w500" + el.poster_path} className=" border rounded-3  border-secondary mb-2 " style={{ width: 166, height: 270 }} alt="" />

                </div>

                <div className=' '>
                  <h3 className="h6">{el.title}</h3  >

                </div>
                <div className="position-absolute top-0 right-0 p-2 bg-warning rounded-pill ">
                {el.vote_average.toFixed(1)} </div>

              </div>
            </Link>
          </div>

        )}



      </div>

      <Link className="btn btn-outline-info mb-3" to='/movies'> see more</Link>
    </div>




    <div className="container my-5 border-bottom border-white">
      <div className='row    g-3   '>
        <div className="col-md-4  mt-5 ">
          <div className="bdr w-25   ">
          </div>
          <h2 className="my-4">New <br />Trending <br />TV list</h2>
          <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, vero?</p>
          <div className="bdr w-100 "></div>
        </div>
        {tvData.map((el, i) =>

          <div className="col-md-2" key={i}>
                        <Link to={'/tvdetails/' + el.id} >

            <div className="item item-zoom position-relative">
              <div className=''>
                <img src={"https://image.tmdb.org/t/p/w500" + el.poster_path} style={{ width: 166, height: 270 }} className=" border rounded-3  border-secondary mb-2" alt="" />
              </div>

              <h3 className="h6">{el.name}</h3>
              <div className="position-absolute top-0 right-0 p-2 bg-warning rounded-pill ">
                {el.vote_average.toFixed(1)} </div>
            </div>
</Link>
          </div>


        )}



      </div>
      <Link className="btn btn-outline-info mb-3" to='/tv'> see more</Link>

    </div>

    <div className="container  my-5">
      <div className='row   mb-5  g-3  '>
        <div className="col-md-4  mt-5 ">
          <div className="bdr w-25   ">
          </div>
          <h2 className="my-4">New <br />Trending <br />People list</h2>
          <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, vero?</p>
          <div className="bdr w-100 "></div>
        </div>
        {peopleData.filter((img)=> img.profile_path !== null).map((el, i) =>

          <div className="col-md-2" key={i}>

<Link to={'/peopledetails/' + el.id} >

            <div className="item item-zoom ">
              {(el.profile_path == null) ? <div className=''>

                <img src={spare} style={{ width: 166, height: 270 }} className="border rounded-3  border-secondary mb-2" alt="" />
              </div>
                :

                <div className=''>

                  <img src={"https://image.tmdb.org/t/p/w500" + el.profile_path} className=" border rounded-3  border-secondary mb-2 " style={{ width: 166, height: 270 }} alt="" />
                </div>
              }
              <h3 className="h6">{el.name}</h3>
       
            </div>

</Link>

          </div>
        )}


      </div>
    </div>









  </>
  )
}
