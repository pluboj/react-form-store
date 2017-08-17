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
	        { value: 'AL', label: 'AL' },
	        { value: 'AK', label: 'AK' },
	        { value: 'AZ', label: 'AZ' },
	        { value: 'AR', label: 'AR' },
	        { value: 'CA', label: 'CA' },
	        { value: 'CO', label: 'CO' },
	        { value: 'CT', label: 'CT' },
	        { value: 'DE', label: 'DE' },
	        { value: 'FL', label: 'FL' },
	        { value: 'GA', label: 'GA' }
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

