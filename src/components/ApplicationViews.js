import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { CustomerList } from "./customers/CustomerList";
import { EmployeeForm } from "./employees/EmployeeForm";
import { EmployeeList } from "./employees/EmployeeList";
import { Location } from "./locations/Location";
import { LocationList } from "./locations/LocationList";
import { LocationListByProduct } from "./locations/LocationListByProduct";
import { OrderList } from "./orders/OrderList";
import { ProductList } from "./products/ProductList";

export const ApplicationViews = () => {
    return (
        <>
        <Route exact path = {["/", "/locations"]}>
            <LocationList />
        </Route>
        <Route exact path = "/locations/:locationId(\d+)">
            <Location />
        </Route>
        <Route exact path = "/products">
            <ProductList />
        </Route>
        <Route exact path = "/products/:productId(\d+)/locations">
            <LocationListByProduct />
        </Route>
        <Route exact path = "/customers">
            <CustomerList />
        </Route>
        <Route exact path = "/employees">
            <EmployeeList />
        </Route>
        <Route exact path = "/employees/hire">
            <EmployeeForm />
        </Route>
        <Route exact path = "/myOrders">
            <OrderList />
        </Route>
        </>
    )
}