import React, { useEffect, useState } from "react";
import "./DeleteConfirm.css";
import Button from "../../../../components/UI/Button/Button";

const DeleteConfirm = (props) => {
  return (
    <div className="formDelete">
      <p style={{ color: "#3B568D", fontSize: "24px", fontWeight: "bold" }}>
        Creatures
      </p>
      <p>Name Vn: {props.deleteItem ? props.deleteItem.name_vn : null}</p>
      <p>Name Latin: {props.deleteItem ? props.deleteItem.name_latin : null}</p>

      <div>
        <Button
          icon="far fa-edit"
          mode="delete"
          title="Xóa"
          onClickHandler={props.deleteConfirmHandler}
        />
        <Button
          icon="far fa-trash-alt"
          mode="cancel"
          title="Hủy"
          onClickHandler={() => props.cancelDelete()}
        />
      </div>
    </div>
  );
};

export default DeleteConfirm;
