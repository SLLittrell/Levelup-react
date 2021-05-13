import React, { useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    const history =useHistory()
    const {gameId} = useParams()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            {
               games.map(game => {
                return <section key={`game--${game.id}`} className="game">
                    <div className="game__title">{game.title} by {game.maker}</div>
                    <div className="game__players">{game.number_of_players} players needed</div>
                    <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                    <button className="btn-edit" onClick={()=> history.push(`/games/edit/${game.id}`)}>Edit</button>
                </section>
                
                    
                
                })
            }
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}>Register New Game
            </button>
        </article>
    )
}