import React, { useState } from "react";
import "./SearchLatin.css";
import { connect } from "react-redux";
import { searchLatinDic } from "../../../store/actions/index";
import Modal from "../../UI/Modal/Modal";

const SearchLatin = (props) => {
  const [isSearch, setIsSearch] = useState(false);
  const [latin, setLatin] = useState("");

  const onSearchHandler = () => {
    setIsSearch(true);
    props.onSearchLatinDic(latin);
  };

  const onCloseSearchHandler = () => {
    setIsSearch(false);
  };

  const onChangeLatin = (event) => {
    setLatin(event.target.value);
  };

  let searchResult = null;
  if (isSearch && props.error) {
    searchResult = <p style={{marginTop: '20px'}}>Không tìm thấy kết quả nào</p>
  }
  if (isSearch && props.searchResult) {
    searchResult = (
      <div class="latin-result">
        <table>
          <tbody>
            <tr>
              <td>
                <b>Latin:</b>
              </td>
    <td>{props.searchResult.latin}</td>
            </tr>
            <tr>
              <td>
                <b>Việt:</b>
              </td>
              <td>{props.searchResult.viet}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  let searchBar = (
    <div className="latin-box">
      <div
        className="search-box"
        style={{ border: "1px solid black", padding: "15px" }}
      >
        <input
          className="search-txt"
          type="text"
          placeholder="Từ điển Latin-việt"
          name="keyWord"
          spellCheck="false"
          value={latin}
          onChange={onChangeLatin}
        />
        <button className="search-btn" onClick={onSearchHandler}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      {searchResult}
    </div>
  );
  let content = searchBar;
  if (isSearch) {
    content = (
      <Modal BackdropClicked={onCloseSearchHandler} show>
        {searchBar}
      </Modal>
    );
  }

  return content;
};

const mapStateToProps = (state) => {
  return {
    loading: state.latinDic.loading,
    error: state.latinDic.error,
    searchResult: state.latinDic.searchResult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchLatinDic: (latin) => dispatch(searchLatinDic(latin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchLatin);
