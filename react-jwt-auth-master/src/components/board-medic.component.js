import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";


export default class BoardMedic extends Component {
  constructor(props) {
    super(props);

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

  render() {
    const {content} = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
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
              <tr>
                <th>Center Appointments</th>
                <td>{content.centerAppointments}</td>
              </tr>
              <tr>
                <th>Center Supplies</th>
                <td>{content.centerSupplies}</td>
              </tr>
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}