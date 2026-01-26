import { useCollection } from "../contexts/CollectionContext";
import PokemonCard from "./PokemonCard";

function Collection() {
  const { collection, handleRemovePokemon } = useCollection();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My PokemonCollection</h2>
      {collection.length === 0 ? (
        <p className="text-gray-600">
          No Pokemon in your collection yet! Go browse and add some!
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {collection.map((pokemon) => (
            <div key={pokemon.id}>
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                showAddButton={false}
                onRemove={handleRemovePokemon}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Collection;
