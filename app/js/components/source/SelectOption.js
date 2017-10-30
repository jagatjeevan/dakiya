import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectOption extends Component {
    constructor() {
        super();
        this.state = {
            valid: true,
        };
        this.validate = this.validate.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    validate() {
        if (this.props.value === '') {
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
    getOptions() {
        if (this.props.options.items.length) {
            return this.props.options.items.map(vendor => (<option value={vendor.objectId} key={vendor.objectId}>{vendor.name}</option>));
        }
        return (<option value="" selected="selected">No Vendors available</option>);
    }

    render() {
        const formGroupClass = (this.state.valid) ? "" : "has-danger";

        let formGroupFeedback;
        if (this.props.feedback) {
            formGroupFeedback = (this.state.valid) ? "" : (<div className="form-control-feedback">{this.props.feedback}</div>);
        }

        return (
            <div className={`form-group ${formGroupClass}`}>
                <select
                    type={this.props.type}
                    id={this.props.name}
                    name={this.props.name}
                    className="form-control"
                    value={this.props.value}
                    onChange={this.onChange}>

                    <option value='' key='' >Select Vendor</option>
                    {this.getOptions()}
                </select>
                {formGroupFeedback}
            </div>
        );
    }
}

SelectOption.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.object,
};

SelectOption.defaultProps = {
    value: "",
    type: "select"
};

export default SelectOption;
