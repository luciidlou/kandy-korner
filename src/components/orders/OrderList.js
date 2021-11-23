import { useEffect, useState } from "react"
import { getAllLocations, getAllProducts, getPurchasesByCurrentCustomer } from "../ApiManager"
import "./OrderList.css"

export const OrderList = () => {
    console.log("OrderList component rendered!! =]")


    const [purchases, setPurchases] = useState([])
    const [products, setProducts] = useState([])
    const [locations, setLocations] = useState([])
    const currentCustomer = parseInt(localStorage.getItem("kandy_customer"))
    useEffect(
        () => {
            console.log("fetching purchases...")
           getPurchasesByCurrentCustomer(currentCustomer)
                .then((purchases) => {
                    console.log("updating purchases")
                    setPurchases(purchases)
                })
        },
        [currentCustomer]
    )
    useEffect(
        () => {
            console.log("fetching products...")
            getAllProducts()
                .then((products) => {
                    console.log("updating products")
                    setProducts(products)
                })
        },
        []
    )
    useEffect(
        () => {
            console.log("fetching locations...")
            getAllLocations()
                .then((locations) => {
                    console.log("updating locations")
                    setLocations(locations)
                })
        },
        []
    )


    return (
        <>
            {
                purchases.map(purchase => {
                    const foundProduct = products.find(product => product.id === purchase.productLocation.productId) || {}
                    const foundLocation = locations.find(location => location.id === purchase.productLocation.locationId) || {}
                    return <section key={`order--${purchase.id}`} className="order">
                        <div className="order__item">{purchase.quantity} {foundProduct.name} (${foundProduct.price} ea.)</div>
                        <div className="order__total">Total: {purchase.total.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}</div>
                        <div className="order__location">Purchased from the {foundLocation.name} Store on {purchase.datePurchased}</div>
                    </section>
                })
            }
        </>
    )
}