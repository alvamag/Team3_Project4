from flask import Flask, render_template, request, jsonify
import folium
import json

app = Flask(__name__)

# Route for the homepage
@app.route('/')
def home():
    return render_template('index.html')

# Route for the about page
@app.route('/about')
def about():
    return render_template('about.html')

# Route for the "The Process" page
@app.route('/the-process')
def the_process():
    return render_template('the-process.html')

# Route for the visualizations page
@app.route('/visualizations')
def visualizations():
    return render_template('visualizations.html')

# Route for the "Try the Model" page
@app.route('/try-the-model')
def try_the_model():
    return render_template('try-the-model.html')

# Route for the resources page
@app.route('/resources')
def resources():
    return render_template('resources.html')

# Route for the explore page with map
# Route for the explore page with map
@app.route('/explore')
def explore():
    import os
    wine_map = folium.Map(location=[39.3999, -8.2245], zoom_start=7)

    # Load GeoJSON
    with open("portugal_wineries.geojson") as f:
        data = json.load(f)

    print("✅ Loaded features:", len(data["features"]))

    # Add all winery markers
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

    # Make sure the folder exists
    os.makedirs("templates/partials", exist_ok=True)

    # Save map
    wine_map.save("templates/partials/embedded_map.html")

    return render_template("explore.html")


# Route for the contact page
@app.route('/contact')
def contact():
    return render_template('contact.html')

# Prediction route for the "Try the Model" form (mocked)
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    prediction = "Good Quality Wine"  # Replace with actual model later
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
