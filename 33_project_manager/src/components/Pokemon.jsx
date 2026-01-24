import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon");
        }
        return response.json();
      })
      .then((data) => {
        setPokemonList(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pokemon Grid</h2>
      {loading && <p>Loading Pokemon...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-4 gap-4">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Pokemon;
