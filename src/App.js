import React, { Component } from 'react';
import './App.css';
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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    shippingAdd: '',
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
    if (this.state.firstName === '') {
      this.setState({error: "Please enter your first name"});
    } else if (this.state.lastName === '') {
      this.setState({error: "Please enter your last name"});
    } else if (this.state.email === '') {
      this.setState({error: "Please enter your email address"});
    } else if (this.state.phone === '') {
      this.setState({error: "Please enter your phone number"});
    } else if (this.state.shippingAdd === '') {
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

  handleChange = (e, attr) => {
    const state = this.state;
    state[attr] = e.target.value;
    this.setState(state);

    console.log(this.state);
  }

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
            <div className="form-group">
              <input 
                className="form-control"
                type="text"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={(e) => this.handleChange(e, 'firstName')}
              />
            </div>

            <div className="form-group">
              <input 
                className="form-control"
                type="text"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={(e) => this.handleChange(e, 'lastName')}
              />
            </div>

            <div className="form-group">
              <input 
                className="form-control"
                type="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={(e) => this.handleChange(e, 'email')}
              />
            </div>

            <div className="form-group">
              <input 
                className="form-control"
                type="text"
                placeholder="Phone Number"
                value={this.state.phone}
                onChange={(e) => this.handleChange(e, 'phone')}
              />
            </div>

            <div className="form-group">
              <input 
                className="form-control"
                type="text"
                placeholder="Shipping Address"
                value={this.state.shippingAdd}
                onChange={(e) => this.handleChange(e, 'shippingAdd')}
              />
            </div>

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
