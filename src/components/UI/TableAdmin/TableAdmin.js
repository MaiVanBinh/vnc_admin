// import React, { useEffect, useState } from "react";
// import "./TableAdmin.css";
// import Button from "../Button/Button";
// import { connect } from "react-redux";
// import * as actions from "../../../store/actions/index";
// import tableSetting from "./TableSetting";
// import tabelSetting from "./TableSetting";
// import Modal from "../Modal/Modal";
// import FormCreate from "./FormCreate/FormCreate";
// import DeleteConfirm from './DeleteConfirm/DeleteConfirm';
// import Loading from '../Loader/Loader';

// const TableAdmin = (props) => {
//   const {
//     label,
//     speciesData,
//     ordersData,
//     groupsData,
//     familiesData,
//     totalGroups,
//     totalOrders,
//     totalFamilies,
//   } = props;
//   const [total, setTotal] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entires, setEntires] = useState(10);
//   const changeEntiesPerTable = (event) => {
//     const value = event.target.value;
//     setEntires(value);
//   };

//   const [panigation, setPanigation] = useState({
//     pageMin: 1,
//     pageItem: 10,
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [typeForm, setTypeForm] = useState();
//   const [showDelete, setShowDelete] = useState(false);
//   const [deleteItem, setDeleteItem] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentEdit, setCurrentEdit] = useState(null);
//   const [filter, setFilter] = useState(null);
  
//   useEffect(() => {
//     switch (label) {
//       case "species": {
//         props.onFetchSpecies(entires, currentPage);
//         break;
//       }
//       case "groups": {
//         props.onFetchGroups(entires, currentPage);
//         break;
//       }
//       case "orders": {
//         props.onFetchOrders(entires, currentPage);
//         break;
//       }
//       case "families": {
//         props.onFetchFamilies(entires, currentPage);
//         break;
//       }
//       default:
//         break;
//     }
//   }, [currentPage, entires]);
  
//   useEffect(() => {
//     switch (label) {
//       case "groups":
//         setTotal(totalGroups);
//         break;
//       case "orders":
//         setTotal(totalOrders);
//         break;
//       case "families": {
//         setTotal(totalFamilies);
//         break;
//       }
//       default:
//         break;
//     }
//   }, [totalFamilies, totalOrders, totalGroups]);

//   const onPanigationHandler = (pageNumber) => {
//     const totalPage = Math.floor(total / entires) + 1;
//     const pageMax = panigation.pageMin + panigation.pageItem - 1;
//     let currentPageUpdate = pageNumber;
//     if (pageNumber === currentPage && pageNumber === 1) {
//     } else if (pageNumber === 1 && currentPage !== 1) {
//       setPanigation({
//         pageItem: 10,
//         pageMin: pageNumber,
//       });
//     } else if (pageNumber === pageMax && pageMax < totalPage) {
//       setPanigation({
//         pageItem: 10,
//         pageMin: pageNumber,
//       });
//     } else if (pageNumber === panigation.pageMin && pageNumber !== 1) {
//       let pageMin = pageNumber - 9;
//       if (pageNumber < 10) {
//         pageMin = 1;
//       }
//       setPanigation({
//         pageItem: 10,
//         pageMin: pageMin,
//       });
//     }
//     if (pageNumber === -1) {
//       let pageMin = 1;
//       if (totalPage > panigation.pageItem) {
//         pageMin = totalPage - 9;
//       }
//       currentPageUpdate = totalPage;
//       setPanigation({
//         pageItem: 10,
//         pageMin: pageMin,
//       });
//     }
//     setCurrentPage(currentPageUpdate);
//   };

//   const onShowFormHandler = (mode, isEditing, itemEdit) => {
//     setIsEditing(isEditing);
//     setTypeForm(mode);
//     setShowForm((prev) => !prev);
//     if(isEditing) {
//       setCurrentEdit(itemEdit);
//     }
//   };

//   const onDeleteHandler = (item) => {
//     setDeleteItem(item);
//   }

//   useEffect(() => { 
//     if(deleteItem) {
//       setShowDelete(true);
//     } else {
//       setShowDelete(false);
//     }
//   }, [deleteItem])

//   const cancelDelete = () => {
//     setDeleteItem(null);
//   }

//   const deleteConfirmHandler = () => {
//     switch(label) {
//       case 'species': {
//         props.onDeleteSpecies(deleteItem.id, props.token);
//         break;
//       }
//       case 'groups': {
//         props.onDeleteGroup(deleteItem.id, props.token);
//         break;
//       }
//       case 'orders': {
//         props.onDeleteOrder(deleteItem.id, props.token);
//         break;
//       }
//       case 'families': {
//         props.onDeleteFamily(deleteItem.id, props.token);
//       }
//       default: break;
//     }
//     setDeleteItem(null);
//   }

//   const onChangeFilter = event => {
//     const value = event.target.value;
//     const index = tableSetting[label]['objKey'].findIndex(item => item === value);
//     setFilter({
//       name: value,
//       value: null,
//       type: tableSetting[label]['dataType'][index],
//     });
//   }

//   const onChangeFilterValue = event => {
//     const name = event.target.name;
//     // if(name === 'dateTo')
//     const newFilter = {
//       name: filter.name,
//       value: event.target.value,
//       type: filter.type
//     }
//     setFilter(newFilter);
//   }

//   useEffect(() => {
//     if(filter && filter.value !== null) {
//       const queryString = filter.name + '=' + encodeURIComponent(filter.value);
//       switch (label) {
//         case "species": {
//           props.onFetchSpecies(entires, 1, queryString);
//           break;
//         }
//         case "groups": {
//           props.onFetchGroups(entires, 1, queryString);
//           break;
//         }
//         case "orders": {
//           props.onFetchOrders(entires, 1, queryString);
//           break;
//         }
//         case "families": {
//           props.onFetchFamilies(entires, 1, queryString);
//           break;
//         }
//         default:
//           break;
//       }
//     }
//     setCurrentPage(1);
//   }, [filter])
//   let tableContent = null;
//   let data = null;
//   switch (label) {
//     case "species": {
//       if (speciesData && speciesData.length > 0) {
//         data = speciesData;
//       }
//       break;
//     }
//     case "groups": {
//       if (groupsData && groupsData.length > 0 && totalGroups) {
//         data = groupsData;
//       }
//       break;
//     }
//     case "orders": {
//       if (ordersData && ordersData.length > 0 && totalOrders) {
//         data = ordersData;
//       }
//       break;
//     }
//     case "families": {
//       if (familiesData && familiesData.length > 0 && totalFamilies) {
//         data = familiesData;
//       }
//       break;
//     }
//     default:
//       break;
//   }
//   if (data) {
//     tableContent = data.map((item) => {
//       return (
//         <tr key={item.id}>
//           {tabelSetting[label].objKey.map((key) => {
//             let styles = {};
//             if (key === "description") {
//               styles = { maxWidth: "300px" };
//             }
//             return <td style={styles}>{item[key]}</td>;
//           })}
//           <td className="btnHandler">
//             <Button icon="far fa-edit" mode="edit" onClickHandler={() => onShowFormHandler(props.label, true, item)}/>
//             <Button icon="far fa-trash-alt" mode="delete" onClickHandler={() => onDeleteHandler(item)}/>
//           </td>
//         </tr>
//       );
//     });
//   }

//   let pageContent = [];
//   const totalPage = total / entires + 1;
//   for (
//     let i = panigation.pageMin;
//     i < panigation.pageMin + panigation.pageItem;
//     i++
//   ) {
//     if (i >= totalPage) {
//       break;
//     }
//     pageContent.push(
//       <li>
//         <a
//           onClick={() => onPanigationHandler(i)}
//           className={i === currentPage ? "active" : ""}
//         >
//           {i}
//         </a>
//       </li>
//     );
//   }
  
//   return (
//     <div className="boxTable">
//       <Modal show={showForm}>
//         {props.speciesLoading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//           <Loading />
//         </div> : <FormCreate click={onShowFormHandler} type={typeForm} isEditing={isEditing} itemEdit={currentEdit} /> }
//       </Modal>
//       <Modal show={showDelete}>
//         <DeleteConfirm deleteItem={deleteItem} mode={label} cancelDelete={cancelDelete} deleteConfirmHandler={deleteConfirmHandler}/>
//       </Modal>
//       <div className="tabelHeader">
//         <h1>{tabelSetting[label].title}</h1>
//         <div>
//           <Button
//             title="Tạo Mới"
//             mode="add"
//             icon="fas fa-plus"
//             onClickHandler={() => onShowFormHandler(props.label, false)}
//           />
//         </div>
//       </div>
//       {props.label !== "species" ? (
//         <div className="filterOpt">
//           <div>
//             <label for="entries">Show:</label>
//             <select name="entries" id="entries" onChange={changeEntiesPerTable}>
//               <option value="10">10</option>
//               <option value="30">30</option>
//               <option value="50">50</option>
//               <option value="100">100</option>
//             </select>
//           </div>
//           <div >
//             <select name="filter" onChange={onChangeFilter}>
//             <option value=""disabled selected>Chọn trường:</option>
//               {tableSetting[label].columnTitle.map((item, index) => (
//                 <option key={item} value={tableSetting[label].objKey[index]}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//             {filter ? <><span>:</span>
//             <input type={filter.type} onChange={onChangeFilterValue}/></> : null}
//             {!filter ? <h1>asd</h1> : (filter.name === 'created_at' || filter.name === 'updated_at') ? <input name="dateTo" type={filter.type} onChange={onChangeFilterValue}/> : null}
//           </div>
//         </div>
//       ) : null}
//       <table className="styled-table">
//         <thead>
//           <tr>
//             {tabelSetting[label].columnTitle.map((item) => (
//               <th key={item}>{item}</th>
//             ))}
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>{tableContent}</tbody>
//       </table>
//       {props.label !== "species" ? (
//         <div class="tablefooter">
//           <div>
//             <p>
//               Từ {(currentPage - 1) * entires + 1} tới{" "}
//               {currentPage * entires > total
//                 ? total
//                 : currentPage * entires}{" "}
//               / {total} kết quả
//             </p>
//           </div>
//           <div class="tableNavigation">
//             <ul>
//               <li>
//                 <a onClick={() => onPanigationHandler(1)}>
//                   <i class="fas fa-angle-double-left"></i>
//                 </a>
//               </li>
//               {pageContent}
//               <li>
//                 <a onClick={() => onPanigationHandler(-1)}>
//                   <i class="fas fa-angle-double-right"></i>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     speciesData: state.species.species,
//     groupsData: state.groups.groups,
//     totalGroups: state.groups.total,
//     ordersData: state.orders.orders,
//     totalOrders: state.orders.total,
//     familiesData: state.families.families,
//     totalFamilies: state.families.total,
//     token: state.auth.token,
//     speciesLoading: state.species.loading || state.groups.loading || state.orders.loading || state.families.loading
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onFetchSpecies: () => dispatch(actions.fetchSpecies()),
//     onFetchGroups: (entires, page, filter) =>
//       dispatch(actions.fetchGroups(entires, page, filter)),
//     onFetchOrders: (entires, page, filter) =>
//       dispatch(actions.fetchOrders(entires, page, filter)),
//     onFetchFamilies: (entires, page, filter) =>
//       dispatch(actions.fetchFamilies(entires, page, filter)),
//     onDeleteSpecies: (id, token)  =>
//       dispatch(actions.deleteSpecies(id, token)),
//     onDeleteGroup: (id, token) => dispatch(actions.deleteGroup(id, token)),
//     onDeleteOrder: (id, token) => dispatch(actions.deleteOrder(id, token)),
//     onDeleteFamily: (id, token) => dispatch(actions.deleteFamily(id, token))

//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(TableAdmin);
