import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import Modal from "react-modal"
import axios from "axios";
import "../styles/myfacilities.scss";
Modal.setAppElement('#root'); // root is the id of the root element in your application


export default class BoardMedic extends Component {
  constructor(props) {
    super(props);
    this.handleNewAppointment = this.handleNewAppointment.bind(this);
    this.state = {
      content: "",
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
    const { date, time } = this.state;
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8080/api/appointments/facility/{centerId}", { date, time }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        this.setState({
          appointments: [...this.state.appointments, response.data],
          modalIsOpen: false
        });
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred while creating the appointment");
      });
  };
  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  };
  render() {
    const { content, appointments, modalIsOpen, date, time } = this.state;
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
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
          <h3 className="fac-name">Facility appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Patient Name</th>
                <th>Appointment Date</th>
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
                      {appointment.user
                        ? `${appointment.user.firstName} ${appointment.user.lastName}`
                        : "Not taken"}
                    </td>
                    <td>{appointment.date}</td>
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
          <div id = "root">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.handleCloseModal}
          style={customStyles}
          contentLabel="New Appointment"
        >
          <h2>New Appointment</h2>
          <form onSubmit={this.handleSubmit}>
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
            <input type="submit" value="Submit" />
            <button onClick={this.handleCloseModal}>Close</button>
            </form>
        </Modal>
       </div> 
        </header>
      </div>
    );
  }
}
