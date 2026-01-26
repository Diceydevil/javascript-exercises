import { createContext, useState, useContext, useEffect } from "react";

const CollectionContext = createContext();

export function CollectionProvider({ children }) {
  const [collection, setCollection] = useState(() => {
    const saved = localStorage.getItem("pokemonCollection");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("pokemonCollection", JSON.stringify(collection));
  }, [collection]);

  const handleAddPokemon = (pokemon) => {
    const exists = collection.find(
      (existingPokemon) => existingPokemon.id === pokemon.id
    );
    if (!exists) {
      setCollection((prevCollection) => [...prevCollection, pokemon]);
    }
  };

  const handleRemovePokemon = (pokemonId) => {
    setCollection((prevCollection) =>
      prevCollection.filter(
        (selectedPokemon) => selectedPokemon.id !== pokemonId
      )
    );
  };

  return (
    <CollectionContext.Provider
      value={{ collection, handleAddPokemon, handleRemovePokemon }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  return useContext(CollectionContext);
}
