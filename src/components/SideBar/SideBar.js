import React, { useEffect } from "react";
import "./SideBar.css";
import SideBarItem from "./SideBarItem/SideBarItem";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const PostSideBar = (props) => {
  const { onFetchPost, onFetchCategory, onFetchAuthor, mode } = props;

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
      case "author": {
        onFetchAuthor();
        break;
      }
      default:
        return;
    }
  }, [onFetchPost, mode, onFetchCategory, onFetchAuthor]);

  let content = null;
  if (mode === "creatures" && props.all_species && props.all_events) {
    content = (
      <div>
        <SideBarItem
          title="THÔNG TIN MỚI"
          posts={props.all_species}
          image={props.image}
          mode={mode}
          showMore
        />
        <SideBarItem
          title="TỰ NHIÊN BÍ ẨN"
          posts={props.all_events}
          image={props.image}
          mode={mode}
          showMore
        />
      </div>
    );
  } else if (mode === "ReligiousNames" && props.religiousNames) {
    content = (
      <div>
        <SideBarItem
          linkPath="/danh-phap"
          title="Danh Pháp"
          posts={props.religiousNames}
          image={props.image}
          mode={mode}
        />
        {/* <SideBarItem title="Cách viết báo cáo khoa học" posts={props.scientificReports} image={props.image} /> */}
      </div>
    );
  } else if (mode === "ScientificReports" && props.scientificReports) {
    content = (
      <div>
        <SideBarItem
          linkPath="/cach-viet-bao-cao-khoa-hoc"
          title="Cách viết báo cáo khoa học"
          posts={props.scientificReports}
          image={props.image}
          mode={mode}
        />
      </div>
    );
  } else if (mode === "category" && props.category) {
    content = <div>
      <SideBarItem title="Loại bài viết" posts={props.category.filter(item => parseInt(item.id) === 1 || parseInt(item.id) === 2)} image={props.image} mode={mode} />
    </div>
  } else if(mode === "nationalParks" && props.nationalParks) {
    const locations = [
      'Vùng trung du và miền núi phía Bắc',
      'Đồng bằng Bắc Bộ',
      'Bắc Trung Bộ',
      'Duyên hải Nam Trung Bộ',
      'Tây Nguyên',
      'Đông Nam Bộ',
      'Tây Nam Bộ'
    ];
    content = locations.map(l => {
      const np = props.nationalParks.filter(np => np.location === l);
      return <SideBarItem key={l} title={l} posts={np} image={false} mode={mode} />
    });
    if(props.mapImage) {
      content.push(<SideBarItem key="1" title="Bản đồ" mode={mode} mapImage/>)
    } 
  } else if(mode === 'author' && props.authors) {
    content = <SideBarItem title="Cảm ơn nhưng đóng góp của:" posts={props.authors} mode={mode} author />;
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
    posts: state.posts.posts,
    nationalParks: state.nationalPark.nationalParks,
    authors: state.author.authors
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
    onFetchAuthor: () => {
      dispatch(actions.fetchAuthors());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostSideBar);
