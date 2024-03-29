import React, { useState, useEffect } from "react";
import axios from "axios";
import authService from "../services/auth.service";
import "../styles/fillingComplaint.scss";

export default function WriteComplaint() {
  const currentUserId = authService.getCurrentUserId();
  const token = authService.getJwt();
  const [selectedFacilityId, setSelectedFacilityId] = useState("");
  const [pastFacilities, setPastFacilities] = useState([]);

  useEffect(() => {
    fetchPastFacilities();
  }, []);

  const fetchPastFacilities = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/facilites/userPast/${currentUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPastFacilities(response.data);
    } catch (error) {
      console.error("Error occurred while fetching past facilities");
    }
  };

  const [complaintData, setComplaintData] = useState({
    userId: currentUserId,
    facilityId: "",
    complaintText: "",
    directedTo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaintData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/complaints/sendComplaint",
        complaintData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setComplaintData({
        ...complaintData,
        facilityId: "",
        complaintText: "",
      });
    } catch (error) {
      if (error.response.status === 404) {
        console.error("User not found");
      } else if (error.response.status === 400) {
        console.error("Invalid complaint facility");
      } else {
        console.error("Error occurred while sending complaint");
      }
    }
  };

  return (
    <div className="fillingComplaint">
      <h1>Write Complaint</h1>
      <form onSubmit={handleSubmit}>
        <div className="select-row">
          <div className="select-wrapper">
            <label htmlFor="directedTo">Directed To:</label>
            <select
              id="directedTo"
              name="directedTo"
              value={complaintData.directedTo}
              onChange={handleChange}
            >
              <option value="">Select Directed To</option>
              <option value="FACILITY">Facility</option>
              <option value="STAFF">Staff</option>
            </select>
          </div>
          <div className="select-wrapper">
            <label htmlFor="facilityId">Facility Name:</label>
            <select
              id="facilityId"
              name="facilityId"
              value={complaintData.facilityId}
              onChange={handleChange}
            >
              <option value="">Select Facility</option>
              {pastFacilities.map((facility) => (
                <option key={facility.centerId} value={facility.centerId}>
                  {facility.centerName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="textarea-wrapper">
          <label htmlFor="complaintText">Complaint Text:</label>
          <textarea
            id="complaintText"
            name="complaintText"
            value={complaintData.complaintText}
            onChange={handleChange}
            className="custom-textarea"
          ></textarea>
        </div>
        <div className="button-wrapper">
          <button type="submit" className="custom-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
