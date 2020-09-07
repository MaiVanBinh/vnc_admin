import React from 'react';

import Aux from '../../hoc/Auxiliary';
// import classes from './Layout.css';
import Navbar from '../Navbar/Navbar';
import PageRouter from '../../router/PageRouter';

const layout = ( props ) => (
    <Aux>
        <Navbar />
        {/* {props.children} */}
        <PageRouter />
    </Aux>
);

export default layout;