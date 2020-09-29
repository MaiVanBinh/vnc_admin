import React from 'react';
import './Layout.css'
import Aux from '../../hoc/Auxiliary';
import Navbar from '../Navbar/Navbar';
import PageRouter from '../../router/PageRouter';

const layout = () => (
    <Aux>
        <Navbar />
        <div className="container-layout">
            <PageRouter />
        </div>
    </Aux>
);

export default layout;