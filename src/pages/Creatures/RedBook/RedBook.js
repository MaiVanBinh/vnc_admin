import React, { useEffect, useCallback } from "react";
import "./RedBook.css";
import { connect } from "react-redux";
import Table from "../../../components/Table/Table";
import * as actions from "../../../store/actions/index";

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

  let tables = [];
  if (props.redBook["1"] && props.redBook["2"] && props.redBook["3"]) {
    for (let key in props.redBook) {
      tables.push([
        <Table
          key={key}
          species={key}
          creatures={props.redBook[key]}
          showMore
        />,
      ]);
    }
  }
  return <div>{tables}</div>;
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
