import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


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
          style={this.props.style}
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

export default FormInput;