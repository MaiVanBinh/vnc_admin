import React, { useState } from "react";
import "./InputDropDown.css";

const InputDropDown = (props) => {
  const [isSelecting, setIsSelecting] = useState(false);
    const [selected, setSelected] = useState(''); 

  const selectingHandler = () => {
    setIsSelecting(isSelecting => !isSelecting);
  }

  let optionContent = null;
  if( props.options && (props.mode === 'numberResult' || props.mode === 'operator')) {
    optionContent = props.options.map((o) => (
      <div key={o} className="option" onClick={() => {
        if(props.mode === 'numberResult'){
          props.selectNumberResultHandler(o);
        } else {
          props.selectingOperatorHandler(props.condition.id, o);
        }
        selectingHandler();
     }}>
        <input type="radio" className="radio" id={o} name="category" />
        <label htmlFor="art">{props.mode === 'numberResult' ? (o + ' rows') : o}</label>
      </div>
    ));
  } else if (props.options) {
    optionContent = props.options.map((o) => (
      <div key={o.id} className="option" onClick={() => {
        props.selectingAttributeHandler(props.condition.id, o.attributeName)
        selectingHandler();
     }}>
        <input type="radio" className="radio" id={o.id} name="category" />
        <label htmlFor="art">{o.attributeName}</label>
      </div>
    ));
  } 
  return (
    <div className="select-box">
      <div className={"options-container" + (isSelecting ? " active" : "")}>
          {optionContent}
      </div>
      <div className="selected" onClick={selectingHandler}>
        {props.title}
      </div>
    </div>
  );
};

export default InputDropDown;
