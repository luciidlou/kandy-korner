import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"

export const Location = () => {
    const history = useHistory()
    const { locationId } = useParams()
    // const [location, assignLocation] = useState({})
    const [productLocations, setProductLocations] = useState([])
    const [newPurchase, update] = useState({
        total: 0,
        customerId: parseInt(localStorage.getItem("kandy_customer")),
        productLocationId: 0,
        quantity: 1,
        datePurchased: ""
    })

    // useEffect(
    //     () => {
    //         return fetch(`http://localhost:8088/locations/${locationId}`)
    //             .then(res => res.json())
    //             .then((data) => {
    //                 assignLocation(data)
    //             })
    //     },
    //     [locationId]
    // )

    useEffect(
        () => {
            return fetch(`http://localhost:8088/productLocations?locationId=${locationId}&_expand=location&_expand=product`)
                .then(res => res.json())
                .then((data) => {
                    setProductLocations(data)
                })
        },
        [locationId]
    )
    
    return (
        productLocations.map((productLocation) => {
            return <section key={`product--${productLocation.product.id}`} className="product">
                <div className="product__info">
                    <div className="product__name">{productLocation.product.name}</div>
                    <div className="product__type">Type: </div>
                    <div className="product__price">Price: {productLocation.product.price}</div>
                </div>

                <label htmlFor="quantity">Quantity: </label>
                <input type="number" min="1" defaultValue="1" onChange={
                    (event) => {
                        const copy = { ...newPurchase }
                        copy.quantity = event.target.value
                        update(copy)
                    }
                } />

                <button className="purchase-btn"
                    onClick={ () => {
                        const date = new Date()
                        const purchaseObj = {
                            customerId: parseInt(newPurchase.customerId),
                            productLocationId: productLocation.id,
                            quantity: parseInt(newPurchase.quantity),
                            datePurchased: date.toLocaleDateString('en-US'),
                            total: productLocation.product.price * parseInt(newPurchase.quantity)
                        }
                        const fetchOptions = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(purchaseObj)
                        }
                        return fetch(`http://localhost:8088/purchases`, fetchOptions)
                            .then(res => res.json())
                            .then(() => {
                                window.alert(`Your purchase of ${productLocation.product.name} was successful!`)
                                history.push("/myOrders")
                            })
                    }}>Purchase this item</button>
            </section>
        })
    )
}