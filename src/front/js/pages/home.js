import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Viajes } from "../component/viajes.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    // <div className="text-center mt-5">

    <section className="bg-white text-primary p-5 text-center text-sm-start">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="mt-5">
            <h1> Económico, ecológico y divertido. </h1>
            <p className="lead text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button type="button" className="btn btn-primary btn-lg">
              {" "}
              Más información{" "}
            </button>
          </div>
          <img
            className="img-fluid w-50"
            src="https://i.imgur.com/GkiluHM.jpg"
            alt=""
          />
        </div>
      </div>
      <section className="bg-primary text-light p-5 bg-opacity-75">
        <div className="Container">
          <div className="d-md-flex justify-content-between align-items-center">
            <h3 className="mb-3.mb-md-0 text-center"> Nuestros viajes destacados </h3>
            <Viajes />
          </div>
        </div>
      </section>
	  
	  <div className="container d-flex justify-content-center">

	  <div className="row row-cols-1 row-cols-md-2 g-4 m-4">
	  	<div className="col">
		<div className="card" style={{width: "28rem"}}>
		  <img src="https://imgur.com/aJjTFph.jpg" className="card-img-top" alt=" portada pasajeros "/>
			<div className="card-body">
		  		<h5 className="card-title"> Pasajeros </h5>
		  		<p className="card-text text-secondary">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
			</div>
		</div>
		</div>
		</div>
		
		<div className="row row-cols-1 row-cols-md-2 g-4 m-4">
	  	<div className="col">
		<div className="card" style={{width: "28rem"}}>
		  <img src="https://imgur.com/S8vYnVH.jpg" className="card-img-top" alt=" portada conductores "/>
			<div className="card-body">
		  		<h5 className="card-title"> Conductores </h5>
		  		<p className="card-text text-secondary">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
			</div>
		</div>
		</div>
		</div>


	  </div>

	  
  			
			 
    </section>
	
	
	

    // </div>
  );
};
