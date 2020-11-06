/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliveryCompanyValidate as validate } from '../../assets/js/validate.js';

import '../../assets/css/form.css';
import FormField from '../form/formField.js';
import getDeliveryCompany from '../../assets/js/getDeliveryCompany.js';
import states from '../../assets/data/states.json';

class DeliveryCompanyForm extends Component {
  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    user: PropTypes.object,
    deliveryCompany: PropTypes.object,
    initialize: PropTypes.func,
    type: PropTypes.string
  };

  componentDidMount = () => {
    if (this.props.deliveryCompany) {
      this.props.initialize({
        ...this.props.deliveryCompany,
        states: this.props.deliveryCompany.states.map((value) => ({
          value,
          label: value
        }))
      });
    }
  }

  render() {
    const { user, type } = this.props;

    return (
      <form
        onSubmit={this.props.handleSubmit}
        className={`m-0 ${type ? '' : 'px-lg-5'}`}
        autoComplete="off"
      >
        {type ? (
          ''
        ) : (
          <>
            <h2 className="mb-0">Hello {user && user.name}</h2>
            <p>Tell us about your delivery company</p>
          </>
        )}
        <div className="form-row">
          <Field
            action="deliveryCompany"
            name="name"
            type="text"
            component={FormField}
            label="Compnay Name"
            className="col-12 col-md-6"
            placeholder="e.g: Peace Motors"
          />
          <Field
            action="deliveryCompany"
            name="email"
            type="email"
            component={FormField}
            label="Company Email"
            className="col-12 col-md-6"
            placeholder="e.g: peace.motors@gmail.com"
          />
        </div>

        <div className="form-row">
          <Field
            action="deliveryCompany"
            name="phone"
            type="tel"
            component={FormField}
            label="Compnay Phone Number"
            className="col-12 col-md-6"
            placeholder="e.g: 2348086140953"
          />
          <Field
            action="deliveryCompany"
            name="states"
            type="multi"
            component={FormField}
            label="States Active In"
            className="col-12 col-md-6"
            options={states.map(({ name }) => ({ value: name, label: name }))}
          />
        </div>

        <div className="button-group">
          <button className="btn btn-primary" type="submit">
            {this.props.buttonValue}
          </button>
          {type ? (
            ''
          ) : (
            <Link type="button" to="/logout" className="btn btn-danger">
              Logout
            </Link>
          )}
        </div>
      </form>
    );
  }
}

const warn = () => ({});

const mapStateToProps = ({ user, deliveryCompany }) => ({
  user: user.selected,
  deliveryCompany: getDeliveryCompany(user, deliveryCompany)
});

export default reduxForm({
  form: 'deliveryCompanyForm',
  validate,
  warn
})(connect(mapStateToProps)(DeliveryCompanyForm));
