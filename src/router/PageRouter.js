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
        path: "/lien-he",
        exact: false,
        component: lazy(() => import('./../pages/Home')),
    },
    {
        path: "/bai-viet/:id",
        exact: false,
        component: lazy(() => import('./../pages/PostDetail/PostDetail')),
    },
    {
        path: "/vuon-quoc-gia",
        exact: false,
        component: lazy(() => import('./../pages/NationalParks')),
    },
    {
        path: '/sinh-vat/:id',
        exact: false,
        component: lazy(() => import('./../pages/CreaturesDetail/CreaturesDeail'))
    },{
        path: "/sinh-vat",
        exact: false,
        component: lazy(() => import('./../pages/Creatures/Creatures')),
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