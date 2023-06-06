import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Facilities from "./components/facilities.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardMedic from "./components/board-medic.component";
import BoardAdmin from "./components/board-admin.component";
import HomeUser from "./components/homeUser.component";
import FillingQuestionnaire from "./components/fillingQuestionnaire.component";
import NotImplemented from "./components/notImplemented.component";
import Appointments from "./components/appointments.component";
import PreviousAppointments from "./components/previousAppointments.component";
import ScheaduledAppointments from "./components/scheaduledAppointments.component";
import WriteComplaint from "./components/writeComplaint.component";
import SentComplaints from "./components/sentComplaints.component";
import ComplaintsWaitingForResponse from "./components/complaintsWaitingForResponse.component";
import ComplaintsRespondedTo from "./components/complaintsRespondedTo.component";
import Analytics from "./components/analytics.components";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showMedicBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showMedicBoard: user.roles.includes("ROLE_MEDIC"),
        showAdminBoard: user.roles.includes("ROLE_ADMINISTRATOR"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showMedicBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showMedicBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link
            to={
              currentUser
                ? showMedicBoard
                  ? "/medic" // will point to medic homePage
                  : showAdminBoard
                  ? "/admin" // will point to admin homePage
                  : "/homeUser"
                : "/facilities"
            }
            className="navbar-brand"
          >
            Transfusion centre
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/facilities"} className="nav-link">
                Facilities
              </Link>
            </li>

            {showMedicBoard && (
              <>
              <li className="nav-item">
                <Link to={"/medic"} className="nav-link">
                  My Facility
                </Link>
              </li>
              <li className="nav-item">
              <Link to={"/analytics"} className="nav-link">
                Facility Analytics
              </Link>
            </li>
            </>
            )}

            {showAdminBoard && (
              <>
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/complaintsWaitingForResponse"}
                    className="nav-link"
                  >
                    Complaints Waiting For Response
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/complaintsRespondedTo"} className="nav-link">
                    Complaints Responded To
                  </Link>
                </li>
              </>
            )}

            {currentUser &&
              !showMedicBoard &&
              !showAdminBoard &&
              currentUser.roles.includes("ROLE_USER") && (
                <>
                  <li className="nav-item">
                    <Link
                      to={`/previousAppointments/${currentUser.id}`}
                      className="nav-link"
                    >
                      Past Visits
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to={`/scheaduledAppointments/${currentUser.id}`}
                      className="nav-link"
                    >
                      Scheduled Visits
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/notImplemented"} className="nav-link">
                      QR codes
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/notImplemented"} className="nav-link">
                      Penalties
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/fillQuestionnaire"} className="nav-link">
                      Fill Questionnaire
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/writeComplaint"} className="nav-link">
                      Write Complaint
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to={`/sentComplaints/${currentUser.id}`}
                      className="nav-link"
                    >
                      Sent Complaints
                    </Link>
                  </li>
                </>
              )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Facilities />} />
            {currentUser && !showMedicBoard && !showAdminBoard && (
              <>
                <Route path="/homeUser" element={<HomeUser />} />
                <Route path="/user" element={<BoardUser />} />
                <Route
                  path="/fillQuestionnaire"
                  element={<FillingQuestionnaire />}
                />
                <Route
                  path="/appointments/:facilityId"
                  element={<Appointments />}
                />
                <Route
                  path="/previousAppointments/:userId"
                  element={<PreviousAppointments />}
                />
                <Route
                  path="/scheaduledAppointments/:userId"
                  element={<ScheaduledAppointments />}
                />
                <Route path="/writeComplaint" element={<WriteComplaint />} />
                <Route
                  path="/sentComplaints/:userId"
                  element={<SentComplaints />}
                />
              </>
            )}
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            {currentUser && showMedicBoard && !showAdminBoard && (
              <>
               <Route path="/medic" element={<BoardMedic />} />
               <Route path="/analytics" element={<Analytics />} />
              </>
            )}
            {currentUser && !showMedicBoard && showAdminBoard && (
              <>
                <Route path="/admin" element={<BoardAdmin />} />
                <Route
                  path="/complaintsWaitingForResponse"
                  element={<ComplaintsWaitingForResponse />}
                />
                <Route
                  path="/complaintsRespondedTo"
                  element={<ComplaintsRespondedTo />}
                />
              </>
            )}
            <Route path="/notImplemented" element={<NotImplemented />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
