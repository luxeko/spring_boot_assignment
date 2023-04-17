import React, {Suspense} from 'react';
import PrivateRouter from "./privateRouter.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const RenderRouter = (routers, setOpen) => {
    return (
        routers.map(({page: Page, path, isPublic, ...rest}) => {
            return (
                <Route element={
                    !isPublic ?
                        <PrivateRouter>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Page setOpen={setOpen}/>
                            </Suspense>
                        </PrivateRouter> :
                        <Suspense fallback={<div>Loading...</div>}>
                            <Page setOpen={setOpen}/>
                        </Suspense>}
                       path={path}
                       key={path}
                       {...rest}>
                </Route>
            )
        })
    )
};

export default RenderRouter;