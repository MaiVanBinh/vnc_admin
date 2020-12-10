import React from 'react';
import './SideBarAdmin.css';

const SideBarAdmin = (props) => {
    return (
        <div className="main-menu-container">
        <div className="menu-item active">
            <span className="icon">
                <svg viewBox="0 0 480 480" width="20" height="20">
                    <path fill="#333333"
                        d="M0 464h480v16H0zM32 448h80a8 8 0 008-8V296a8 8 0 00-8-8H32a8 8 0 00-8 8v144a8 8 0 008 8zm8-144h64v128H40V304zM256 448h80a8 8 0 008-8V200a8 8 0 00-8-8h-80a8 8 0 00-8 8v240a8 8 0 008 8zm8-240h64v224h-64V208zM144 448h80a8 8 0 008-8V104a8 8 0 00-8-8h-80a8 8 0 00-8 8v336a8 8 0 008 8zm8-336h64v320h-64V112zM368 448h80a8 8 0 008-8V8a8 8 0 00-8-8h-80a8 8 0 00-8 8v432a8 8 0 008 8zm8-432h64v416h-64V16z">
                    </path>
                </svg>
            </span>
            <span>Creatures</span>
        </div>
        <div className="menu-item">
            <span className="icon">
                <svg viewBox="0 0 480 480" width="20" height="20">
                    <path fill="#333333"
                        d="M0 464h480v16H0zM32 448h80a8 8 0 008-8V296a8 8 0 00-8-8H32a8 8 0 00-8 8v144a8 8 0 008 8zm8-144h64v128H40V304zM256 448h80a8 8 0 008-8V200a8 8 0 00-8-8h-80a8 8 0 00-8 8v240a8 8 0 008 8zm8-240h64v224h-64V208zM144 448h80a8 8 0 008-8V104a8 8 0 00-8-8h-80a8 8 0 00-8 8v336a8 8 0 008 8zm8-336h64v320h-64V112zM368 448h80a8 8 0 008-8V8a8 8 0 00-8-8h-80a8 8 0 00-8 8v432a8 8 0 008 8zm8-432h64v416h-64V16z">
                    </path>
                </svg>
            </span>
            <span>Creatures</span>
        </div>
    </div>
    )
}

export default SideBarAdmin;