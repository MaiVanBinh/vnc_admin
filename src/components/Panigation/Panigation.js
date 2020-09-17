import React, {useEffect, useState} from "react";
import { withRouter } from 'react-router-dom';
import "./Panigation.css";

const Panigation = (props) => {
  const [page, setPage] = useState(1);

  const onChangePageHandler = (event) => {
    const page = event.target.value;
    setPage(page.replace(/\D/g, ''));
  }
  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    for(let param of query.entries()) {
      if(param[0] === 'page') {
        setPage(parseInt(param[1]));
      }
    }
  }, [props]);

  useEffect(() => {
    setPage(1)
  }, []);
  const fetchdDataByPageHandler = (mode) => {
    switch(mode) {
      case 'next': {
        const nextPage = parseInt(page) + 1;
        setPage(nextPage);
        props.onFetchCreaturesHandler(nextPage);
        break;
      }
      case 'previous': {
        if(parseInt(page) > 1) {
          const nextPage = parseInt(page) - 1;
          setPage(nextPage);
          props.onFetchCreaturesHandler(nextPage);
        } 
        break;
      }
      case 'max': {
        setPage(props.numberOfPages);
        props.onFetchCreaturesHandler(props.numberOfPages);
        break;
      }
      case 'min': {
        setPage(1);
        props.onFetchCreaturesHandler(1);
        break;
      }
      case 'go': {
        setPage(page);
        props.onFetchCreaturesHandler(parseInt(page));
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
            value={page}
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

export default withRouter(Panigation);
