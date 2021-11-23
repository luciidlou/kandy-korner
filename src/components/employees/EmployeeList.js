import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteEmployeeById, getAllEmployees } from "../ApiManager";
import "./EmployeeList.css"
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getAllEmployees()
                .then(
                    (data) => {
                        setEmployees(data)
                    })
        },
        []
    )

    const fireEmployee = (id) => {
        deleteEmployeeById(id)
            .then(() => {
                getAllEmployees()
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