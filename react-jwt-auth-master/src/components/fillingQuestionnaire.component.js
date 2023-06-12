import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link, Route } from "react-router-dom";
import { format } from "date-fns";

import AuthService from "../services/auth.service";
import questionnaireService from "../services/questionnaire.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class FillingQuestionnaire extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitQuestionnaire = this.handleSubmitQuestionnaire.bind(this);
    this.onChangeParentName = this.onChangeParentName.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeTimesGiven = this.onChangeTimesGiven.bind(this);
    this.onChangeBloodType = this.onChangeBloodType.bind(this);
    this.onChangeDrunkAlcohol = this.onChangeDrunkAlcohol.bind(this);
    this.onChangeHadTattoo = this.onChangeHadTattoo.bind(this);
    this.onChangeDangerousJob = this.onChangeDangerousJob.bind(this);
    this.onChangeDonatedBlood = this.onChangeDonatedBlood.bind(this);

    this.state = {
      dateOfQuestionnaire: "",
      firstName: "",
      parentName: "",
      lastName: "",
      jmbg: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      city: "",
      phoneNumber: "",
      workplace: "",
      job: "",
      timesGiven: "",
      bloodType: "",
      accepted: false,
      drunkAlcohol: false,
      hadTattoo: false,
      dangerousJob: false,
      donatedBlood: false,
      user: "",
      successful: false,
      message: "",
      submitted: false,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd");

    if (currentUser && currentUser.id) {
      this.setState({
        dateOfQuestionnaire: formattedDate,
        user: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        jmbg: currentUser.jmbg,
        gender: currentUser.gender,
        address: currentUser.address,
        city: currentUser.city,
        phoneNumber: currentUser.phoneNumber,
        workplace: currentUser.workplace,
        job: currentUser.job,
      });
    } else {
      console.log("User not available.");
      this.setState({
        message: "User not available.",
        successful: false,
      });
    }
  }

  onChangeParentName(e) {
    this.setState({
      parentName: e.target.value,
    });
  }

  onChangeDateOfBirth(e) {
    this.setState({
      dateOfBirth: e.target.value,
    });
  }

  onChangeTimesGiven(e) {
    this.setState({
      timesGiven: e.target.value,
    });
  }

  onChangeBloodType(e) {
    this.setState({
      bloodType: e.target.value,
    });
  }

  onChangeDrunkAlcohol(e) {
    this.setState({
      drunkAlcohol: e.target.checked || false,
    });
  }

  onChangeHadTattoo(e) {
    this.setState({
      hadTattoo: e.target.checked || false,
    });
  }

  onChangeDangerousJob(e) {
    this.setState({
      dangerousJob: e.target.checked || false,
    });
  }

  onChangeDonatedBlood(e) {
    this.setState({
      donatedBlood: e.target.checked || false,
    });
  }

  calculateAccepted() {
    const { drunkAlcohol, donatedBlood, hadTattoo } = this.state;
    const accepted = !drunkAlcohol && !donatedBlood && !hadTattoo;
    this.setState({ accepted });
  }

  handleSubmitQuestionnaire(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      questionnaireService
        .submit(
          this.state.dateOfQuestionnaire,
          this.state.firstName,
          this.state.parentName,
          this.state.lastName,
          this.state.jmbg,
          this.state.dateOfBirth,
          this.state.gender,
          this.state.address,
          this.state.city,
          this.state.phoneNumber,
          this.state.workplace,
          this.state.job,
          this.state.timesGiven,
          this.state.bloodType,
          this.state.accepted,
          this.state.drunkAlcohol,
          this.state.hadTattoo,
          this.state.dangerousJob,
          this.state.donatedBlood,
          this.state.user
        )
        .then(
          (response) => {
            this.setState({
              message: response.data.message,
              successful: true,
              submitted: true,
            });
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            if (error.response && error.response.status === 403) {
              this.setState({
                successful: false,
                message:
                  "You already submitted your questionnaire, now you need to wait for it to expire.",
              });
            } else {
              this.setState({
                successful: false,
                message: resMessage,
              });
            }
          }
        );
    }
  }

  render() {
    if (this.state.submitted) {
      return (
        <div>
          <h1>Thank you for submitting the questionnaire!</h1>
        </div>
      );
    }
    const bloodTypeOptions = ["A", "B", "AB", "O"].map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ));
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleSubmitQuestionnaire}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="parentName">Parent name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="parentName"
                    value={this.state.parentName}
                    onChange={this.onChangeParentName}
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
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="jmbg">JMBG</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="jmbg"
                    value={this.state.jmbg}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    value={this.state.dateOfBirth}
                    onChange={this.onChangeDateOfBirth}
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
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="city"
                    value={this.state.city}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="workplace">Workplace</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="workplace"
                    value={this.state.workplace}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="job">Job</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="job"
                    value={this.state.job}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="timesGiven">Times given</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="timesGiven"
                    value={this.state.timesGiven}
                    onChange={this.onChangeTimesGiven}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bloodType">Blood type</label>
                  <select
                    className="form-control"
                    name="bloodType"
                    value={this.state.bloodType}
                    onChange={this.onChangeBloodType}
                    validations={[required]}
                  >
                    <option value="">Select blood type</option>
                    {bloodTypeOptions}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="accepted">Accepted</label>
                  <Input
                    type="checkbox"
                    className="form-control"
                    name="accepted"
                    checked={this.state.accepted}
                    disabled
                    validations={[]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="drunkAlcohol">Drunk alcohol</label>
                  <Input
                    type="checkbox"
                    className="form-control"
                    name="drunkAlcohol"
                    checked={this.state.drunkAlcohol}
                    onChange={this.onChangeDrunkAlcohol}
                    validations={[]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="hadTattoo">Had tattoo</label>
                  <Input
                    type="checkbox"
                    className="form-control"
                    name="hadTattoo"
                    checked={this.state.hadTattoo}
                    onChange={this.onChangeHadTattoo}
                    validations={[]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dangerousJob">Dangerous job</label>
                  <Input
                    type="checkbox"
                    className="form-control"
                    name="dangerousJob"
                    checked={this.state.dangerousJob}
                    onChange={this.onChangeDangerousJob}
                    validations={[]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="donatedBlood">Donated blood</label>
                  <Input
                    type="checkbox"
                    className="form-control"
                    name="donatedBlood"
                    checked={this.state.donatedBlood}
                    onChange={this.onChangeDonatedBlood}
                    validations={[]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">
                    Submit Questionnaire
                  </button>
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
