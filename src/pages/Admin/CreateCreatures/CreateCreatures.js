import React, { useEffect, useState } from "react";
import "./CreateCreatures.css";
import { useRouteMatch, Redirect } from "react-router-dom";
import {
  fetchCreatureById,
  fetchFilterData,
  fetchAuthors,
  createCreature
} from "../../../store/actions/index";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import Loading from "../../../components/UI/Loader/Loader";
import { Editor } from "@tinymce/tinymce-react";

const CreateCreatures = (props) => {
  const [createData, setCreateData] = useState({
    name_vn: "",
    name_latin: "",
    species: "",
    family: "",
    order: "",
    group: "",
    description: "",
    avatar: "",
    author: "",
    redbook_level: "",
    images: {
      deleted: [],
      add: [],
    },
  });

  const [images, setImages] = useState([]);

  const {
    onFetchEditData,
    filterData,
    onFetchAuthor,
    author,
    onEditCreatureSubmit,
    token,
  } = props;

  useEffect(() => {
      
    if (filterData && author) {
        console.log(filterData.species[0].id);
      setCreateData({
        name_vn: "",
        name_latin: "",
        species: filterData.species[0].id,
        family: filterData.families[0].id,
        order: filterData.orders[0].id,
        group: filterData.groups[0].id,
        description: "",
        avatar: "",
        author: author[0].id,
        redbook_level: "",
        images: {
          deleted: [],
          add: [],
        },
      });
    }
  }, [filterData, author]);

  useEffect(() => {
    onFetchAuthor(); 
    onFetchEditData();
  }, []);

  // Handler dexcription change value
  const onDescriptionChangeHandler = (content) => {
    const createDataUpdate = {
      ...createData,
      description: content,
    };
    setCreateData({ ...createDataUpdate });
  };

  // submit edit form
  const onSaveEditHandler = () => {
    const formData = new FormData();
    for (let i = 0; i < createData.images.add.length; i++) {
      formData.append(`image${i}`, createData.images.add[i]);
    }
    formData.append("numberImage", createData.images.add.length);
    formData.append("id", createData.id);
    formData.append("name_vn", createData.name_vn);
    formData.append("name_latin", createData.name_latin);
    formData.append("species", createData.species);
    formData.append("family", createData.family);
    formData.append("order", createData.order);
    formData.append("group", createData.group);
    formData.append("description", createData.description);
    formData.append("avatar", createData.avatar);
    formData.append("author", createData.author);
    formData.append("redbook_level", createData.redbook_level);
    formData.append("imagesDeleted", createData.images.deleted);
    props.onCreateCreature(formData, token);
  };

  const onChangeInfoHandler = (event) => {
    let createDataUpdate = JSON.parse(JSON.stringify(createData));
    const name = event.target.name;
    if (name === "images") {
      const files = event.target.files;
      const updateImage = [
        ...images.filter((img) => /^image/.test(img.id) === false),
      ];
      createDataUpdate.images.add = files;
      for (let i = 0; i < files.length; i++) {
        updateImage.push({
          id: "image" + files[i]["name"],
          url: URL.createObjectURL(files[i]),
        });
      }
      setImages(updateImage);
    } else {
      const value = event.target.value;
      createDataUpdate = {
        ...createData,
        [name]: value,
      };
    }
    setCreateData({ ...createDataUpdate });
  };

  const deleteImagesHandler = (imageId) => {
    const updateImage = [...createData.images.deleted];
    updateImage.push(imageId);
    const createDataUpdate = {
      ...createData,
      images: {
        ...createData.images,
        deleted: updateImage,
      },
    };
    const imagesUpdate = images.filter((image) => image.id !== imageId);
    setImages([...imagesUpdate]);
    setCreateData({ ...createDataUpdate });
  };
  return (
    <div className="admin-creture-detail">
      {token ? null : <Redirect to="/" />}
      <div className="header-box">
        <h1>Thông tin sinh vật</h1>
        <Button
          icon="fas fa-save"
          mode="save"
          title="Lưu"
          onClickHandler={onSaveEditHandler}
        />
        <Button
          icon="fas fa-window-close"
          mode="cancel"
          title="Hủy"
          onClickHandler={() => {}}
        />
      </div>

      <div className="admin-creture-view">
        <div className="info-box column">
          <h3 className="lable">1. Tên Việt Nam:</h3>
          <input
            type="text"
            value={createData ? createData.name_vn : ""}
            name="name_vn"
            onChange={onChangeInfoHandler}
            className="info-value"
          />
        </div>
        <div className="info-box column">
          <h3 className="lable">2. Tên Latin:</h3>
          <input
            value={createData ? createData.name_latin : ""}
            name="name_latin"
            onChange={onChangeInfoHandler}
            className="info-value"
          />
        </div>
        <div className="info-box column">
          <h3 className="lable">3. Họ:</h3>
          <select
            className="info-value"
            onChange={onChangeInfoHandler}
            name="family"
            defaultValue={createData.family}
          >
            {filterData
              ? filterData.families.map((f) => (
                  <option value={f.id} key={f.id}>
                    {f.name_vn}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="info-box column">
          <h3 className="lable">4. Bộ:</h3>
          <select
            className="info-value"
            defaultValue={createData.order}
            name="order"
            onChange={onChangeInfoHandler}
          >
            {filterData
              ? filterData.orders.map((o) => (
                  <option value={o.id} key={o.id}>
                    {o.name_vn}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="info-box column">
          <h3 className="lable">5. Lớp (nhóm):</h3>
          <select
            className="info-value"
            defaultValue={createData.group}
            name="group"
            onChange={onChangeInfoHandler}
          >
            {filterData
              ? filterData.groups.map((g) => (
                  <option value={g.id} key={g.id}>
                    {g.name_vn}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="info-box column">
          <h3 className="lable">6. Loài:</h3>
          <select
            className="info-value"
            defaultValue={createData.species}
            name="species"
            onChange={onChangeInfoHandler}
          >
            {filterData
              ? filterData.species.map((s) => (
                  <option value={s.id} key={s.id}>
                    {s.name_vn}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="info-box column">
          <h3 className="lable">7. Cấp độ sách đỏ:</h3>
          <input
            value={createData.redbook_level ? createData.redbook_level : ""}
            name="redbook_level"
            onChange={onChangeInfoHandler}
            className="info-value"
          />
        </div>
        <div className="info-box column">
          <h3 className="lable">8. Tác giả:</h3>
          <select
            className="info-value"
            defaultValue={createData.author}
            name="author"
            onChange={onChangeInfoHandler}
          >
            {author
              ? author.map((a) => (
                  <option value={a.id} key={a.id}>
                    {a.name}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="info-box large">
          <h3 className="lable">13. Danh sách hình ảnh:</h3>
          <input
            type="file"
            id="file"
            multiple
            name="images"
            onChange={onChangeInfoHandler}
          />
          <div>
            {images
              ? images.map((i) => (
                  <div className="gallery" key={i.id}>
                    <a target="_blank" rel="noopener noreferrer" href={i.url}>
                      <img src={i.url} alt={i.url} />
                    </a>
                    <div className="desc">
                      <button
                        className="desc"
                        onClick={() => deleteImagesHandler(i.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="info-box large">
          <h3 className="lable">12. Đặc tả:</h3>
          <Editor
            onEditorChange={onDescriptionChangeHandler}
            apiKey="0dvov6kfqu61g0tppobt4fn6281shc7645qvg5gvtg48wuw2"
            initialValue={createData.description}
            init={{
              height: 800,
              width: "100%",
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar1:
                "undo redo | formatselect | bold italic backcolor | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | removeformat | help",
              toolbar2: "forecolor backcolor emoticons",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filterData: state.creatures.filterData,
    creature: state.creatures.creature,
    author: state.author.authors,
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCreature: (id) => dispatch(fetchCreatureById(id)),
    onFetchEditData: () => dispatch(fetchFilterData()),
    onFetchAuthor: () => dispatch(fetchAuthors(null, "all")),
    onCreateCreature: (payload, token) =>
      dispatch(createCreature(payload, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateCreatures);
