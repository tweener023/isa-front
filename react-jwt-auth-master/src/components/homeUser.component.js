import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import "../styles/menuButtons.scss";

class HomeUser extends Component {
  render() {
    const currentUser = AuthService.getCurrentUser();
    const firstName = currentUser ? currentUser.firstName : "";

    return (
      <div className="text-center">
        <h1>Welcome {firstName}</h1>
        <div className="button-container">
          <Link to="/facilities" className="btn btn-primary btn-lg menu-button">
            Explore Facilities
          </Link>
        </div>
        <div className="button-container">
          <Link to="/profile" className="btn btn-primary btn-lg menu-button">
            User Profile
          </Link>
        </div>
        <div className="button-container">
          <Link
            to="/notImplemented"
            className="btn btn-primary btn-lg menu-button"
          >
            Past Visits
          </Link>
        </div>
        <div className="button-container">
          <Link
            to="/notImplemented"
            className="btn btn-primary btn-lg menu-button"
          >
            Scheaduled Visits
          </Link>
        </div>
        <div className="button-container">
          <Link
            to="/notImplemented"
            className="btn btn-primary btn-lg menu-button"
          >
            QR codes
          </Link>
        </div>
        <div className="button-container">
          <Link
            to="/notImplemented"
            className="btn btn-primary btn-lg menu-button"
          >
            Penalties
          </Link>
        </div>
        <div className="button-container">
          <Link
            to="/fillQuestionnaire"
            className="btn btn-primary btn-lg menu-button"
          >
            Fill Questionnaire
          </Link>
        </div>
        <div className="button-container">
          <Link
            to="/notImplemented"
            className="btn btn-primary btn-lg menu-button"
          >
            Write Complaint
          </Link>
        </div>
      </div>
    );
  }
}

export default HomeUser;
