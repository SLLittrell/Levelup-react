import React, { useState } from "react"

export const GamerContext = React.createContext()

export const GamerProvider = (props) => {
    const [ gamers, setGamers ] = useState([])
    

    const getGamers = () => {
        return fetch("http://localhost:8000/gamers", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGamers)
    }
    
    
    return (
        <GameContext.Provider value={{ gamers, getGamers }} >
            { props.children }
        </GameContext.Provider>
    )
}