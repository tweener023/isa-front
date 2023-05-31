import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/appointments.scss";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { facilityId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/test/appointments/byCenter/${facilityId}`)
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);

        // Sort the appointments
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
      });
  }, [facilityId, sortBy, sortOrder]);

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
      <div className="appointment-list">
        {appointments.map((appointment) => (
          <div
            className="appointment"
            key={appointment.appointmentId}
            onClick={() => handleAppointmentSelect(appointment)}
          >
            <h2>Appointment ID: {appointment.appointmentId}</h2>
            <p>Facility: {appointment.facility.centerName}</p>
            <p>Date: {appointment.dateOfAppointment}</p>
            <p>Time: {appointment.timeOfAppointment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
