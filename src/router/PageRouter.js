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
    },
    {
        path: "/bai-viet/danh-phap",
        exact: false,
        component: lazy(() => import('./../pages/ReligiousNamesScientificReports/ReligiousNamesScientificReports')),
    },
    {
        path: "/bai-viet/cach-viet-bao-cao-khoa-hoc",
        exact: false,
        component: lazy(() => import('./../pages/ReligiousNamesScientificReports/ReligiousNamesScientificReports')),
    },
    {
        path: "/bai-viet/:id",
        exact: false,
        component: lazy(() => import('./../pages/PostDetail/PostDetail')),
    },
    {
        path: "/bai-viet",
        exact: false,
        component: lazy(() => import('./../pages/Posts/Posts')),
    },
    {
        path: "/vuon-quoc-gia",
        exact: false,
        component: lazy(() => import('./../pages/NationalParks/NationalParks')),
    },
    
    {
        path: '/sinh-vat/sach-do',
        exact: false,
        component: lazy(() => import('../pages/RedBookCreatures/RedBookCreatures'))
    },{
        path: '/sinh-vat/nhan-dang',
        exact: false,
        component: lazy(() => import('./../pages/CreaturesIndentify/CreaturesIndentify'))
    },
    {
        path: '/sinh-vat/:id',
        exact: false,
        component: lazy(() => import('./../pages/CreaturesDetail/CreaturesDeail'))
    }
    
    ,{
        path: "/sinh-vat",
        exact: false,
        component: lazy(() => import('./../pages/Creatures/Creatures')),
    },
    {
        path: '/lien-he',
        exact: false,
        component: lazy(() => import('./../pages/Contact/Contact'))
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