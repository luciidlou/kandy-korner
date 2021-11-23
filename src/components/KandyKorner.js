import React from "react"
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min"

import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Header } from "./Header"
import { NavBar } from "./nav/NavBar"


export const KandyKorner = () => {
    return (
        <>
            <Route
                render={() => {
                    if (localStorage.getItem("kandy_customer")) {
                        return (
                            <>
                                <NavBar />
                                <Header />
                                <ApplicationViews />
                            </>
                        );
                    }
                    else {
                        return <Redirect to="/login" />;
                    }
                }}
            />

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </>
    )
}

