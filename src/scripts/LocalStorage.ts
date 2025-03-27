function saveToLocalStorage(pokemon: string) {
    if (typeof window === 'undefined') return; // Prevents error on server

    const pokemonArr = getLocalStorage();

    if (!pokemonArr.includes(pokemon)) {
        pokemonArr.push(pokemon);
    }

    localStorage.setItem('pokemon', JSON.stringify(pokemonArr));
}

function getLocalStorage() {
    if (typeof window === 'undefined') return []; // Prevents error on server

    const localStorageData = localStorage.getItem('pokemon');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(pokemon: string) {
    if (typeof window === 'undefined') return; // Prevents error on server

    const pokemonArr = getLocalStorage();

    const pokemonindex = pokemonArr.indexOf(pokemon);

    if (pokemonindex !== -1) {
        pokemonArr.splice(pokemonindex, 1);
        localStorage.setItem('pokemon', JSON.stringify(pokemonArr));
    }
}

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };
