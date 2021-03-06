/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addressValidate as validate } from '../../assets/js/validate.js';

import '../../assets/css/form.css';
import FormField from '../form/formField.js';
import states from '../../assets/data/states.json';

class AddressForm extends Component {
  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    user: PropTypes.object,
    initialize: PropTypes.func
  };

  componentDidMount() {
    const { user } = this.props;

    const initialUser = {
      ...user,
      firstName: ((user && user.name) || '').split(' ')[0],
      familyName: ((user && user.name) || '').split(' ')[1],
      categories: ((user && user.categories) || []).map((value) => ({ label: value, value }))
    };

    delete initialUser.name;
    this.props.initialize(initialUser);
  }

  render = () => (
    <form
      onSubmit={this.props.handleSubmit}
      // className={`animate__animated ${this.state.animationClass} m-0 px-lg-5`}
      className="m-0 px-lg-5"
      autoComplete="off"
    >
      <div className="form-row">
        <Field
          action="address"
          name="firstName"
          type="text"
          component={FormField}
          label="First Name"
          className="col-12 col-sm-6"
          placeholder="e.g John"
        />
        <Field
          action="address"
          name="familyName"
          type="text"
          component={FormField}
          label="Family Name"
          className="col-12 col-sm-6"
          placeholder="e.g Doe"
        />
      </div>

      <div className="form-row">
        <Field
          action="address"
          name="phone"
          type="tel"
          component={FormField}
          label="Phone Number"
          className="col-12"
          placeholder="e.g 2348163186209"
        />
      </div>

      <div className="form-row">
        <Field
          action="address"
          name="address"
          type="textarea"
          component={FormField}
          label="Address"
          className="col-12 col-md-6"
          placeholder="e.g: 3 Pound Road"
        />
        <Field
          action="address"
          name="state"
          type="datalist"
          options={states.map(({ name }) => name)}
          component={FormField}
          label="State"
          className="col-12 col-md-6"
          placeholder="e.g: Anambra"
        />
      </div>

      <div className="button-group">
        <button className="btn btn-primary" type="submit">
          {this.props.buttonValue}
        </button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal">
          Continue
        </button>
      </div>
    </form>
  );
}

const warn = () => ({});

const mapStateToProps = ({ user }) => ({
  user: user.selected
});

export default reduxForm({
  form: 'addressForm',
  validate,
  warn
})(connect(mapStateToProps)(AddressForm));
