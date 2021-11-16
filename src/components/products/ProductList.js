import React, { useEffect, useState } from "react";

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
                    return <p key={`product--${product.id}`}>{`${product.name} are of the ${product.productType.type} variety, and they cost ${product.price}`}</p>
                })
            }
        </>
    )
}