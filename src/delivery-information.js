import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class DeliveryInformation extends Component {
	state = {
		deliveryOption: ''
	}
  render() {
    return (
	    <div>
	      <h3>
	        Choose your delivery option.
	      </h3>
	      <div style={{width: 300}}>
	      	<form onSubmit={this.handleSubmit}>



	      		<button className="btn btn-success">
					Submit
				</button>
	      	</form>
	      </div>
	    </div>
    )
  }
}

export default DeliveryInformation;