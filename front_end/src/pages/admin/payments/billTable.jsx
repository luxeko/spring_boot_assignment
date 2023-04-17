import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import {BiSearch} from "react-icons/bi";
import moment from "moment";
import {AiFillEye} from "react-icons/ai";
import {getBillById, getListBill, getListProductByBillId} from "../../../services/apiService.jsx";
import BillModal from "../../../components/admin/BillModal.jsx";

const BillTable = () => {
    const [bills, setBills] = useState([])
    const [keyword, setKeyword] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [billProducts, setBillProducts] = useState([])
    const [products, setProducts] = useState([])
    const [bill, setBill] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            await handleGetListBill();
        }
        fetchData();
    }, [keyword])
    const handleGetListBill = async () => {
        const res = await getListBill(keyword)
        if (res && res.code === '200') {
            setBills(res.data)
        } else {
            setBills([])
        }
    }
    const handleSearchBill = (e) => {
        setKeyword(e.target.value)
    }
    const handleOpenModal = async (id) => {
        setOpenModal((openModal) => !openModal)
        const resProduct = await getListProductByBillId(id)
        const resBill = await getBillById(id)
        if (resProduct) {
            setProducts(resProduct.data)
        }
    }
    return (
        <>
            <div className={`max-w-screen-xl mx-auto lg:max-w-7xl sm:pt-6 pt-6 ${openModal ? `overflow-hidden` : ''}`}>
                <Breadcrumb/>
            </div>
            <div
                className={`${openModal ? 'overlay w-screen h-screen z-[1] fixed bg-zinc-700/75 top-0 left-0 duration-300 right-0 bottom-0' : ''}`}></div>
            <div className={`max-w-screen-xl mx-auto py-12 sm:py-12 lg:max-w-7xl`}>
                <div className={`flex items-center justify-between mb-10`}>
                    <div className={`inline-block`}>
                        <h1 className={`font-semibold text-3xl`}>List bill</h1>
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
                                   placeholder="Search bill..." onChange={(e) => handleSearchBill(e)}/>
                        </div>
                    </form>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Bill Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer Email
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
                            bills.map((bill, index) => {
                                return (
                                    <tr key={`bill-${index}`}
                                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <td scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-6">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            {bill.billCode}
                                        </td>
                                        <td className="px-6 py-4 text-lime-700 font-semibold">
                                            ${bill.total}
                                        </td>
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {bill.customerName}
                                        </th>
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-48">
                                            {bill.customerAddress}
                                        </th>
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {bill.customerPhone}
                                        </th>
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {bill.customerEmail}
                                        </th>
                                        <td className="px-6 py-4">
                                            {bill.createdAt ? moment(bill.createdAt).format("DD-MM-YYYY HH:mm:ss") : ""}
                                        </td>
                                        <td className={`px-6 py-4`}>
                                            <div onClick={() => handleOpenModal(bill.id)}
                                                 className={`cursor-pointer hover:bg-primaryColor bg-primaryColor_hover inline-flex items-center justify-center text-center text-white duration-300 p-2 rounded`}>
                                                <button type="button" data-modal-target="staticModal"
                                                        data-modal-toggle="staticModal"
                                                        className="cursor-pointer dark:text-blue-500">
                                                    <AiFillEye className={`w-5 h-5`}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <BillModal isOpen={openModal} setOpenModal={setOpenModal} bill={bill} products={products}/>
            </div>
        </>
    );
};

export default BillTable;