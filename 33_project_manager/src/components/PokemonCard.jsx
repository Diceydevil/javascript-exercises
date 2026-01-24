import { useCollection } from "../contexts/CollectionContext";

function PokemonCard({ pokemon }) {
  const { handleAddPokemon } = useCollection();

  return (
    <div className="border border-gray-300 rounded-lg p-4 text-center">
      {pokemon.image && (
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-full h-32 object-contain mb-2"
        />
      )}
      <p className="font-semibold capitalize">{pokemon.name}</p>
      <p className="text-sm text-gray-500">#{pokemon.id}</p>
      <button
        onClick={() => handleAddPokemon(pokemon)}
        className="mt-2 bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
      >
        Add to Collection
      </button>
    </div>
  );
}

export default PokemonCard;
