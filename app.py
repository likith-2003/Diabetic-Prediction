from flask import Flask, request, jsonify, send_from_directory
import os
import math

app = Flask(__name__, static_folder='.')

port = int(os.environ.get("PORT", 10000))

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

if __name__ == "__main__":
    print("==================================================")
    print("   GlycoPredict AI - Flask Backend")
    print("==================================================")
    print(f"Starting server on port {port}")

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )
