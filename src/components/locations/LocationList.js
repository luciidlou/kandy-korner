import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./LocationList.css"
export const LocationList = () => {
    const [locations, setLocations] = useState([])
    const history = useHistory()
    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
                .then(
                    (data) => {
                        setLocations(data)
                    })
        },
        []
    )
    return (
        <>
            <h2>List of Locations</h2>
            {
                locations.map(location => {
                    return <section className="location" key={`location--${location.id}`}>
                        <div className="location__info">
                            <div className="location__name">{location.name} Store</div>
                            <div className="location__address">{location.streetAddress}</div>
                            <div className="location__cityState">{location.cityState}</div>
                        </div>
                        <button className="product-location-btn" onClick={() => { history.push(`/locations/${location.id}`) }}>Shop at this location</button>
                    </section>
                })
            }
        </>
    )
}