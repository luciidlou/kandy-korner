import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { CustomerList } from "./customers/CustomerList";
import { EmployeeForm } from "./employees/EmployeeForm";
import { EmployeeList } from "./employees/EmployeeList";
import { LocationList } from "./locations/LocationList";
import { ProductList } from "./products/ProductList";

export const ApplicationViews = () => {
    return (
        <>
        <Route path ="/locations">
            <LocationList />
        </Route>
        <Route path ="/products">
            <ProductList />
        </Route>
        <Route path ="/customers">
            <CustomerList />
        </Route>
        <Route exact path ="/employees">
            <EmployeeList />
        </Route>
        <Route path ="/employees/hire">
            <EmployeeForm />
        </Route>
        </>
    )
}