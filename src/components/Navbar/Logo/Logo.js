import React from 'react';
import './Logo.css';
import {Link} from 'react-router-dom';

export default function logo() {
    return (
        <div className="logo-container">
            <Link to=''><h3 className="logo">Vn<span>Creatures</span></h3></Link>
        </div>
    );
}