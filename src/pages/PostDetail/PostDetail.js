import React, { useEffect } from 'react';
import PostSideBar from "../../components/PostSideBar/PostSideBar";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';
import './PostDetail.css';
import Loading from '../../components/UI/Loader/Loader';

const PostDetail = (props) => {
    useEffect(() => {
        props.onFecthPostDetail(props.match.params.id);
    }, [props.match.params.id]);
    return (
        <div className="creature-detail">
            <div className="content post">
                {props.post && !props.loading ? <div dangerouslySetInnerHTML={{__html: props.post.content}} />: <Loading />}
            </div>
            <PostSideBar />
        </div> 
    )
} 
const mapStateToProps = state => {
    return {
        post: state.posts.currentPost,
        loading: state.posts.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFecthPostDetail: (id) => dispatch(action.fetchPostDetail(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostDetail));