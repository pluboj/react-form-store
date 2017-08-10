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
      shippingAdd: ''
    },
    error: false
  }

  renderError = () => {
    if (this.state.error) {
      return (
        <div 
          className="alert alert-danger"
          style={{width:'30%'}}
        >
          {this.state.error}
        </div>
      )
    }
  }

  validateInput = () => {
    if (this.state.fields.firstName === '') {
      this.setState({error: "Please enter your first name"});
    } else if (this.state.fields.lastName === '') {
      this.setState({error: "Please enter your last name"});
    } else if (this.state.fields.email === '') {
      this.setState({error: "Please enter your email address"});
    } else if (this.state.fields.phone === '') {
      this.setState({error: "Please enter your phone number"});
    } else if (this.state.fields.shippingAdd === '') {
      this.setState({error: "Please enter your shipping address"});
    } else {
      this.setState({error: false});
      return true;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      shippingAdd: this.state.shippingAdd
    }

    if (this.validateInput()) {
      this.props.updateData(data);
    }
  }

  onInputChange = ({name, value}) => {
    const fields = this.state.fields;

    fields[name] = value;
    this.setState({ fields });
    console.log(fields);
  };

  render() {
    const errorMsg = this.renderError();
    return (
      <div>
        <h3>
          Enter your shipping information.
        </h3>
        {errorMsg}
        <div style={{width: 300}}>
          <form onSubmit={this.handleSubmit}>
            <FormInput
                type="text"
                label="First Name"
                value={this.state.firstName}
                name="firstName"
                onChange={this.onInputChange}
            >
            </FormInput>

            <FormInput
                type="text"
                label="Last Name"
                value={this.state.lastName}
                name="lastName"
                onChange={this.onInputChange}
            >
            </FormInput>

            <FormInput
                type="email"
                label="Email Address"
                value={this.state.email}
                name="email"
                onChange={this.onInputChange}
            >
            </FormInput>

            <FormInput
                type="text"
                label="Phone Number"
                value={this.state.phone}
                name="phone"
                onChange={this.onInputChange}
            >
            </FormInput>

            <FormInput
                type="text"
                label="Shipping Address"
                value={this.state.shippingAdd}
                name="shippingAdd"
                onChange={this.onInputChange}
            >
            </FormInput>

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
    onChange: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.value
  };

  componentWillReceiveProps(update) {
    this.setState({ value: update.value });
  }

  onChange = (e) => {
    const name = this.props.name;
    const value = e.target.value;

    this.setState({ value });
    this.props.onChange({ name, value });
};

  render() {
    return (
      <div className="form-group">
        <input 
          className="form-control"
          type={this.props.type}
          placeholder={this.props.label}
          value={this.state.value}
          onChange={this.onChange}
        />
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
