import React, { useEffect, useState } from "react";
import "./TableAdminvV1.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { Link } from "react-router-dom";

const TableAdminvV1 = (props) => {
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [panigation, setPanigation] = useState({
    pageMin: 1,
    pageItem: 15,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (props.token) {
      props.onFetchAsset(props.token, currentPage);
    }
  }, [props.onFetchAsset, currentPage]);

  useEffect(() => {
    if (props.totalAssets > 0) {
      setNumberOfPage(props.numberPage);
    }
  }, [props.numberPage]);
  useEffect(() => {
    props.onFetchAsset(props.token, currentPage);
  }, [currentPage]);

  const onPanigationHandler = (pageNumber) => {
    const totalPage = Math.floor(props.totalAssets / 15) + 1;
    const pageMax = panigation.pageMin + panigation.pageItem - 1;
    let currentPageUpdate = pageNumber;
    if (pageNumber === currentPage && pageNumber === 1) {
    } else if (pageNumber === 1 && currentPage !== 1) {
      setPanigation({
        pageItem: 10,
        pageMin: pageNumber,
      });
    } else if (pageNumber === pageMax && pageMax < totalPage) {
      setPanigation({
        pageItem: 10,
        pageMin: pageNumber,
      });
    } else if (pageNumber === panigation.pageMin && pageNumber !== 1) {
      let pageMin = pageNumber - 9;
      if (pageNumber < 10) {
        pageMin = 1;
      }
      setPanigation({
        pageItem: 10,
        pageMin: pageMin,
      });
    }
    if (pageNumber === -1) {
      let pageMin = 1;
      if (numberOfPage > panigation.pageItem) {
        pageMin = numberOfPage - 9;
      }
      currentPageUpdate = numberOfPage - 1;
      setPanigation({
        pageItem: 10,
        pageMin: pageMin,
      });
    }
    setCurrentPage(currentPageUpdate);
    props.fetchData(currentPageUpdate);
  };

  let pageContent = [];
  if (numberOfPage) {
    for (
      let i = panigation.pageMin;
      i < panigation.pageMin + panigation.pageItem;
      i++
    ) {
      if (i >= numberOfPage) {
        break;
      }
      pageContent.push(
        <li>
          <a
            onClick={() => onPanigationHandler(i)}
            className={i === currentPage ? "active" : ""}
          >
            {i}
          </a>
        </li>
      );
    }
  }

  let tabelHeader = [];
  if (props.tableConfig) {
    for (const property in props.tableConfig) {
      tabelHeader.push(<th key={property}>{props.tableConfig[property]}</th>);
    }
  }

  const renderRowContent = (item) => {
    let content = [];
    for (const property in props.tableConfig) {
      content.push(
        <td
          key={property}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          {item[property]}
        </td>
      );
    }
    return content;
  };

  let tableContent = [];
  if (props.data) {
    tableContent = props.data.map((item) => (
      <tr key={item.id}>
        {renderRowContent(item)}{" "}
        <td
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <i
            class="far fa-eye icon"
            style={{ padding: "5px" }}
            onClick={() => props.onViewDetail(item)}
          ></i>

          <i
            class="fas fa-edit icon"
            style={{ padding: "5px" }}
            onClick={() => props.onEdit(item)}
          ></i>

          <i
            class="fas fa-trash icon"
            style={{ padding: "5px" }}
            onClick={() => props.deleteClick(item)}
          ></i>
        </td>
      </tr>
    ));
  }
  const [marginLeft, setMarginLeft] = useState('300px')
  return (
    <div style={{marginLeft: marginLeft, transition: '0.5s ease-in-out'}}>
      <div className="group-icon-table">
        <div>
          <i
            class="fas fa-bars icon"
            style={{ padding: "5px", borderRadius: "2px" }}
            onClick={() => {
              if(marginLeft === '300px') {
                setMarginLeft('0px')
              } else {
                setMarginLeft('300px')
              }
            }}
          ></i>
          <span>|</span>
          <i
            class="fas fa-filter icon"
            style={{ padding: "5px", borderRadius: "2px" }}
          ></i>
        </div>
        <div>
          <i
            class="fas fa-search icon"
            style={{ padding: "5px", borderRadius: "2px" }}
          ></i>
          <i
            class="fas fa-redo icon"
            style={{ padding: "5px", borderRadius: "2px" }}
            onClick={() => props.onFetchAsset(props.token, 1)}
          ></i>
          <i
            class="fas fa-plus icon"
            style={{ padding: "5px", borderRadius: "2px" }}
            onClick={() => props.createClick()}
          ></i>
        </div>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            {tabelHeader}
            <th>Action</th>
          </tr>
        </thead>
        {props.data ? (
          <tbody>{tableContent}</tbody>
        ) : (
          <div
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "20px",
            }}
          >
            {/* <Loader /> */}
          </div>
        )}
      </table>
      {props.label !== "species" ? (
        <div class="tablefooter">
          <div class="tableNavigation">
            <ul>
              <li>
                <a onClick={() => onPanigationHandler(1)}>
                  <i class="fas fa-angle-double-left"></i>
                </a>
              </li>
              {pageContent}
              <li>
                <a onClick={() => onPanigationHandler(-1)}>
                  <i class="fas fa-angle-double-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    assets: state.assets.assets,
    totalAssets: state.assets.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAsset: (token, page) => dispatch(actions.fetchAssets(token, page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableAdminvV1);
