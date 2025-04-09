import streamlit as st
from keras.models import load_model
from keras.preprocessing import image
import numpy as np

# Load your model
model = load_model('/models/winde_data.h5')

# Define preprocessing function
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(28, 28))  # Adjust as needed
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    return img_array

# Streamlit interface
st.title('Model Prediction')

uploaded_file = st.file_uploader("Choose an image...", type="jpg")
if uploaded_file is not None:
    st.image(uploaded_file, caption='Uploaded Image.', use_column_width=True)
    img_path = './temp_image.jpg'
    with open(img_path, "wb") as f:
        f.write(uploaded_file.getbuffer())

    img_array = preprocess_image(img_path)
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)
    st.write(f'Predicted Class: {predicted_class[0]}')
