import React from 'react'
import { CalendarScreen } from '../calendar/CalendarScreen';
import NavBar from "../ui/NavBar";

const AppContainer = () => {
    return (
        <>
            <NavBar />
            <CalendarScreen/>
        </>
    )
}

export default AppContainer;
