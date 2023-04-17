import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {HiOutlineShoppingCart} from "react-icons/hi";
import {FiShoppingBag} from "react-icons/fi";
import {RiDashboardLine, RiMenu2Line} from "react-icons/ri";

const Navbar = () => {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to={`/`} className="flex items-center">
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Shop</span>
                </Link>
                <button data-collapse-toggle="navbar-multi-level" type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-multi-level" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <RiMenu2Line className="w-6 h-6"/>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-5 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink end to={`/`}
                                     className={(navData) => (navData.isActive ? 'text-white bg-blue-700' +
                                         ' md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent' : 'text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent') + `block py-2`}>
                                <FiShoppingBag className={`w-6 h-6`}/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/cart`}
                                     className={(navData) => (navData.isActive ? 'text-white bg-blue-700' +
                                         ' md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent' : 'text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent') + `block py-2`}>
                                <HiOutlineShoppingCart className={`w-6 h-6`}/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/admin/v1`}
                                     className={(navData) => (navData.isActive ? 'text-white bg-blue-700' +
                                         ' md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent' : 'text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent') + `block py-2`}>
                                <RiDashboardLine className={`w-6 h-6`}/>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;