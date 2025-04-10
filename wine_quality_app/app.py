from flask import Flask, render_template, request, jsonify
import folium
import json
import joblib
import os
import pandas as pd

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "models", "random_forest_model.pkl")
csv_path = os.path.join(BASE_DIR, "static", "data", "cleaned_wine_data.csv")

# Load the model
model = joblib.load(model_path)

# ================= Routes =================

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/the-process')
def the_process():
    return render_template('the-process.html')

@app.route('/visualizations')
def visualizations():
    return render_template('visualizations.html')

@app.route('/try-the-model')
def try_the_model():
    return render_template('try-the-model.html')

@app.route('/resources')
def resources():
    return render_template('resources.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/explore')
def explore():
    wine_map = folium.Map(location=[39.3999, -8.2245], zoom_start=7)

    with open("portugal_wineries.geojson") as f:
        data = json.load(f)

    for feature in data["features"]:
        coords = feature["geometry"]["coordinates"]
        lat, lon = coords[1], coords[0]
        name = feature["properties"].get("name", "Winery")

        popup_html = f"""
            <div style='font-size: 14px;'>
                <b>{name}</b><br>
                🍇 Portuguese Winery
            </div>
        """

        folium.Marker(
            location=[lat, lon],
            popup=folium.Popup(popup_html, max_width=250),
            icon=folium.DivIcon(html="""
                <div style="font-size: 24px; line-height: 24px;">🍷</div>
            """)
        ).add_to(wine_map)

    map_html = wine_map._repr_html_()
    return render_template("explore.html", map_html=map_html)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        features = [
            data['fixed_acidity'],
            data['volatile_acidity'],
            data['citric_acid'],
            data['residual_sugar'],
            data['chlorides'],
            data['free_sulfur_dioxide'],
            data['total_sulfur_dioxide'],
            data['density'],
            data['pH'],
            data['sulphates'],
            data['alcohol'],
            data['type_white'],
            data['type_red']
        ]

        prediction = model.predict([features])[0]

        reverse_map = {"Low": 0, "Medium": 1, "High": 2}
        numeric_class = reverse_map.get(prediction, -1)

        return jsonify({
            'numeric_prediction': numeric_class,
            'label_prediction': prediction
        })

    except Exception as e:
        print("🚨 Flask error in /predict:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/random-sample', methods=['GET'])
def random_sample():
    try:
        df = pd.read_csv('static/data/cleaned_wine_data.csv')
        sample = df.sample(1).iloc[0]
        wine_type = "red" if sample["type"] == 1 else "white"

        result = {
            "fixed_acidity": sample["fixed acidity"],
            "volatile_acidity": sample["volatile acidity"],
            "citric_acid": sample["citric acid"],
            "residual_sugar": sample["residual sugar"],
            "chlorides": sample["chlorides"],
            "free_sulfur_dioxide": sample["free sulfur dioxide"],
            "total_sulfur_dioxide": sample["total sulfur dioxide"],
            "density": sample["density"],
            "ph": sample["pH"],
            "sulphates": sample["sulphates"],
            "alcohol": sample["alcohol"],
            "wine_type": wine_type
        }

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    from os import environ
    port = int(environ.get("PORT", 5001))
    app.run(debug=False, host='0.0.0.0', port=port)
