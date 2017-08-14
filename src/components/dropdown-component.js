import React, { Component } from 'react';

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
	        { value: 'al', label: 'AL' },
	        { value: 'ak', label: 'AK' },
	        { value: 'az', label: 'AZ' },
	        { value: 'ar', label: 'AR' },
	        { value: 'ca', label: 'CA' },
	        { value: 'co', label: 'CO' },
	        { value: 'ct', label: 'CT' },
	        { value: 'de', label: 'DE' },
	        { value: 'fl', label: 'FL' },
	        { value: 'ga', label: 'GA' }
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

