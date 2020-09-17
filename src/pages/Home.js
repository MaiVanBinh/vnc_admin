import React from 'react';
import './Home.css';

class Home extends React.Component {
    state = {
        content: null,
    }
    componentDidMount() {
        fetch('http://localhost:8080/posts/1', {
            method: 'GET'
        }).then(res => res.json())
        .then(resData => this.setState({content: resData.data.content}))
        .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="post">
                {this.state.content ? <div dangerouslySetInnerHTML={{__html: this.state.content}}></div> : null}
                
                <h1>Home page</h1>
            </div>
        );
    }
}

export default Home;