import requests

url = "http://127.0.0.1:5000/predict"

student = {
    "school": "GP",
    "sex": "F",
    "age": 17,
    "address": "U",
    "famsize": "GT3",
    "Pstatus": "A",
    "Medu": 4,
    "Fedu": 4,
    "Mjob": "teacher",
    "Fjob": "health",
    "reason": "course",
    "guardian": "mother",
    "traveltime": 2,
    "studytime": 3,
    "failures": 0,
    "schoolsup": "yes",
    "famsup": "yes",
    "paid": "no",
    "activities": "no",
    "nursery": "yes",
    "higher": "yes",
    "internet": "yes",
    "romantic": "no",
    "famrel": 4,
    "freetime": 3,
    "goout": 3,
    "Dalc": 1,
    "Walc": 1,
    "health": 3,
    "absences": 4,
    "G1": 12,
    "G2": 14
}

response = requests.post(url, json=student)

print("Status code:", response.status_code)
print("Response:", response.json())