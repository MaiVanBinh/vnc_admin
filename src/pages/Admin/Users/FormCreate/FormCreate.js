import React, { useState } from "react";
import "./FormCreate.css";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import Loading from "../../../../components/UI/Loader/Loader";

const FormCreate = (props) => {
  const [formInput, setFormInput] = useState({
    username: {
      label: "User name",
      type: "text",
      min: 3,
      touch: false,
      invalid: false,
      value: "",
      errorMessage: "User name must have > 3 characters"
    },
    email: {
      label: "Email",
      type: "text",
      min: 5,
      touch: false,
      invalid: false,
      value: "",
      errorMessage: "Email is invalid"
    },
    password: {
      label: "Password",
      type: "password",
      min: 5,
      touch: false,
      invalid: false,
      value: "",
      errorMessage: "Password must have > 8 characters"
    },
    re_password: {
      label: "Retype Password",
      type: "password",
      min: 5,
      touch: false,
      invalid: false,
      value: "",
      errorMessage: "Password is not same"
    },
  });

  const checkEmailValid = value => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test( value );
  }

  const checkTextLength = (text, minLength) => {
    return text.length >= minLength;
  }

  const checkOnlyCharacter = value => {
    const pattern = /^[0-9a-zA-Z]{8,}$/;
    return pattern.test(value);
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if(!formInput.email.invalid && !formInput.password.invalid && !formInput.username.invalid && !formInput.re_password.invalid) {
      const payload = {
        username: formInput.username.value,
        email: formInput.email.value,
        password: formInput.password.value,
      }
      props.onCreateUser(payload);
    }
  };

  const onChangeInput = (event) => {
    const updateValue = {
      ...formInput[event.target.name],
      value: event.target.value
    };
    let checkInvalid = false;
    if(event.target.name === 'username') {
      checkInvalid = checkTextLength(event.target.value, updateValue.min);
    }

    if(event.target.name === 'email') {
      checkInvalid = checkEmailValid(event.target.value);
    } 

    if(event.target.name === 'password') {
      checkInvalid = checkOnlyCharacter(event.target.value);
    } 

    if(event.target.name === 're_password') {
      checkInvalid = formInput['password'].value === event.target.value;
    }

    updateValue.invalid = !checkInvalid;
    const formInputUpdate = {...formInput, [event.target.name]: updateValue};
    setFormInput(formInputUpdate);
  };

  let formInputContent = [];
  // useEffect(() => {

  // }, [props.type, props.isEditing, props.itemEdit]);
  for (const key in formInput) {
    formInputContent.push(
      <div className="row">
        <div className="col-25">
          <label htmlFor={key}>{formInput[key].label}</label>
        </div>
        <div className="col-75">
          <input
          autoComplete="off"
            type={formInput[key].type}
            id={key}
            name={key}
            value={formInput[key].value}
            onChange={onChangeInput}
          />
          {formInput[key].invalid ? <p>{formInput[key].errorMessage}</p> : null}
        </div>
      </div>
    );
  }

  const closeFormHandler = () => {
    props.click();
  };

  return (
    <div className="tabelFormCreate">
      <i
        className="fas fa-times"
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          cursor: "pointer",
        }}
        onClick={closeFormHandler}
      ></i>
      <form onSubmit={onSubmitHandler} autocomplete="off" autoComplete>
        <p className="tableCaptain">
          {props.isEditing ? "Edit " : "Create "} Admin
        </p>
        {props.submitSuccess ? (
          <p style={{ textAlign: "center" }}>
            {props.isEditing ? "Sửa" : "Tạo"} thành công
          </p>
        ) : (
          formInputContent
        )}
        {props.submitSuccess ? null : (
          <div className="row">
            <input type="submit" value="Submit" />
          </div>
        )}
      </form>
    </div>
  );
};
const mapStateToprops = (state) => {
  return {
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCreateUser: (payload, token) => dispatch(actions.createUser(payload, token))
  }
};
export default connect(mapStateToprops, mapDispatchToProps)(FormCreate);
