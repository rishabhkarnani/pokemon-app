import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Use CSS file

function Home() {
  const [pokemonArray, setPokemonArray] = useState([]); // Save Pokémon list

  // Get Pokémon list
  const getPokemonData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20'); // Fetch Pokémon list
      const data = await response.json();

      let updatedPokemonArray = [];

      // Get each Pokémon details
      for (const pokemon of data.results) {
        const details = await getPokemonDetails(pokemon.url);
        updatedPokemonArray.push({
          name: pokemon.name, // Pokémon name
          image: details.sprites.front_default, 
        });
      }

      setPokemonArray(updatedPokemonArray);
    } catch (error) {
      console.log("Error fetching Pokémon data:", error); 
    }
  };

  // Get Pokémon details
  const getPokemonDetails = async (url) => {
    const response = await fetch(url); 
    return response.json();
  };

  // Load Pokémon on start
  useEffect(() => {
    getPokemonData();
  }, []); 

  return (
    <div className="home-container">
      <h1 className="title">Pokémon List</h1> 
      <div className="pokemon-grid">
        {pokemonArray.map((pokemon, index) => (
          <Link to={`/pokemon/${pokemon.name}`} key={index} className="pokemon-card">
            <img src={pokemon.image} alt={pokemon.name} /> {}
            <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3> {}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
