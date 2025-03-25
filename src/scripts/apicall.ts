export const FetchData = async () => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/charizard`);
    const data = await promise.json();
    return data;
}