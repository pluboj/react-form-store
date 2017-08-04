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
  render() {
    return (
      <h1>
        Choose from wide variety of our products.
      </h1>
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
