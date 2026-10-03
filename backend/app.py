from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained ML model
model = joblib.load("model.pkl")


@app.route("/")
def home():
    return "Student Performance Prediction API is running!"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    student_data = pd.DataFrame([data])

    prediction = model.predict(student_data)

    return jsonify({
        "predicted_G3": float(prediction[0])
    })


if __name__ == "__main__":
    app.run(debug=True)