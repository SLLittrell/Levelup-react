import { createEvent } from "@testing-library/dom"
import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider"
import { EventContext} from "./EventProvider"


export const EventForm = (props) => { 
    const {getGames, games} = useContext(GameContext)
    const {events, getEvents, createEvent} = useContext(EventContext)
    const history = useHistory()
    
    
    useEffect(() => {
            getGames()
                .then(()=> getEvents)// Get all existing games from API
        }, [])
    
    
        const [currentEvent, setEvent] = useState({
        description: "",
        date: "",
        time: "",
        gameId: 0,
        organizer: 1,
        attendees:[]
    })

    

    const changeEventState = (domEvent) => {
        const newEventState = { ...currentEvent }
        newEventState[domEvent.target.name]= domEvent.target.value
        setEvent(newEventState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:<br></br></label>
                    <input type="text" name="description" onChange={ changeEventState }/><br></br>
                    <label htmlFor="date">Date:<br></br></label>
                    <input type="date" name="date" onChange={ changeEventState }/><br></br>
                    <label htmlFor="time">Time:<br></br></label>
                    <input type="time" name="time" onChange={ changeEventState }/><br></br>
                    <label htmlFor="gameId">Game:</label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    const event =
                    {   
                        description:currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        gameId: parseInt(currentEvent.gameId),
                        organizer: parseInt(currentEvent.gamer),
                        attendees:[]
                    }
                    // Create the event
                    createEvent(event)
                        .then(() => history.push("/events"))

                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}