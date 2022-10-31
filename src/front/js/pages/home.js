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
      <div className="Container">
        <div className="d-flex align-item-center justify-content-between">
          <div>
            <h1> Económico, ecológico y divertido. </h1>
            <p className="lead">
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
    </section>

    // </div>
  );
};
