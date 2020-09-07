import React from 'react';
// import "./FormFilter.css";

class FormFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleContent: {
                species: false,
                class: false,
                set: false,
                family: false
            },
            filter : {
                species: "0",
                class: [],
                set: [],
                family: []
            },
            data: {
                species: {
                    label: "Loài",
                    options: [
                        {
                            id: 0,
                            title: "Tất cả"
                        },
                        {
                            id: 1,
                            title: "Động vật"
                        },
                        {
                            id: 2,
                            title: "Thực vật"
                        },
                        {
                            id: 3,
                            title: "Côn trùng"
                        },
                    ]
                },
                class: {
                    label: "Lớp",
                    options: [
                        {
                            id: 1,
                            title: "option1"
                        },
                        {
                            id: 2,
                            title: "option2"
                        },
                        {
                            id: 3,
                            title: "option3"
                        },
                    ]
                },
                set: {
                    label: "Bộ",
                    options: [
                        {
                            id: 1,
                            title: "option1"
                        },
                        {
                            id: 2,
                            title: "option2"
                        },
                        {
                            id: 3,
                            title: "option3"
                        },
                    ]
                },
                family: {
                    label: "Họ",
                    options: [
                        {
                            id: 1,
                            title: "option1"
                        },
                        {
                            id: 2,
                            title: "option2"
                        },
                        {
                            id: 3,
                            title: "option3"
                        },
                    ]
                },
            }
            

        }
    }
    
    toggleContent = (nameTab) => {
        const toggleContent = this.state.toggleContent;
        const toggleContentUpdate = {
            ...toggleContent,
            [nameTab]: !toggleContent[nameTab]
        }
        this.setState({toggleContent: toggleContentUpdate});
    }
    changeInput = (event, type) => {
        console.log(type);
        const filter = this.state.filter;
        const target = event.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        const value = target.value;
        const name = target.name;
        if(name === "species") {
            filter.species = value;
        } else{
            let checked = target.checked;
            if(checked) {
                filter[name].push(value);
            } else {
                let updateOpt = [...filter[name]];
                const valueIndex = updateOpt.indexOf(value);
                updateOpt.splice(valueIndex, 1);
                filter[name] = [...updateOpt];
            }
        }
        console.log(filter);
        this.setState({
          filter: filter
        });
    }
    render() {
        let classForm = ["cd-filter"];
        if(this.props.showFilter) {
            classForm.push("filter-is-visible");
        }
        // if(this.props.isFixed) {
        //     classForm.push("is-fixed");
        // }
        let checkBoxFilter = null;
        if(this.state.data.class.options && this.state.data.set.options && this.state.data.family.options) {
            checkBoxFilter = [];
            for (const elementproperty in this.state.data) {
                if(elementproperty === "species") {
                    continue;
                }
                let options = this.state.data[elementproperty].options.map(e => (
                    <li key={elementproperty + "" + e.id}>
                        <input 
                            className="filter" 
                            data-filter=".check1" 
                            type="checkbox" 
                            name={elementproperty} 
                            id={elementproperty + "" + e.id} 
                            onChange={(event) => this.changeInput(event, elementproperty)}
                            value={e.id}/>
                        <label className="checkbox-label" htmlFor={elementproperty + "" + e.id}>{e.title}</label>
                    </li>
                ));
                const checkBox = (
                    <div className="cd-filter-block" key={elementproperty}>
					    <h4 className={this.state.toggleContent[elementproperty]  ? "closed" : null} onClick={() => this.toggleContent(elementproperty)}>{this.state.data[elementproperty].label}</h4>
                        
                        <ul className={this.state.toggleContent[elementproperty] ? "cd-filter-content cd-filters list toggle" : "cd-filter-content cd-filters list"}>
                            {options}
                        </ul>	
                    </div>
                );
                checkBoxFilter.push(checkBox);
            };
        }

        let radioFilter = null;
        if(this.state.data.species && this.state.data.species.options.length > 0) {
            radioFilter = this.state.data.species.options.map(opt => (
                <li key={opt.id}>
                    <input className="filter" type="radio" name="species" id={opt.id} value={opt.id} onChange={(event) => this.changeInput(event, "species")} checked={opt.id === parseInt(this.state.filter.species)}/>
                    <label className="radio-label" htmlFor={opt.id}>{opt.title}</label>
                </li>
            ))
        }
        return (

            <div className={classForm.join(" ")}>
                <form>
                    <div className="btn-box">
                        <button className="button">Làm mới<span></span></button>
                        <button className="button">Tìm<span></span></button>
                    </div>

                    <div className="cd-filter-block">
                        <h4 className={this.state.toggleContent["species"] ? "closed" : null} onClick={() => this.toggleContent("species")}>Loài</h4>
                        <ul className={this.state.toggleContent["species"] ? "cd-filter-content cd-filters list toggle" : "cd-filter-content cd-filters list"}>
                            {radioFilter}
                        </ul> 
                    </div>
                
                    {checkBoxFilter}
					<p className="cd-close" onClick={this.props.hiddenShowHandler}>Close</p>
                </form>
            </div>
        );
    }
}

export default FormFilter;