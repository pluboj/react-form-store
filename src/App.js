import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    step: 1
  }

  render() {
    switch (this.state.step) {
      case 1:
        return <ProductList />;
      case 2:
        return <ShippingDetails />;
      case 3:
        return <DeliveryInformation />
      default:
        return <ProductList />;
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
    selectedItems: []
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

    console.log(this.state.selectedItems)
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

  handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    console.log('Form was submitted');
  }

  render() {
    return (
      <div>
        <h3>
          Choose from wide variety of our products.
        </h3>
        <form onSubmit={this.handleSubmit}>
          {this.state.items.map((item) => {
            return this.renderItem(item);
            })
          }
          <input type="submit" className="btn btn-success" />
        </form>
      </div>
    )
  }
}

class ShippingDetails extends Component {
  render() {
    return (
      <h1>
        Enter your shipping information.
      </h1>
    )
  }
}

class DeliveryInformation extends Component {
  render() {
    return (
      <h1>
        Choose your delivery option.
      </h1>
    )
  }
}

export default App;
