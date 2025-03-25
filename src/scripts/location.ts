export const GetLocation = async (Location: string) => {
    const promise = await fetch(Location);
    const data = await promise.json();
    return data
  };