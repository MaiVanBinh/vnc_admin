import React from 'react';
import './Search.css';

class ListItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {active: false}
    }
    
    render() {
      return (
        <a
        onClick={() => {
          this.setState(prevState => {
            let newState = !prevState.active;
            this.props.handleClick(newState, this.props.value);
            return {active: newState}
          })
        }}
        className={!this.state.active ? '' : 'selected'}
        href="#">
        {this.props.value}</a>
      )
    }
}
  
export default  class Select extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showList: false,
        value: []
      }
      
      this.handleItemClick = this.handleItemClick.bind(this)
    }
    
    componentDidMount() {
      document.addEventListener('mousedown', (e) => {
        if(!this.node.contains(e.target)) {
          this.setState({showList: false})
        }
      })
    }
    
    componentWillUnmount() {
       document.removeEventListener('mousedown');
    }
    
    renderValue() {
      let {value} = this.state;
      if(!value.length) return "Select..."
      else return value.join(', ')
    }
    
    toggleList() {
      this.setState(prevState => ({showList: !prevState.showList}))
    }
    
    handleItemClick(active, val) {
      let {value} = this.state;
      
      if(active) value = [...value, val]
      else value = value.filter(e => e != val);
      
      this.setState({value})
    }
    
    
    render() {
      return (
        <div 
        ref={node => this.node = node}
        className="select">
          <button onClick={this.toggleList.bind(this)}>
            <span className="select_value">
              {this.renderValue()}
            </span>
          </button>
          
          <div
          className={"select_list " + (!this.state.showList && 'hide')}>
            <ListItem handleClick={this.handleItemClick} value="Lorem" />
            <ListItem handleClick={this.handleItemClick} value="Ipsum" />
            <ListItem handleClick={this.handleItemClick} value="Dolor" />
          </div>
        </div>
      )
    }
  }
  