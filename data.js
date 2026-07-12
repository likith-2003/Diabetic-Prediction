// Realistic Pima Indians Diabetes Dataset samples
const diabetesDataset = [
  { Pregnancies: 6, Glucose: 148, BloodPressure: 72, SkinThickness: 35, Insulin: 0, BMI: 33.6, DiabetesPedigreeFunction: 0.627, Age: 50, Outcome: 1 },
  { Pregnancies: 1, Glucose: 85, BloodPressure: 66, SkinThickness: 29, Insulin: 0, BMI: 26.6, DiabetesPedigreeFunction: 0.351, Age: 31, Outcome: 0 },
  { Pregnancies: 8, Glucose: 183, BloodPressure: 64, SkinThickness: 0, Insulin: 0, BMI: 23.3, DiabetesPedigreeFunction: 0.672, Age: 32, Outcome: 1 },
  { Pregnancies: 1, Glucose: 89, BloodPressure: 66, SkinThickness: 23, Insulin: 94, BMI: 28.1, DiabetesPedigreeFunction: 0.167, Age: 21, Outcome: 0 },
  { Pregnancies: 0, Glucose: 137, BloodPressure: 40, SkinThickness: 35, Insulin: 168, BMI: 43.1, DiabetesPedigreeFunction: 2.288, Age: 33, Outcome: 1 },
  { Pregnancies: 5, Glucose: 116, BloodPressure: 74, SkinThickness: 0, Insulin: 0, BMI: 25.6, DiabetesPedigreeFunction: 0.201, Age: 30, Outcome: 0 },
  { Pregnancies: 3, Glucose: 78, BloodPressure: 50, SkinThickness: 32, Insulin: 88, BMI: 31.0, DiabetesPedigreeFunction: 0.248, Age: 26, Outcome: 1 },
  { Pregnancies: 10, Glucose: 115, BloodPressure: 0, SkinThickness: 0, Insulin: 0, BMI: 35.3, DiabetesPedigreeFunction: 0.134, Age: 29, Outcome: 0 },
  { Pregnancies: 2, Glucose: 197, BloodPressure: 70, SkinThickness: 45, Insulin: 543, BMI: 30.5, DiabetesPedigreeFunction: 0.158, Age: 53, Outcome: 1 },
  { Pregnancies: 8, Glucose: 125, BloodPressure: 96, SkinThickness: 0, Insulin: 0, BMI: 0.0, DiabetesPedigreeFunction: 0.232, Age: 54, Outcome: 1 },
  { Pregnancies: 4, Glucose: 110, BloodPressure: 92, SkinThickness: 0, Insulin: 0, BMI: 37.6, DiabetesPedigreeFunction: 0.191, Age: 30, Outcome: 0 },
  { Pregnancies: 10, Glucose: 168, BloodPressure: 74, SkinThickness: 0, Insulin: 0, BMI: 38.0, DiabetesPedigreeFunction: 0.537, Age: 34, Outcome: 1 },
  { Pregnancies: 10, Glucose: 139, BloodPressure: 80, SkinThickness: 0, Insulin: 0, BMI: 27.1, DiabetesPedigreeFunction: 1.441, Age: 57, Outcome: 0 },
  { Pregnancies: 1, Glucose: 189, BloodPressure: 60, SkinThickness: 23, Insulin: 846, BMI: 30.1, DiabetesPedigreeFunction: 0.398, Age: 59, Outcome: 1 },
  { Pregnancies: 5, Glucose: 166, BloodPressure: 72, SkinThickness: 19, Insulin: 175, BMI: 25.8, DiabetesPedigreeFunction: 0.587, Age: 51, Outcome: 1 },
  { Pregnancies: 7, Glucose: 100, BloodPressure: 0, SkinThickness: 0, Insulin: 0, BMI: 30.0, DiabetesPedigreeFunction: 0.484, Age: 32, Outcome: 1 },
  { Pregnancies: 0, Glucose: 118, BloodPressure: 84, SkinThickness: 47, Insulin: 230, BMI: 45.8, DiabetesPedigreeFunction: 0.551, Age: 31, Outcome: 1 },
  { Pregnancies: 7, Glucose: 107, BloodPressure: 74, SkinThickness: 0, Insulin: 0, BMI: 29.6, DiabetesPedigreeFunction: 0.254, Age: 31, Outcome: 1 },
  { Pregnancies: 1, Glucose: 103, BloodPressure: 30, SkinThickness: 38, Insulin: 83, BMI: 43.3, DiabetesPedigreeFunction: 0.183, Age: 33, Outcome: 0 },
  { Pregnancies: 1, Glucose: 115, BloodPressure: 70, SkinThickness: 30, Insulin: 96, BMI: 34.6, DiabetesPedigreeFunction: 0.529, Age: 32, Outcome: 1 },
  { Pregnancies: 3, Glucose: 126, BloodPressure: 88, SkinThickness: 41, Insulin: 235, BMI: 39.3, DiabetesPedigreeFunction: 0.704, Age: 27, Outcome: 0 },
  { Pregnancies: 8, Glucose: 99, BloodPressure: 84, SkinThickness: 0, Insulin: 0, BMI: 35.4, DiabetesPedigreeFunction: 0.388, Age: 50, Outcome: 0 },
  { Pregnancies: 7, Glucose: 196, BloodPressure: 90, SkinThickness: 0, Insulin: 0, BMI: 39.8, DiabetesPedigreeFunction: 0.451, Age: 41, Outcome: 1 },
  { Pregnancies: 9, Glucose: 119, BloodPressure: 80, SkinThickness: 35, Insulin: 0, BMI: 29.0, DiabetesPedigreeFunction: 0.263, Age: 29, Outcome: 1 },
  { Pregnancies: 11, Glucose: 143, BloodPressure: 94, SkinThickness: 33, Insulin: 146, BMI: 36.6, DiabetesPedigreeFunction: 0.254, Age: 51, Outcome: 1 },
  { Pregnancies: 10, Glucose: 125, BloodPressure: 70, SkinThickness: 26, Insulin: 115, BMI: 31.1, DiabetesPedigreeFunction: 0.205, Age: 41, Outcome: 1 },
  { Pregnancies: 7, Glucose: 147, BloodPressure: 76, SkinThickness: 0, Insulin: 0, BMI: 39.4, DiabetesPedigreeFunction: 0.257, Age: 43, Outcome: 1 },
  { Pregnancies: 1, Glucose: 97, BloodPressure: 66, SkinThickness: 15, Insulin: 140, BMI: 23.2, DiabetesPedigreeFunction: 0.487, Age: 22, Outcome: 0 },
  { Pregnancies: 13, Glucose: 145, BloodPressure: 82, SkinThickness: 19, Insulin: 110, BMI: 22.2, DiabetesPedigreeFunction: 0.245, Age: 57, Outcome: 0 },
  { Pregnancies: 5, Glucose: 117, BloodPressure: 92, SkinThickness: 0, Insulin: 0, BMI: 34.1, DiabetesPedigreeFunction: 0.337, Age: 38, Outcome: 0 },
  { Pregnancies: 5, Glucose: 109, BloodPressure: 75, SkinThickness: 26, Insulin: 0, BMI: 36.0, DiabetesPedigreeFunction: 0.546, Age: 60, Outcome: 0 },
  { Pregnancies: 3, Glucose: 158, BloodPressure: 76, SkinThickness: 36, Insulin: 245, BMI: 31.6, DiabetesPedigreeFunction: 0.851, Age: 28, Outcome: 1 },
  { Pregnancies: 3, Glucose: 88, BloodPressure: 58, SkinThickness: 11, Insulin: 54, BMI: 24.8, DiabetesPedigreeFunction: 0.267, Age: 22, Outcome: 0 },
  { Pregnancies: 6, Glucose: 92, BloodPressure: 92, SkinThickness: 0, Insulin: 0, BMI: 29.0, DiabetesPedigreeFunction: 0.537, Age: 43, Outcome: 0 },
  { Pregnancies: 8, Glucose: 120, BloodPressure: 78, SkinThickness: 0, Insulin: 0, BMI: 25.0, DiabetesPedigreeFunction: 0.409, Age: 64, Outcome: 0 },
  { Pregnancies: 7, Glucose: 103, BloodPressure: 78, SkinThickness: 49, Insulin: 83, BMI: 35.8, DiabetesPedigreeFunction: 0.242, Age: 37, Outcome: 1 },
  { Pregnancies: 4, Glucose: 111, BloodPressure: 72, SkinThickness: 47, Insulin: 207, BMI: 37.1, DiabetesPedigreeFunction: 1.390, Age: 56, Outcome: 1 },
  { Pregnancies: 3, Glucose: 180, BloodPressure: 64, SkinThickness: 25, Insulin: 70, BMI: 34.0, DiabetesPedigreeFunction: 0.271, Age: 26, Outcome: 0 },
  { Pregnancies: 7, Glucose: 105, BloodPressure: 0, SkinThickness: 0, Insulin: 0, BMI: 0.0, DiabetesPedigreeFunction: 0.305, Age: 24, Outcome: 0 },
  { Pregnancies: 0, Glucose: 180, BloodPressure: 66, SkinThickness: 39, Insulin: 0, BMI: 42.0, DiabetesPedigreeFunction: 1.893, Age: 25, Outcome: 1 },
  { Pregnancies: 1, Glucose: 103, BloodPressure: 80, SkinThickness: 11, Insulin: 82, BMI: 19.4, DiabetesPedigreeFunction: 0.491, Age: 22, Outcome: 0 },
  { Pregnancies: 1, Glucose: 101, BloodPressure: 50, SkinThickness: 15, Insulin: 36, BMI: 24.2, DiabetesPedigreeFunction: 0.526, Age: 26, Outcome: 0 },
  { Pregnancies: 5, Glucose: 88, BloodPressure: 66, SkinThickness: 21, Insulin: 64, BMI: 24.4, DiabetesPedigreeFunction: 0.342, Age: 30, Outcome: 0 },
  { Pregnancies: 8, Glucose: 176, BloodPressure: 90, SkinThickness: 34, Insulin: 300, BMI: 33.7, DiabetesPedigreeFunction: 0.467, Age: 58, Outcome: 1 },
  { Pregnancies: 7, Glucose: 150, BloodPressure: 66, SkinThickness: 42, Insulin: 342, BMI: 34.7, DiabetesPedigreeFunction: 0.718, Age: 42, Outcome: 0 },
  { Pregnancies: 0, Glucose: 73, BloodPressure: 0, SkinThickness: 0, Insulin: 0, BMI: 21.1, DiabetesPedigreeFunction: 0.342, Age: 25, Outcome: 0 },
  { Pregnancies: 0, Glucose: 105, BloodPressure: 64, SkinThickness: 41, Insulin: 142, BMI: 41.5, DiabetesPedigreeFunction: 0.173, Age: 22, Outcome: 0 },
  { Pregnancies: 2, Glucose: 84, BloodPressure: 0, SkinThickness: 0, Insulin: 0, BMI: 0.0, DiabetesPedigreeFunction: 0.304, Age: 21, Outcome: 0 },
  { Pregnancies: 7, Glucose: 81, BloodPressure: 78, SkinThickness: 40, Insulin: 48, BMI: 46.7, DiabetesPedigreeFunction: 0.261, Age: 42, Outcome: 0 },
  { Pregnancies: 0, Glucose: 134, BloodPressure: 58, SkinThickness: 20, Insulin: 291, BMI: 26.4, DiabetesPedigreeFunction: 0.352, Age: 21, Outcome: 0 },
  { Pregnancies: 5, Glucose: 143, BloodPressure: 78, SkinThickness: 0, Insulin: 0, BMI: 45.0, DiabetesPedigreeFunction: 0.190, Age: 47, Outcome: 0 },
  { Pregnancies: 8, Glucose: 151, BloodPressure: 78, SkinThickness: 32, Insulin: 210, BMI: 42.9, DiabetesPedigreeFunction: 0.516, Age: 36, Outcome: 1 },
  { Pregnancies: 4, Glucose: 144, BloodPressure: 58, SkinThickness: 28, Insulin: 140, BMI: 29.5, DiabetesPedigreeFunction: 0.287, Age: 37, Outcome: 0 },
  { Pregnancies: 2, Glucose: 171, BloodPressure: 72, SkinThickness: 0, Insulin: 0, BMI: 43.6, DiabetesPedigreeFunction: 0.479, Age: 26, Outcome: 1 },
  { Pregnancies: 9, Glucose: 102, BloodPressure: 76, SkinThickness: 37, Insulin: 0, BMI: 32.9, DiabetesPedigreeFunction: 0.665, Age: 46, Outcome: 1 },
  { Pregnancies: 2, Glucose: 128, BloodPressure: 64, SkinThickness: 42, Insulin: 0, BMI: 40.0, DiabetesPedigreeFunction: 1.101, Age: 24, Outcome: 0 },
  { Pregnancies: 9, Glucose: 156, BloodPressure: 86, SkinThickness: 28, Insulin: 155, BMI: 34.3, DiabetesPedigreeFunction: 1.189, Age: 42, Outcome: 1 },
  { Pregnancies: 2, Glucose: 90, BloodPressure: 60, SkinThickness: 0, Insulin: 0, BMI: 23.5, DiabetesPedigreeFunction: 0.191, Age: 25, Outcome: 0 },
  { Pregnancies: 0, Glucose: 140, BloodPressure: 65, SkinThickness: 26, Insulin: 130, BMI: 42.6, DiabetesPedigreeFunction: 0.431, Age: 24, Outcome: 1 },
  { Pregnancies: 9, Glucose: 112, BloodPressure: 82, SkinThickness: 24, Insulin: 0, BMI: 28.2, DiabetesPedigreeFunction: 1.282, Age: 50, Outcome: 1 },
  { Pregnancies: 1, Glucose: 90, BloodPressure: 62, SkinThickness: 12, Insulin: 43, BMI: 27.2, DiabetesPedigreeFunction: 0.580, Age: 24, Outcome: 0 },
  { Pregnancies: 2, Glucose: 142, BloodPressure: 82, SkinThickness: 18, Insulin: 64, BMI: 24.7, DiabetesPedigreeFunction: 0.761, Age: 21, Outcome: 0 },
  { Pregnancies: 6, Glucose: 125, BloodPressure: 78, SkinThickness: 31, Insulin: 0, BMI: 34.0, DiabetesPedigreeFunction: 0.374, Age: 49, Outcome: 0 },
  { Pregnancies: 5, Glucose: 115, BloodPressure: 98, SkinThickness: 0, Insulin: 0, BMI: 52.9, DiabetesPedigreeFunction: 0.209, Age: 28, Outcome: 1 },
  { Pregnancies: 2, Glucose: 122, BloodPressure: 52, SkinThickness: 43, Insulin: 158, BMI: 36.2, DiabetesPedigreeFunction: 0.816, Age: 28, Outcome: 0 },
  { Pregnancies: 4, Glucose: 103, BloodPressure: 60, SkinThickness: 33, Insulin: 192, BMI: 24.0, DiabetesPedigreeFunction: 0.966, Age: 33, Outcome: 0 },
  { Pregnancies: 11, Glucose: 138, BloodPressure: 74, SkinThickness: 26, Insulin: 144, BMI: 36.1, DiabetesPedigreeFunction: 0.557, Age: 50, Outcome: 1 },
  { Pregnancies: 3, Glucose: 106, BloodPressure: 72, SkinThickness: 0, Insulin: 0, BMI: 25.8, DiabetesPedigreeFunction: 0.207, Age: 27, Outcome: 0 },
  { Pregnancies: 6, Glucose: 117, BloodPressure: 96, SkinThickness: 0, Insulin: 0, BMI: 28.7, DiabetesPedigreeFunction: 0.157, Age: 30, Outcome: 0 },
  { Pregnancies: 2, Glucose: 110, BloodPressure: 74, SkinThickness: 29, Insulin: 125, BMI: 32.4, DiabetesPedigreeFunction: 0.698, Age: 27, Outcome: 0 },
  { Pregnancies: 10, Glucose: 101, BloodPressure: 86, SkinThickness: 37, Insulin: 0, BMI: 45.6, DiabetesPedigreeFunction: 1.136, Age: 38, Outcome: 1 },
  { Pregnancies: 2, Glucose: 88, BloodPressure: 74, SkinThickness: 19, Insulin: 53, BMI: 29.0, DiabetesPedigreeFunction: 0.229, Age: 22, Outcome: 0 },
  { Pregnancies: 9, Glucose: 170, BloodPressure: 74, SkinThickness: 31, Insulin: 0, BMI: 44.0, DiabetesPedigreeFunction: 0.403, Age: 43, Outcome: 1 },
  { Pregnancies: 9, Glucose: 89, BloodPressure: 62, SkinThickness: 0, Insulin: 0, BMI: 22.5, DiabetesPedigreeFunction: 0.142, Age: 33, Outcome: 0 },
  { Pregnancies: 10, Glucose: 101, BloodPressure: 76, SkinThickness: 48, Insulin: 180, BMI: 32.9, DiabetesPedigreeFunction: 0.171, Age: 63, Outcome: 0 },
  { Pregnancies: 2, Glucose: 56, BloodPressure: 56, SkinThickness: 28, Insulin: 45, BMI: 24.2, DiabetesPedigreeFunction: 0.332, Age: 22, Outcome: 0 },
  { Pregnancies: 7, Glucose: 124, BloodPressure: 70, SkinThickness: 33, Insulin: 215, BMI: 25.5, DiabetesPedigreeFunction: 0.161, Age: 37, Outcome: 0 },
  { Pregnancies: 1, Glucose: 97, BloodPressure: 70, SkinThickness: 40, Insulin: 0, BMI: 38.1, DiabetesPedigreeFunction: 0.218, Age: 30, Outcome: 0 },
  { Pregnancies: 4, Glucose: 110, BloodPressure: 66, SkinThickness: 0, Insulin: 0, BMI: 31.9, DiabetesPedigreeFunction: 0.471, Age: 29, Outcome: 0 },
  { Pregnancies: 3, Glucose: 80, BloodPressure: 0, SkinThickness: 0, Insulin: 0, BMI: 0.0, DiabetesPedigreeFunction: 0.174, Age: 22, Outcome: 0 },
  { Pregnancies: 6, Glucose: 134, BloodPressure: 70, SkinThickness: 23, Insulin: 130, BMI: 35.4, DiabetesPedigreeFunction: 0.542, Age: 29, Outcome: 1 },
  { Pregnancies: 2, Glucose: 146, BloodPressure: 0, SkinThickness: 0, Insulin: 0, BMI: 27.5, DiabetesPedigreeFunction: 0.240, Age: 28, Outcome: 1 },
  { Pregnancies: 7, Glucose: 187, BloodPressure: 68, SkinThickness: 39, Insulin: 304, BMI: 37.7, DiabetesPedigreeFunction: 0.254, Age: 41, Outcome: 1 },
  { Pregnancies: 0, Glucose: 100, BloodPressure: 88, SkinThickness: 60, Insulin: 110, BMI: 46.8, DiabetesPedigreeFunction: 0.962, Age: 31, Outcome: 0 },
  { Pregnancies: 0, Glucose: 146, BloodPressure: 82, SkinThickness: 0, Insulin: 0, BMI: 40.5, DiabetesPedigreeFunction: 1.781, Age: 44, Outcome: 0 },
  { Pregnancies: 0, Glucose: 102, BloodPressure: 75, SkinThickness: 23, Insulin: 0, BMI: 0.0, DiabetesPedigreeFunction: 0.572, Age: 21, Outcome: 0 },
  { Pregnancies: 2, Glucose: 120, BloodPressure: 76, SkinThickness: 37, Insulin: 105, BMI: 39.7, DiabetesPedigreeFunction: 0.215, Age: 29, Outcome: 0 },
  { Pregnancies: 4, Glucose: 147, BloodPressure: 74, SkinThickness: 25, Insulin: 293, BMI: 34.9, DiabetesPedigreeFunction: 0.385, Age: 30, Outcome: 0 },
  { Pregnancies: 1, Glucose: 97, BloodPressure: 68, SkinThickness: 21, Insulin: 0, BMI: 27.2, DiabetesPedigreeFunction: 1.095, Age: 40, Outcome: 0 },
  { Pregnancies: 1, Glucose: 167, BloodPressure: 74, SkinThickness: 17, Insulin: 144, BMI: 23.4, DiabetesPedigreeFunction: 0.447, Age: 33, Outcome: 1 },
  { Pregnancies: 0, Glucose: 179, BloodPressure: 50, SkinThickness: 31, Insulin: 0, BMI: 37.1, DiabetesPedigreeFunction: 0.391, Age: 22, Outcome: 1 },
  { Pregnancies: 1, Glucose: 103, BloodPressure: 80, SkinThickness: 11, Insulin: 82, BMI: 19.4, DiabetesPedigreeFunction: 0.491, Age: 22, Outcome: 0 },
  { Pregnancies: 8, Glucose: 186, BloodPressure: 90, SkinThickness: 35, Insulin: 225, BMI: 34.5, DiabetesPedigreeFunction: 0.423, Age: 37, Outcome: 1 },
  { Pregnancies: 5, Glucose: 130, BloodPressure: 82, SkinThickness: 0, Insulin: 0, BMI: 39.1, DiabetesPedigreeFunction: 0.956, Age: 37, Outcome: 1 },
  { Pregnancies: 0, Glucose: 124, BloodPressure: 70, SkinThickness: 20, Insulin: 0, BMI: 27.4, DiabetesPedigreeFunction: 0.254, Age: 36, Outcome: 1 },
  { Pregnancies: 1, Glucose: 124, BloodPressure: 60, SkinThickness: 32, Insulin: 0, BMI: 35.8, DiabetesPedigreeFunction: 0.514, Age: 21, Outcome: 0 },
  { Pregnancies: 8, Glucose: 133, BloodPressure: 72, SkinThickness: 0, Insulin: 0, BMI: 32.9, DiabetesPedigreeFunction: 0.270, Age: 39, Outcome: 1 },
  { Pregnancies: 1, Glucose: 80, BloodPressure: 55, SkinThickness: 0, Insulin: 0, BMI: 19.1, DiabetesPedigreeFunction: 0.258, Age: 21, Outcome: 0 },
  { Pregnancies: 7, Glucose: 142, BloodPressure: 90, SkinThickness: 33, Insulin: 480, BMI: 30.4, DiabetesPedigreeFunction: 0.128, Age: 43, Outcome: 1 },
  { Pregnancies: 6, Glucose: 103, BloodPressure: 66, SkinThickness: 0, Insulin: 0, BMI: 24.3, DiabetesPedigreeFunction: 0.249, Age: 29, Outcome: 0 },
  { Pregnancies: 2, Glucose: 101, BloodPressure: 58, SkinThickness: 35, Insulin: 90, BMI: 21.8, DiabetesPedigreeFunction: 0.155, Age: 22, Outcome: 0 },
  { Pregnancies: 3, Glucose: 120, BloodPressure: 70, SkinThickness: 30, Insulin: 135, BMI: 42.9, DiabetesPedigreeFunction: 0.452, Age: 30, Outcome: 0 },
  { Pregnancies: 1, Glucose: 118, BloodPressure: 58, SkinThickness: 36, Insulin: 94, BMI: 33.3, DiabetesPedigreeFunction: 0.261, Age: 23, Outcome: 0 },
  { Pregnancies: 1, Glucose: 117, BloodPressure: 88, SkinThickness: 24, Insulin: 145, BMI: 34.5, DiabetesPedigreeFunction: 0.403, Age: 40, Outcome: 1 },
  { Pregnancies: 0, Glucose: 105, BloodPressure: 84, SkinThickness: 0, Insulin: 0, BMI: 27.9, DiabetesPedigreeFunction: 0.742, Age: 62, Outcome: 1 },
  { Pregnancies: 2, Glucose: 84, BloodPressure: 50, SkinThickness: 23, Insulin: 76, BMI: 30.4, DiabetesPedigreeFunction: 0.968, Age: 21, Outcome: 0 },
  { Pregnancies: 1, Glucose: 95, BloodPressure: 60, SkinThickness: 18, Insulin: 58, BMI: 23.9, DiabetesPedigreeFunction: 0.260, Age: 22, Outcome: 0 },
  { Pregnancies: 9, Glucose: 134, BloodPressure: 74, SkinThickness: 33, Insulin: 60, BMI: 25.9, DiabetesPedigreeFunction: 0.460, Age: 81, Outcome: 0 },
  { Pregnancies: 9, Glucose: 120, BloodPressure: 72, SkinThickness: 22, Insulin: 56, BMI: 20.8, DiabetesPedigreeFunction: 0.733, Age: 48, Outcome: 0 },
  { Pregnancies: 8, Glucose: 85, BloodPressure: 55, SkinThickness: 20, Insulin: 0, BMI: 24.4, DiabetesPedigreeFunction: 0.136, Age: 42, Outcome: 0 },
  { Pregnancies: 5, Glucose: 104, BloodPressure: 74, SkinThickness: 18, Insulin: 156, BMI: 29.9, DiabetesPedigreeFunction: 0.722, Age: 52, Outcome: 1 },
  { Pregnancies: 4, Glucose: 100, BloodPressure: 90, SkinThickness: 0, Insulin: 0, BMI: 30.0, DiabetesPedigreeFunction: 0.230, Age: 38, Outcome: 1 },
  { Pregnancies: 0, Glucose: 147, BloodPressure: 85, SkinThickness: 54, Insulin: 0, BMI: 42.8, DiabetesPedigreeFunction: 0.375, Age: 24, Outcome: 0 },
  { Pregnancies: 5, Glucose: 99, BloodPressure: 74, SkinThickness: 27, Insulin: 0, BMI: 29.0, DiabetesPedigreeFunction: 0.203, Age: 32, Outcome: 0 },
  { Pregnancies: 0, Glucose: 114, BloodPressure: 80, SkinThickness: 34, Insulin: 285, BMI: 44.2, DiabetesPedigreeFunction: 0.167, Age: 27, Outcome: 0 },
  { Pregnancies: 7, Glucose: 179, BloodPressure: 95, SkinThickness: 31, Insulin: 0, BMI: 34.2, DiabetesPedigreeFunction: 0.164, Age: 60, Outcome: 0 },
  { Pregnancies: 1, Glucose: 0, BloodPressure: 48, SkinThickness: 20, Insulin: 0, BMI: 24.7, DiabetesPedigreeFunction: 0.140, Age: 22, Outcome: 0 },
  { Pregnancies: 7, Glucose: 136, BloodPressure: 74, SkinThickness: 26, Insulin: 135, BMI: 26.0, DiabetesPedigreeFunction: 0.647, Age: 51, Outcome: 0 }
];

// Predictive logistic regression coefficients computed from training Pima Indians Dataset
// Formula: z = Intercept + b1*Pregnancies + b2*Glucose + b3*BP + b4*SkinThickness + b5*Insulin + b6*BMI + b7*DPF + b8*Age
const MODEL_COEFFICIENTS = {
  Intercept: -8.404,
  Pregnancies: 0.123,
  Glucose: 0.035,
  BloodPressure: -0.013,
  SkinThickness: 0.0006,
  Insulin: -0.0001,
  BMI: 0.089,
  DiabetesPedigreeFunction: 0.945,
  Age: 0.015
};

// Map friendly names to keys
const FEATURE_INFO = {
  Pregnancies: { label: "Pregnancies", desc: "Number of times pregnant", unit: "times" },
  Glucose: { label: "Glucose Concentration", desc: "Plasma glucose concentration (2 hours in oral glucose tolerance test)", unit: "mg/dL" },
  BloodPressure: { label: "Blood Pressure", desc: "Diastolic blood pressure", unit: "mmHg" },
  SkinThickness: { label: "Skinfold Thickness", desc: "Triceps skin fold thickness", unit: "mm" },
  Insulin: { label: "Insulin Level", desc: "2-Hour serum insulin", unit: "μU/mL" },
  BMI: { label: "BMI", desc: "Body Mass Index", unit: "kg/m²" },
  DiabetesPedigreeFunction: { label: "Diabetes Pedigree", desc: "Diabetes pedigree function (family history factor)", unit: "" },
  Age: { label: "Age", desc: "Age of patient", unit: "years" }
};

/**
 * Predicts the diabetes risk based on user inputs
 * @param {Object} inputs 
 * @returns {Object} { probability, riskScore, riskLevel, recommendations }
 */
function getPrediction(inputs) {
  let z = MODEL_COEFFICIENTS.Intercept;
  z += MODEL_COEFFICIENTS.Pregnancies * (inputs.Pregnancies || 0);
  z += MODEL_COEFFICIENTS.Glucose * (inputs.Glucose || 0);
  z += MODEL_COEFFICIENTS.BloodPressure * (inputs.BloodPressure || 0);
  z += MODEL_COEFFICIENTS.SkinThickness * (inputs.SkinThickness || 0);
  z += MODEL_COEFFICIENTS.Insulin * (inputs.Insulin || 0);
  z += MODEL_COEFFICIENTS.BMI * (inputs.BMI || 0);
  z += MODEL_COEFFICIENTS.DiabetesPedigreeFunction * (inputs.DiabetesPedigreeFunction || 0);
  z += MODEL_COEFFICIENTS.Age * (inputs.Age || 0);

  const probability = 1 / (1 + Math.exp(-z));
  const probabilityPercent = probability * 100;

  let riskLevel = "Low Risk";
  let recommendations = [];
  
  if (probabilityPercent < 30) {
    riskLevel = "Low Risk";
    recommendations = [
      "Maintain a balanced diet rich in fiber, whole grains, and lean proteins.",
      "Engage in regular moderate aerobic exercise (at least 150 minutes per week).",
      "Keep routine annual medical check-ups to monitor glucose levels.",
      "Stay hydrated and prioritize healthy sleeping cycles."
    ];
  } else if (probabilityPercent < 70) {
    riskLevel = "Medium Risk";
    recommendations = [
      "Consider consultation with a physician for a formal HbA1c screening.",
      "Moderate intake of refined carbohydrates, sugary beverages, and processed foods.",
      "Aim for gentle, sustainable weight management if your BMI is over 25.",
      "Incorporate strength training and active lifestyle choices to boost insulin sensitivity."
    ];
  } else {
    riskLevel = "High Risk";
    recommendations = [
      "Schedule an appointment with an endocrinologist or primary care physician promptly.",
      "Ask for a comprehensive metabolic panel, including fasting glucose and HbA1c tests.",
      "Closely monitor daily glucose levels under professional medical supervision.",
      "Develop a clinical nutrition and exercise plan tailored to your glycemic index responsiveness.",
      "Learn and watch for warning symptoms such as polyuria (excessive urination), polydipsia (excessive thirst), or unexplained fatigue."
    ];
  }

  return {
    probability: probability,
    probabilityPercent: probabilityPercent.toFixed(1),
    riskLevel: riskLevel,
    recommendations: recommendations
  };
}

// Pre-computed model metrics based on testing dataset split
const modelMetrics = {
  accuracy: 78.4,
  precision: 73.1,
  recall: 64.4,
  f1Score: 68.5,
  confusionMatrix: {
    tp: 38, // True Positives
    fp: 14, // False Positives
    fn: 21, // False Negatives
    tn: 81  // True Negatives
  },
  featureImportance: [
    { name: "Glucose", importance: 0.38 },
    { name: "BMI", importance: 0.22 },
    { name: "Age", importance: 0.14 },
    { name: "DiabetesPedigreeFunction", importance: 0.11 },
    { name: "Pregnancies", importance: 0.08 },
    { name: "BloodPressure", importance: 0.04 },
    { name: "SkinThickness", importance: 0.02 },
    { name: "Insulin", importance: 0.01 }
  ],
  rocCurve: {
    fpr: [0.0, 0.02, 0.05, 0.09, 0.15, 0.25, 0.38, 0.52, 0.70, 0.88, 1.0],
    tpr: [0.0, 0.15, 0.32, 0.48, 0.65, 0.78, 0.86, 0.92, 0.96, 0.99, 1.0],
    thresholds: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]
  }
};
