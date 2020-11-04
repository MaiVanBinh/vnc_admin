import React from "react";

const Input = (props) => {
  return (
    <div className="info-box column">
      <h3 className="lable">{props.label}</h3>
      {props.isEditing && props.type === "text" ? (
        <input
          value={props.value}
          name={props.name}
          onChange={props.onChangeHandler}
          className="info-value"
        />
      ) : props.isEditing && props.type === "selected" ? (
        <select className="info-value">
          {props.option ? props.option.map((o) => (
            <option
              value={o.id}
              key={o.id}
              selected={o.name_vn === props.value}
            >
              {o.name_vn}
            </option>
          )) : null}
        </select>
      ) : (
        <span className="info-value">{props.value}</span>
      )}
    </div>
  );
};

export default Input;
