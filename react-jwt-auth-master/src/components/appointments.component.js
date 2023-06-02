import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/appointments.scss";
import AuthService from "../services/auth.service";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { facilityId } = useParams();
  const token = AuthService.getJwt();
  const [conflictMessage, setConflictMessage] = useState("");

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/test/appointments/byCenter/${facilityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        const filteredAppointments = data.filter(
          (appointment) => appointment.user.id === 5
        );

        // Sort the appointments
        let sortedAppointments = filteredAppointments.slice();
        if (sortBy === "date") {
          sortedAppointments.sort((a, b) => {
            const dateA = new Date(a.dateOfAppointment);
            const dateB = new Date(b.dateOfAppointment);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
          });
        } else if (sortBy === "time") {
          sortedAppointments.sort((a, b) => {
            const timeA = a.timeOfAppointment;
            const timeB = b.timeOfAppointment;
            return sortOrder === "asc"
              ? timeA.localeCompare(timeB)
              : timeB.localeCompare(timeA);
          });
        }

        setAppointments(sortedAppointments);
      } else {
        console.log("Error fetching appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [facilityId, sortBy, sortOrder, token]);

  const handleSort = (sortField) => {
    if (sortField === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortField);
      setSortOrder("asc");
    }
  };

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleAppointmentClose = () => {
    setSelectedAppointment(null);
  };

  const addAppointmentToUser = (appointment) => {
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser ? currentUser.id : null;
    fetch(`http://localhost:8080/api/users/${userId}/appointments`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Appointment added to user");
          fetchAppointments();
        } else if (response.status === 409) {
          setConflictMessage(
            "You already have an appointment from the same facility."
          );
        } else if (response.status === 403) {
          setConflictMessage(
            "You havent filled your questionnaire or you are not accepted."
          );
        } else {
          console.log("Error adding appointment to user");
        }
      })
      .catch((error) => {
        console.error("Error adding appointment to user", error);
      });
  };

  return (
    <div className="Appointments" id="appointments">
      <header className="App-header">
        <h1 className="FacilityH1">Appointments</h1>
        <div className="search-bar">
          <button
            className={`sort-button ${sortBy === "date" ? "active" : ""}`}
            onClick={() => handleSort("date")}
          >
            Sort by Date
          </button>
          <button
            className={`sort-button ${sortBy === "time" ? "active" : ""}`}
            onClick={() => handleSort("time")}
          >
            Sort by Time
          </button>
        </div>
      </header>
      {conflictMessage && <p className="error-message">{conflictMessage}</p>}
      <div className="appointment-list">
        {appointments.map((appointment) => (
          <div
            className="appointment"
            key={appointment.appointmentId}
            onClick={() => handleAppointmentSelect(appointment)}
          >
            <h2>Facility: {appointment.facility.centerName}</h2>
            <p>Date: {appointment.dateOfAppointment}</p>
            <p>Time: {appointment.timeOfAppointment}</p>
            <button onClick={() => addAppointmentToUser(appointment)}>
              Add to User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
