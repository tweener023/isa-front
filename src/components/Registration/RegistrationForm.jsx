import React from 'react';
import './registrationForm.scss';

const RegistrationForm = () => {
  return (
    <div className="card2" id = "registrationForm">
      <h1 className="heading">Registration Form</h1>
      <form className="form">
        <div className="left-column">
          <label className="label">Email</label>
          <input
            type="email"
            required
            className="input"
            placeholder="Enter your email"
          />
          <label className="label">First Name</label>
          <input
            type="text"
            required
            className="input"
            placeholder="Enter your first name"
          />
          <label className="label">Last Name</label>
          <input
            type="text"
            required
            className="input"
            placeholder="Enter your last name"
          />
          <label className="label">Address</label>
          <input
            type="text"
            required
            className="input"
            placeholder="Enter your address"
          />
          <label className="label">City</label>
          <input
            type="text"
            required
            className="input"
            placeholder="Enter your city"
          />
          <label className="label">Zip code</label>
          <input
            type="text"
            required
            className="input"
            placeholder="Enter your zip code"
          />
        </div>
        <div className="right-column">
          <label className="label">Country</label>
          <input
            type="text"
            required
            className="input"
            placeholder="Enter your country"
          />
          <label className="label">Phone Number</label>
          <input
            type="tel"
            required
            className="input"
            placeholder="Enter your phone number"
          />
          <label className="label">JMBG</label>
          <input
            type="text"
            required
            className="input"
            placeholder="Enter your JMBG"
          />
          <label className="label">Gender</label>
          <input
            type="text"
            required
            className="input"
            placeholder="Enter your gender"
          />
          <label className="label">Job</label>
          <input
            type="text"
            required
            className="input"
            placeholder="Enter your job"
          />
          <label className="label">Workplace</label>
          <input
            type="text"
            required
            className="input"
            placeholder="Enter your workplace"
          />
        </div>
      </form>
      <button className="button" type="submit">
        Register
      </button>
    </div>
  );
};

export default RegistrationForm;

