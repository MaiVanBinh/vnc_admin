// import React, { useEffect, useState } from "react";
// import "./FormCreate.css";
// import { connect } from "react-redux";
// import * as actions from "../../../../store/actions/index";
// // import Loading from "../../Loader/Loader";

// const titleForm = {
//   species: "Loài",
//   groups: "Lớp",
//   orders: "Bộ",
//   families: "Họ",
// };

// const formInput = {
//   species: [
//     {
//       label: "Tên tiếng Việt",
//       name: "name_vn",
//       type: "input",
//       min: 1,
//       touch: false,
//       valid: false,
//       value: "",
//     },
//     {
//       label: "Tên tiếng Anh",
//       name: "name_en",
//       type: "input",
//       min: 1,
//       touch: false,
//       valid: false,
//       value: "",
//     },
//   ],
//   groups: [
//     {
//       label: "Tên tiếng Việt",
//       name: "name_vn",
//       type: "input",
//       min: 1,
//       touch: false,
//       valid: false,
//       value: "",
//     },
//     {
//       label: "Tên Latin",
//       name: "name_latin",
//       type: "input",
//       min: 1,
//       touch: false,
//       valid: false,
//       value: "",
//     },
//     {
//       label: "Loài",
//       name: "species",
//       type: "select",
//       touch: false,
//       valid: false,
//       value: 1,
//     },
//   ],
//   orders: [
//     {
//       label: "Tên tiếng Việt",
//       name: "name_vn",
//       type: "input",
//       min: 1,
//       touch: false,
//       valid: false,
//       value: "",
//     },
//     {
//       label: "Tên tiếng Anh",
//       name: "name_latin",
//       type: "input",
//       min: 1,
//       touch: false,
//       valid: false,
//       value: "",
//     },
//     {
//       label: "Lớp",
//       name: "group",
//       type: "select",
//       touch: false,
//       valid: false,
//       value: 1,
//     },
//   ],
//   families: [
//     {
//       label: "Tên tiếng Việt",
//       name: "name_vn",
//       type: "input",
//       min: 1,
//       touch: false,
//       valid: false,
//       value: "",
//     },
//     {
//       label: "Tên Latin",
//       name: "name_latin",
//       type: "input",
//       min: 1,
//       touch: false,
//       valid: false,
//       value: "",
//     },
//     {
//       label: "Bộ",
//       name: "order",
//       type: "select",
//       touch: false,
//       valid: false,
//       value: 1,
//     },
//   ],
// };

// const FormCreate = (props) => {
//   const [formInputCurrent, setFormInputCurrent] = useState(null);
//   const [formOption, setFormOption] = useState(null);
//   const onSubmitHandler = (event) => {
//     event.preventDefault();
//     switch (props.type) {
//       case "species": {
//         if (!props.isEditing) {
//           props.onCreateSpecies(
//             formInputCurrent[0].value,
//             formInputCurrent[1].value,
//             props.token
//           );
//         } else {
//           props.onUpdateSpecies(
//             props.itemEdit.id,
//             formInputCurrent[0].value,
//             formInputCurrent[1].value,
//             props.token
//           );
//         }
//         break;
//       }
//       case "groups": {
//         if (!props.isEditing) {
//           props.onCreateGroup(
//             formInputCurrent[0].value,
//             formInputCurrent[1].value,
//             formInputCurrent[2].value,
//             props.token
//           );
//         } else {
//           props.onUpdateGroup(
//             props.itemEdit.id,
//             formInputCurrent[0].value,
//             formInputCurrent[1].value,
//             formInputCurrent[2].value,
//             props.token
//           );
//         }
//         break;
//       }
//       case "orders": {
//         if (!props.isEditing) {
//           props.onCreateOrder(
//             formInputCurrent[0].value,
//             formInputCurrent[1].value,
//             formInputCurrent[2].value,
//             props.token
//           );
//         } else {
//           props.onUpdateOrder(
//             props.itemEdit.id,
//             formInputCurrent[0].value,
//             formInputCurrent[1].value,
//             formInputCurrent[2].value,
//             props.token
//           );
//         }
//         break;
//       }
//       case "families": {
//         if (!props.isEditing) {
//           props.onCreateFamily(
//             formInputCurrent[0].value,
//             formInputCurrent[1].value,
//             formInputCurrent[2].value,
//             props.token
//           );
//         } else {
//           props.onUpdateFamily(
//             props.itemEdit.id,
//             formInputCurrent[0].value,
//             formInputCurrent[1].value,
//             formInputCurrent[2].value,
//             props.token
//           );
//         }
//         break;
//       }
//       default:
//         break;
//     }
//   };

//   const onChangeInput = (event) => {
//     const { name, value } = event.target;
//     const formInputUpdate = [...formInputCurrent];
//     if (name === "name_vn") {
//       formInputUpdate[0].value = value;
//     } else if (name === "name_en" || name === "name_latin") {
//       formInputUpdate[1].value = value;
//     } else {
//       formInputUpdate[2].value = value;
//     }
//     setFormInputCurrent(formInputUpdate);
//   };

//   let formInputContent;
//   useEffect(() => {
//     if (props.type && formInput[props.type]) {
//       const formInputUpdate = JSON.parse(
//         JSON.stringify([...formInput[props.type]])
//       );
//       if (props.isEditing) {
//         formInputUpdate[0].value = props.itemEdit.name_vn;
//         if (props.type === "species") {
//           formInputUpdate[1].value = props.itemEdit.name_en;
//         } else if (props.type === "groups") {
//           formInputUpdate[1].value = props.itemEdit.name_latin;
//           formInputUpdate[2].value = props.itemEdit.species;
//         } else if (props.type === "orders") {
//           formInputUpdate[1].value = props.itemEdit.name_latin;
//           formInputUpdate[2].value = props.itemEdit.group;
//         } else if (props.type === "families") {
//           formInputUpdate[1].value = props.itemEdit.name_latin;
//           formInputUpdate[2].value = props.itemEdit.order;
//         }
//       }
//       console.log(props.itemEdit);
//       if (props.type === "groups") {
//         setFormOption(props.filterData["species"]);
//       } else if (props.type === "orders") {
//         setFormOption(props.filterData["groups"]);
//       } else if (props.type === "families") {
//         setFormOption(props.filterData["families"]);
//       }
//       setFormInputCurrent(formInputUpdate);
//     }
//   }, [props.type, props.isEditing, props.itemEdit]);

//   if (formInputCurrent && props.type) {
//     formInputContent = formInputCurrent.map((item) => {
//       return (
//         <div className="row">
//           <div className="col-25">
//             <label for={item.name}>{item.label}</label>
//           </div>
//           <div className="col-75">
//             {item.type === "input" ? (
//               <input
//                 type="text"
//                 id={item.name}
//                 name={item.name}
//                 value={item.value}
//                 onChange={onChangeInput}
//                 // placeholder="Your last name.."
//               />
//             ) : (
//               <select
//                 id={props.type}
//                 name={props.type}
//                 value={item.value}
//                 onChange={onChangeInput}
//               >
//                 {formOption
//                   ? formOption.map((item) => (
//                       <option value={item.id}>{item.name_vn}</option>
//                     ))
//                   : null}
//               </select>
//             )}
//           </div>
//         </div>
//       );
//     });
//   }

//   const closeFormHandler = () => {
//     if (props.type === "species") {
//       props.onEndFormSpecies();
//     } else if (props.type === "groups") {
//       props.onEndFormGroups();
//     } else if (props.type === "orders") {
//       props.onEndFormOrders();
//     } else if(props.type === "families"){
//       props.onEndFormFamily();
//     }
//     props.click();
//   };
//   return (
//     <div classNameName="tabelFormCreate">
//       <i
//         className="fas fa-times"
//         style={{
//           position: "absolute",
//           top: "15px",
//           right: "15px",
//           cursor: "pointer",
//         }}
//         onClick={closeFormHandler}
//       ></i>
//       <form onSubmit={onSubmitHandler}>
//         <p classNameName="tableCaptain">
//           {props.isEditing ? "Sửa " : "Thêm Mới "} {titleForm[props.type]}
//         </p>
//         {props.submitSuccess ? (
//           <p style={{ textAlign: "center" }}>
//             {props.isEditing ? "Sửa" : "Tạo"} thành công
//           </p>
//         ) : (
//           formInputContent
//         )}
//         {props.submitSuccess ? null : (
//           <div className="row">
//             <input type="submit" value="Submit" />
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };
// const mapStateToprops = (state) => {
//   return {
//     token: state.auth.token,
//     filterData: state.creatures.filterData,
//     // loading: state.species.loading || state.groups.loading,
//     submitSuccess:
//       state.species.submitSuccess ||
//       state.groups.submitSuccess ||
//       state.orders.submitSuccess ||
//       state.families.submitSuccess,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onCreateSpecies: (name_vn, name_en, token) =>
//       dispatch(actions.createSpecies(name_vn, name_en, token)),
//     onEndFormSpecies: () => dispatch(actions.endFormSpecies()),
//     onEndFormGroups: () => dispatch(actions.endFormGroups()),
//     onEndFormOrders: () => dispatch(actions.endFormOrders()),
//     onEndFormFamily: () => dispatch(actions.endFormFamily()),
//     onUpdateSpecies: (id, name_vn, name_en, token) =>
//       dispatch(actions.updateSpecies(id, name_vn, name_en, token)),
//     onCreateGroup: (name_vn, name_latin, species, token) =>
//       dispatch(actions.createGroups(name_vn, name_latin, species, token)),
//     onUpdateGroup: (id, name_vn, name_latin, species, token) =>
//       dispatch(actions.updateGroup(id, name_vn, name_latin, species, token)),
//     onCreateOrder: (name_vn, name_latin, group, token) =>
//       dispatch(actions.createOrder(name_vn, name_latin, group, token)),
//     onUpdateOrder: (id, name_vn, name_latin, species, token) => {
//       dispatch(actions.updateOrder(id, name_vn, name_latin, species, token));
//     },
//     onCreateFamily: (id, name_vn, name_latin, order, token) =>
//       dispatch(actions.createFamily(id, name_vn, name_latin, order, token)),
//     onUpdateFamily:(id, name_vn, name_latin, order, token) => dispatch(actions.updateFamily(id, name_vn, name_latin, order, token))
//   };
// };
// export default connect(mapStateToprops, mapDispatchToProps)(FormCreate);
