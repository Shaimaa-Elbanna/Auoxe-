import './App.css';
import Mastercomponent from './Component/Mastercomponent/Mastercomponent';
import {RouterProvider, Navigate, createHashRouter} from 'react-router-dom'
import Home from './Component/Home/Home';
import Movies from './Component/Movies/Movies';
import Regestration from './Component/Regestration/Regestration';
import Login from './Component/Login/Login';
import Notfound from './Component/Notfound/Notfound';
import { useEffect, useState } from 'react';
import jwt_decoded from 'jwt-decode'
import MovieDetails from './Component/MovieDetails/MovieDetails';
// import { Provider } from 'react-redux';
// import { Store } from './Store';
import TvDetails from './Component/TvDetails/TvDetails';
import PeopleDetails from './Component/PeopleDetails/PeopleDetails';
import TV from './Component/TV/TV';


function App() {

let [user,setToken]= useState(null)



useEffect ( ()=> {

    if (localStorage.getItem("token")!=null){
      saveLoginData()


}} , [])

function  GaurdRouting (props){
  if (localStorage.getItem("token")==null){

    return <Navigate to="/login"/>


  }

  else{
    return props.children

  }
}


function saveLoginData (){

  let token =localStorage.getItem("token")
  let data = jwt_decoded(token)

setToken(data)
console.log(data);
}

function logout(){
  setToken(null)

  localStorage.removeItem("token")
  return <Navigate to ="/login"/>

}






let routing = createHashRouter
([
  {path:"/" , element :<Mastercomponent details={user} logOut={logout} /> , children: [
    {path : "home", element:<GaurdRouting><Home/></GaurdRouting>},
    {path : "/", element:<GaurdRouting><Home/></GaurdRouting>},
    {path : "tv", element:<GaurdRouting><TV /></GaurdRouting>},
    {path : "movies", element:<GaurdRouting>< Movies/></GaurdRouting>},
    {path : "moviedetails/:id", element:<GaurdRouting>< MovieDetails/></GaurdRouting>},
    {path : "tvdetails/:id", element:<GaurdRouting>< TvDetails/></GaurdRouting>},
    {path : "peopledetails/:id", element:<GaurdRouting>< PeopleDetails/></GaurdRouting>},

    {path : "regestration", element:< Regestration/>},
    {path : "login", element:<Login  loginToken={saveLoginData} />},
    {path : "*", element: <Notfound/>},
  ]}
])





  return (
    <>
    <RouterProvider router ={routing}/>

    </>
    );
}

export default App;
