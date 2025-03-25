import React from 'react'

const InfoBox = ({ability1, ability2, ability3, location} : {ability1: string, ability2: string, ability3: string, location: string}) => {
  return (
    <div className="p-2.5">
                <h1 className="text-2xl font-bold">Abilities</h1>
                <div className="text-lg">
                    <p id="ability1">{ability1}</p>
                    <p id="ability2">{ability2}</p>
                    <p id="ability3">{ability3}</p>
                </div>
                <h1 className="text-2xl font-bold">Location</h1>
                <p className="text-lg" id="location">{location}</p>
            </div>
  )
}

export default InfoBox