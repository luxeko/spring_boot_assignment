import {lazy} from "react";

const ProductPage = lazy(() => import("../pages/customer/productList.jsx"))
const ProductTable = lazy(() => import("../pages/admin/products/productTable.jsx"))
const BillTable = lazy(() => import("../pages/admin/payments/billTable.jsx"))
const BillDetail = lazy(() => import("../pages/admin/payments/billDetail.jsx"))
const ProductForm = lazy(() => import("../pages/admin/products/productForm.jsx"))
const CheckoutPage = lazy(() => import("../pages/customer/checkout.jsx"))

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
        index: true,
        isPublic: true,
    },
    {
        path: "products/edit",
        page: ProductForm,
        index: true,
        isPublic: true,
    },
    {
        path: "bills",
        page: BillTable,
        index: false,
        isPublic: true
    },
    {
        path: "bills/detail/:billId",
        page: BillDetail,
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