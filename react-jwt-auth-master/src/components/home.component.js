import React, { Component, useState, useEffect } from "react";

import UserService from "../services/user.service";
import "../styles/facilities.scss"


export default function Home (){
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/test/facilities/all')
      .then(response => response.json())
      .then(data => setFacilities(data));
  }, []);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleFacilitySelect = facility => {
    console.log('handleFacilitySelect called with', facility);
    setSelectedFacility(facility);
    console.log('selectedFacility set to', selectedFacility);

  };

  const handleFacilityClose = () => {
    setSelectedFacility(null);
  };


   const filteredFacilities =
    facilities && facilities.length > 0
      ? facilities.filter(
          facility =>
            facility &&
            facility.centerName &&
            facility.centerName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <div className="Facilities" id = "facilities">
      <header className="App-header">
        <h1 className="FacilityH1">Facilities</h1>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </header>
      <div className="facility-list">
        {filteredFacilities.map(facility => (
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
  return (
    <div className="facility" key={facility.centerId}>
      <h2>{facility.centerName}</h2>
      <p>{facility.centerAddress}</p>
      <button onClick={() => onSelect(facility)}>See more</button>
    </div>
  );
}
