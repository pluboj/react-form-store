import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import 'react-select/dist/react-select.css';
const Select = require('react-select');

class Dropdown extends Component {
	state = {
		value: ''
	}

	onChange = (val) => {
		const value = val === null ? '' : val.value;
		this.setState({ value: value});
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
		        State*
		      </label>
			  <Select
			    style={this.props.style}
			    name="form-field-name"
			    value={this.state.value}
			    options={options}
			    onChange={this.onChange}
			  />
			</div>
		)
	}
}

export default Dropdown;

