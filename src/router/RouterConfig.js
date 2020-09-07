import React, { Suspense } from 'react';
import {Switch} from "react-router-dom";
import Loader from '../components/UI/Loader/Loader';
import Layout from '../components/Layout/Layout';
import ErrorBoundary from './ErrorBoundary';

const RouteConfig = (props) => (
    <ErrorBoundary>
        <Suspense fallback={<Loader />}>
            <Switch>
                <Layout />
            </Switch>
        </Suspense>
    </ErrorBoundary>
);

export default RouteConfig;