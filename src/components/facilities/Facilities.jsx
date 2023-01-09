import React from 'react'
import {useState} from "react";
import axios from 'axios'
import { Component } from 'react';
import "./facilities.scss"
import { useEffect } from 'react';

function Facilities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/facilites/all')
      .then(response => response.json())
      .then(data => setFacilities(data));
  }, []);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleFacilitySelect = facility => {
    setSelectedFacility(facility);
  };

  const handleFacilityClose = () => {
    setSelectedFacility(null);
  };

  const filteredFacilities = facilities?.filter(facility =>
    facility.centerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Facilities" id = "facilities">
      <header className="App-header">
        <h1>Facilities</h1>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </header>
      <div className="facility-list">
        {filteredFacilities.map(facility => (
          <div className="facility" key={facility.centerName}>
            <h2>{facility.centerName}</h2>
            <p>{facility.centerAddress}</p>
            <button onClick={() => handleFacilitySelect(facility)}>
              See more
            </button>
          </div>
        ))}
      </div>
      {selectedFacility?.centerAppointments && (
        <div className="facility-overlay">
          <div className="facility-detail">
            <h2>{selectedFacility.centerName}</h2>
            <p>{selectedFacility.centerDescription}</p>
            <h3>Available appointments:</h3>
            <ul>
              {selectedFacility.centerAppointments.map(appointment => (
                <li key={appointment}>{appointment}</li>
              ))}
            </ul>
            <button onClick={handleFacilityClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Facilities;
