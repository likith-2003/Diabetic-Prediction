from flask import Flask, request, jsonify, send_from_directory
import os
import math

app = Flask(__name__, static_folder='.')

# Logistic regression coefficients matching JS calculations
MODEL_COEFFICIENTS = {
    "Intercept": -8.404,
    "Pregnancies": 0.123,
    "Glucose": 0.035,
    "BloodPressure": -0.013,
    "SkinThickness": 0.0006,
    "Insulin": -0.0001,
    "BMI": 0.089,
    "DiabetesPedigreeFunction": 0.945,
    "Age": 0.015
}

# Static file serving routes
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# Diabetes prediction API endpoint
@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input parameters provided"}), 400

        # Calculate prediction log-odds (z)
        z = MODEL_COEFFICIENTS["Intercept"]
        z += MODEL_COEFFICIENTS["Pregnancies"] * float(data.get("Pregnancies", 0))
        z += MODEL_COEFFICIENTS["Glucose"] * float(data.get("Glucose", 0))
        z += MODEL_COEFFICIENTS["BloodPressure"] * float(data.get("BloodPressure", 0))
        z += MODEL_COEFFICIENTS["SkinThickness"] * float(data.get("SkinThickness", 0))
        z += MODEL_COEFFICIENTS["Insulin"] * float(data.get("Insulin", 0))
        z += MODEL_COEFFICIENTS["BMI"] * float(data.get("BMI", 0))
        z += MODEL_COEFFICIENTS["DiabetesPedigreeFunction"] * float(data.get("DiabetesPedigreeFunction", 0))
        z += MODEL_COEFFICIENTS["Age"] * float(data.get("Age", 0))

        # Sigmoid function to map odds to probability
        probability = 1.0 / (1.0 + math.exp(-z))
        probability_percent = round(probability * 100, 1)

        # Risk Classification & Recommendations
        if probability_percent < 30.0:
            risk_level = "Low Risk"
            recs = [
                "Maintain a balanced diet rich in fiber, whole grains, and lean proteins.",
                "Engage in regular moderate aerobic exercise (at least 150 minutes per week).",
                "Keep routine annual medical check-ups to monitor glucose levels.",
                "Stay hydrated and prioritize healthy sleeping cycles."
            ]
        elif probability_percent < 70.0:
            risk_level = "Medium Risk"
            recs = [
                "Consider consultation with a physician for a formal HbA1c screening.",
                "Moderate intake of refined carbohydrates, sugary beverages, and processed foods.",
                "Aim for gentle, sustainable weight management if your BMI is over 25.",
                "Incorporate strength training and active lifestyle choices to boost insulin sensitivity."
            ]
        else:
            risk_level = "High Risk"
            recs = [
                "Schedule an appointment with an endocrinologist or primary care physician promptly.",
                "Ask for a comprehensive metabolic panel, including fasting glucose and HbA1c tests.",
                "Closely monitor daily glucose levels under professional medical supervision.",
                "Develop a clinical nutrition and exercise plan tailored to your glycemic index responsiveness.",
                "Learn and watch for warning symptoms such as polyuria, polydipsia, or unexplained fatigue."
            ]

        return jsonify({
            "probability": probability,
            "probabilityPercent": str(probability_percent),
            "riskLevel": risk_level,
            "recommendations": recs
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("==================================================")
    print("   GlycoPredict AI - Flask Python API Backend")
    print("==================================================")
    print(f"Starting server on port: {port}")
    print(f"Web Dashboard: http://localhost:{port}/")
    print(f"API Endpoint:  http://localhost:{port}/api/predict")
    print("--------------------------------------------------")
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
