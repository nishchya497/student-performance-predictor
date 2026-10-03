import pandas as pd
import joblib

data = pd.read_csv("../data/student-mat.csv", sep=";")

print(data.head())
print("\nShape:", data.shape)
print("\nColumns:")
print(data.columns.tolist())
print("\nData Information:")
print(data.info())

print("\nMissing Values:")
print(data.isnull().sum())

print("\nStatistical Summary:")
print(data.describe())
import matplotlib.pyplot as plt
import seaborn as sns

# Distribution of final grades
plt.figure(figsize=(8, 5))
sns.histplot(data["G3"], bins=20, kde=True)

plt.title("Distribution of Final Grades")
plt.xlabel("Final Grade (G3)")
plt.ylabel("Number of Students")

plt.show()
plt.figure(figsize=(8, 5))

sns.boxplot(x="studytime", y="G3", data=data)

plt.title("Study Time vs Final Grade")
plt.xlabel("Study Time")
plt.ylabel("Final Grade (G3)")

plt.show()
# 3. Correlation with final grade
correlation = data.select_dtypes(include="number").corr()

print("\nCorrelation with Final Grade (G3):")
print(correlation["G3"].sort_values(ascending=False))
# Separate features (X) and target (y)

X = data.drop("G3", axis=1)
y = data["G3"]

print("\nFeatures (X):")
print(X.head())

print("\nTarget (y):")
print(y.head())
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

# Identify categorical and numerical columns
categorical_features = X.select_dtypes(include=["object", "string"]).columns.tolist()
numerical_features = X.select_dtypes(include=["number"]).columns.tolist()

print("\nCategorical Features:")
print(categorical_features)

print("\nNumerical Features:")
print(numerical_features)
# Create preprocessing pipeline

preprocessor = ColumnTransformer(
    transformers=[
        ("categorical", OneHotEncoder(handle_unknown="ignore"), categorical_features),
        ("numerical", "passthrough", numerical_features)
    ]
)

print("\nPreprocessor created successfully!")
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("\nTraining data shape:", X_train.shape)
print("Testing data shape:", X_test.shape)
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline

model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("regressor", RandomForestRegressor(
            n_estimators=200,
            random_state=42
        ))
    ]
)

print("\nModel pipeline created successfully!")
# Train the model
model.fit(X_train, y_train)

print("\nModel trained successfully!")
# Make predictions on test data
y_pred = model.predict(X_test)

print("\nPredictions:")
print(y_pred[:10])
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Calculate evaluation metrics
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = mse ** 0.5
r2 = r2_score(y_test, y_pred)

print("\nModel Evaluation:")
print("MAE:", mae)
print("MSE:", mse)
print("RMSE:", rmse)
print("R² Score:", r2)

# Save the trained pipeline
joblib.dump(model, "model.pkl")

print("\nModel saved successfully as model.pkl!")

# Compare actual and predicted grades
comparison = pd.DataFrame({
    "Actual G3": y_test.values,
    "Predicted G3": y_pred
})

print("\nActual vs Predicted:")
print(comparison.head(10))
# Actual vs Predicted graph
plt.figure(figsize=(8, 5))

plt.scatter(y_test, y_pred)

# Perfect prediction reference line
plt.plot([0, 20], [0, 20], linestyle="--")

plt.title("Actual vs Predicted Student Grades")
plt.xlabel("Actual Final Grade (G3)")
plt.ylabel("Predicted Final Grade (G3)")

plt.xlim(0, 20)
plt.ylim(0, 20)
plt.grid(True)
plt.show()