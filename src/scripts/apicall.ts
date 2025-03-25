export const FetchData = async (userInput: string) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`);
    const data = await promise.json();
    return data;
}