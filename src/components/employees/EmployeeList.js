import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
    return (
        <>
            <h2>Employees List</h2>
            {
                employees.map(employee => {
                    return <p key={`employee--${employee.id}`}>{employee.name}</p>
                })
            }
            <button onClick={() => { history.push("/employees/hire") }}>Register New Hire</button>
        </>
    )
}