// Pokedex.jsx
import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [language, setLanguage] = useState('english');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchPokemonList();
  }, [currentPage, language]);

  const fetchPokemonList = async () => {
    try {
      const response = await fetch(
        `https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`
      );
      const data = await response.json();
      setPokemonList(data.data);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      setLoading(false);
    }
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const pokemonChunks = chunkArray(pokemonList, 5);

  return (
    <div style={styles.card}>
      <h2>Prelim Exam</h2>
      <div>
        <button onClick={() => handleLanguageChange('english')}>English</button>
        <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
        <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
        <button onClick={() => handleLanguageChange('french')}>French</button>
      </div>
      <div>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Back</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i+1} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
      <div>
        <p>Current Page: {currentPage}</p>
        <p>Total Pages: {totalPages}</p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {pokemonChunks.map((chunk, index) => (
            <div key={index} style={styles.row}>
              {chunk.map((pokemon) => (
                <div key={pokemon.id} style={styles.pokemonContainer}>
                  <Pokemon pokemon={pokemon} language={language} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    margin: '20px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  pokemonContainer: {
    width: 'calc(20% - 10px)',
    marginBottom: '10px',
  },
};

export default Pokedex;
