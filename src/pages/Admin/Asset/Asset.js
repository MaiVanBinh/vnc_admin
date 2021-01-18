import React, { useEffect, useState } from "react";
import "./Asset.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import Loader from "../../../components/UI/Loader/Loader";
import Modal from "../../../components/UI/Modal/Modal";
import AssetDetail from "./AssetDetail/AssetDetail";
import AssetCreate from "./AssetCreate/AssetCreate";
import AssetDelete from './AssetDelete/AssetDelete';

const NUMBER_ENTRIES = 15;

const Asset = (props) => {
  const [viewDetail, setViewDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [deleteAsset, setDeleteAsset] = useState(null);

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
      setNumberOfPage(Math.floor(props.totalAssets / NUMBER_ENTRIES) + 2);
    }
  }, [props.totalAssets]);
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
  };

  const onViewDetail = (item) => {
    setViewDetail(item);
  };

  const onCloseViewDetail = () => {
    setViewDetail(null);
    setShowModal(false);
  };

  const onCreateHandler = () => {
    setShowModal(true);
    setIsCreate(true);
  };

  let tableContent = null;
  if (props.assets) {
    tableContent = props.assets.map((item) => (
      <tr key={item.id}>
        <td style={{ justifyContent: "center", alignItems: "center" }}>
          {item.id}
        </td>
        <td style={{ justifyContent: "center", alignItems: "center" }}>
          <img src={item.url} style={{ width: "50px", maxHeight: "50px" }} />
        </td>
        <td>{item.url.split("/").pop()}</td>
        <td><i class="fas fa-check" style={{color: '#32CD32'}}></i></td>
        <td>{item.created_by}</td>
        <td>{item.created_at}</td>
        <td>{item.updated_at}</td>
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
            onClick={() => onViewDetail(item)}
          ></i>

          <a href={item.url} target="_blank" download>
            <i class="fas fa-download icon" style={{ padding: "5px"}}></i>
          </a>

          <i class="fas fa-trash icon" style={{ padding: "5px" }} onClick={() => setDeleteAsset(item)}></i>
        </td>
      </tr>
    ));
  }
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

  const cancleCreate = () => {
    setShowModal(false);
  }
  const deleteClick = (asset) => {
    // console.log(asset);
    props.onDeleteAsset(asset.id, props.token)
    setDeleteAsset(null);
  }
  return (
    <div>
      {props.token ? null : <Redirect to="/" />}
      <Modal show={viewDetail || showModal}>
        {isCreate ? (
          <AssetCreate cancleCreate={cancleCreate} />
        ) : (
          <AssetDetail onCloseHandler={onCloseViewDetail} asset={viewDetail} />
        )}
      </Modal>
      <Modal show={deleteAsset}>
        <AssetDelete asset={deleteAsset} deleteClick={deleteClick} />
      </Modal>
      <div className="group-icon-table">
        <div>
          <i
            class="fas fa-bars icon"
            style={{ padding: "5px", borderRadius: "2px" }}
            onClick={props.sideBarHanlder}
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
            onClick={() => onCreateHandler()}
          ></i>
        </div>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>In Use</th>
            <th>Owner ID</th>
            <th>Created Day</th>
            <th>Last Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        {false || props.assets ? (
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
            <Loader />
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
    onDeleteAsset: (id, token) => dispatch(actions.deleteAsset(id, token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Asset);
