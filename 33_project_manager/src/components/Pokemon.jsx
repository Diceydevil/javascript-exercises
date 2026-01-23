import { useState, useEffect } from "react";

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pokemon Grid</h2>
      {loading && <p>Loading Pokemon...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <p className="text-gray-600">{pokemonList.length} Pokemon loaded!</p>
      )}
    </div>
  );
}

export default Pokemon;
