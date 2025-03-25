import Image from "next/image";
import PokemonApp from "@/components/PokemonApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-[url(/assets/Background.png)]">
      <PokemonApp/>
    </div>
  );
}
