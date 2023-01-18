import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeZipCode = this.onChangeZipCode.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeJmbg = this.onChangeJmbg.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeJob = this.onChangeJob.bind(this);
    this.onChangeWorkplace = this.onChangeWorkplace.bind(this);
    this.onChangePointsCollected = this.onChangePointsCollected.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
      jmbg: "",
      gender: "",
      job: "",
      workplace: "",
      pointsCollected: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value,
    });
  }

  onChangeZipCode(e) {
    this.setState({
      zipCode: e.target.value,
    });
  }

  onChangeCountry(e) {
    this.setState({
      country: e.target.value,
    });
  }

  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  onChangeJmbg(e) {
    this.setState({
      jmbg: e.target.value,
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }

  onChangeJob(e) {
    this.setState({
      job: e.target.value,
    });
  }

  onChangeWorkplace(e) {
    this.setState({
      workplace: e.target.value,
    });
  }

  onChangePointsCollected(e) {
    this.setState({
      pointsCollected: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.firstName,
        this.state.lastName,
        this.state.address,
        this.state.city,
        this.state.zipCode,
        this.state.country,
        this.state.phoneNumber,
        this.state.jmbg,
        this.state.gender,
        this.state.job,
        this.state.workplace,
        this.state.pointsCollected
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="city"
                    value={this.state.city}
                    onChange={this.onChangeCity}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">Zip code</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="zipCode"
                    value={this.state.zipCode}
                    onChange={this.onChangeZipCode}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="country"
                    value={this.state.country}
                    onChange={this.onChangeCountry}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.onChangePhoneNumber}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="jmbg">JMBG</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="jmbg"
                    value={this.state.jmbg}
                    onChange={this.onChangeJmbg}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.onChangeGender}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="job">Job</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="job"
                    value={this.state.job}
                    onChange={this.onChangeJob}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="workplace">Workplace</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="workplace"
                    value={this.state.workplace}
                    onChange={this.onChangeWorkplace}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pointsCollected">Points collected</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="pointsCollected"
                    value={this.state.pointsCollected}
                    onChange={this.onChangePointsCollected}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
