import { useEffect } from "react"
import { useState } from "react/cjs/react.development"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            return fetch("http://localhost:8088/customers")
                .then(res => res.json())
                .then((data) => {
                    setCustomers(data)
                })
        },
        []
    )
    return (
        <>
            <h2>List of Customers</h2>
            {
                customers.map(customer => {
                    return <p key={`customer--${customer.id}`}>{customer.name}</p>
                })
            }
        </>
    )
}