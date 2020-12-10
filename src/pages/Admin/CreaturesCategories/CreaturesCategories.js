import React, { useEffect, useState } from "react";
import TableAdmin from "../../../components/UI/TableAdmin/TableAdmin";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from '../../../store/actions/index';

const CreaturesCategories = (props) => {
  const [labelTables, setLableTable] = useState(['species', 'groups', 'orders', 'families']);
  useEffect(() => {
    props.onFetchFilterData();
  }, [props.onFetchFilterData])
  return (
    <div>
      {!props.token ? (
        <Redirect to="/" />
      ) : (
        <div className="categories-list-tables">
          {labelTables.map(item => (
            <TableAdmin label={item} key={item} />
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchFilterData: () => dispatch(actions.fetchFilterData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreaturesCategories);
