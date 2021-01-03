import React, { useEffect, useCallback } from "react";
import "./RedBook.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import RedBookItem from "./RedBookItem/RedBookItem";

const RedBook = (props) => {
  const { onFetchCreaturesRedBook, redBook } = props;

  const fetchData = useCallback(() => {
    if (!redBook["1"]) {
      onFetchCreaturesRedBook(1, "species=1");
    }
    if (!redBook["2"]) {
      onFetchCreaturesRedBook(2, "species=2");
    }
    if (!redBook["3"]) {
      onFetchCreaturesRedBook(3, "species=3");
    }
  }, [onFetchCreaturesRedBook, redBook]);

  useEffect(() => {
    fetchData();
  }, [fetchData, props.species]);

  let mainContent = [];
  if (props.redBook["1"] && props.redBook["2"] && props.redBook["3"]) {
    for (const key in props.redBook) {
      mainContent.push([
        <RedBookItem
          title={
            key === "1"
              ? "Động vật sách đỏ"
              : key === "2"
              ? "Thực vật sách đỏ"
              : "Côn Trùng sách đỏ"
          }
          data={props.redBook[key]}
          mode={key}
        />,
      ]);
    }
  }
  // return <div classNameName="">{tables}</div>;
  return <div className="red-book-main">{mainContent}</div>;
};

const mapStateToProps = (state) => {
  return {
    redBook: state.creatures.redBook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCreaturesRedBook: (species, query) => {
      dispatch(actions.fetchCreatureRedBook(species, query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedBook);
