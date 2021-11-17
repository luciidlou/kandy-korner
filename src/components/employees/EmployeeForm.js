import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./EmployeeForm.css"
export const EmployeeForm = () => {
    const [newHire, update] = useState({
        name: "",
        locationId: 0,
        manager: false,
        fullTime: false,
        hourlyRate: 0
    })
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

    const finalizeHire = (event) => {
        event.preventDefault()
        const newEmployee = {
            name: newHire.name,
            locationid: newHire.locationId,
            manager: newHire.manager,
            fullTime: newHire.fullTime,
            hourlyRate: newHire.hourlyRate
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        }
        return fetch("http://localhost:8088/employees", fetchOption)
            .then(() => {
                history.push("/employees")
            })
    }

    return (
        <form className="hireForm">
            <h2 className="hireForm__title">New Hire Form</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of new hire"
                        onChange={
                            (event) => {
                                const copy = { ...newHire }
                                copy.name = event.target.value
                                update(copy)
                            }} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <select
                        htmlFor="location"
                        className="form-control"
                        onChange={
                            (event) => {
                                const copy = { ...newHire }
                                copy.locationId = parseInt(event.target.value)
                                update(copy)
                            }}>
                        <option value={0}>Select a location...</option>
                        {
                            locations.map(location => {
                                return <option key={`location--${location.id}`} value={location.id}>{location.address}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="manager">Manager?</label>
                    <input type="checkbox"
                        onChange={
                            (event) => {
                                const copy = { ...newHire }
                                copy.manager = event.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullTime">Full Time?</label>
                    <input type="checkbox"
                        onChange={
                            (event) => {
                                const copy = { ...newHire }
                                copy.fullTime = event.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="hourlyRate">Hourly Rate:</label>
                    <input
                        required autoFocus
                        type="number"
                        step="any"
                        className="form-control"
                        placeholder="Enter an hourly rate"
                        onChange={
                            (event) => {
                                const copy = { ...newHire }
                                copy.hourlyRate = event.target.value
                                update(copy)
                            }} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={finalizeHire}>Finalize Hire!</button>
            <button className="btn btn-secondary" onClick={() => { history.push("/employees") }}>Cancel</button>
        </form >
    )
}