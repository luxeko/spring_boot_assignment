import './App.css'
import React from 'react';
import {Route, Routes} from "react-router-dom";
import {listRouterCustomer, listRouterAdmin} from "./routers/listRouter.jsx";
import RenderRouter from "./routers/renderRouter.jsx";
import HomePage from "./pages/admin/HomePage.jsx";

function App() {
    return (
        <Routes>
            <Route path={`/`}>
                {RenderRouter(listRouterCustomer)}
            </Route>
            <Route path={`admin/v1`} element={<HomePage/>}>
                {RenderRouter(listRouterAdmin)}
            </Route>
        </Routes>
    )
}

export default App
