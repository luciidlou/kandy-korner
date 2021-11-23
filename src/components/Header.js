import { useEffect, useState } from "react/cjs/react.development"
import { getAllCustomers } from "./ApiManager"
import "./Header.css"
export const Header = () => {
    const [customers, setCustomers] = useState([])
    useEffect(
        () => {
            getAllCustomers()
                .then(setCustomers)
        },
        []
    )

    const foundCustomer = customers.find(customer => customer.id === parseInt(localStorage.getItem("kandy_customer"))) || {}

    return (
        <>
            <div className="header">
                <h1 className="header__title">Kandy Korner 🍭</h1>
                <h3 className="header__message">Welcome, {foundCustomer.name}</h3>
            </div>
        </>
    )
}