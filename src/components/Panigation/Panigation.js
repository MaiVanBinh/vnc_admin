import React, {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import "./Panigation.css";

const Panigation = (props) => {
  const [page, setPage] = useState(1);

  const onChangePageHandler = (event) => {
    const page = event.target.value;
    setPage(page.replace(/\D/g, ''));
  }

  const fetchdDataByPageHandler = (mode) => {
    switch(mode) {
      case 'next': {
        if(props.numberOfPages >= parseInt(page) + 1) {
          const nextPage = parseInt(page) + 1;
          setPage(nextPage);
          props.onFetchData(nextPage);
        }
        break;
      }
      case 'previous': {
        if(parseInt(page) > 1) {
          const nextPage = parseInt(page) - 1;
          setPage(nextPage);
          props.onFetchData(nextPage);
        } 
        break;
      }
      case 'max': {
        setPage(props.numberOfPages);
        props.onFetchData(props.numberOfPages);
        break;
      }
      case 'min': {
        setPage(1);
        props.onFetchData(1);
        break;
      }
      case 'go': {
        setPage(page);
        props.onFetchData(parseInt(page));
        break;
      }
      default: 
        break;
    }
  }

  return (
    <div className="panigation">
      <ul>
        <li>
          <button onClick={() => fetchdDataByPageHandler('min')}>{"<<"}</button>
        </li>
        <li>
          <button onClick={() => fetchdDataByPageHandler('previous')}>{"<"}</button>
        </li>
        <li>
          <input
            value={props.page}
            name="page"
            onChange={onChangePageHandler}
          />
          <button onClick={() => fetchdDataByPageHandler('go')}>
            <span></span>
          </button>
          <span>/{props.numberOfPages}</span>
        </li>
        <li>
          <button onClick={() => fetchdDataByPageHandler('next')}>{">"}</button>
        </li>
        <li>
          <button onClick={() => fetchdDataByPageHandler('max')}>{">>"}</button>
        </li>
      </ul>
    </div>
  );
};

export default Panigation;
