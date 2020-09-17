import React from "react";
import "./HashTag.css";
import HeadingTitle from "../UI/HeadingTitle/HeadingTitle";
import HashTagLink from "./HashTagLink/HashTagLink";

const HashTag = (props) => {
    console.log(props.hashTagContent)
  return (
    <div className="hashtag-box">
      <HeadingTitle mode="subHeading" title={props.title} />
      <div className="hashtag-catagory">
        {props.hashTagContent
          ? props.hashTagContent.map((htl) => (
              <HashTagLink
                key={htl.id}
                url={htl.url}
                title={htl.title}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default HashTag;