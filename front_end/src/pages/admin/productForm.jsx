import React, {useEffect, useRef, useState} from 'react';
import Breadcrumb from "../../components/Breadcrumb.jsx";
import {HiOutlineLocationMarker} from "react-icons/hi"
import {RiImageFill} from "react-icons/ri"
import {MdAlternateEmail} from "react-icons/md"
import moment from "moment";
import {
    getProductById, getThumbnailByProductId,
    postCreateProduct,
    postCreateProductThumbnail,
    putUpdateProduct
} from "../../services/apiService.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import image_add from "../../assets/image_add.png"
const ProductForm = () => {
    const productId = useLocation().state?.productId;
    const [productCode, setProductCode] = useState("")
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [description, setDescription] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState(image_add)
    const [avatarName, setAvatarName] = useState(null)
    const inputAvatarRef = useRef(null);

    useEffect(() => {
        if (productId) {
            const fetchData = async (productId) => {
                await handleGetProductById(productId)
            }
            fetchData()
        }
    }, [])

    const handleGetProductById = async (productId) => {
        const res = await getProductById(productId)
        if (res && res.code === "200") {
            setProductCode(res.data.productCode)
            setProductName(res.data.productName)
            setPrice(res.data.price)
            setQuantity(res.data.quantity)
            setDescription(res.data.description)
            setCreatedAt(res.data.createdAt)
            setAvatar(res.data.productImage)
        }
    }
    const handleResetForm = () => {
        setProductCode("")
        setProductName("")
        setPrice("")
        setQuantity("")
        setDescription("")
        setCreatedAt("")
    }
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        let res;
        const data = new FormData()
        data.append('thumbnail', avatarName)
        const uploadThumbnail = await postCreateProductThumbnail(data)
        if (uploadThumbnail && uploadThumbnail.code === '200') {
            let productImage = uploadThumbnail.data
            if (productId) {
                res = await putUpdateProduct(productId, productCode, productName,productImage, price, quantity, description, createdAt)
            } else {
                const createdAt = moment(new Date()).format()
                res = await postCreateProduct(productCode, productName, productImage, price, quantity, description, createdAt)
            }
            if (res && res.code === '200') {
                toast.success(res.message);
                navigate(`/admin/v1`)
            }
        }
    }
    const handleChangeAvatar = (e) => {
        setAvatar(window.URL.createObjectURL(e.target.files[0]))
        setAvatarName(e.target.files[0])
    }
    const dataBreadcumb = [
        {
            name: "Home",
            path: "/admin/v1"
        },
        {
            name: "Products",
            path: "/admin/v1"
        },
        {
            name: productId ? "Edit product" : "Create product",
            path: ""
        }
    ]

    return (
        <>
            <div className={`max-w-screen-xl mx-auto lg:max-w-7xl sm:pt-6 pt-6`}>
                <Breadcrumb data={dataBreadcumb}/>
                <h1 className={`font-semibold text-3xl sm:pt-6 pt-6`}>{productId ? 'Edit product' : 'Create product'}</h1>
            </div>
            <div className={`max-w-screen-xl mx-auto py-12 sm:py-12 lg:max-w-7xl grid grid-cols-3 gap-10`}>
                <form className="col-span-2">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="productCode">
                                Product Code
                            </label>
                            <input
                                value={productCode ? productCode : ""}
                                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="productCode" name={`productCode`} type="text"
                                onChange={(e) => setProductCode(e.target.value)}/>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="productName">
                                Product Name
                            </label>
                            <input
                                value={productName ? productName : ""}
                                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="productName" name={`productName`} type="text"
                                onChange={(e) => setProductName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="productCode">
                                Price
                            </label>
                            <input
                                value={price ? price : ""}
                                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="price" name={`price`} type="text" onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="quantity">
                                Quantity
                            </label>
                            <input
                                value={quantity ? quantity : ""}
                                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="quantity" name={`quantity`} type="text"
                                onChange={(e) => setQuantity(e.target.value)}/>
                        </div>
                    </div>
                    <div
                        className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <label htmlFor="description" className="sr-only">Description</label>
                            <textarea id="description" rows="4"
                                      className="resize-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                      placeholder="Write a description..."
                                      onChange={(e) => setDescription(e.target.value)}
                                      value={description ? description : ""}></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                            <div
                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-lightColor">
                                Description
                            </div>
                            <div className="flex pl-0 space-x-1 sm:pl-2">
                                <button type="button"
                                        className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <MdAlternateEmail className="w-5 h-5"/>
                                    <span className="sr-only">Attach file</span>
                                </button>
                                <button type="button"
                                        className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <HiOutlineLocationMarker className="w-5 h-5"/>
                                    <span className="sr-only">Set location</span>
                                </button>
                                <button type="button"
                                        className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <RiImageFill className="w-5 h-5"/>
                                    <span className="sr-only">Upload image</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`flex items-end justify-end`}>
                        <button type="submit"
                                onClick={(e) => handleSubmitForm(e)}
                                className="mr-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Save
                        </button>
                        <button type="reset"
                                onClick={handleResetForm}
                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black border bg-white rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:text-white hover:bg-red-700">
                            Reset
                        </button>
                    </div>
                </form>
                <div className={`col-span-1`}>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input className={`block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100`} onChange={(e) => handleChangeAvatar(e)} accept="image/png" ref={inputAvatarRef}
                               type={`file`}/>
                    </label>
                    <div className={`w-full aspect-square mt-4`}>
                        <img style={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            objectFit: "cover"
                        }} className="rounded w-full h-full" src={avatar}
                             alt="Extra large avatar"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductForm;