import React from 'react';
import {IoClose} from "react-icons/io5"
import imgTest from "../../assets/lazycat_code-01.png"
const BillModal = ({isOpen, setOpenModal, products}) => {
    return (
        <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className={`z-[10] fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'justify-center items-center flex' : 'hidden'}`}>
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="capitalize  text-xl font-semibold text-gray-900 dark:text-white">
                            Bill Details
                        </h3>
                        <button onClick={() => setOpenModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                            <IoClose className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="space-y-6">
                        <div className={`px-12`}>
                            asdsa
                        </div>
                        <div className={`overflow-y-auto h-[20rem] px-12`}>
                            {
                                products.map((item, index) => {
                                    return (
                                        <div key={`product-${index}`} className={`border-b-2 last:border-none`}>
                                            <div className={` flex items-center justify-between`}>
                                                <div className={`flex items-center justify-center py-6`}>
                                                    <div className={`mr-6`}>
                                                        {index + 1}
                                                    </div>
                                                    <div className={`mr-6`}>
                                                        <img src={imgTest} className={`w-24 h-24 rounded shadow-md`}/>
                                                    </div>
                                                    <div>
                                                        <h1 className={`font-semibold mb-2`}>{item.productName}</h1>
                                                        <span>{item.productCode}</span>
                                                    </div>
                                                </div>
                                                <div className={`text-xs`}>
                                                    <div className={`mb-2`}>
                                                        <span className={`uppercase`}>price: </span>
                                                        <span className={`text-lime-700 text-lg font-semibold`}>${item.price}</span>
                                                    </div>
                                                    <div>
                                                        <span className={`font-medium uppercase`}>qty: </span>
                                                        <span className={`text-lg font-medium ml-3`}>20</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={`flex items-center justify-between px-12`}>
                            <div>
                                <span>Total</span>
                            </div>
                            <div>
                                <span>$ 10000</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button onClick={() => setOpenModal(false)} data-modal-hide="staticModal" type="button" className="duration-300 hover:text-white text-gray-500 bg-white hover:bg-dangerColor-default_2 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillModal;