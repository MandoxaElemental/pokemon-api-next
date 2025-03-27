'use client'

import React, { useEffect, useState } from 'react'
import '../styles/style.css'
import { FetchData } from '@/scripts/apicall'
import { GetLocation } from '@/scripts/location'
import { EvolutionChain } from '@/scripts/family'
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from '@/scripts/LocalStorage'

const PokemonApp = () => {
    const [userInput, setUserInput] = useState('')
    const [pokemonId, setId] = useState(0)
    const [randomNum, setRandomNum] = useState('')
    const [name, setName] = useState('')
    const [firstType, setFirstType] = useState('')
    const [secondType, setSecondType] = useState('')
    const [firstTypePic, setFirstTypePic] = useState('')
    const [secondTypePic, setSecondTypePic] = useState('')
    const [cry, setCry] = useState('')
    const [location, setLocation] = useState('')
    const [locationLink, setLocationLink] = useState('')
    const [abilities, setAbilities] = useState([])
    const [image, setImage] = useState('')
    const [defaultImage, setDefaultImage] = useState('')
    const [shiny, setShiny] = useState('')
    const [hp, setHP] = useState('')
    const [attack, setAttack] = useState('')
    const [defense, setDefense] = useState('')
    const [spAttack, setSpAttack] = useState('')
    const [spDefense, setSpDefense] = useState('')
    const [speed, setSpeed] = useState('')
    const [moves, setMoves] = useState([])
    const [shinyBool, setShinyBool] = useState(true)
    const [doubleType, setDoubleType] = useState(true)
    const EvolutionArr: string[] = []
    const EvolutionUrlArr: string[] = []
    const Varieties: string[] = []
    const [pokemon, setPokemon] = useState('')
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    function play(){
        new Audio(cry).play()
        }

    const Pokemon = async (input: string) => {
        setShinyBool(true)
        const PokemonInfo = await FetchData(input);
        console.log(PokemonInfo)
        setPokemon(ToUpper(PokemonInfo.name.replaceAll("-", " ")))
        setId(Number(PokemonInfo.id))
        setName(`#${PokemonInfo.id} - ${ToUpper(PokemonInfo.name.replaceAll("-", " "))}`)
        const disableCheck = () => {
            if(PokemonInfo.types.length === 2){
                setFirstType(PokemonInfo.types[0].type.name)
                setSecondType(PokemonInfo.types[1].type.name)
                Types1()
                Types2()
                setDoubleType(true);
            } else {
                setFirstType(PokemonInfo.types[0].type.name)
                Types1()
                setDoubleType(false);
            }
            };
        setCry(PokemonInfo.cries.latest)
        setDefaultImage(PokemonInfo.sprites.other.home.front_default)
        setShiny(PokemonInfo.sprites.other.home.front_shiny)
        setImage(defaultImage)
        setAbilities(PokemonInfo.abilities)
        setLocationLink(PokemonInfo.location_area_encounters)
        setHP(PokemonInfo.stats[0].base_stat)
        setAttack(PokemonInfo.stats[1].base_stat)
        setDefense(PokemonInfo.stats[2].base_stat)
        setSpAttack(PokemonInfo.stats[3].base_stat)
        setSpDefense(PokemonInfo.stats[4].base_stat)
        setSpeed(PokemonInfo.stats[5].base_stat)
        setMoves(PokemonInfo.moves)
        PokemonLocation(locationLink)
        PokemonEvolution(PokemonInfo.name)
        disableCheck()
    }

        const PokemonLocation = async (link: string) => {
            const LocationArr = await GetLocation(link)
            const LocationNum = Math.floor(Math.random() * LocationArr.length);
            if (LocationArr.length === 0) {
                setLocation("N/A")
            } else {
                setLocation(ToUpper(LocationArr[LocationNum].location_area.name.replaceAll("-", " ")))
                console.log(location)
            }
        }
        const PokemonEvolution = async (link: string) => {
            const Evolution = await EvolutionChain(link)
            const EvolutionLink = (Evolution.evolution_chain.url)
            const GetEvolutionChain = async () => {
                const promise = await fetch(EvolutionLink);
                const data = await promise.json();
                console.log(data)
                EvolutionArr.push(data.chain.species.name);
                EvolutionUrlArr.push(data.chain.species.url);
                if (data.chain.evolves_to.length !== 0) {
                  for (let i = 0; i < data.chain.evolves_to.length; i++) {
                    EvolutionArr.push(data.chain.evolves_to[i].species.name);
                    EvolutionUrlArr.push(data.chain.evolves_to[i].species.url);
                    if (data.chain.evolves_to[i].evolves_to.length !== 0) {
                      for (let j = 0; j < data.chain.evolves_to[i].evolves_to.length; j++)
                        {
                        EvolutionArr.push(data.chain.evolves_to[i].evolves_to[j].species.name);
                        EvolutionUrlArr.push(data.chain.evolves_to[i].evolves_to[j].species.url);
                        if (data.chain.evolves_to[i].evolves_to[j].evolves_to.length !== 0) {
                          for (let k = 0; k < data.chain.evolves_to[i].evolves_to[j].evolves_to.length;k++)
                            {
                            EvolutionArr.push(data.chain.evolves_to[i].evolves_to[j].evolves_to[k].species.name);
                            EvolutionUrlArr.push(data.chain.evolves_to[i].evolves_to[j].evolves_to[k].species.url
                            );
                          }
                        }
                      }
                    }
                  }
                }
                console.log(EvolutionArr)
                console.log(EvolutionUrlArr)
                const VarietyChain = () =>{
                    EvolutionUrlArr.map((url: string) => {
                        const BlankUrl = url;
                        const Var = async () => {
                            const promise = await fetch(BlankUrl);
                            const data = await promise.json();
                            const Vars = data.varieties
                            Vars.map((info: string) => {
                                const Family = info.pokemon.url;
                                const FamilyPic = async () => {
                                    const promise = await fetch(Family)
                                    const data = await promise.json()
                                    console.log(data)
                                    const ID = data.id
                                    Varieties.push(ID)
                                }

                                FamilyPic()
                            })
                        }
                        Var()
                    })
                }

                VarietyChain()
            }
            GetEvolutionChain()
        }

        function ShinyBtn(){
            if(shinyBool === true)
            {
                setImage(shiny)
                setShinyBool(false)
            } else 
            {
                setImage(defaultImage)
                setShinyBool(true)
            }
        }

    function ToUpper(input: string) {
        return input
          .split(" ")
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
      }

    function Types1() {
        switch (firstType) {
          case "normal":
            setFirstTypePic("/assets/pokemon-types/Normal.png");
            break;
          case "fighting":
            setFirstTypePic("/assets/pokemon-types/Fighting.png");
            break;
          case "flying":
            setFirstTypePic("/assets/pokemon-types/Flying.png");
            break;
          case "poison":
            setFirstTypePic("/assets/pokemon-types/Poison.png");
            break;
          case "ground":
            setFirstTypePic("/assets/pokemon-types/Ground.png");
            break;
          case "rock":
            setFirstTypePic("/assets/pokemon-types/Rock.png");
            break;
          case "bug":
            setFirstTypePic("/assets/pokemon-types/Bug.png");
            break;
          case "ghost":
            setFirstTypePic("/assets/pokemon-types/Ghost.png");
            break;
          case "steel":
            setFirstTypePic("/assets/pokemon-types/Steel.png");
            break;
          case "fire":
            setFirstTypePic("/assets/pokemon-types/Fire.png");
            break;
          case "water":
            setFirstTypePic("/assets/pokemon-types/Water.png");
            break;
          case "grass":
            setFirstTypePic("/assets/pokemon-types/Grass.png");
            break;
          case "electric":
            setFirstTypePic("/assets/pokemon-types/Electric.png");
            break;
          case "psychic":
            setFirstTypePic("/assets/pokemon-types/Psychic.png");
            break;
          case "ice":
            setFirstTypePic("/assets/pokemon-types/Ice.png");
            break;
          case "dragon":
            setFirstTypePic("/assets/pokemon-types/Dragon.png");
            break;
          case "dark":
            setFirstTypePic("/assets/pokemon-types/Dark.png");
            break;
          case "fairy":
            setFirstTypePic("/assets/pokemon-types/Fairy.png");
            break;
          default:
            break;
        }
      }
      function Types2() {
        switch (secondType) {
          case "normal":
            setSecondTypePic("/assets/pokemon-types/Normal.png");
            break;
          case "fighting":
            setSecondTypePic("/assets/pokemon-types/Fighting.png");
            break;
          case "flying":
            setSecondTypePic("/assets/pokemon-types/Flying.png");
            break;
          case "poison":
            setSecondTypePic("/assets/pokemon-types/Poison.png");
            break;
          case "ground":
            setSecondTypePic("/assets/pokemon-types/Ground.png");
            break;
          case "rock":
            setSecondTypePic("/assets/pokemon-types/Rock.png");
            break;
          case "bug":
            setSecondTypePic("/assets/pokemon-types/Bug.png");
            break;
          case "ghost":
            setSecondTypePic("/assets/pokemon-types/Ghost.png");
            break;
          case "steel":
            setSecondTypePic("/assets/pokemon-types/Steel.png");
            break;
          case "fire":
            setSecondTypePic("/assets/pokemon-types/Fire.png");
            break;
          case "water":
            setSecondTypePic("/assets/pokemon-types/Water.png");
            break;
          case "grass":
            setSecondTypePic("/assets/pokemon-types/Grass.png");
            break;
          case "electric":
            setSecondTypePic("/assets/pokemon-types/Electric.png");
            break;
          case "psychic":
            setSecondTypePic("/assets/pokemon-types/Psychic.png");
            break;
          case "ice":
            setSecondTypePic("/assets/pokemon-types/Ice.png");
            break;
          case "dragon":
            setSecondTypePic("/assets/pokemon-types/Dragon.png");
            break;
          case "dark":
            setSecondTypePic("/assets/pokemon-types/Dark.png");
            break;
          case "fairy":
            setSecondTypePic("/assets/pokemon-types/Fairy.png");
            break;
          case "":
            // Type2.hidden = true;
            break;
          default:
            break;
        }
      }

      function Next(){
        if(pokemonId === 649){
          Pokemon('1')
        } else {
          Pokemon((pokemonId + 1).toString())
        }
      }

      function Prev(){
        if(pokemonId === 1){
          Pokemon('649')
        } else {
          Pokemon((pokemonId - 1).toString());
        }
      }

      function RandomNumber(){
        const Num = Math.floor(Math.random() * 650)
        setRandomNum(Num.toString());
        Pokemon(randomNum);
      }

      function search(){
        Pokemon(userInput);
      }

      useEffect(() => {
        RandomNumber()
      }, []);

      useEffect(()=> {
        console.log(randomNum)
      }, [randomNum])

      useEffect(() => {
        Types1()
        Types2()
        setImage(defaultImage)
      }, [firstType, secondType, doubleType]);

      useEffect(() => {
        PokemonLocation(locationLink)
      }, [name]);

      useEffect(() => {
        play()
      }, [cry]);

      const Save = () => {
        try {
          if (typeof window !== "undefined") {
            const list = getLocalStorage();
            console.log(list);
            if (!list.includes(pokemon)) {
              saveToLocalStorage(pokemon);
            } else {
              removeFromLocalStorage(pokemon);
            }
          }
        } catch (error) {
          console.error("Error while setting token in localStorage:", error);
        }
      };
      

  return (
    <div>
      <div className="w-[100%] bg-white">
      <Drawer open={isOpen} onClose={handleClose} position="right" className='bg-white'>
      <DrawerHeader className='text-white' title="Saved" titleIcon={() => <></>} />
        <DrawerItems className='text-black'>
          {getLocalStorage().map((names: string, idx: number) => {
                  return (
                    <div key={idx} className="flex justify-between pb-5">
                      <p
                        className="text-xl font-bold"
                        onClick={() => search}
                      >
                        {names}
                      </p>
                      <img
                        onClick={() => removeFromLocalStorage(names)}
                        src="/assets/x-lg.svg"
                        alt="remove"
                      />
                    </div>
                  );
                })}
        </DrawerItems>
      </Drawer>
      </div>
    <div className='pb-2.5'>
        <div className="top-grid grid auto-cols-auto p-2.5">
          <div className="audio-grid">
            <button id="mute">
              <img className='h-[40px]' id="audioOn" src="/assets/volume-down-fill.svg" alt="audio" />
            </button>
          </div>
            <div className="searchBar"> 
                <button onClick={RandomNumber} className="randomBtn rounded-l-md searchBtn" id="randomBtn">
                    <img className='h-[25px]' src="/assets/dice-5.svg" alt="random"/>
                </button>
                <input value={userInput} onChange={ (event) => setUserInput(event.target.value)} className="text-xl text-black" id="search" placeholder="Search" type="text" />
                <button onClick={search} className="searchBtn rounded-r-md">
                  <img className='h-[25px]' id="searchBtn" src="/assets/search.svg" alt="search" />
                </button>
            </div>
            
            <button onClick={() => setIsOpen(true)} className="savedBtn flex justify-end">
                <img id="savedBtn" src="/assets/2.png" alt="search" />
              </button>
        </div>
      <div className="topBar nameBar grid p-3 ">
        <div className="flex justify-start text-start"><img onClick={Prev} id="previous" className="arrow" src="/assets/caret-left-fill.svg" alt="left"/></div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold text-black" id="name">{name}</h1>
        </div>
        <div className="flex justify-end"><img onClick={Next} id="next" className="arrow" src="/assets/caret-right-fill.svg" alt="right"/></div>
      </div>
      <div className="grid grid-cols-1 mt-1 sm:grid-cols-2 md:grid-cols-3  sm:m-15 m-0 mb-5 gap-2.5">
        <div className="p-3 mainImg">
          <div className="flex justify-evenly pb-2">
            <img id="type" src={firstTypePic} alt="type1" />
            {doubleType ? <img id="type2" src={secondTypePic} alt="type2" /> : <img className="hidden" id="type2" src={secondTypePic} alt="type2" />}
          </div>
          <div className="flex justify-center">
              <div>
                  <img onClick={play} width="200px" id="pokemonImg" src={image} alt="Pokemon" />
              </div>
            </div>
            <div>
                <button onClick={ShinyBtn} id="shiny">
                    <img id="shinyIcon" src="/assets/Shiny.png" alt="shiny" />
                </button>
            </div>
        </div>
        

        <div className="infoBox text-center rounded-xl">
            <div className="topBar rounded-t-xl grid-cols-3 grid">
                <img onClick={Save} className="notSaved" id="savedPokemon" src="/assets/2Active.svg" alt="saved"/>
                <h1 className="text-3xl font-bold">Info</h1>
            </div>
            <div className="p-2.5 text-black">
                <h1 className="text-2xl font-bold">Abilities</h1>
                <div className="text-lg">
                {abilities.map((perc: string[], i: number) => {
                return (
                  <ul key={i}>{ToUpper(perc.ability.name.replaceAll("-", " "))}</ul>
                )
              })}
                </div>
                <h1 className="text-2xl font-bold">Location</h1>
                <p className="text-lg" id="location">{location}</p>
            </div>
        </div>
        
        <div className="stat-grid" id="statsDiv">
            <h1 className="text-3xl topBar flex justify-center align-middle rounded-t-xl font-bold">Stats</h1>
            <div className="grid grid-cols-2 background rounded-b-xl sm:text-md text-center statList p-5 text-black">
                <div>
                    <p>HP: {hp}</p>
                    <p>Attack: {attack}</p>
                    <p>Defense: {defense}</p>
                </div>
                <div>
                    <p>Sp.Attack: {spAttack}</p>
                    <p>Sp.Defense: {spDefense}</p>
                    <p>Speed: {speed}</p>
                </div>
            </div>
        </div>
        
        <div className="family-grid background rounded-xl">
            <h1 className="text-3xl topBar flex justify-center align-middle rounded-t-xl font-bold">Family</h1>
            <div id="family" className="grid grid-cols-3 familyList gap-2.5 p-5 text-black">
                {Varieties.map((info: string, id: number) => {
                    return(
                        <div key={id}>{info}</div>
                    )
                })}
            </div>
        </div>
        <div className="moves-grid background rounded-xl">
          <h1 className="text-3xl topBar flex justify-center rounded-t-xl font-bold">Moves</h1>
          <div className="moveList text-lg text-center text-black">
            <ul id="list">
            {moves.map((perc: string[], i: number) => {
                return (
                  <ul key={i}>{ToUpper(perc.move.name.replaceAll("-", " "))}</ul>
                )
              })}
              </ul>
          </div>
        </div>
      </div>
    </div>
    <audio id="pokemonCry" src={cry}></audio>
    </div>
  )
}

export default PokemonApp