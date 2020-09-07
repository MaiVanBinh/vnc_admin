import React from 'react';
// import Search from '../../components/Search/Search';
import './Search.css';
import FormSearch from '../../components/Search/FormFilter/FormFilter';
import SearchResult from '../../components/Search/SearchResult/SearchResult';
import Aux from '../../hoc/Auxiliary';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFixed: false,
            showFilter: false
        };
        this.myRef = React.createRef();
    }
    filterHandler = () => {
        this.setState(prevState => {
            return {
                showFilter: !prevState.showFilter
            }
        });
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => {
        if(window.pageYOffset > 48) {
            this.setState({isFixed: true});
        } else {
            this.setState({isFixed: false});
        }
    }
    render() {
        let classShow = ["cd-filter-trigger"];
        if(this.state.showFilter) {
            classShow.push("filter-is-visible");
        }
        let classMain = ["cd-main-content"];
        if(this.state.isFixed) {
            classMain.push("is-fixed");
        }
        return ( 
            <Aux>
                <div>
                    asdas
                </div>
                <main className={classMain.join(" ")}>
                    <button className={classShow.join(" ")} onClick={this.filterHandler}>Lọc</button>
                    <FormSearch showFilter={this.state.showFilter} isFixed={this.state.isFixed} hiddenShowHandler={this.filterHandler}/>
                    <SearchResult showFilter={this.state.showFilter}/> 
                </main>
            </Aux>
            
        );
    }
}

export default Search;