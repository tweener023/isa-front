import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import Modal from "react-modal";
import "../styles/myfacilities.scss";

Modal.setAppElement("#root");

export default class BoardMedic extends Component {
  constructor(props) {
    super(props);
    this.handleNewAppointment = this.handleNewAppointment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleMakeAvailable = this.handleMakeAvailable.bind(this);
    this.handleMakeUnavailable = this.handleMakeUnavailable.bind(this);
    this.state = {
      content: "",
      appointments: [],
      modalIsOpen: false,
      date: "",
      time: "",
      errorMessage: "",
      visibilityMessage: "",
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    UserService.getFacilityByMedic(currentUser.id, currentUser.token).then(
      (response) => {
        this.setState({
          content: response.data,
        });
        UserService.getAppointmentsByFacility(
          response.data.centerId,
          currentUser.token
        ).then(
          (response) => {
            this.setState({
              appointments: response.data,
            });
          },
          (error) => {
            this.setState({
              appointments:
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString(),
            });
          }
        );
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  handleNewAppointment = (e) => {
    e.preventDefault();
    const currentUser = AuthService.getCurrentUser();
    const { date, time } = this.state;

    // Validate the time and day
    const selectedDate = new Date(date);
    const selectedTime = new Date(`2000-01-01T${time}`);
    const selectedDay = selectedDate.getDay(); // Sunday is 0, Saturday is 6

    const isValidTime =
      selectedTime.getHours() >= 7 && selectedTime.getHours() <= 18;
    const isWeekday = selectedDay >= 1 && selectedDay <= 5;

    if (!isValidTime || !isWeekday) {
      // Display an error message
      let errorMessage = "";
      if (!isValidTime) {
        errorMessage =
          "Invalid time! Please select a time between 07:00 and 18:59.";
      } else if (!isWeekday) {
        errorMessage = "Invalid day! Please select a weekday.";
      }

      this.setState({
        errorMessage,
      });

      return;
    }

    const newAppointment = {
      dateOfAppointment: selectedDate.toISOString().split("T")[0],
      timeOfAppointment: time,
    };

    UserService.createNewAppointment(
      this.state.content.centerId,
      newAppointment
    )
      .then((response) => {
        console.log(response);
        this.setState({ modalIsOpen: false, errorMessage: "" }); // Close the modal and reset error message
        // Retrieve updated appointments
        UserService.getAppointmentsByFacility(
          this.state.content.centerId,
          currentUser.token
        ).then(
          (response) => {
            this.setState({
              appointments: response.data,
            });
          },
          (error) => {
            this.setState({
              appointments:
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString(),
            });
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false, errorMessage: "" });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleMakeAvailable() {
    const currentUser = AuthService.getCurrentUser();
    UserService.makeFacilityVisible(this.state.content.centerId, currentUser.token)
      .then(() => {
        this.setState({ visibilityMessage: "Changed visibility successfully" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleMakeUnavailable() {
    const currentUser = AuthService.getCurrentUser();
    UserService.changeFacilityVisibility(
      this.state.content.centerId,
      currentUser.token
    )
      .then(() => {
        this.setState({ visibilityMessage: "Changed visibility successfully" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      content,
      appointments,
      modalIsOpen,
      date,
      time,
      errorMessage,
      visibilityMessage,
    } = this.state;
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };

    return (
      <div className="container-my-fac">
        <header className="jumbotron-my-fac">
          <h3>Facility Information</h3>
          <table>
            <tbody>
              <tr>
                <th>Center ID</th>
                <td>{content.centerId}</td>
              </tr>
              <tr>
                <th>Center Name</th>
                <td>{content.centerName}</td>
              </tr>
              <tr>
                <th>Center Address</th>
                <td>{content.centerAddress}</td>
              </tr>
              <tr>
                <th>Center Description</th>
                <td>{content.centerDescription}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="fac-name">Facility Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Patient Name</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Facility Name</th>
                <th>Facility Address</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(appointments) && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment.appointmentId}>
                    <td>{appointment.appointmentId}</td>
                    <td>
                      {appointment.user &&
                      appointment.user.firstName === "Zoki" &&
                      appointment.user.lastName === "Jankov"
                        ? "Not taken"
                        : `${appointment.user.firstName} ${appointment.user.lastName}`}
                    </td>
                    <td>{appointment.dateOfAppointment}</td>
                    <td>{appointment.timeOfAppointment}</td>
                    <td>{appointment.facility.centerName}</td>
                    <td>{appointment.facility.centerAddress}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No appointments found</td>
                </tr>
              )}
            </tbody>
          </table>
          <button onClick={this.handleOpenModal}>New Appointment</button>
          <button onClick={this.handleMakeAvailable}>Make Available</button>
          <button onClick={this.handleMakeUnavailable}>Make Unavailable</button>
          {visibilityMessage && <p>{visibilityMessage}</p>}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={this.handleCloseModal}
            style={customStyles}
            contentLabel="New Appointment"
          >
            <h2>New Appointment</h2>
            <form onSubmit={this.handleNewAppointment}>
              <label>
                Date:
                <input
                  type="date"
                  value={date}
                  onChange={this.handleChange}
                  name="date"
                  required
                />
              </label>
              <br />
              <label>
                Time:
                <input
                  type="time"
                  value={time}
                  onChange={this.handleChange}
                  name="time"
                  required
                />
              </label>
              <br />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <input type="submit" value="Submit" />
              <button onClick={this.handleCloseModal}>Close</button>
            </form>
          </Modal>
        </header>
      </div>
    );
  }
}
