import {lazy} from "react";

const ProductPage = lazy(() => import("../pages/customer/productList.jsx"))
const ProductTable = lazy(() => import("../pages/admin/productTable.jsx"))
const BillTable = lazy(() => import("../pages/admin/billTable.jsx"))
const ProductForm = lazy(() => import("../pages/admin/productForm.jsx"))
// const CheckoutPage = lazy(() => import("../pages/customer/checkout.jsx"))
const CheckoutPage = lazy(() =>  new Promise(resolve => {
    setTimeout(() => resolve(import("../pages/customer/checkout.jsx")), 1000);
}))

export const listRouterCustomer = [
    {
        path: "",
        page: ProductPage,
        index: true,
        isPublic: true,
    },
    {
        path: "checkout",
        page: CheckoutPage,
        index: false,
        isPublic: true
    }
]

export const listRouterAdmin = [
    {
        path: "",
        page: ProductTable,
        index: true,
        isPublic: true,
    },
    {
        path: "products/create",
        page: ProductForm,
        index: false,
        isPublic: true,
    },
    {
        path: "products/edit",
        page: ProductForm,
        index: false,
        isPublic: true,
    },
    {
        path: "bills",
        page: BillTable,
        index: false,
        isPublic: true
    },
    {
        path: "bills/create",
        page: "",
        index: false,
        isPublic: true
    }
]