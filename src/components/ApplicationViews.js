import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "./event/EventList.js"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { EventProvider } from "./event/EventProvider"
import { GameForm } from "./game/GameForm.js"
import { EventForm } from "./event/EventForm.js"
import { Home } from "./Home.js"
import { Profile } from "./Profile.js"
import { ProfileProvider } from "./auth/ProfileProvider.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider> 
                <EventProvider>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/games">
                        <GameList />
                    </Route>
                    <Route exact path="/games/new">
                        <GameForm />
                    </Route>
                    <Route exact path="/games/edit/:gameId(\d+)">
                        <GameForm />
                    </Route>
                    {/* ______________Events__________________________ */}
            
                    <Route exact path="/events">
                        <EventList />
                    </Route>
                    <Route exact path="/events/create">
                        <EventForm />
                    </Route>
                    {/* _________________Profile______________________________ */}
                    <ProfileProvider>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </ProfileProvider>
                </EventProvider>
            </GameProvider>
        </main>
    </>
}