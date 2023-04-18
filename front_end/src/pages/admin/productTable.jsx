import React, {useEffect, useState} from 'react';
import {FiPlus} from "react-icons/fi";
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa"
import {BiSearch} from "react-icons/bi"
import {deleteProduct, getListProduct} from "../../services/apiService.jsx";
import moment from "moment";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb.jsx";
import imageTest from "../../assets/lazycat_code-01.png"

const ProductTable = () => {
    const [products, setProducts] = useState([])
    const [keyword, setKeyword] = useState("")
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        const fetchData = async () => {
            await handleGetListProduct();
        }
        fetchData();
    }, [keyword])

    const handleGetListProduct = async () => {
        const res = await getListProduct(keyword)
        if (res && res.code === '200') {
            setProducts(res.data)
        } else {
            setProducts([])
        }
    }

    const handleDeleteProduct = async (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#057a55',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteProduct(id)
                if (res && res.code === '200') {
                    toast.success(res.message)
                    await handleGetListProduct()
                }
            }
        })
    }
    const handleSearchProduct = (e) => {
        setKeyword(e.target.value)
    }
    const dataBreadcumb = [
        {
            name: "Home",
            path: "/admin/v1"
        },
        {
            name: "Products",
            path: ""
        }
    ]
    return (
        <>
            <div className={`max-w-screen-xl mx-auto lg:max-w-7xl sm:pt-6 pt-6`}>
                <Breadcrumb data={dataBreadcumb}/>
                <h1 className={`font-semibold text-3xl sm:pt-6 pt-6`}>List product</h1>
            </div>
            <div className={`max-w-screen-xl mx-auto py-12 sm:py-12 lg:max-w-7xl`}>
                <div className={`flex items-center justify-between mb-10`}>
                    <div className={`inline-block`}>
                        <Link to={`/admin/v1/products/create`}
                              className={`rounded-lg bg-green-600 px-4 py-2 uppercase font-semibold text-white flex items-center`}><FiPlus
                            className={`mr-2`}/> Add product</Link>
                    </div>
                    <form className={`w-96`}>
                        <label htmlFor="default-search"
                               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <BiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                            </div>
                            <input type="search" id="default-search"
                                   className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search product..." onChange={(e) => handleSearchProduct(e)}/>
                        </div>
                    </form>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 w-2 py-3">
                                #
                            </th>
                            <th scope="col" className="w-44 px-6 py-3">
                                Product Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            products.map((product, index) => {
                                return (
                                    <tr key={`product-${index}`}
                                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <td scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-2">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 w-44">
                                            <img alt={product.productName} className={`aspect-square object-cover`} src={product.productImage}/>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.productCode}
                                        </td>
                                        <td scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.productName}
                                        </td>
                                        <td className="px-6 py-4 text-lime-700 font-semibold">
                                            ${product.price}
                                        </td>
                                        <td className="px-6 py-4 font-semibold">
                                            {product.quantity}
                                        </td>
                                        <td className="w-56 px-6 py-4">
                                            {product.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.createdAt ? moment(product.createdAt).format("DD-MM-YYYY HH:mm:ss") : ""}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`flex items-center`}>
                                                <div className={`cursor-pointer hover:bg-primaryColor bg-primaryColor_hover inline-flex items-center justify-center text-center text-white duration-300 p-2 rounded mr-3`}>
                                                    <Link to={`/admin/v1/products/edit`} state={{productId: product?.id}}
                                                          className="cursor-pointer dark:text-blue-500">
                                                        <FaPencilAlt className={`w-5 h-5`}/>
                                                    </Link>
                                                </div>
                                                <div className={`cursor-pointer hover:bg-dangerColor-default_3 bg-dangerColor-default_2 inline-flex items-center justify-center text-center text-white duration-300 p-2 rounded`}>
                                                    <button onClick={() => handleDeleteProduct(product.id)}
                                                            className="cursor-pointer dark:text-red-500">
                                                        <FaTrashAlt className={`w-5 h-5`}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ProductTable;