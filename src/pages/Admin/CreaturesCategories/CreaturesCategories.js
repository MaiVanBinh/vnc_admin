import React, { useEffect, useState } from "react";
import TableAdmin from "../../../components/UI/TableAdmin/TableAdmin";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from '../../../store/actions/index';
import Species from './Species/Species';
import Orders from './Orders/Orders';
import Groups from "./Groups/Groups";
import Families from "./Families/Families";

const CreaturesCategories = (props) => {

  // const [labelTables, setLableTable] = useState(['species', 'groups', 'orders', 'families']);
  useEffect(() => {
    props.onFetchFilterData();
  }, [props.onFetchFilterData])
  let mainContent = null;
  switch(props.type) {
    case 'species': 
      mainContent = <Species sideBarHanlder={props.sideBarHanlder}/>;
      break;
    case 'orders':
      mainContent = <Orders sideBarHanlder={props.sideBarHanlder}/>;
      break;
    case 'groups':
      mainContent = <Groups sideBarHanlder={props.sideBarHanlder}/>
      break;
    case 'families':
      mainContent = <Families sideBarHanlder={props.sideBarHanlder}/>
      break;
    default: break;
  }
  
  return (
    <div>
      {!props.token ? (
        <Redirect to="/" />
      ) : (
        // <div className="categories-list-tables">
        //   {labelTables.map(item => (
        //     <TableAdmin label={item} key={item} />
        //   ))}
        // </div>
        mainContent
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
