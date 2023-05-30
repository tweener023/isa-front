import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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
    this.onChangeDateOfQuestionnaire =
      this.onChangeDateOfQuestionnaire.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeParentName = this.onChangeParentName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeJmbg = this.onChangeJmbg.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeWorkplace = this.onChangeWorkplace.bind(this);
    this.onChangeJob = this.onChangeJob.bind(this);
    this.onChangeTimesGiven = this.onChangeTimesGiven.bind(this);
    this.onChangeBloodType = this.onChangeBloodType.bind(this);
    this.onChangeAccepted = this.onChangeAccepted.bind(this);
    this.onChangeDrunkAlcohol = this.onChangeDrunkAlcohol.bind(this);
    this.onChangeHadTattoo = this.onChangeHadTattoo.bind(this);
    this.onChangeDangerousJob = this.onChangeDangerousJob.bind(this);

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
      accepted: "",
      drunkAlcohol: "",
      hadTattoo: "",
      dangerousJob: "",
      user: "",
      successful: false,
      message: "",
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser);
    if (currentUser && currentUser.id) {
      this.setState({
        user: currentUser.id,
      });
    } else {
      console.log("User not available.");
      this.setState({
        message: "User not available.",
        successful: false,
      });
    }
  }

  onChangeDateOfQuestionnaire(e) {
    this.setState({
      dateOfQuestionnaire: e.target.value,
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeParentName(e) {
    this.setState({
      parentName: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeJmbg(e) {
    this.setState({
      jmbg: e.target.value,
    });
  }

  onChangeDateOfBirth(e) {
    this.setState({
      dateOfBirth: e.target.value,
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
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

  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  onChangeWorkplace(e) {
    this.setState({
      workplace: e.target.value,
    });
  }

  onChangeJob(e) {
    this.setState({
      job: e.target.value,
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

  onChangeAccepted(e) {
    this.setState({
      accepted: e.target.checked,
    });
  }

  onChangeDrunkAlcohol(e) {
    this.setState({
      drunkAlcohol: e.target.checked,
    });
  }

  onChangeHadTattoo(e) {
    this.setState({
      hadTattoo: e.target.checked,
    });
  }

  onChangeDangerousJob(e) {
    this.setState({
      dangerousJob: e.target.checked,
    });
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
          this.state.user
        )
        .then(
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
            onSubmit={this.handleSubmitQuestionnaire}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="dateOfQuestionnaire">
                    Date Of Questionnaire
                  </label>
                  <Input
                    type="date"
                    className="form-control"
                    name="dateOfQuestionnaire"
                    value={this.state.dateOfQuestionnaire}
                    onChange={this.onChangeDateOfQuestionnaire}
                    validations={[required]}
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
                    onChange={this.onChangeLastName}
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
                    onChange={this.onChangeGender}
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
                  <Input
                    type="text"
                    className="form-control"
                    name="bloodType"
                    value={this.state.bloodType}
                    onChange={this.onChangeBloodType}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="accepted">Accepted</label>
                  <Input
                    type="checkbox"
                    className="form-control"
                    name="accepted"
                    checked={this.state.accepted}
                    onChange={this.onChangeAccepted}
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
                  <label htmlFor="user">User</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="user"
                    value={this.state.user}
                    readOnly
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
