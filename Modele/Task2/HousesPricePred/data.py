import io
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.compose import ColumnTransformer
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from tensorflow.keras.models import load_model


file_name = './Kaggle_Houses.xlsx'  

# Step 2: Load the uploaded file into a Pandas DataFrame
data = pd.read_excel(file_name)

# Remove rows with string characters in 'floor', 'rooms', or 'area' columns

data.shape
data = data[~data['floor'].apply(lambda x: isinstance(x, str))]
data = data[~data['rooms'].apply(lambda x: isinstance(x, str))]
data = data[~data['area'].apply(lambda x: isinstance(x, str))]
data = data[~data['price'].apply(lambda x: isinstance(x, str))]

# #Reset the row index
data = data.reset_index(drop=True)

data= data.drop(['Unnamed: 16',  'Unnamed: 17' , 'Unnamed: 18', 'Unnamed: 19' ], axis=1)
data=data.drop([ 'price_per_meter','offer_title','month' , 'year' ,'population'   ,'longitude','latitude'],axis=1)

data=data.drop_duplicates()
data=data.dropna()

#Pre Processing
data['rooms'] = data['rooms'].astype(int)
data['floor'] = data['floor'].astype(int)
data['price'] = data['price'].astype(int)
data['area'] = data['area'].astype(float)

# Define a function to calculate IQR and detect outliers
def detect_outliers(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    upper_bound = Q3 + 1.5 * IQR
    lower_bound = Q1 - 1.5 * IQR
    outliers = df[(df[column] > upper_bound) | (df[column] < lower_bound)]
    return outliers

    # Detect outliers in 'mileage'
price_outliers = detect_outliers(data, 'price')
print(f"Number of outliers in 'price': {len(price_outliers)}")

# Remove outliers from the dataset
data = data[~data.index.isin(price_outliers.index)]

data_filtered = data.reset_index(drop=True)

print(data_filtered.shape)

# Zapisanie danych do nowego pliku Excel
"""output_file_name = './Updated_Kaggle_Houses.xlsx'
data.to_excel(output_file_name, index=False)"""