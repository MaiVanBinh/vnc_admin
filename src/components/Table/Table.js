import React from "react";
import "./Table.css";
import Heading from "../UI/HeadingTitle/HeadingTitle";
import {Link} from 'react-router-dom';

const table = (props) => {
  let title = '';
  switch(props.species) {
    case '1': {
      title = 'DANH LỤC ĐỘNG VẬT SÁCH ĐỎ VIỆT NAM';
      break;
    } 
    case '2': {
      title = 'DANH LỤC THỰC VẬT SÁCH ĐỎ VIỆT NAM';
      break;
    } 
    case '3': {
      title = 'DANH LỤC CÔN TRÙNG SÁCH ĐỎ VIỆT NAM';
      break;
    }
    default: break
  }
  return (
    <div className="redbook-table">
      <div>
        <Heading styleHeading="heading" title={title} filter/>
      </div>
      <table className="red-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Việt Nam</th>
            <th>Tên khoa học</th>
            <th>Tiêu chuẩn đánh giá</th>
          </tr>
        </thead>
        <tbody>
            {props.creatures.map((creature, index) => (
            <tr key={creature.id}>
                <td>{index + 1}</td>
                <td><Link to={"/sinh-vat/" + creature.id}>{creature.name_vn}</Link></td>
                <td><Link to={"/sinh-vat/" + creature.id}>{creature.name_latin}</Link></td>
                <td><Link to={"/bai-viet/283"}>{creature.redbook_level}</Link></td>
            </tr>
            ))}
        </tbody>
      </table>
      {props.showMore ? <p><Link to={{
        pathname: "/sinh-vat/sach-do",
        search: "?loai=" + props.species
      }}>Xem thêm<i className="fa fa-angle-right"></i></Link></p> : null}
    </div>
  );
};

export default table;
