import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css';

function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
      .catch((err) => console.log('Error:', err));
  }, [name]);

  if (!pokemon) return <h2>Loading...</h2>;

  return (
    <div className="details-container">
      <h1 className="title">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
      <div className="pokemon-details">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h3>Abilities:</h3>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetails;
