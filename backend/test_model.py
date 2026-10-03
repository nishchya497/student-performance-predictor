import joblib

# Load the saved model
model = joblib.load("model.pkl")

print("Model loaded successfully!")
print("Model type:", type(model))