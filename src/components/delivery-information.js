import React, { Component } from 'react';

class DeliveryInformation extends Component {
	state = {
		deliveryOption: 'option1'
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
					    	id="option1" 
					    	value="option1"
					    	onChange={this.handleChange} 
					    	checked={this.state.deliveryOption ==="option1"} 
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
					    	id="option2" 
					    	value="option2" 
					    	onChange={this.handleChange}
					    	checked={this.state.deliveryOption ==="option2"} 
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
					    	id="option3" 
					    	value="option3"
					    	onChange={this.handleChange}
					    	checked={this.state.deliveryOption ==="option3"} 
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