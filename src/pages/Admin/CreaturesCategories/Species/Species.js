import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "./../../../../store/utilities/apiConfig";
import * as actionTypes from "./../../../../store/actions/actionTypes";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    species: state.species,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (payload) =>
      dispatch({
        type: actionTypes.SET_LOADER,
        payload,
      }),
    setListSpecies: (payload) =>
      dispatch({
        type: actionTypes.SET_LIST_SPECIES,
        payload,
      }),
  };
};

const Species = (props) => {
  const { species, setListSpecies, setLoader } = props;

  useEffect(() => {
    setLoader(true);
    axios({
      method: "get",
      url: baseUrl + "species",
    }).then((res) => {
      setListSpecies(res.data.data);
      setLoader(false);
    });
  }, [setListSpecies, setLoader]);

  return (
    <div className="container-fluid pt-3 pb-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên tiếng việt</th>
            <th>Tên tiếng anh</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody className="list-images">
          {species && species.length > 0 ? (
            species.map((e, i) => {
              let beginIndex = 1;
              return (
                <tr key={i}>
                  <td>{beginIndex + i}</td>
                  <td>{e.name_vn}</td>
                  <td>{e.name_en}</td>
                  <td>{e.created_at}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>
                <p className="text-center mb-0">
                  Không có kết quả nào được tìm thấy
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Species);
