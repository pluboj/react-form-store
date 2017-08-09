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
  render() {
    return (
        <h3>
          Enter your shipping information.
        </h3>
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
