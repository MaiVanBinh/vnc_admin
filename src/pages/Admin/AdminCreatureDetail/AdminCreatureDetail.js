import React, { useEffect, useState } from "react";
import "./AdminCreatureDetail.css";
import { useRouteMatch, Redirect } from "react-router-dom";
import {
  fetchCreatureById,
  fetchFilterData,
  fetchAuthors,
  editCreatureStart,
} from "../../../store/actions/index";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import Loading from "../../../components/UI/Loader/Loader";
import { Editor } from "@tinymce/tinymce-react";

const AdminCreatureDetail = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editInfo, setEditInfo] = useState();
  const [images, setImages] = useState();

  const match = useRouteMatch();
  const {
    creature,
    onFetchCreature,
    onFetchEditData,
    filterData,
    onFetchAuthor,
    author,
    onEditCreatureSubmit,
    token,
  } = props;

  useEffect(() => {
    onFetchCreature(match.params.id);
  }, [match.params.id, onFetchCreature]);

  useEffect(() => {
    if (isEditing === true) {
      onFetchEditData();
      onFetchAuthor();
    }
  }, [isEditing]);

  // init form input value
  const setEditModeHandler = () => {
    setIsEditing((isEditing) => !isEditing);
    const editInfoUpdate = {
      id: creature.id,
      name_vn: creature.name_vn,
      name_latin: creature.name_latin,
      species: creature.species,
      family: creature.family,
      order: creature.order,
      group: creature.group,
      description: creature.description,
      avatar: creature.avatar,
      author: creature.author,
      redbook_level: creature.redbook_level,
      images: {
        deleted: [],
        add: [],
      },
    };
    setEditInfo({ ...editInfoUpdate });
  };

  // Handler dexcription change value
  const onDescriptionChangeHandler = (content) => {
    const editInfoUpdate = {
      ...editInfo,
      description: content,
    };
    setEditInfo({ ...editInfoUpdate });
  };

  // submit edit form
  const onSaveEditHandler = () => {
    setIsEditing(false);
    const formData = new FormData();
    for(let i = 0; i < editInfo.images.add.length; i++) {
      formData.append(`image${i}`, editInfo.images.add[i]);
    }
    formData.append('numberImage', editInfo.images.add.length);
    formData.append('id', editInfo.id);
    formData.append('name_vn', editInfo.name_vn);
    formData.append('name_latin', editInfo.name_latin);
    formData.append('species', editInfo.species);
    formData.append('family', editInfo.family);
    formData.append('order', editInfo.order);
    formData.append('group', editInfo.group);
    formData.append('description', editInfo.description);
    formData.append('avatar', editInfo.avatar);
    formData.append('author', editInfo.author);
    formData.append('redbook_level', editInfo.redbook_level);
    formData.append('imagesDeleted', editInfo.images.deleted);
    onEditCreatureSubmit(editInfo.id, formData, token);
  };

  const onChangeInfoHandler = (event) => {
    let editInfoUpdate = JSON.parse(JSON.stringify(editInfo));
    const name = event.target.name;
    if (name === "images") {
      const files = event.target.files;
      const updateImage = [...images.filter(img => /^image/.test(img.id) === false)];
      editInfoUpdate.images.add = files;
      for (let i = 0; i < files.length; i++) {
        updateImage.push({
          id: "image" + files[i]["name"],
          url: URL.createObjectURL(files[i]),
        });

      }
      setImages(updateImage);
    } else {
      const value = event.target.value;
      editInfoUpdate = {
        ...editInfo,
        [name]: value,
      };
    }
    setEditInfo({ ...editInfoUpdate });
  };

  const deleteImagesHandler = (imageId) => {
    const updateImage = [...editInfo.images.deleted];
    updateImage.push(imageId);
    const editInfoUpdate = {
      ...editInfo,
      images: {
        ...editInfo.images,
        deleted: updateImage,
      },
    };
    const imagesUpdate = images.filter((image) => image.id !== imageId);
    setImages([...imagesUpdate]);
    setEditInfo({ ...editInfoUpdate });
  };

  useEffect(() => {
    if (!isEditing && creature) {
      const images = [...creature.images];
      setImages(images);
    }
  }, [creature, isEditing]);

  let content = <Loading />;
  if (creature) {
    content = (
      <div className="admin-creture-detail">
        {token ? null : <Redirect to="/" />}
        <div className="header-box">
          <h1>Thông tin sinh vật</h1>
          {isEditing ? (
            <Button
              icon="fas fa-save"
              mode="save"
              title="Lưu"
              onClickHandler={onSaveEditHandler}
            />
          ) : null}
          {isEditing ? (
            <Button
              icon="fas fa-window-close"
              mode="cancel"
              title="Hủy"
              onClickHandler={setEditModeHandler}
            />
          ) : null}
          {!isEditing ? (
            <Button
              icon="far fa-edit"
              mode="edit"
              title="Sửa"
              onClickHandler={setEditModeHandler}
            />
          ) : null}
          {!isEditing ? (
            <Button icon="far fa-trash-alt" mode="delete" title="Xóa" />
          ) : null}
        </div>

        <div className="admin-creture-view">
          {/* {inputContent} */}
          <div className="info-box column">
            <h3 className="lable">1. Tên Việt Nam:</h3>
            {isEditing ? (
              <input
                type="text"
                value={editInfo.name_vn}
                name="name_vn"
                onChange={onChangeInfoHandler}
                className="info-value"
              />
            ) : (
              <span className="info-value">{creature.name_vn}</span>
            )}
          </div>
          <div className="info-box column">
            <h3 className="lable">2. Tên Latin:</h3>
            {isEditing ? (
              <input
                value={editInfo.name_latin}
                name="name_latin"
                onChange={onChangeInfoHandler}
                className="info-value"
              />
            ) : (
              <span className="info-value">{creature.name_latin}</span>
            )}
          </div>
          <div className="info-box column">
            <h3 className="lable">3. Họ:</h3>
            {isEditing && filterData ? (
              <select
                className="info-value"
                onChange={onChangeInfoHandler}
                name="family"
                defaultValue={creature.family}
              >
                {filterData.families.map((f) => (
                  <option value={f.id} key={f.id}>
                    {f.name_vn}
                  </option>
                ))}
              </select>
            ) : (
              <span className="info-value">{creature.family_vn}</span>
            )}
          </div>
          <div className="info-box column">
            <h3 className="lable">4. Bộ:</h3>
            {isEditing && filterData ? (
              <select
                className="info-value"
                defaultValue={creature.order}
                name="order"
                onChange={onChangeInfoHandler}
              >
                {filterData.orders.map((o) => (
                  <option value={o.id} key={o.id}>
                    {o.name_vn}
                  </option>
                ))}
              </select>
            ) : (
              <span className="info-value">{creature.order_vn}</span>
            )}
          </div>
          <div className="info-box column">
            <h3 className="lable">5. Lớp (nhóm):</h3>
            {isEditing && filterData ? (
              <select
                className="info-value"
                defaultValue={creature.group}
                name="group"
                onChange={onChangeInfoHandler}
              >
                {filterData.groups.map((g) => (
                  <option value={g.id} key={g.id}>
                    {g.name_vn}
                  </option>
                ))}
              </select>
            ) : (
              <span className="info-value">{creature.group_vn}</span>
            )}
          </div>
          <div className="info-box column">
            <h3 className="lable">6. Loài:</h3>
            {isEditing && filterData ? (
              <select
                className="info-value"
                defaultValue={creature.species}
                name="species"
                onChange={onChangeInfoHandler}
              >
                {filterData.species.map((s) => (
                  <option value={s.id} key={s.id}>
                    {s.name_vn}
                  </option>
                ))}
              </select>
            ) : (
              <span className="info-value">{creature.species_vn}</span>
            )}
            {/* <span className="info-value">{creature.species}</span> */}
          </div>
          <div className="info-box column">
            <h3 className="lable">7. Cấp độ sách đỏ:</h3>
            {isEditing ? (
              <input
                value={editInfo.redbook_level ? editInfo.redbook_level : ""}
                name="redbook_level"
                onChange={onChangeInfoHandler}
                className="info-value"
              />
            ) : (
              <span className="info-value">
                {creature.redbook_level ? creature.redbook_level : "Không có"}
              </span>
            )}
          </div>
          <div className="info-box column">
            F<h3 className="lable">8. Tác giả:</h3>
            {isEditing && author ? (
              <select
                className="info-value"
                defaultValue={creature.author}
                name="author"
                onChange={onChangeInfoHandler}
              >
                {author.map((a) => (
                  <option value={a.id} key={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="info-value">{creature.author_name}</span>
            )}
            {/* <span className="info-value">{creature.author}</span> */}
          </div>
          <div className="info-box column">
            <h3 className="lable">9. Người tạo:</h3>
            {isEditing ? (
              <input
                value={creature.created_by}
                name="created_by"
                onChange={() => {}}
                className="info-value"
                disabled
              />
            ) : (
              <span className="info-value">{creature.created_by}</span>
            )}
          </div>
          <div className="info-box column">
            <h3 className="lable">10. Ngày tạo:</h3>
            {isEditing ? (
              <input
                value={creature.created_at.split(" ")[0]}
                name="created_at"
                onChange={() => {}}
                className="info-value"
                type="date"
                disabled
              />
            ) : (
              <span className="info-value">{creature.created_at}</span>
            )}
          </div>
          <div className="info-box column">
            <h3 className="lable">11. Người sửa:</h3>
            {isEditing ? (
              <input
                value={creature.updated_by}
                name="updated_by"
                onChange={() => {}}
                className="info-value"
                disabled
              />
            ) : (
              <span className="info-value">{creature.updated_by}</span>
            )}
          </div>
          <div className="info-box column">
            <h3 className="lable">12. Ngày sửa:</h3>
            {isEditing ? (
              <input
                value={creature.updated_at.split(" ")[0]}
                name="updated_at"
                onChange={() => {}}
                className="info-value"
                type="date"
                disabled
              />
            ) : (
              <span className="info-value">{creature.updated_at}</span>
            )}
          </div>
          <div className="info-box large">
            <h3 className="lable">13. Danh sách hình ảnh:</h3>
            {isEditing ? (
              <input
                type="file"
                id="file"
                multiple
                name="images"
                onChange={onChangeInfoHandler}
              />
            ) : null}
            <div>
              {images
                ? images.map((i) => (
                    <div className="gallery" key={i.id}>
                      <a target="_blank" rel="noopener noreferrer" href={i.url}>
                        <img src={i.url} alt={i.url} />
                      </a>
                      <div className="desc">
                        {isEditing ? (
                          <button
                            className="desc"
                            onClick={() => deleteImagesHandler(i.id)}
                          >
                            Delete
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="info-box large">
            <h3 className="lable">12. Đặc tả:</h3>
            {isEditing ? (
              <Editor
                onEditorChange={onDescriptionChangeHandler}
                apiKey="0dvov6kfqu61g0tppobt4fn6281shc7645qvg5gvtg48wuw2"
                initialValue={creature.description.replaceAll("<br />", "")}
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
            ) : (
              <div
                style={{ width: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: creature.description.replaceAll("<br />", ""),
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  return content;
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
    onEditCreatureSubmit: (id, payload, token) =>
      dispatch(editCreatureStart(id, payload, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCreatureDetail);
