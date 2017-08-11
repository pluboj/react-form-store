import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import FormInput from './input-component.js';

class ShippingDetails extends Component {
  state = {
    fields: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
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
    if (!member.phone ) return true;
    if (!member.address1) return true;
    if (!member.city) return true;
     if (!member.zip) return true;
    if (messages.length) return true;

    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      address1: this.state.address1,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    }

    if (this.validate()) return;

    if (!this.validate()) {
      this.props.updateData(data);
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
                label="Phone Number"
                value={this.state.fields.phone}
                name="phone"
                onChange={this.onInputChange}
                validate={(val) => (val ? false : 'Please enter a phone number.')}
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

            <FormInput
            	style={{width:"70px"}}
                type="text"
                label="State"
                value={this.state.fields.state}
                name="state"
                onChange={this.onInputChange}
                validate={(val) => (val ? false : 'Please enter a state.')}
            ></FormInput>

            <FormInput
            	style={{width:"100px"}}
                type="text"
                label="Zip Code"
                value={this.state.fields.zip}
                name="zip"
                onChange={this.onInputChange}
                validate={(val) => (val ? false : 'Please enter a zip code.')}
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