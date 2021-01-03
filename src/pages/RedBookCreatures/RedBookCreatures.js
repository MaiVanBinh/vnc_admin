import React, { useEffect, useState } from "react";
import "./RedBookCreatures.css";
import { useHistory, useLocation } from "react-router-dom";
import Table from "../../components/Table/Table";
import PostSideBar from "../../components/SideBar/SideBar";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ButtonChangeSpecies from "./ButtonChangeSpecies/ButtonChangeSpecies";
import LayoutContainer from "../../components/Layout/LayoutContainer/LayoutContainer";
import Left from "../../components/Layout/LayoutLR/Left/Left";
import Right from "../../components/Layout/LayoutLR/Right/Right";
import Loading from '../../components/UI/Loader/Loader';

const RedBookCreatures = (props) => {
  const [species, setSpecies] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const { onFetchCreaturesRedBook } = props;
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    let species = 1;
    for (let param of query.entries()) {
      if (param[0] === "loai") {
        species = parseInt(param[1]);
      }
    }
    setSpecies(species);
    onFetchCreaturesRedBook(species, `species=${species}&all`);
  }, [location, onFetchCreaturesRedBook, species]);

  const changeSpeciesHandler = (id) => {
    console.log(id);
    history.push({
      search: "?loai=" + id,
    });
    setSpecies(id);
  };
  
  return (
    <LayoutContainer>
      <Left>
        <ButtonChangeSpecies changeSpeciesHandler={changeSpeciesHandler} />
        {props.loading ? <Loading /> : (species && props.redBook && props.redBook[species]) ? (
          <Table
            species={species.toString()}
            creatures={props.redBook[species]}
          />) : null}
        {/* {
        ) : null} */}
      </Left>
      <Right>
        <PostSideBar image mode="creatures" />
      </Right>
    </LayoutContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    redBook: state.creatures.redBook,
    loading: state.creatures.redBookLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCreaturesRedBook: (species, query) => {
      dispatch(actions.fetchCreatureRedBook(species, query));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedBookCreatures);
