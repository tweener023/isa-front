import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthService from "../services/auth.service";

export default function ScheaduledAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const token = AuthService.getJwt();
  const { userId } = useParams();
  const [conflictMessage, setConflictMessage] = useState("");

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/userFuture/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        let sortedAppointments = data.slice();
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
  }, [userId, sortBy, sortOrder, token]);

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

  const cancelAppointment = async (appointment) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/${appointment.appointmentId}/user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Appointment canceled successfully
        // You may want to update the appointments list by fetching the updated data
        fetchAppointments();
      } else if (response.status === 403) {
        const message = await response.text();
        console.log("Appointment cancellation forbidden:", message);
        setConflictMessage(message);
      } else {
        console.log("Error canceling appointment");
      }
    } catch (error) {
      console.error("Error canceling appointment", error);
    }
  };

  return (
    <div className="Appointments" id="appointments">
      <header className="App-header">
        <h1 className="FacilityH1">Scheaduled Appointments</h1>
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
            onClick={() => cancelAppointment(appointment)}
          >
            <h2>Facility: {appointment.facility.centerName}</h2>
            <p>Date: {appointment.dateOfAppointment}</p>
            <p>Time: {appointment.timeOfAppointment}</p>
            <button onClick={() => cancelAppointment(appointment)}>
              Cancel Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
