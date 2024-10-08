// Home.js
import React from "react";
import Peliculas from "../components/Peliculas/Peliculas";
import SearchForm from "../components/Buscador/Buscador";

const Home = (props) => {
  return (
    <div className="home">
      <SearchForm {...props} /> 
      <Peliculas {...props} /> 
    </div>
  );
}

export default Home;
