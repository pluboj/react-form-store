import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import 'react-select/dist/react-select.css';
const Select = require('react-select');

class Dropdown extends Component {
	state = {
		value: '',
		error: false
	}

	onChange = (val) => {
		const name = this.props.name;
		const value = val === null ? '' : val.value;
		const error = this.props.validate ? this.props.validate(value) : false;
		
		this.setState({ value, error });
    	this.props.onChange({ name, value, error });
	}

	render() {		
		const options = [
	        { value: 'ak', label: 'AK' },
	        { value: 'al', label: 'AL' },
	        { value: 'az', label: 'AZ' }
	      ];

		return (
			<div className="form-group">
		      <label>
		        {this.props.label}*
		      </label>
			  <Select
			    style={this.props.style}
			    name="form-field-name"
			    value={this.state.value}
			    options={options}
			    onChange={this.onChange}
			  />
			  <span style={{ color: 'red'}}>{this.state.error}</span>
			</div>
		)
	}
}

export default Dropdown;

