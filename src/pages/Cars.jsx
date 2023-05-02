import React from 'react'
import { useEffect} from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const Cars = () => {

  const [cars, setCars] = useState([]);

  useEffect(()=>{

    const fetchCars = async ()=>{
      try{

        const res = await axios.get("http://localhost:8800/cars");
        setCars(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchCars()
  }, []);

  const handleDelete = async (id) =>{
    try{

      await axios.delete("http://localhost:8800/deleteCar/"+id);
      window.location.reload();
    }catch(err){
      console.log(err)
    }
  }


  return <div>
      <h1>CARS FOR SALE</h1>
      <div className = "cars">
        {cars.map(car =>(
          <div className = "car" key={car.id}>
            {car.cover && <img src = {car.cover} alt = "" />}
            <h2>{car.carName}</h2>
            <p>{car.carDesc}</p>
            <span>{car.carPrice}</span>
            <p>{car.km}</p>
            <p>{car.carYear}</p>
            <button className = "delete" onClick = {() =>handleDelete(car.id)}> Delete </button>
            <button className = "update"> <Link to ={`/update/${car.id}`}>Update</Link></button>
          </div>
        ))}
      </div>
      <button><Link to ="/add"> ADD CAR LISTING</Link></button>
    </div>;
};

export default Cars