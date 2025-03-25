'use client'

import React, { useEffect, useState } from 'react'
import '../styles/style.css'
import { FetchData } from '@/scripts/apicall'

const PokemonApp = () => {
    const [name, setName] = useState('')
    const [firstType, setFirstType] = useState('')
    const [secondType, setSecondType] = useState('')
    const [firstTypePic, setFirstTypePic] = useState('')
    const [secondTypePic, setSecondTypePic] = useState('')
    const [cry, setCry] = useState('')
    const [ability1, setAbility1] = useState('')
    const [ability2, setAbility2] = useState('')
    const [ability3, setAbility3] = useState('')
    const [defaultImg, setDefault] = useState('')
    const [shiny, setShiny] = useState('')
    const [hp, setHP] = useState('')
    const [attack, setAttack] = useState('')
    const [defense, setDefense] = useState('')
    const [spAttack, setSpAttack] = useState('')
    const [spDefense, setSpDefense] = useState('')
    const [speed, setSpeed] = useState('')

    const Pokemon = async () => {
        const PokemonInfo = await FetchData();
        console.log(PokemonInfo)
        setName(`#${PokemonInfo.id} - ${ToUpper(PokemonInfo.name.replaceAll("-", " "))}`)
        setFirstType(PokemonInfo.types[0].type.name)
        setSecondType(PokemonInfo.types[1].type.name)
        console.log(firstType)
        console.log(secondType)
        Types1()
        Types2()
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

    useEffect(() => {
        Pokemon();
      }, [name, firstType, secondType]);

  return (
    <div>
    <div id="dex">
        <div className="top-grid grid auto-cols-auto p-2.5">
          <div className="audio-grid">
            <button id="mute">
              <img className='h-[40px]' id="audioOn" src="/assets/volume-down-fill.svg" alt="audio" />
            </button>
          </div>
            <div className="searchBar"> 
                <button className="randomBtn rounded-l-md searchBtn" id="randomBtn">
                    <img className='h-[25px]' src="/assets/dice-5.svg" alt="random"/>
                </button>
                <input className="text-xl text-black" id="search" placeholder="Search" type="text" />
                <button className="searchBtn rounded-r-md">
                  <img className='h-[25px]' id="searchBtn" src="/assets/search.svg" alt="search" />
                </button>
            </div>
            
            <button className="savedBtn flex justify-end">
                <img id="savedBtn" src="/assets/2.png" alt="search" />
              </button>
        </div>
      <div className="topBar nameBar grid p-3 ">
        <div className="flex justify-start text-start"><img id="previous" className="arrow" src="/assets/caret-left-fill.svg" alt="left"/></div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold" id="name">{name}</h1>
        </div>
        <div className="flex justify-end"><img id="next" className="arrow" src="/assets/caret-right-fill.svg" alt="right"/></div>
      </div>
      <div className="grid grid-cols-1 mt-1 sm:grid-cols-2 md:grid-cols-3  sm:m-15 m-0 mb-5 gap-2.5">
        <div className="p-3 mainImg">
          <div className="flex justify-evenly pb-2">
            <img id="type" src={firstTypePic} alt="type1" />
            <img id="type2" src={secondTypePic} alt="type2" />
          </div>
          <div className="flex justify-center">
              <div>
                  <img width="200px" id="pokemonImg" src="" alt="Pokemon" />
              </div>
            </div>
            <div>
                <button id="shiny">
                    <img id="shinyIcon" src="/assets/Shiny.png" alt="shiny" />
                </button>
            </div>
        </div>
        

        <div className="infoBox text-center rounded-xl">
            <div className="topBar rounded-t-xl grid-cols-3 grid">
                <img className="notSaved" id="savedPokemon" src="/assets/2Active.svg" alt="saved"/>
                <h1 className="text-3xl font-bold">Info</h1>
            </div>
            <div className="p-2.5">
                <h1 className="text-2xl font-bold">Abilities</h1>
                <div className="text-lg">
                    <p id="ability1"></p>
                    <p id="ability2"></p>
                    <p id="ability3"></p>
                </div>
                <h1 className="text-2xl font-bold">Location</h1>
                <p className="text-lg" id="location"></p>
            </div>
        </div>
        
        <div className="stat-grid" id="statsDiv">
            <h1 className="text-3xl topBar flex justify-center align-middle rounded-t-xl font-bold">Stats</h1>
            <div className="grid grid-cols-2 background rounded-b-xl sm:text-md text-center statList p-5">
                <div>
                    <p id="HP"></p>
                    <p id="Attack"></p>
                    <p id="Defense"></p>
                </div>
                <div>
                    <p id="SpAttack"></p>
                    <p id="SpDefense"></p>
                    <p id="Speed"></p>
                </div>
            </div>
        </div>
        
        <div className="family-grid background rounded-xl">
            <h1 className="text-3xl topBar flex justify-center align-middle rounded-t-xl font-bold">Family</h1>
            <div id="family" className="grid grid-cols-3 familyList gap-2.5 p-5">
            </div>
        </div>
        <div className="moves-grid background rounded-xl">
          <h1 className="text-3xl topBar flex justify-center rounded-t-xl font-bold">Moves</h1>
          <div className="moveList text-lg text-center">
            <ul id="list"></ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PokemonApp