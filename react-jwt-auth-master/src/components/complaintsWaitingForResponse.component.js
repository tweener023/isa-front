import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import authService from "../services/auth.service";
import "../styles/complaintsWaitingForResponse.scss";

export default function ComplaintsWaitingForResponse() {
  const { userId } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const token = authService.getJwt();
  const user = authService.getCurrentUser();
  const userFirstName = user.firstName;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/complaints/waitingForResponse`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, [userId]);

  const handleOpenPopup = (complaint) => {
    setSelectedComplaint(complaint);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedComplaint(null);
    setAnswerText("");
    setShowPopup(false);
  };

  const handleAnswerSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/answers/answer",
        {
          complaintId: selectedComplaint.complaintId,
          answerToComplaintText: answerText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Answer submitted successfully:", response.data);

      handleClosePopup();

      window.location.reload();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="fillingComplaint">
      <h1 style={{ marginBottom: "5rem" }}>Complaints Waiting For Response</h1>
      <div className="complaintsContainer">
        {complaints.map((complaint) => (
          <div key={complaint.complaintId} className="complaint">
            <div className="complaintHeader">Complaint</div>
            <div className="complaintText">{complaint.complaintText}</div>
            <button
              onClick={() => handleOpenPopup(complaint)}
              style={{ marginTop: "1rem" }}
            >
              Answer Complaint
            </button>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Answer To Complaint</h2>
            <div>
              <textarea
                id="answerText"
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
              ></textarea>
            </div>
            <div>
              <button onClick={handleAnswerSubmit}>Submit</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
