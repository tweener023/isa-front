import React from "react";
import { Link, useParams } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles/menuButtons.scss";

const HomeUser = () => {
  const currentUser = AuthService.getCurrentUser();
  const firstName = currentUser ? currentUser.firstName : "";
  const userId = currentUser ? currentUser.id : "";

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
          to={`/previousAppointments/${userId}`}
          className="btn btn-primary btn-lg menu-button"
        >
          Past Visits
        </Link>
      </div>
      <div className="button-container">
        <Link
          to={`/scheaduledAppointments/${userId}`}
          className="btn btn-primary btn-lg menu-button"
        >
          Scheduled Visits
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
          to="/writeComplaint"
          className="btn btn-primary btn-lg menu-button"
        >
          Write Complaint
        </Link>
      </div>
      <div className="button-container">
        <Link
          to={`/sentComplaints/${userId}`}
          className="btn btn-primary btn-lg menu-button"
        >
          Sent Complaints
        </Link>
      </div>
    </div>
  );
};

export default HomeUser;
