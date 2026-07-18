import streamlit as st
import pandas as pd
import joblib
import math

st.set_page_config(
    page_title="Diabetes Prediction Dashboard",
    page_icon="🩺",
    layout="wide",
    initial_sidebar_state="expanded"
)

st.title("🩺 GlycoPredict AI")
st.subheader("AI-Powered Diabetes Prediction Dashboard")

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

preg = st.number_input("Pregnancies", 0, 20, 0)
glu = st.number_input("Glucose", 0, 300, 120)
bp = st.number_input("Blood Pressure", 0, 200, 70)
skin = st.number_input("Skin Thickness", 0, 100, 20)
ins = st.number_input("Insulin", 0, 900, 79)
bmi = st.number_input("BMI", 0.0, 70.0, 25.0)
dpf = st.number_input("Diabetes Pedigree Function", 0.0, 3.0, 0.5)
age = st.number_input("Age", 1, 120, 30)

if st.button("Predict"):
    z = MODEL_COEFFICIENTS["Intercept"]
    z += MODEL_COEFFICIENTS["Pregnancies"] * preg
    z += MODEL_COEFFICIENTS["Glucose"] * glu
    z += MODEL_COEFFICIENTS["BloodPressure"] * bp
    z += MODEL_COEFFICIENTS["SkinThickness"] * skin
    z += MODEL_COEFFICIENTS["Insulin"] * ins
    z += MODEL_COEFFICIENTS["BMI"] * bmi
    z += MODEL_COEFFICIENTS["DiabetesPedigreeFunction"] * dpf
    z += MODEL_COEFFICIENTS["Age"] * age

    probability = 1 / (1 + math.exp(-z))
    probability_percent = probability * 100

    st.metric("Probability", f"{probability_percent:.1f}%")

    if probability_percent < 30:
        st.success("🟢 Low Risk")
    elif probability_percent < 70:
        st.warning("🟡 Medium Risk")
    else:
        st.error("🔴 High Risk")
