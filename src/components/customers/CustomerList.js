import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import { getAllCustomers, getAllPurchases, getCustomerPurchases } from "../ApiManager"
import "./CustomerList.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [purchases, setPurchases] = useState([])
    const [customerPurchases, updateCustomerPurchases] = useState([])

    useEffect(
        () => {
            getAllCustomers()
                .then((data) => {
                    setCustomers(data)
                })
        },
        []
    )
    useEffect(
        () => {
            getAllPurchases()
                .then((data) => {
                    setPurchases(data)
                })
        },
        []
    )
    useEffect(
        () => {
            getCustomerPurchases()
            .then(updateCustomerPurchases)
        },
        []
    )
    const sumOfAllCandiesForCustomer = (customerId) => {
        const quantityArr = []
        for (const purchase of purchases) {
            if (customerId === purchase.customerId) {
                quantityArr.push(purchase.quantity)
            }
        }
        return quantityArr.reduce((a, b) => a + b, 0)
    }

    return (
        <>
            <h2>List of Customers</h2>
            {
                customers.map(customer => {
                    return <div key={`customer--${customer.id}`} className="customer">
                        <div className="customer__name">{customer.name}</div>
                        <div>Total candies purchased: {sumOfAllCandiesForCustomer(customer.id)}</div>
                    </div>
                })
            }
        </>
    )
}