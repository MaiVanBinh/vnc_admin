import React from 'react';
import HeadingTitle from '../../../components/UI/HeadingTitle/HeadingTitle';
import './Identification.css';
import HashTag from '../../../components/Hashtag/HashTag';
import { connect } from 'react-redux';

const Identification = (props) => {

    return (
        <div>
            <HeadingTitle title="Hình thái phân loại" center="center"/>
            { props.hashTagContent ? 
            <div className="identification">
              
                <HashTag title="Động vât" hashTagContent={props.hashTagContent.animal} />
                <HashTag title="Thực vậtt" hashTagContent={props.hashTagContent.plant} />
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
export default connect(mapStateToProps)(Identification);