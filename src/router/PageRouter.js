import React, { lazy, Suspense } from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Loader from '../components/UI/Loader/Loader';

const publicRoutes = [
    {
        path: "/",
        exact: true,
        component: lazy(() => import('./../pages/Home')),
    }, {
        path: "/tra-cuu",
        exact: false,
        component: lazy(() => import('./../pages/Search/Search')),
    }, {
        path: "/lien-he",
        exact: false,
        component: lazy(() => import('./../pages/Home')),
    },
    {
        path: "/tai-lieu",
        exact: false,
        component: lazy(() => import('./../pages/Documents')),
    },
    {
        path: "/vuon-quoc-gia",
        exact: false,
        component: lazy(() => import('./../pages/NationalParks')),
    }
];

function PageRouter() {
    return(
        <Suspense fallback={<Loader />}>
            <Switch>
                {publicRoutes.map((route, index) => (
                    <Route key={index} path={route.path} exact={route.exact}>
                        <route.component />
                    </Route>
                ))}
                <Redirect to="/" />
            </Switch>
        </Suspense>
    );
}

export default PageRouter;