import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    studytime: "",
    failures: "",
    absences: "",
    G1: "",
    G2: "",
    Medu: "",
    Fedu: "",
    internet: "",
    higher: ""
  });

  const [prediction, setPrediction] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Send data to Flask backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // Hidden/default features
          school: "GP",
          sex: "F",
          address: "U",
          famsize: "GT3",
          Pstatus: "A",
          Mjob: "other",
          Fjob: "other",
          reason: "course",
          guardian: "mother",
          traveltime: 2,
          schoolsup: "no",
          famsup: "yes",
          paid: "no",
          activities: "no",
          nursery: "yes",
          romantic: "no",
          famrel: 4,
          freetime: 3,
          goout: 3,
          Dalc: 1,
          Walc: 1,
          health: 3,

          // User inputs
          age: Number(formData.age),
          studytime: Number(formData.studytime),
          failures: Number(formData.failures),
          absences: Number(formData.absences),
          G1: Number(formData.G1),
          G2: Number(formData.G2),
          Medu: Number(formData.Medu),
          Fedu: Number(formData.Fedu),
          internet: formData.internet,
          higher: formData.higher
        })
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const result = await response.json();

      setPrediction(result.predicted_G3);
    } catch (error) {
      console.error("Error:", error);

      alert(
        "Could not connect to the Flask server.\n\nMake sure your backend is running on port 5000."
      );
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      age: "",
      studytime: "",
      failures: "",
      absences: "",
      G1: "",
      G2: "",
      Medu: "",
      Fedu: "",
      internet: "",
      higher: ""
    });

    setPrediction(null);
  };

  return (
    <div className="app">

      {/* Header */}
      <div className="header">
        <h1>🎓 Student Performance Predictor</h1>

        <p>
          Predict a student's final academic performance using Machine Learning.
        </p>
      </div>

      {/* Form Container */}
      <div className="form-container">

        <form onSubmit={handleSubmit}>

          {/* Academic Information */}
          <div className="section">

            <h2>📚 Academic Information</h2>

            <div className="form-grid">

              {/* G1 */}
              <div className="form-group">
                <label>First Period Grade (G1)</label>

                <input
                  type="number"
                  name="G1"
                  min="0"
                  max="20"
                  value={formData.G1}
                  onChange={handleChange}
                  placeholder="Enter grade (0-20)"
                  required
                />
              </div>

              {/* G2 */}
              <div className="form-group">
                <label>Second Period Grade (G2)</label>

                <input
                  type="number"
                  name="G2"
                  min="0"
                  max="20"
                  value={formData.G2}
                  onChange={handleChange}
                  placeholder="Enter grade (0-20)"
                  required
                />
              </div>

              {/* Study Time */}
              <div className="form-group">
                <label>Study Time</label>

                <select
                  name="studytime"
                  value={formData.studytime}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select study time</option>
                  <option value="1">Less than 2 hours</option>
                  <option value="2">2–5 hours</option>
                  <option value="3">5–10 hours</option>
                  <option value="4">More than 10 hours</option>
                </select>
              </div>

              {/* Past Failures */}
              <div className="form-group">
                <label>Past Failures</label>

                <select
                  name="failures"
                  value={formData.failures}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select past failures</option>
                  <option value="0">No failures</option>
                  <option value="1">1 failure</option>
                  <option value="2">2 failures</option>
                  <option value="3">3 failures</option>
                  <option value="4">4 or more failures</option>
                </select>
              </div>

              {/* Absences */}
              <div className="form-group">
                <label>Number of Absences</label>

                <input
                  type="number"
                  name="absences"
                  min="0"
                  value={formData.absences}
                  onChange={handleChange}
                  placeholder="Enter absences"
                  required
                />
              </div>

            </div>
          </div>


          {/* Student Information */}
          <div className="section">

            <h2>👨‍🎓 Student Information</h2>

            <div className="form-grid">

              {/* Age */}
              <div className="form-group">
                <label>Age</label>

                <input
                  type="number"
                  name="age"
                  min="15"
                  max="25"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  required
                />
              </div>


              {/* Mother's Education */}
              <div className="form-group">
                <label>Mother's Education</label>

                <select
                  name="Medu"
                  value={formData.Medu}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select education level</option>
                  <option value="0">None</option>
                  <option value="1">Primary Education</option>
                  <option value="2">5th–9th Grade</option>
                  <option value="3">Secondary Education</option>
                  <option value="4">Higher Education</option>
                </select>
              </div>


              {/* Father's Education */}
              <div className="form-group">
                <label>Father's Education</label>

                <select
                  name="Fedu"
                  value={formData.Fedu}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select education level</option>
                  <option value="0">None</option>
                  <option value="1">Primary Education</option>
                  <option value="2">5th–9th Grade</option>
                  <option value="3">Secondary Education</option>
                  <option value="4">Higher Education</option>
                </select>
              </div>


              {/* Internet */}
              <div className="form-group">
                <label>Internet Access</label>

                <select
                  name="internet"
                  value={formData.internet}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>


              {/* Higher Education */}
              <div className="form-group">
                <label>Wants Higher Education</label>

                <select
                  name="higher"
                  value={formData.higher}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

            </div>
          </div>


          {/* Buttons */}
          <div className="button-group">

            <button
              className="predict-button"
              type="submit"
            >
              🔮 Predict Final Grade
            </button>

            <button
              className="reset-button"
              type="button"
              onClick={handleReset}
            >
              🔄 Reset Form
            </button>

          </div>


          {/* Prediction Result */}
          {prediction !== null && (

            <div className="result">

              <h2>🎯 Predicted Final Grade</h2>

              <div className="result-score">
                {prediction.toFixed(2)} / 20
              </div>

              <p>
                Percentage:{" "}
                {((prediction / 20) * 100).toFixed(2)}%
              </p>

              <p>
                Performance:{" "}
                <strong>
                  {prediction >= 16
                    ? "Excellent"
                    : prediction >= 12
                    ? "Good"
                    : prediction >= 10
                    ? "Average"
                    : "Needs Improvement"}
                </strong>
              </p>

            </div>

          )}

        </form>

      </div>

    </div>
  );
}

export default App;