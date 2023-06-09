import React from 'react';
import Navbar from "../../layouts/admin/Navbar.jsx";
import {Outlet} from "react-router-dom";

export const HomePage = () => {
    return (
        <>
            <Navbar/>
            <div className={`main-content`}>
                <Outlet/>
            </div>
        </>
    );
};
