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
      {id: '10200', name: 'item 1', color: 'red'},
      {id: '50250', name: 'item 2', color: 'black'},
      {id: '00601', name: 'item 3', color: 'grey'},
      {id: '78009', name: 'item 4', color: 'yellow'},
    ]
  }

  renderItem(item) {
    const clrStyle = {
      background: 'red'
    }

    return (
      <div className="checkbox">
          <label className="well">
            <input type="checkbox" className="big-check"/> 
            <div class="div-text">
            #{item.id} 
             -- {item.name}
             -- color: <div className="clr" clr={item.color} 
              style={{background: item.color}}>{item.color}</div>
              </div>
          </label>
      </div>
    )
  }
  render() {
    return (
      <div>
        <h3>
          Choose from wide variety of our products.
        </h3>
        <form>
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
