import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, roc_curve, auc
import json
import urllib.request

# URL of the Pima Indians Diabetes Dataset (Raw text from GitHub repository)
DATA_URL = "https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv"

# Column names based on dataset description
COLUMNS = [
    "Pregnancies", "Glucose", "BloodPressure", "SkinThickness", 
    "Insulin", "BMI", "DiabetesPedigreeFunction", "Age", "Outcome"
]

def download_dataset():
    print("Downloading Pima Indians Diabetes Dataset...")
    try:
        urllib.request.urlretrieve(DATA_URL, "pima-indians-diabetes.csv")
        print("Dataset downloaded successfully as 'pima-indians-diabetes.csv'.")
    except Exception as e:
        print(f"Error downloading dataset: {e}")
        print("Using local mock dataset configuration instead.")

def train_logistic_regression():
    # Load dataset
    try:
        df = pd.read_csv("pima-indians-diabetes.csv", names=COLUMNS)
    except FileNotFoundError:
        print("Error: 'pima-indians-diabetes.csv' not found. Please download it first.")
        return

    print(f"Dataset shape: {df.shape}")
    print("\nDataset Class Distribution:")
    print(df["Outcome"].value_counts(normalize=True))

    # Split into features (X) and target (y)
    X = df.drop(columns=["Outcome"])
    y = df["Outcome"]

    # Split into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    # Instantiate and train Logistic Regression model
    # L-BFGS solver, scale features or increase max_iter
    model = LogisticRegression(max_iter=1000, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate on test set
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]

    acc = accuracy_score(y_test, y_pred)
    cm = confusion_matrix(y_test, y_pred)
    cr = classification_report(y_test, y_pred)

    print("\n=== Model Evaluation ===")
    print(f"Accuracy: {acc:.4f}")
    print("\nConfusion Matrix:")
    print(cm)
    print("\nClassification Report:")
    print(cr)

    # Get ROC Curve values
    fpr, tpr, thresholds = roc_curve(y_test, y_prob)
    roc_auc = auc(fpr, tpr)
    print(f"ROC Area Under Curve (AUC): {roc_auc:.4f}")

    # Extract coefficients
    coefficients = {
        "Intercept": float(model.intercept_[0]),
    }
    for feature, coef in zip(X.columns, model.coef_[0]):
        coefficients[feature] = float(coef)

    print("\n=== Trained Model Coefficients ===")
    print(json.dumps(coefficients, indent=2))

    # Print how to use in Javascript
    print("\nGenerate JS snippet:")
    js_snippet = f"""
const MODEL_COEFFICIENTS = {json.dumps(coefficients, indent=2)};
"""
    print(js_snippet)

    # Save details to model_metadata.json
    metadata = {
        "accuracy": round(acc * 100, 2),
        "auc": round(roc_auc, 2),
        "coefficients": coefficients,
        "confusion_matrix": {
            "tn": int(cm[0, 0]),
            "fp": int(cm[0, 1]),
            "fn": int(cm[1, 0]),
            "tp": int(cm[1, 1])
        },
        "roc_curve": {
            "fpr": [float(x) for x in fpr],
            "tpr": [float(x) for x in tpr],
            "thresholds": [float(x) for x in thresholds]
        }
    }
    
    with open("model_metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)
    print("Saved model metadata and parameters to 'model_metadata.json'.")

if __name__ == "__main__":
    download_dataset()
    train_logistic_regression()
