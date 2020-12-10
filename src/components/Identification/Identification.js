import React, { useEffect } from 'react';
import HeadingTitle from '../UI/HeadingTitle/HeadingTitle';
import './Identification.css';
import HashTag from '../Hashtag/HashTag';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';

const Identification = (props) => {
    const { onFetchHashTagId } = props;
    useEffect(() => {
      onFetchHashTagId();
    }, [onFetchHashTagId])
    return (
        <div className="hashtag">
            <HeadingTitle mode="heading" title="Hình thái phân loại" center="center"/>
            { props.hashTagContent ? 
            <div className="identification">
                <HashTag title="Động vât" hashTagContent={props.hashTagContent.animal} />
                <HashTag title="Thực vật" hashTagContent={props.hashTagContent.plant} />
                <HashTag title="Côn trùng" hashTagContent={props.hashTagContent.insect} />
            </div> : null}
        </div>
    );
}

const mapStateToProps = state => {
  return {
    hashTagContent: state.posts.hashTagId
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onFetchHashTagId: () => {
      dispatch(actions.fetchHashTagId());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Identification);