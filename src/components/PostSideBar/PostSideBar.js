import React, { useEffect } from "react";
import "./PostSideBar.css";
import PostSideBarItem from "./PostSideBarItems/PostSideBarItems";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const PostSideBar = (props) => {
  const { onFetchPost, onFetchCategory, mode } = props;
  useEffect(() => {
    switch (mode) {
      case "ReligiousNames": {
        onFetchPost({ category: "6", limit: 9 });
        break;
      }
      case "creatures": {
        onFetchPost({ category: "1" });
        onFetchPost({ category: "2" });
        break;
      }
      case "ScientificReports": {
        onFetchPost({ category: "8", limit: 9 });
        break;
      }
      case "category": {
        onFetchCategory();
        break;
      }
      default:
        return;
    }
  }, [onFetchPost, mode, onFetchCategory]);

  let content = null;
  if (mode === "creatures" && props.all_species && props.all_events) {
    content = (
      <div>
        <PostSideBarItem
          title="THÔNG TIN MỚI"
          posts={props.all_species}
          image={props.image}
          mode={mode}
          showMore
        />
        <PostSideBarItem
          title="TỰ NHIÊN BÍ ẨN"
          posts={props.all_events}
          image={props.image}
          mode={mode}
          showMore
        />
      </div>
    );
  } else if (mode === "ReligiousNames" && props.posts) {
    content = (
      <div>
        <PostSideBarItem
          linkPath="/danh-phap"
          title="Danh Pháp"
          posts={props.posts}
          image={props.image}
          mode={mode}
        />
        {/* <PostSideBarItem title="Cách viết báo cáo khoa học" posts={props.scientificReports} image={props.image} /> */}
      </div>
    );
  } else if (mode === "ScientificReports" && props.posts) {
    content = (
      <div>
        <PostSideBarItem
          linkPath="/cach-viet-bao-cao-khoa-hoc"
          title="Cách viết báo cáo khoa học"
          posts={props.posts}
          image={props.image}
          mode={mode}
        />
      </div>
    );
  } else if (mode === "category" && props.category) {
    content = <div>
      <PostSideBarItem title="Loại bài viết" posts={props.category} image={props.image} mode={mode} />
    </div>
  }
  return <div className="post">{content}</div>
};

const mapStateToProps = (state) => {
  return {
    all_species: state.posts.all_species,
    all_events: state.posts.all_events,
    religiousNames: state.posts.religiousNames,
    scientificReports: state.posts.scientificReports,
    category: state.category.category,
    posts: state.posts.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPost: (payload) => {
      dispatch(actions.fetchPost(payload));
    },
    onFetchCategory: () => {
      dispatch(actions.fetchCategory());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostSideBar);
