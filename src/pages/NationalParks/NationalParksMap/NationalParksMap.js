import React from "react";
import "./NationalParksMap.css";

const NationalParksMap = (props) => {
  // const giveMap = () => {
  //     console.log
  // }
  let map = null;
  if (props.nationalParks) {
    map = props.nationalParks.map((np) => (
      <area
        key={np.id}
        shape="rect"
        coords={np.coords}
        onClick={() => props.onClickNationParkHanlder(np.id, np.name)}
        alt={np.name}
      />
    ));
  }
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <img
        src="http://vncreatures.net/images/mapnew.gif"
        style={{ width: "640px", height: "1215px", border: "0" }}
        useMap="#Map"
        alt="map"
      />
      <map name="Map">{map}</map>
    </div>
  );
};

export default NationalParksMap;
