import React, {useEffect, useState} from 'react';
import {removeAllProduct} from "../../redux/action/cartAction.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {IoCloseSharp} from "react-icons/io5";
import {postCreateBill, postCreateBillProducts} from "../../services/apiService.jsx";
import moment from "moment/moment.js";

const Checkout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [customerName, setCustomerName] = useState("")
    const [customerAddress, setCustomerAddress] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [billCode, setBillCode] = useState("")
    const [total, setTotal] = useState(0)
    const [totalItem, setTotalItem] = useState(0)
    const [listProduct, setListProduct] = useState([])
    const shop = useSelector(state => state.cart)

    useEffect(() => {
        let price = 0;
        let items = 0;
        shop.cart.forEach(item => {
            items += item.qty
            price += item.price * item.qty
        })
        setTotal(price)
        setTotalItem(items)
        setListProduct(shop.cart)
    }, [shop.cart, total, totalItem, setTotal, setTotalItem])

    const generateString = (length) => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const handlePlaceOrder = async () => {
        const billCode = generateString(20);
        const createdAt = moment(new Date()).format()
        const resBill = await postCreateBill(customerName, customerAddress, customerPhone, customerEmail, total, billCode, createdAt)
        if (resBill && resBill.code === '200') {
            for (const item of listProduct) {
                await postCreateBillProducts(resBill.data.id, item.id)
            }
        }
        dispatch(removeAllProduct());
        navigate('/')
        toast.success('Order Success')
    }

    return (
        <div className="max-w-screen-xl mx-auto py-16 sm:py-24 lg:max-w-7xl">
            <div className={`grid-cols-3 grid gap-6`}>
                <div className={`col-span-2`}>
                    <form>
                        <h2 className={`text-[28px] mb-[15px] font-semibold capitalize`}>Billing details</h2>
                        <div className={`mb-10`}>
                            <div className={`flex flex-col mb-4`}>
                                <label className={`text-sm capitalize `}>Your name<span className={`text-dangerColor-default_2`}>*</span></label>
                                <input onChange={(e) => setCustomerName(e.target.value)} className={`py-4 pl-6 text-sm text-darkColor rounded-lg border-borderColor focus:border-blackColor hover:border-blackColor mt-2`} type={`text`}/>
                            </div>
                            <div className={`flex flex-col mb-4`}>
                                <label className={`text-sm capitalize `}>Your address<span className={`text-dangerColor-default_2`}>*</span></label>
                                <input onChange={(e) => setCustomerAddress(e.target.value)} className={`py-4 pl-6 mt-2 text-sm text-darkColor rounded-lg border-borderColor focus:border-blackColor hover:border-blackColor`} type={`text`}/>
                            </div>
                            <div className={`flex flex-col mb-4`}>
                                <label className={`text-sm capitalize `}>Your phone <span className={`text-dangerColor-default_2`}>*</span></label>
                                <input onChange={(e) => setCustomerPhone(e.target.value)} className={`py-4 pl-6 mt-2 text-sm text-darkColor rounded-lg border-borderColor focus:border-blackColor hover:border-blackColor`} type={`text`}/>
                            </div>
                            <div className={`flex flex-col mb-4`}>
                                <label className={`text-sm capitalize `}>Your email<span className={`text-dangerColor-default_2`}>*</span></label>
                                <input onChange={(e) => setCustomerEmail(e.target.value)} className={`py-4 pl-6 mt-2 text-sm text-darkColor rounded-lg border-borderColor focus:border-blackColor hover:border-blackColor`} type={`text`}/>
                            </div>
                        </div>
                        <h2 className={`text-[28px] mb-1 font-semibold capitalize`}>Additional information</h2>
                        <span className={`text-sm`}>Order notes (optional)</span>
                        <div className={`mt-4`}>
                            <textarea placeholder={`Notes about your order, e.g. special notes for delivery.`} className={`text-sm resize-none w-full rounded-xl p-4 border-borderColor focus:border-blackColor hover:border-blackColor`} cols={12} rows={6}></textarea>
                        </div>
                    </form>
                </div>
                <div className={`col-span-1`}>
                    <div
                        className={`pb-[40px] pt-[30px] pl-[30px] pr-[30px] border-[1px] border-borderColor relative sm:rounded-lg shadow-md flex flex-col items-start justify-around`}>
                        <h2 className={`text-[28px] mb-[15px] font-semibold capitalize`}>Your order</h2>
                        <div className={`w-full`}>
                            <table className={`border-collapse w-full`}>
                                <tbody className={`table-row-group align-middle`}>
                                <tr className={`cart_subtotal table-row border-b-[1px] border-borderColor `}>
                                    <th className={`text-[18px] font-medium text-left break-all align-top py-4`}>Product</th>
                                    <td className={`table-cell text-right clear-both py-4 break-all align-top font-medium`}>
                                        Subtotal
                                    </td>
                                </tr>
                                {
                                    listProduct.map((item, index) => {
                                        return <tr key={index} className={`cart_subtotal table-row border-b-[1px] border-borderColor`}>
                                            <th className={`text-[18px] font-light text-left break-words align-top py-4 w-10/12`}>
                                                <div>
                                                    <h3 className={`flex items-center mb-1 uppercase text-lg font-medium`}>{item.productName} <IoCloseSharp className={`mx-2 text-sm`}/> {item.qty}</h3>
                                                    <code className={`text-xs`}>
                                                        <span>Code: </span>{item.productCode}
                                                    </code>
                                                </div>
                                            </th>
                                            <td className={`table-cell text-right clear-both py-4 break-all align-top font-light`}>
                                                ${item.price}
                                            </td>
                                        </tr>
                                    })
                                }
                                <tr className={`cart_subtotal table-row`}>
                                    <th className={`text-[18px] font-medium text-left break-all align-top py-4`}>Total ({totalItem})</th>
                                    <td className={`table-cell text-right clear-both py-4 align-top`}>
                                        <strong>
                                            <span className={`text-[26px] font-medium text-lime-600`}>${total}</span>
                                        </strong>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div className={`mb-5`}>
                                <div className="flex border-b-[1px] border-borderColor pb-4">
                                    <div className="flex items-center h-5">
                                        <input id="helper-radio" name={`default-radio`}  aria-describedby="helper-radio-text" type="radio" value="" className="w-4 h-4 text-dangerColor-default_2 bg-gray-100 border-gray-300 focus:ring-dangerColor-default_2 dark:focus:ring-dangerColor-default_2 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                    <div className="ml-2 text-sm">
                                        <label htmlFor="helper-radio"
                                               className="font-medium text-gray-900 dark:text-gray-300">Direct bank transfer</label>
                                        <p id="helper-radio-text"
                                           className="pt-2 text-xs font-normal text-gray-500 dark:text-gray-300">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                    </div>
                                </div>
                                <div className="flex border-b-[1px] border-borderColor py-4">
                                    <div className="flex items-center h-5">
                                        <input id="helper-radio" name={`default-radio`} aria-describedby="helper-radio-text" type="radio" value="" className="w-4 h-4 text-dangerColor-default_2 bg-gray-100 border-gray-300 focus:ring-dangerColor-default_2 dark:focus:ring-dangerColor-default_2 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                    <div className="ml-2 text-sm">
                                        <label htmlFor="helper-radio"
                                               className="font-medium text-gray-900 dark:text-gray-300">Check payments</label>
                                        <p id="helper-radio-text"
                                           className="pt-2 text-xs font-normal text-gray-500 dark:text-gray-300">Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                                    </div>
                                </div>
                                <div className="flex border-b-[1px] border-borderColor py-4">
                                    <div className="flex items-center h-5">
                                        <input id="helper-radio" name={`default-radio`}  aria-describedby="helper-radio-text" type="radio" value="" className="w-4 h-4 text-dangerColor-default_2 bg-gray-100 border-gray-300 focus:ring-dangerColor-default_2 dark:focus:ring-dangerColor-default_2 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                    <div className="ml-2 text-sm">
                                        <label htmlFor="helper-radio"
                                               className="font-medium text-gray-900 dark:text-gray-300">Cash on delivery</label>
                                        <p id="helper-radio-text"
                                           className="pt-2 text-xs font-normal text-gray-500 dark:text-gray-300">Pay with cash upon delivery.</p>
                                    </div>
                                </div>
                            </div>
                            <span className={`text-xs text-lightColor`}>
                                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                                </span>
                            <div onClick={handlePlaceOrder}
                                 className={`bg-dangerColor-default_2 text-whiteColor py-3 rounded-lg text-center font-medium hover:bg-dangerColor-hover_2 duration-300 mt-6 cursor-pointer`}>
                                Place order
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;