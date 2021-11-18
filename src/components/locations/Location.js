import { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export const Location = () => {
    const { locationId } = useParams()
    const [location, assignLocation] = useState({})
    const [productLocations, setProductLocations] = useState([])

    useEffect(
        () => {
            return fetch(`http://localhost:8088/locations/${locationId}`)
                .then(res => res.json())
                .then((data) => {
                    assignLocation(data)
                })
        },
        [locationId]
    )

    useEffect(
        () => {
            return fetch(`http://localhost:8088/productLocations?_expand=location?_expand=product`)
                .then(res => res.json())
                .then((data) => {
                    setProductLocations(data)
                })
        }
    )
    const filteredProductLocations = productLocations.filter(productLocation => productLocation.locationId === location.id)

    return (
        filteredProductLocations.map((productLocation) => {
            return <section key={`product--${productLocation.product.id}`} className="product">
                <div className="product__info">
                    <div className="product__name">{productLocation.product.name}</div>
                    <div className="product__type">Type: </div>
                    <div className="product__price">Price: {productLocation.product.price}</div>
                </div>
            </section>
        })
    )
}