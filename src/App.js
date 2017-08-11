import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    step: 1,
    formData: {}
  }

  updateData = (data) => {
    const formData = Object.assign({}, this.state.formData, data);
    this.setState({
      formData: formData,
      step: this.state.step + 1
    })
  }

  render() {
    switch (this.state.step) {
      case 1:
        return <ProductList updateData={this.updateData}/>;
      case 2:
        return <ShippingDetails updateData={this.updateData}/>;
      case 3:
        return <DeliveryInformation updateData={this.updateData}/>
      default:
        return <ProductList updateData={this.updateData}/>;
    }
  }
}

class ProductList extends Component {
  state = {
    items: [
      {id: 1, ref: '10200', name: 'item 1', color: 'red'},
      {id: 2, ref: '50250', name: 'item 2', color: 'black'},
      {id: 3, ref: '00601', name: 'item 3', color: 'grey'},
      {id: 4, ref: '78009', name: 'item 4', color: 'yellow'},
    ],
    selectedItems: [],
    errors: false
  }

  handleSelection = (e) => {
    const selectedItems = this.state.selectedItems;
    const index = selectedItems.indexOf(e.target.value);

    if (e.target.checked) {
      if (index === -1)
        selectedItems.push(e.target.value);
    } else {
      selectedItems.splice(index, 1);
    }
    this.setState({
      selectedItems: selectedItems
    })
  }

  renderItem(item) {
    return (
      <div className="checkbox" key={item.id}>
          <label className="well">
            <input 
              type="checkbox" 
              value={item.name}
              className="big-check"
              onChange={this.handleSelection}
            /> 
            <div className="div-text">
            #{item.ref} 
             -- {item.name}
             -- color: <div className="clr"
              style={{background: item.color, color: item.color}}>
              XXX</div>
              </div>
          </label>
      </div>
    )
  }

  renderErrors = () => {
    if (this.state.errors) {
      return (
        <div 
          className="alert alert-danger"
          style={{width:'30%'}}
        >
          {this.state.errors}
        </div>
      )
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.selectedItems.length === 0) {
      this.setState({
        errors: 'Please select an item to continue'
      })
    } else {
      this.setState({
        errors: false
      })
      this.props.updateData({
        selectedItems: this.props.selectedItems
      })
    }
  }

  render() {
    const errorMessage = this.renderErrors();
    return (
      <div>
        <h3>
          Choose from wide variety of our products.
        </h3>
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          {this.state.items.map((item) => {
            return this.renderItem(item);
            })
          }
          <input 
            type="submit" 
            className="btn btn-success" 
            disabled={this.state.selectedItems.length === 0 ? "disabled" : ""}
          />
        </form>
      </div>
    )
  }
}

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

    if (this.state.fields.firstName === '') return true;
    if (!member.lastName) return true;
    if (!member.email) return true;
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
                type="text"
                label="State"
                value={this.state.fields.state}
                name="state"
                onChange={this.onInputChange}
                validate={(val) => (val ? false : 'Please enter a state.')}
            ></FormInput>

            <FormInput
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

class FormInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.value,
    error: false
  };

  componentWillReceiveProps(update) {
    this.setState({ value: update.value });
  }

  onChange = (e) => {
    const name = this.props.name;
    const value = e.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });
    this.props.onChange({ name, value, error });
};

  render() {
    return (
      <div className="form-group">
      <label>
        {this.props.label}*
      </label>
        <input 
          className="form-control"
          type={this.props.type}
          placeholder={this.props.label}
          value={this.state.value}
          onChange={this.onChange}
        />
        <span style={{ color: 'red'}}>{this.state.error}</span>
      </div>
    )
  }
}

class DeliveryInformation extends Component {
  render() {
    return (
      <h3>
        Choose your delivery option.
      </h3>
    )
  }
}

export default App;
