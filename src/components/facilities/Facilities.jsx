import React from 'react'
import {useState} from "react";
import axios from 'axios'
import { Component } from 'react';
import "./facilities.scss"


const facilities = [
  {
    name: 'Facility 1',
    address: '123 Main St',
    description: 'This is a description of Facility 1',
    appointments: ['9:00am', '10:00am', '11:00am']
  },
  {
    name: 'Facility 2',
    address: '123 Main St',
    description: 'This is a description of Facility 1',
    appointments: ['9:00am', '10:00am', '11:00am']
  },
  {
    name: 'Facility 3',
    address: '123 Main St',
    description: 'This is a description of Facility 1',
    appointments: ['9:00am', '10:00am', '11:00am']
  },
  {
    name: 'Facility 4',
    address: '123 Main St',
    description: 'This is a description of Facility 1',
    appointments: ['9:00am', '10:00am', '11:00am']
  },
  {
    name: 'Facility 5',
    address: '456 Main St',
    description: 'This is a description of Facility 2',
    appointments: ['9:00am', '10:00am', '11:00am']
  },
  {
    name: 'Facility 6',
    address: '789 Main St',
    description: 'This is a description of Facility 3',
    appointments: ['9:00am', '10:00am', '11:00am']
  }
];

function Facilities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(null);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleFacilitySelect = facility => {
    setSelectedFacility(facility);
  };

  const handleFacilityClose = () => {
    setSelectedFacility(null);
  };

  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="facility" key={facility.name}>
            <h2>{facility.name}</h2>
            <p>{facility.address}</p>
            <button onClick={() => handleFacilitySelect(facility)}>
              See more
            </button>
          </div>
        ))}
      </div>
      {selectedFacility && (
        <div className="facility-overlay">
          <div className="facility-detail">
            <h2>{selectedFacility.name}</h2>
            <p>{selectedFacility.description}</p>
            <h3>Available appointments:</h3>
            <ul>
              {selectedFacility.appointments.map(appointment => (
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