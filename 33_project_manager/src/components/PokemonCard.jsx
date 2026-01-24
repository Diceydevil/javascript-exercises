function PokemonCard({ pokemon }) {
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
    </div>
  );
}

export default PokemonCard;
