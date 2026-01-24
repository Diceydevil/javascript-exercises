function PokemonCard({ pokemon }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 text-center">
      <p className="font-semibold capitalize">{pokemon.name}</p>
    </div>
  );
}

export default PokemonCard;
