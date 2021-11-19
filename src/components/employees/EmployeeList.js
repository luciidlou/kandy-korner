import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./EmployeeList.css"
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/employees")
                .then(res => res.json())
                .then(
                    (data) => {
                        setEmployees(data)
                    })
        },
        []
    )

    const fireEmployee = (id) => {
        return fetch(`http://localhost:8088/employees/${id}`, { method: "DELETE" })
            .then(() => {
                fetch("http://localhost:8088/employees")
                    .then(res => res.json())
                    .then(
                        (data) => {
                            setEmployees(data)
                        })
            })
    }

    return (
        <>
            <h2>Employees List</h2>
            {
                employees.map(employee => {
                    return <div key={`employee--${employee.id}`} className="employee">
                        {employee.name}
                        <button className="fire-btn" onClick={() => { fireEmployee(employee.id) }}>Fire Employee</button>
                    </div>
                })
            }
            <button onClick={() => { history.push("/employees/hire") }}>Register New Hire</button>
        </>
    )
}