import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputGroup extends Component {
  constructor() {
    super();
    this.state = {
      valid: true,
    };
    this.validate = this.validate.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  onBlur() {
    this.validate();
    if(this.props.onBlur) {
      this.props.onBlur();
    }
  }

  validate() {
    if(this.props.value === '') {
      this.setState({
        valid: false,
      });
      return false;
    }
    this.setState({
      valid: true,
    });
    return true;
  }

  render() {
    const formGroupClass = (this.state.valid) ? "" : "has-danger";

    let formGroupFeedback;
    if (this.props.feedback) {
      formGroupFeedback = (this.state.valid) ? "" : (<div className="form-control-feedback">{this.props.feedback}</div>);
    }

    return (
      <div className={`form-group ${formGroupClass}`}>
        <div className="input-group">
          <span className="input-group-addon">{this.props.label}</span>
          <input
            type={this.props.type}
            id={this.props.name}
            name={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            value={this.props.value}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
          <span className="input-group-addon"><i className={`fa ${this.props.addonIcon}`} /></span>
        </div>
        {formGroupFeedback}
      </div>
    );
  }
}

InputGroup.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  addonIcon: PropTypes.string,
  type: PropTypes.string,
};
InputGroup.defaultProps = {
  value: "",
  type: "text"
};

export default InputGroup;
