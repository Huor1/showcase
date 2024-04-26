import io
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.compose import ColumnTransformer
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from tensorflow.keras.models import load_model

file_name = './Updated_Kaggle_Houses.xlsx'  

# Step 2: Load the uploaded file into a Pandas DataFrame
data = pd.read_excel(file_name)

# Follow similar steps as before for preprocessing
# Assuming 'data' contains the car prices dataset

# Preprocessing setup (repeat the steps we discussed earlier)
categorical_cols = ['offer_type', 'offer_type_of_building', 'city_name', 'voivodeship','market']
numerical_cols = ['rooms', 'floor','area']
preprocessor = ColumnTransformer(transformers=[
    ('num', MinMaxScaler(), numerical_cols),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
])

# Split the data into features and target variable
X = data.drop('price', axis=1)
y = data['price']

# Step 5: Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

preprocessor.fit_transform(X_train)

# Dopasuj preprocessor do całego zestawu danych
#preprocessor.fit(data)

# Wczytaj model
loaded_model = load_model('houses_model_last')

# Użyj tego samego `ColumnTransformer` do przetworzenia danych
new_data = pd.DataFrame({
    'offer_type': ['Private'],
    'floor': [2],
    'area': [54.9],
    'rooms': [3],
    'offer_type_of_building': ['Housing Block'],
    'market': ['aftermarket'],
    'city_name': ['Dębno'],
    'voivodeship': ['Zachodniopomorskie']
})

# Przetwarzanie nowych danych wejściowych
new_data_transformed = preprocessor.transform(new_data)

print(new_data_transformed.shape)

# Dokonaj predykcji na nowych danych
predicted_price = loaded_model.predict(new_data_transformed)

# Wyświetl wynik
print("Przewidywana cena:", predicted_price[0][0])