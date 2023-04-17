import React from 'react';
import Navbar from "../../layouts/customer/Navbar.jsx";
import {Outlet} from "react-router-dom";

export const HomePage = (props) => {
    return (
        <>
            <Navbar setOpen={props.setOpen}/>
            <div className={`main-content`}>
                <Outlet/>
            </div>
        </>
    );
};
