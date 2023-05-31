import React, { useState, useEffect } from "react";
import "../styles/facilities.scss";
import { Link } from "react-router-dom";

export default function Facilities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:8080/api/test/facilities/all")
      .then((response) => response.json())
      .then((data) => setFacilities(data));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
  };

  const handleFacilityClose = () => {
    setSelectedFacility(null);
  };

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

  const filteredFacilities = facilities.filter(
    (facility) =>
      facility &&
      facility.centerName &&
      facility.centerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedFacilities = filteredFacilities.slice();

  if (sortBy === "name") {
    sortedFacilities.sort((a, b) => {
      const nameA = a.centerName.toLowerCase();
      const nameB = b.centerName.toLowerCase();
      if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
      if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  } else if (sortBy === "supplies") {
    sortedFacilities.sort((a, b) => {
      return sortOrder === "asc"
        ? a.centerSupplies - b.centerSupplies
        : b.centerSupplies - a.centerSupplies;
    });
  }

  return (
    <div className="Facilities" id="facilities">
      <header className="App-header">
        <h1 className="FacilityH1">Facilities</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            className={`sort-button ${sortBy === "name" ? "active" : ""}`}
            onClick={() => handleSort("name")}
          >
            Sort by Name
          </button>
          <button
            className={`sort-button ${sortBy === "supplies" ? "active" : ""}`}
            onClick={() => handleSort("supplies")}
          >
            Sort by Supplies
          </button>
        </div>
      </header>
      <div className="facility-list">
        {sortedFacilities.map((facility) => (
          <Facility
            facility={facility}
            onSelect={handleFacilitySelect}
            key={facility.centerId}
          />
        ))}
      </div>
      {selectedFacility !== null && (
        <div className="facility-overlay">
          <div className="facility-detail">
            <h2>{selectedFacility.centerName}</h2>
            <p>Center description: {selectedFacility.centerDescription}</p>
            <p>Number of supplies: {selectedFacility.centerSupplies}</p>
            <button onClick={handleFacilityClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Facility({ facility, onSelect }) {
  const handleAppointmentClick = () => {
    onSelect(facility);
  };

  return (
    <div className="facility" key={facility.centerId}>
      <h2>{facility.centerName}</h2>
      <p>{facility.centerAddress}</p>
      <div className="button-container">
        <button onClick={handleAppointmentClick}>See more</button>
        <Link
          to={`/appointments/${facility.centerId}`}
          className="btn btn-primary"
        >
          Appointments
        </Link>
      </div>
    </div>
  );
}
