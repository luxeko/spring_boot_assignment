import React, {useEffect, useState} from 'react';
import {IoClose, IoCloseSharp} from "react-icons/io5"
import moment from "moment";
import testImg from "../../assets/lazycat_code-01.png";
import {HiQrCode} from "react-icons/hi2"

const BillModal = ({isOpen, setOpenModal, bill, products}) => {
    const [totalItem, setTotalItem] = useState(0)

    useEffect(() => {
        let items = 0;
        products.forEach(item => {
            items += item.quantityOrder
        })
        setTotalItem(items)
    }, [products, totalItem, setTotalItem])
    return (
        <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true"
             className={`z-[10] fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'justify-center items-center flex' : 'hidden'}`}>
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div
                        className="flex items-start justify-between py-4 px-12 border-b rounded-t dark:border-gray-600">
                        <h3 className="capitalize text-xl font-semibold text-darkColor dark:text-white">
                            Bill Details
                        </h3>
                        <button onClick={() => setOpenModal(false)} type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="staticModal">
                            <IoClose className="w-5 h-5"/>
                        </button>
                    </div>
                    <div className="space-y-6">
                        <div className={`px-12 py-4 shadow-md`}>
                            <div className={`grid grid-cols-2 gap-4 text-base pb-2 text-darkColor`}>
                                <div className={``}>
                                    <span className={`font-semibold`}>Code-bill: </span>
                                    <code className={`uppercase`}>{bill.billCode}</code>
                                </div>
                                <div className={``}>
                                    <span className={`font-semibold`}>Created at: </span>
                                    <code className={``}>{moment(bill.createdAt).format("DD-MM-YYYY hh:mm:ss")}</code>
                                </div>
                            </div>
                            <div className={`grid grid-cols-2 gap-4 text-base pb-2 text-darkColor`}>
                                <div>
                                    <span className={`font-semibold`}>Name: </span>
                                    <span className={``}>{bill.customerName}</span>
                                </div>
                                <div>
                                    <span className={`font-semibold`}>Phone: </span>
                                    <span className={``}>{bill.customerPhone}</span>
                                </div>
                            </div>
                            <div className={`grid grid-cols-2 gap-4 text-base pb-2 text-darkColor`}>
                                <div>
                                    <span className={`font-semibold`}>Address: </span>
                                    <span className={``}>{bill.customerAddress}</span>
                                </div>
                                <div>
                                    <span className={`font-semibold`}>Email: </span>
                                    <span className={``}>{bill.customerEmail}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`overflow-y-auto h-[20rem] px-12`}>
                            <table className={`border-collapse w-full`}>
                                <tbody className={`table-row-group align-middle`}>
                                <tr className={`cart_subtotal table-row border-b-[1px] border-borderColor`}>
                                    <th className={`text-[18px] font-medium text-left break-all py-4`}>Product</th>
                                    <td className={`table-cell text-right clear-both py-4 break-all text-[18px] font-medium`}>
                                        Subtotal
                                    </td>
                                </tr>
                                {
                                    products.map((item, index) => {
                                        return <tr key={index}
                                                   className={`cart_subtotal table-row border-b-[1px] border-borderColor`}>
                                            <th className={`text-[18px] font-light text-left break-words align-top flex items-center py-4 w-10/12`}>
                                                <div>
                                                    <div className={`cursor-pointer group/image max-w-[150px] mr-3`}>
                                                        <img
                                                            alt={``}
                                                            src={testImg}
                                                            className={`rounded-[10px] max-w-[150px]`}/>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className={`flex items-center mb-1 uppercase text-lg font-medium`}>
                                                        {item.productName}
                                                    </h3>
                                                    <code className={`text-base flex items-center`}>
                                                        <span className={`text-sm font-semibold`}><HiQrCode
                                                            className={`w-5 h-5 mr-2`}/></span> {item.productCode}
                                                    </code>
                                                </div>
                                            </th>
                                            <td className={`table-cell text-right clear-both break-all flex flex-col items-center justify-center font-medium italic`}>
                                                ${item.price}
                                                <div className={`flex text-right items-center justify-end mt-2`}>
                                                    <span>
                                                        <IoCloseSharp className={`mx-2 text-sm`}/>
                                                    </span>
                                                    <span>
                                                        {item.quantityOrder}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }
                                <tr className={`cart_subtotal table-row`}>
                                    <th className={`text-[18px] font-medium text-left break-all py-4`}>Total
                                        ({bill.total})
                                    </th>
                                    <td className={`table-cell text-right clear-both py-4`}>
                                        <strong>
                                            <span
                                                className={`text-[26px] font-medium text-lime-600`}>${bill.subtotal}</span>
                                        </strong>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div
                        className="flex items-center justify-end py-6 px-12 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button onClick={() => setOpenModal(false)} data-modal-hide="staticModal" type="button"
                                className="duration-300 hover:text-white text-gray-500 bg-white hover:bg-dangerColor-default_2 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillModal;