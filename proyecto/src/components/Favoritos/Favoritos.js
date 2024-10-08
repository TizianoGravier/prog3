import React, {Component} from "react";
import PeliculaCard from "../PeliculaCaja/PeliculaCaja";
import "./Favoritos.css"

class Favoritos extends Component{
    constructor(){
        super()
        this.state = {
            favoritos: [],
            peliculasFavoritas: [],
            descripcionId: null
        }
    }

    componentDidMount(){
        const favoritos = localStorage.getItem("favoritos") ? JSON.parse(localStorage.getItem("favoritos")) : []
        this.setState({favoritos})

        for(let i = 0; i < favoritos.length; i++){
            this.cargarDetalle(favoritos[i])
        }
    }
    cargarDetalle = (id) => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c7afdc079b8b11e78d950199ac3a221e`)
        .then((response) => response.json())
        .then((data) => {
            const pelisNuevas = this.state.peliculasFavoritas
            pelisNuevas.push(data)
            this.setState({ peliculasFavoritas: pelisNuevas})
        })
        .catch((e) => console.log(e));
    }

    retirarFavoritas = (id) => {
        let favsNuevos = this.state.favoritos.filter((favoritoId) => favoritoId !== id);
        localStorage.setItem("favoritos", JSON.stringify(favsNuevos));
    
        const pelisNuevasFav = this.state.peliculasFavoritas.filter((peli) => peli.id !== id);
          this.setState({ favoritos: favsNuevos, peliculasFavoritas: pelisNuevasFav });
      };

      showDesc = (id) => {
        this.setState({
          showDescId: this.state.showDescId === id ? null : id,
        });
      };
    
      esFavorito = (id) => {
        return this.state.favoritos.includes(id);
      };

      render(){
        const {peliculasFavoritas, showDescId} = this.state

        return(
            <div className="favoritos">
        <h2> Favoritos</h2>
        <div className="contenedor-peliculas">
          {peliculasFavoritas.length > 0 ? (
            peliculasFavoritas.map((peli) => (
              <PeliculaCard
                key={peli.id}
                pelicula={peli}
                esFavorito={this.esFavorito}
                agregarFav={this.retirarFavoritas}
                verDescripcionId={showDescId}
                mostrarDescrip={this.showDesc}
              />
            ))
          ) : (
            <p>No seleccionaste películas favoritas.</p>
          )}
        </div>
      </div>
        )
      }

}
export default Favoritos;