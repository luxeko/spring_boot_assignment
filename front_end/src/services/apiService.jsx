import instance from "../configs/axiosConfig.jsx";
import {data} from "autoprefixer";

const getListProduct = (keyword) => {
    return instance.get(`products?keyword=${keyword}`)
}
const getProductById = (id) => {
    return instance.get(`products/${id}`)
}
const deleteProduct = (id) => {
    return instance.delete(`products?id=${id}`)
}
const postCreateProduct = (productCode, productName, price, quantity, description, createdAt) => {
    return instance.post(`products`, {
        "id": "",
        "productCode": productCode,
        "productName": productName,
        "price": +price,
        "quantity": +quantity,
        "description": description,
        "createdAt": createdAt
    })
}
const postCreateBill = (customerName, customerAddress, customerPhone, customerEmail, total, subtotal, billCode, createdAt) => {
    const data = {
        "id": "",
        "customerName": customerName,
        "customerAddress": customerAddress,
        "customerPhone": customerPhone,
        "customerEmail": customerEmail,
        "total": total,
        "subtotal": +subtotal,
        "billCode": billCode,
        "createdAt": createdAt
    }
    return instance.post(`bills`, data)
}
const postCreateBillProducts = (billId, productId, quantity_order) => {
    return instance.post(`/bills/bill-products`, {
        "id": "",
        "productId": productId,
        "billId": billId,
        "quantityOrder": quantity_order
    })
}
const postUpdateQuantityProductAfterPurchase = (newQuantity, productId) => {
    return instance.post(`/products/update-quantity?id=${productId}`, {
        "id": productId,
        "quantity": newQuantity
    })
}
const putUpdateProduct = (id, productCode, productName, price, quantity, description, createdAt) => {
    const data = {
        "id": +id,
        "productCode": productCode,
        "productName": productName,
        "price": +price,
        "quantity": +quantity,
        "description": description,
        "createdAt": createdAt
    }
    console.log(data)
    return instance.put(`products?id=${id}`, data)
}
const getListBill = (keyword) => {
    return instance.get(`bills?keyword=${keyword}`)
}
const getListProductByBillId = (id) => {
    return instance.get(`bills/${id}`)
}
const getAllProductThumbnail = () => {
    return instance.get(`products/thumbnail`)
}
const postCreateProductThumbnail = (data) => {
    return instance.get(`products/thumbnail/upload?`, data, {
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,}

    }).then(res => {
        console.log(res)
    }).catch(er => {
        console.log(er)
    })
}
export {
    getListProduct,
    getProductById,
    postCreateProduct,
    putUpdateProduct,
    deleteProduct,
    getListBill,
    getListProductByBillId,
    postCreateBill,
    postCreateBillProducts,
    postUpdateQuantityProductAfterPurchase,
    getAllProductThumbnail
}