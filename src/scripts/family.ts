export const EvolutionChain = async (userInput: string) => {
      const promise = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${userInput}`);
      const data = await promise.json();
      return data
  };