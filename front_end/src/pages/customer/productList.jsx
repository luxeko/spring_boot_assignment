import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Navbar from "../../layouts/customer/Navbar.jsx";
import {getListProduct} from "../../services/apiService.jsx";
import {TbShoppingCartPlus} from "react-icons/tb";
import imageTest from "../../assets/lazycat_code-01.png"
import {doAddToCart} from '../../redux/action/cartAction.jsx'
import {useDispatch} from "react-redux";

const ProductList = (props) => {
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            await handleGetListProduct();
        }
        fetchData();
    }, [])
    const handleAddToCart = (data) => {
        dispatch(doAddToCart(data))
        props.setOpen(true)
    }
    const handleGetListProduct = async () => {
        const res = await getListProduct("")
        if (res && res.code === '200') {
            setProducts(res.data)
        } else {
            setProducts([])
        }
    }
    return (
        <div className="max-w-screen-xl mx-auto py-16 sm:py-24 lg:max-w-7xl">
            <h2 className="sr-only">Products</h2>
            <div
                className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <Link key={product.id} to={``} className="group shadow-lg rounded-lg py-3">
                        <div
                            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                                src={imageTest}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center duration-300 group-hover:opacity-75"
                            />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-700 px-5 pt-4 pb-2">{product.productName}</h3>
                        <div className={`flex items-end justify-between mt-2  px-5`}>
                            <span className="text-lg leading-4 font-semibold text-lime-700">${product.price}</span>
                            <button onClick={() => handleAddToCart(product)}
                                    className={`bg-dangerColor-default_2 duration-300 text-white p-3 rounded hover:bg-dangerColor-default_3`}>
                                <TbShoppingCartPlus className={`w-5 h-5`}/></button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductList;