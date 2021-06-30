import React, { useEffect } from "react";
import "./Layout.css";
import SadminRouter from "../../router/SadminRouter";
import { useHistory } from "react-router";
import { useSelector } from 'react-redux';

const LayoutSadmin = () => {
    const history = useHistory();

    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (auth.user && auth.user.role !== '1') { // role: 1 => sadmin 
            history.push('/danh-muc');
        }
    }, [auth, history, auth.user])
    return (
        <SadminRouter />
    );
};

export default LayoutSadmin;
