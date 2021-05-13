import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, updateGame, getGameById } = useContext(GameContext)
    const {gameId} = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        categoryId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
        .then(()=>{
            if(gameId){
                getGameById(gameId).then(setCurrentGame)
            }
        })
    }, [])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.id]= event.target.value
        setCurrentGame(newGameState)
    }

    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">{gameId?"Edit Game":"Register New Game"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" id="maker"  className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                    <label htmlFor="numberOfPlayers">Maximum Number of Players: </label>
                    <input type="text" id="numberOfPlayers" required  className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                    <label htmlFor="skillLevel">Skill Level:<br></br></label>
                    <select  id="skillLevel" value={currentGame.skillLevel}
                        onChange={changeGameState}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select><br></br>
                    <label htmlFor="categoryId">Game Type:<br></br></label>
                    <select  id="categoryId" value={currentGame.categoryId}
                        onChange={changeGameState}>
                        <option value={0}>Choose a type</option>
                       {gameTypes.map(type => <option key={type.id} value={type.id}>{type.label}</option>)} 
                        
                    </select>
                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    if(currentGame.categoryId !== "0"){
                        const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        categoryId: parseInt(currentGame.categoryId)
                    }
                        const updatedGame = {
                        id:gameId,
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        categoryId: parseInt(currentGame.categoryId)
                    }

                    // Send POST request to your API
                    if(gameId){
                        updateGame(updatedGame)
                        .then(() => history.push("/games"))
                    }
                    else{createGame(game)
                    .then(() => history.push("/games"))
                    }
                    
                    
                    }
                    
                }}
            className="btn btn-primary">{gameId?"Save Game":"Create"}</button>
        </form>
    )
}