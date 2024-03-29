import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import authService from "../services/auth.service";
import "../styles/sentComplaints.scss";

export default function SentComplaints() {
  const { userId } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [answers, setAnswers] = useState({});
  const token = authService.getJwt();
  const user = authService.getCurrentUser();
  const userFirstName = user.firstName;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/complaints?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComplaints(response.data);
        for (const complaint of response.data) {
          if (complaint.statusOfComplaint === "RESPONDED_TO") {
            fetchAnswer(complaint.complaintId);
          }
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    const fetchAnswer = async (complaintId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/answers/byComplaint?complaintId=${complaintId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [complaintId]: response.data.answerToComplaintText,
        }));
      } catch (error) {
        console.error("Error fetching answer:", error);
      }
    };

    fetchComplaints();
  }, [userId]);

  return (
    <div className="fillingComplaint">
      <h1 style={{ marginBottom: "5rem" }}>
        Complaints Sent by {userFirstName}
      </h1>
      <div className="complaintsContainer">
        {complaints.map((complaint) => (
          <div key={complaint.complaintId} className="complaint">
            <div className="complaintHeader">Complaint</div>
            <div className="complaintText">{complaint.complaintText}</div>
            {complaint.statusOfComplaint === "RESPONDED_TO" && (
              <div className="answerToComplaint">
                <label></label>
                <span className="complaintHeader">Answer:</span>
                <div className="answerText">
                  {answers[complaint.complaintId]}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
