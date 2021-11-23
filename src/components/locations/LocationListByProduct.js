import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";
import { getAllProducts, getProductLocationsByProductId } from "../ApiManager";


export const LocationListByProduct = () => {
    const [productLocations, updateProductLocations] = useState([])
    const [products, setProducts] = useState([])
    const { productId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            getProductLocationsByProductId(productId)
                .then(
                    updateProductLocations
                )
        },
        [productId]
    )
    useEffect(
        () => {
            getAllProducts()
                .then(
                    setProducts
                )
        },
        []
    )

    const foundProduct = products.find(product => product.id === parseInt(productId)) || {}
    return (
        <>
            <h2>{`Location(s) with ${foundProduct?.name}`}</h2>
            {
                productLocations.map(productLocations => {
                    return <section className="location" key={`location--${productLocations.location.id}`}>
                        <div className="location__info">
                            <div className="location__name">{productLocations.location.name} Store</div>
                            <div className="location__address">{productLocations.location.streetAddress}</div>
                            <div className="location__cityState">{productLocations.location.cityState}</div>
                        </div>
                        <button className="product-location-btn" onClick={() => { history.push(`/locations/${productLocations.location.id}`) }}>Shop at this location</button>
                    </section>
                })
            }
        </>
    )

}
