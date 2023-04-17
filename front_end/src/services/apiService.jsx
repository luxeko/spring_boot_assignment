import instance from "../configs/axiosConfig.jsx";

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
const getBillById = (id) => {

}
export {getListProduct, getProductById, postCreateProduct, putUpdateProduct, deleteProduct, getListBill, getListProductByBillId, getBillById}