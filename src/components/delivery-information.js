import React, { Component } from 'react';

class DeliveryInformation extends Component {
	state = {
		deliveryOption: 'free'
	}

	handleChange = (e) => {
		this.setState({ deliveryOption: e.target.value});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.updateData(this.state);
	}
  render() {
    return (
	    <div>
	      <h3>
	        Choose your delivery option.
	      </h3>
	      <div style={{width: 300}}>
	      	<form onSubmit={this.handleSubmit}>
	      		<div className="radio">
	      			<label>
					    <input 
					    	type="radio" 
					    	name="delivery" 
					    	id="free" 
					    	value="free"
					    	onChange={this.handleChange} 
					    	checked={this.state.deliveryOption ==="free"} 
					    />
					    <p>Everyday Free Shipping</p> 
						<p>Transit time: 3-6 business days</p>
  					</label>
	      		</div>

	      		<div className="radio">
	      			<label>
					    <input 
					    	type="radio" 
					    	name="delivery" 
					    	id="premium" 
					    	value="premium" 
					    	onChange={this.handleChange}
					    	checked={this.state.deliveryOption ==="premium"} 
					     />
					    <p>Premium</p> 
						<p>Transit time: 2-3 business days</p>
  					</label>
	      		</div>

	      		<div className="radio">
	      			<label>
					    <input 
					    	type="radio" 
					    	name="delivery" 
					    	id="express" 
					    	value="express"
					    	onChange={this.handleChange}
					    	checked={this.state.deliveryOption ==="express"} 
					    />
					    <p>Express</p> 
						<p>Transit time: 1-2 business days</p>
  					</label>
	      		</div>


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