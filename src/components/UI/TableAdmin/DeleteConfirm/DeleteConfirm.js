import React, { useEffect, useState } from "react";
import "./DeleteConfirm.css";
import Button from "../../Button/Button";

const DeleteConfirm = (props) => {
  // const [deleteItem, setDeleteItem] = useState(null);

  // const [title, setTitle] = useState(null);
  // useEffect(() => {
  //     setDeleteItem(props.deleteItem);
  // }, [props.deteleItem]);
  let title = null;
  if (props.mode === "species") {
    title = "Loài";
  } else if (props.mode === "groups") {
    title = "Lớp";
  } else if (props.mode === "orders") {
    title = "Bộ";
  } else if (props.mode === "families") {
    title = "Họ";
  }
  const deleteConfirm = () => {
    if (props.mode === "species") {
      title = "Loài";
    } else if (props.mode === "groups") {
      title = "Lớp";
    } else if (props.mode === "orders") {
      title = "Bộ";
    } else if (props.mode === "families") {
      title = "Họ";
    }
  };
  return (
    <div className="formDelete">
      <p style={{ color: "#3B568D", fontSize: "24px", fontWeight: "bold" }}>
        {title}
      </p>
      <p>
        Tên tiếng Việt: {props.deleteItem ? props.deleteItem.name_vn : null}
      </p>
      {props.mode === "species" ? (
        <p>Tên English: {props.deleteItem ? props.deleteItem.name_en : null}</p>
      ) : (
        <p>
          Tên Latin: {props.deleteItem ? props.deleteItem.name_latin : null}
        </p>
      )}

      <div>
        <Button icon="far fa-edit" mode="delete" title="Xóa" onClickHandler={props.deleteConfirmHandler}/>
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
