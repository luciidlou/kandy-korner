import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css"
export const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/products?_expand=productType")
                .then(res => res.json())
                .then(
                    (data) => {
                        setProducts(data)
                    }
                )
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
                            <div className="product__type">Type: {product.productType.type}</div>
                            <div className="product__price">Price: {product.price}</div>
                        </div>
                        <div className="prompt"><Link to="/locations">Please choose a location to purchase from!</Link></div>
                    </section>
                })
            }
        </>
    )
}