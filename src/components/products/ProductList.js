import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../ApiManager";
import "./ProductList.css"
export const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(
        () => {
            getAllProducts()
                .then(
                    (data) => {
                        setProducts(data)
                    })
        },
        []
    )
    return (
        <>
            <h2>List of products</h2>
            {
                products.map(product => {
                    return <section key={`product--${product.id}`} className="product">
                        <div className="product__info">
                            <div className="product__name">{product.name}</div>
                            <div className="product__type">Type: {product.productType?.type}</div>
                            <div className="product__price">Price: {product.price}</div>
                        </div>
                        <div className="prompt"><Link to={`/products/${product.id}/locations`}>{`See stores that stock ${product.name}!`}</Link></div>
                    </section>
                })
            }
        </>
    )
}