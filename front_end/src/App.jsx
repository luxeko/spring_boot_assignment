import './App.css'
import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {listRouterCustomer, listRouterAdmin} from "./routers/listRouter.jsx";
import RenderRouter from "./routers/renderRouter.jsx";
import {HomePage as HomeAdmin} from "./pages/admin/HomePage.jsx";
import {HomePage as HomeCustomer} from "./pages/customer/HomePage.jsx";
import {ToastContainer} from "react-toastify";
import Cart from "./components/customer/Cart.jsx";

function App() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Routes>
                <Route path={`/`} element={<HomeCustomer setOpen={setOpen}/>}>
                    {RenderRouter(listRouterCustomer, setOpen)}
                </Route>
                <Route path={`admin/v1`} element={<HomeAdmin/>}>
                    {RenderRouter(listRouterAdmin)}
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Cart open={open} setOpen={setOpen}/>
        </>
    )
}

export default App
