import React from "react";
import "./Pagination.css";
import { IconMore, IconNext, IconNextDouble, IconPrevious, IconPreviousDouble } from './../../store/utilities/SVG';

const Pagination = (props) => {
    const { pagination, callFetchList } = props;

    const changePage = (page) => {
        if ((page < 1) || (page > pagination.total)) { return; } // first page && last page 
        if (page === pagination.current) return;
        callFetchList(page);
    }

    return (
        <div className='WRAP_PAGINATION d-flex align-items-center justify-content-center'>
            <div className="double double-prev" onClick={() => changePage(1)}>
                <IconPreviousDouble color={'#333'} width={10} height={10} />
            </div>
            <div className="single single-prev" onClick={() => changePage(pagination.current - 1)}>
                <IconPrevious color={'#333'} width={10} height={10} />
            </div>
            {
                pagination.current >= 4 ? (
                    <div className="first-page" onClick={() => changePage(1)}>
                        <span>1</span>
                    </div>
                ) : null
            }
            {
                pagination.current >= 3 ? (
                    <div className="more">
                        <IconMore color={'#333'} width={20} height={10} />
                    </div>
                ) : null
            }
            {
                pagination.current >= 2 ? (
                    <div className="pre-page" onClick={() => changePage(pagination.prev)}>
                        <span>{pagination.prev}</span>
                    </div>
                ) : null
            }
            <div className="current-page">
                <span>{pagination.current}</span>
            </div>
            {
                pagination.current < pagination.total ? (
                    <div className="next-page" onClick={() => changePage(pagination.next)}>
                        <span>{pagination.next}</span>
                    </div>
                ) : null
            }
            {
                pagination.current < pagination.total - 1 ? (
                    <div className="more">
                        <IconMore color={'#333'} width={20} height={10} />
                    </div>
                ) : null
            }
            {
                pagination.current < pagination.total - 2 ? (
                    <div className="last-page" onClick={() => changePage(pagination.total)}>
                        <span>{pagination.total}</span>
                    </div>
                ) : null
            }
            <div className="single single-next" onClick={() => changePage(pagination.current + 1)}>
                <IconNext color={'#333'} width={10} height={10} />
            </div>
            <div className="double double-next" onClick={() => changePage(pagination.total)}>
                <IconNextDouble color={'#333'} width={10} height={10} />
            </div>
        </div>
    );
};

export default Pagination;
