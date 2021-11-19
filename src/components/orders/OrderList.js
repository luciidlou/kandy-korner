import { useEffect, useState } from "react"
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
            return fetch(`http://localhost:8088/purchases?customerId=${currentCustomer}&_expand=productLocation`)
                .then(res => res.json())
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
            return fetch(`http://localhost:8088/products`)
                .then(res => res.json())
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
            return fetch(`http://localhost:8088/locations`)
                .then(res => res.json())
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
                    const foundLocation = locations.find(location => location.id === purchase.productLocation.locationId)
                    return <section key={`order--${purchase.id}`} className="order">
                        <div className="order__item">{purchase.quantity} {foundProduct.name}</div>
                        <div className="order__total">Total: {purchase.total.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}</div>
                        <div className="order__location">Purchased from the {foundLocation?.name} Store on {purchase.datePurchased}</div>
                    </section>
                })
            }
        </>
    )

}