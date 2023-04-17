import React from 'react';
import {AiFillHome} from "react-icons/ai";
import {RiArrowRightSLine} from "react-icons/ri"
const Breadcrumb = () => {
    return (
        <>
            <nav className="flex py-3 text-gray-700 rounded-lg dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <AiFillHome className="w-4 h-4 mr-2"/>
                            Home
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <RiArrowRightSLine className="w-6 h-6 text-gray-400"/>
                            <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Templates</a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <RiArrowRightSLine className="w-6 h-6 text-gray-400"/>
                            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Products</span>
                        </div>
                    </li>
                </ol>
            </nav>
        </>
    )
};

export default Breadcrumb;