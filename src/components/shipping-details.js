import React, { Component } from 'react';

import FormInput from './input-component.js';
import Dropdown from './dropdown-component.js';

class ShippingDetails extends Component {
  state = {
    fields: {
      firstName: '',
      lastName: '',
      email: '',
      address1: '',
      city: '',
      state: '',
      zip: ''
    },
    errors: {}
  }

  validate = () => {
    const member = this.state.fields;
    const errors = this.state.errors;
    const messages = Object.keys(errors).filter((k) => errors[k]);

    if (!member.firstName ) return true;
    if (!member.lastName) return true;
    if (!member.email) return true;
    if (!member.address1) return true;
    if (!member.city) return true;
    if (!member.zip) return true;
    if (messages.length) return true;

    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();    

    if (this.validate()) return;

    if (!this.validate()) {
      this.props.updateData(this.state.fields);
    }
  }

  onInputChange = ({name, value, error}) => {
    const fields = this.state.fields;
    const errors = this.state.errors;

    fields[name] = value;
    errors[name] = error;

    this.setState({ fields, errors });
  };

  render() {
    return (
      <div>
        <h3>
          Enter your shipping information.
        </h3>
        <p>* required field</p>
        <div style={{width: 300}}>
          <form onSubmit={this.handleSubmit}>
            <FormInput
                type="text"
                label="First Name"
                value={this.state.fields.firstName}
                name="firstName"
                onChange={this.onInputChange}
                validate={(val) => (val ? false : 'Please enter a first name.')}
            ></FormInput>

            <FormInput
                type="text"
                label="Last Name"
                value={this.state.fields.lastName}
                name="lastName"
                onChange={this.onInputChange}
                validate={(val) => (val ? false : 'Please enter a last name.')}
            ></FormInput>

            <FormInput
                type="email"
                label="Email Address"
                value={this.state.fields.email}
                name="email"
                onChange={this.onInputChange}
                validate={(val) => (val ? false : 'Please enter an email.')}
            ></FormInput>

            <FormInput
                type="text"
                label="Address line 1"
                value={this.state.fields.address1}
                name="address1"
                onChange={this.onInputChange}
                validate={(val) => (val ? false : 'Please enter a street address.')}
            ></FormInput>

            <FormInput
                type="text"
                label="City"
                value={this.state.fields.city}
                name="city"
                onChange={this.onInputChange}
                validate={(val) => (val ? false : 'Please enter a city.')}
            ></FormInput>

            <Dropdown 
                style={{width:"130px"}}
                label="State"
                name="state"
                onChange={this.onInputChange}
                validate={(val) => (val ? false : 'Please enter a state.')}
            />

            <FormInput
            	style={{width:"130px"}}
            	max={5}
                type="text"
                label="Zip Code"
                value={this.state.fields.zip}
                name="zip"
                onChange={this.onInputChange}
                validate={(val) => (val && val.match(/[0-9]{5}/) ? false : 'Please enter valid zip code.')}
            ></FormInput>

            <div className="form-group">
              <button 
                type="submit"
                ref="submit"
                className="btn btn-success"
                disabled={this.validate()}
              >
              submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ShippingDetails;