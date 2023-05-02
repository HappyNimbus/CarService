import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
  const [car,setCar] = useState({
    carName: "",
    km: "",
    carYear: "",
    carDesc: "",
    cover: "",
    carPrice: null,

  });

  const navi = useNavigate()
  const location = useLocation()

  const carId = location.pathname.split("/")[2]

  const handleChange = (e) =>{
    setCar(prev => ({...prev, [e.target.name]: e.target.value}));
  };
  
  const handleClick = async e =>{
    e.preventDefault();

    try{
      await axios.put("http://localhost:8800/updateCar/" + carId, car);
      navi("/");
    }catch(err){
      console.log(err);
    }

  }

  console.log(car);
  return (
    <div className = 'form'>
      <h1> Update car listing</h1>
      <input type = "text" placeholder = "car name" onChange={handleChange} name="carName"/>
      <input type = "text" placeholder = "car desc" onChange={handleChange} name="carDesc"/>
      <input type = "number" placeholder = "price" onChange={handleChange} name = "carPrice"/>
      <input type = "number" placeholder = "car KM" onChange={handleChange} name = "km"/>
      <input type = "number" placeholder = "car Year" onChange={handleChange} name = "carYear"/>
      <input type = "text" placeholder = "cover" onChange={handleChange} name = "cover"/>

      <button className = "formButton" onClick = {handleClick}>UPDATE</button>
    </div>
  )
}

export default Update;