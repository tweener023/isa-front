import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles/profileInfo.scss";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      errors: {},
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  handleEdit = () => {
    this.setState({ editing: true, errors: {} });
  };

  handleSave = async () => {
    const { currentUser } = this.state;
    const errors = this.validateFields(currentUser);

    if (Object.keys(errors).length === 0) {
      const token = AuthService.getJwt();

      try {
        const response = await fetch("http://localhost:8080/api/users", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(currentUser),
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        this.setState({ editing: false });
      } catch (error) {
        console.error(error);
      }
    } else {
      this.setState({ errors });
    }
  };

  handleChange = (event) => {
    const { currentUser } = this.state;
    const { name, value } = event.target;

    this.setState({
      currentUser: { ...currentUser, [name]: value },
    });
  };

  validateFields = (user) => {
    const errors = {};

    if (!/^[a-zA-Z]+$/.test(user.firstName)) {
      errors.firstName = "First name should contain only letters.";
    }

    if (!/^[a-zA-Z]+$/.test(user.lastName)) {
      errors.lastName = "Last name should contain only letters.";
    }

    if (!/^\d+$/.test(user.jmbg)) {
      errors.jmbg = "JMBG should contain only numbers.";
    }

    if (!/^\d+$/.test(user.phoneNumber)) {
      errors.phoneNumber = "Phone number should contain only numbers.";
    }

    if (!/^\d+$/.test(user.zipCode)) {
      errors.zipCode = "Zip code should contain only numbers.";
    }

    if (!/^[a-zA-Z]+$/.test(user.city)) {
      errors.city = "City should contain only letters.";
    }

    if (!/^[a-zA-Z]+$/.test(user.country)) {
      errors.country = "Country should contain only letters.";
    }

    // Add validations for the remaining fields here

    return errors;
  };

  render() {
    const { redirect, userReady, editing, errors } = this.state;

    if (redirect) {
      return <Navigate to={redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {userReady ? (
          <div>
            <header className="jumbotron">
              <h3 className="usernameH3">
                <strong>{currentUser.username}</strong>
              </h3>
              <div className="info-card">
                <p>
                  <strong>Password: </strong>
                  {editing ? (
                    <input
                      type="password"
                      name="password"
                      value={currentUser.password}
                      onChange={this.handleChange}
                    />
                  ) : (
                    currentUser.email
                  )}
                </p>
                <p>
                  <strong>Firstname: </strong>
                  {editing ? (
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={currentUser.firstName}
                        onChange={this.handleChange}
                      />
                      {errors.firstName && (
                        <span className="error">{errors.firstName}</span>
                      )}
                    </div>
                  ) : (
                    currentUser.firstName
                  )}
                </p>
                <p>
                  <strong>Lastname: </strong>
                  {editing ? (
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={currentUser.lastName}
                        onChange={this.handleChange}
                      />
                      {errors.lastName && (
                        <span className="error">{errors.lastName}</span>
                      )}
                    </div>
                  ) : (
                    currentUser.lastName
                  )}
                </p>
                <p>
                  <strong>Address: </strong>
                  {editing ? (
                    <div>
                      <input
                        type="text"
                        name="address"
                        value={currentUser.address}
                        onChange={this.handleChange}
                      />
                      {errors.address && (
                        <span className="error">{errors.address}</span>
                      )}
                    </div>
                  ) : (
                    currentUser.address
                  )}
                </p>
                <p>
                  <strong>City: </strong>
                  {editing ? (
                    <div>
                      <input
                        type="text"
                        name="city"
                        value={currentUser.city}
                        onChange={this.handleChange}
                      />
                      {errors.city && (
                        <span className="error">{errors.city}</span>
                      )}
                    </div>
                  ) : (
                    currentUser.city
                  )}
                </p>
                <p>
                  <strong>Zip code: </strong>
                  {editing ? (
                    <div>
                      <input
                        type="text"
                        name="zipCode"
                        value={currentUser.zipCode}
                        onChange={this.handleChange}
                      />
                      {errors.zipCode && (
                        <span className="error">{errors.zipCode}</span>
                      )}
                    </div>
                  ) : (
                    currentUser.zipCode
                  )}
                </p>
                <p>
                  <strong>Country: </strong>
                  {editing ? (
                    <div>
                      <input
                        type="text"
                        name="country"
                        value={currentUser.country}
                        onChange={this.handleChange}
                      />
                      {errors.country && (
                        <span className="error">{errors.country}</span>
                      )}
                    </div>
                  ) : (
                    currentUser.country
                  )}
                </p>
                <p>
                  <strong>Phone number: </strong>
                  {editing ? (
                    <div>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={currentUser.phoneNumber}
                        onChange={this.handleChange}
                      />
                      {errors.phoneNumber && (
                        <span className="error">{errors.phoneNumber}</span>
                      )}
                    </div>
                  ) : (
                    currentUser.phoneNumber
                  )}
                </p>
                <p>
                  <strong>JMBG: </strong>
                  {editing ? (
                    <div>
                      <input
                        type="text"
                        name="jmbg"
                        value={currentUser.jmbg}
                        onChange={this.handleChange}
                      />
                      {errors.jmbg && (
                        <span className="error">{errors.jmbg}</span>
                      )}
                    </div>
                  ) : (
                    currentUser.jmbg
                  )}
                </p>
                <p>
                  <strong>Gender: </strong>
                  {editing ? (
                    <span>
                      <input
                        type="radio"
                        name="gender"
                        value="MALE"
                        checked={currentUser.gender === "MALE"}
                        onChange={this.handleChange}
                      />{" "}
                      Male
                      <input
                        type="radio"
                        name="gender"
                        value="FEMALE"
                        checked={currentUser.gender === "FEMALE"}
                        onChange={this.handleChange}
                      />{" "}
                      Female
                    </span>
                  ) : (
                    currentUser.gender
                  )}
                </p>
              </div>
              {editing ? (
                <button
                  className="btn btn-primary"
                  onClick={this.handleSave}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={this.handleEdit}
                >
                  Edit
                </button>
              )}
            </header>
          </div>
        ) : null}
      </div>
    );
  }
}
