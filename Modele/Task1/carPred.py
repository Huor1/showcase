import io
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.compose import ColumnTransformer
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from tensorflow.keras.models import load_model

file_name = './Car_Prices_Poland_Kaggle.csv'  

# Step 2: Load the uploaded file into a Pandas DataFrame
data = pd.read_csv(file_name)

# Follow similar steps as before for preprocessing
# Assuming 'data' contains the car prices dataset

# Preprocessing setup (repeat the steps we discussed earlier)
categorical_cols = ['mark', 'model', 'fuel']
numerical_cols = ['year', 'mileage', 'vol_engine']
preprocessor = ColumnTransformer(transformers=[
    ('num', MinMaxScaler(), numerical_cols),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
])

# Dopasuj preprocessor do całego zestawu danych
preprocessor.fit(data)

# Wczytaj model
loaded_model = load_model('cars_model')

# Użyj tego samego `ColumnTransformer` do przetworzenia danych
new_data = pd.DataFrame({
    'mark': ['ford'],
    'model': ['focus'],
    'year': [2017],
    'mileage': [59000],
    'vol_engine': [2300],
    'fuel': ['Gasoline']
})

# Przetwarzanie nowych danych wejściowych
new_data_transformed = preprocessor.transform(new_data)

# Dokonaj predykcji na nowych danych
predicted_price = loaded_model.predict(new_data_transformed)

# Wyświetl wynik
print("Przewidywana cena:", predicted_price[0][0])
