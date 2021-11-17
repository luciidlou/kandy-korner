import React from "react"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"


export const KandyKorner = () => {
    return (
        <>
        <NavBar />
        <h1>Kandy Korner 🍭</h1>
        <ApplicationViews />
        </>
    )
}