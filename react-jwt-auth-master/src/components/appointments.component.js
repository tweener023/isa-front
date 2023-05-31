import React, { useState, useEffect } from "react";
import "../styles/appointments.scss";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:8080/api/test/appointments/all")
      .then((response) => response.json())
      .then((data) => setAppointments(data));
  }, []);

  const handleSort = (sortField) => {
    if (sortField === sortBy) {
      // If the same field is clicked, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different field is clicked, set the new sort field and default to ascending order
      setSortBy(sortField);
      setSortOrder("asc");
    }
  };

  let sortedAppointments = appointments.slice();
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

  return (
    <div className="Appointments" id="appointments">
      <header className="App-header">
        <h1 className="FacilityH1">Appointments</h1>
        <div className="search-bar">
          <button
            className={`sort-button ${sortBy === "date" ? "active" : ""}`}
            onClick={() => handleSort("name")}
          >
            Sort by Date
          </button>
          <button
            className={`sort-button ${sortBy === "time" ? "active" : ""}`}
            onClick={() => handleSort("supplies")}
          >
            Sort by Time
          </button>
        </div>
      </header>
      {/* Render the appointments data */}
      {appointments.map((appointment) => (
        <div key={appointment.appointmentId}>
          <h2>Appointment ID: {appointment.appointmentId}</h2>
          {/* Render other appointment details */}
          <p>User: {appointment.user.username}</p>
          <p>Date: {appointment.dateOfAppointment}</p>
          <p>Time: {appointment.timeOfAppointment}</p>
          {/* Render other appointment details */}
        </div>
      ))}
    </div>
  );
}
