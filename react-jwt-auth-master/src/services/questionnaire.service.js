import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/questionnaires/";

class QuestionnaireService {
  submit(
    dateOfQuestionnaire,
    firstName,
    parentName,
    lastName,
    jmbg,
    dateOfBirth,
    gender,
    address,
    city,
    phoneNumber,
    workplace,
    job,
    timesGiven,
    bloodType,
    accepted,
    drunkAlcohol,
    hadTattoo,
    dangerousJob
  ) {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const token = currentUser.token;
    const userId = currentUser.id;

    return axios.post(
      API_URL + "submit",
      {
        dateOfQuestionnaire,
        firstName,
        parentName,
        lastName,
        jmbg,
        dateOfBirth,
        gender,
        address,
        city,
        phoneNumber,
        workplace,
        job,
        timesGiven,
        bloodType,
        accepted,
        drunkAlcohol,
        hadTattoo,
        dangerousJob,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export default new QuestionnaireService();
