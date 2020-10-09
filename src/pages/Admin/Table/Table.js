import React from "react";
import "./Table.css";
import Filter from "./Filter/Filter";
import { CREATURES } from "../../../models/creatures";
import { connect } from "react-redux";

const Table = (props) => {
  let tabelBody = null;
  if (props.creatures) {
    console.log(props.creatures)
    tabelBody = props.creatures.map((c) => (
      <tr key={c.id}>
        <td>{c.id}</td>
        <td>{c.name_vn}</td>
        <td>{c.name_latin}</td>
        <td>{c.species_vn}</td>
        <td>{c.group_vn}</td>
        <td>{c.order_vn}</td>
        <td>{c.family_vn}</td>
        <td>{c.name}</td>
        <td>{c.created_at.toString()}</td>
        <td>{c.created_by}</td>
      </tr>
    ));
  }
  return (
    <div className="admin-table">
      {/* <Filter /> */}
      <table id="customers">
        <thead>
          <tr>
            {CREATURES.map((c) => (
              <th key={c.attributeName}>{c.attributeNameVn}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tabelBody}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    creatures: state.creatures.creatures,
  };
};

export default connect(mapStateToProps)(Table);
