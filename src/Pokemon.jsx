// Pokemon.jsx
import React from 'react';
import './App.css';

function Pokemon({ pokemon, language }) {
  return (
    <div className="card">
      <img src={pokemon.image} alt={pokemon.name.english} />
      <div className="card-details">
      <p>ID: {pokemon.id}</p>
      <p>Name: {pokemon.name[language]}</p>
      </div>
    </div>
  );
}

export default Pokemon;
