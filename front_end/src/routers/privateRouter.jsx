import React from 'react';
import {Navigate} from "react-router-dom";

const PrivateRouter = (props) => {
    // const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const isAuthenticated = true;

    return (
        isAuthenticated
            ? props.children
            : <Navigate to={'/login'}></Navigate>
    );
};

export default PrivateRouter;