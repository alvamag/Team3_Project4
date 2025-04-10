### :bar_chart: Try the Model
The **Try the Model** page allows users to input physicochemical properties of a wine sample and predict its quality using our trained **Random Forest Classifier**.
This section is interactive and built to showcase the power of machine learning applied to wine chemistry!
---
#### How It Works
- Users input **11 chemical properties** of a wine sample (e.g., acidity, alcohol, pH)
- They select whether the wine is **red** or **white**
- A trained Random Forest model processes the input and predicts the wine's **quality label**:
  - `Low` (score 3–5)
  - `Medium` (score 6)
  - `High` (score 7–10)
---
#### Sample Values
Not sure what values to use? Click the **“Use Sample Values”** button to autofill the form with real preprocessed wine data from the dataset.
---
#### Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Flask (Python)
- **Model**: Random Forest Classifier (`joblib`-loaded `.pkl`)
- **Data**: Cleaned dataset from Portuguese red & white wines
---
#### :receipt: Input Fields
| Property                 | Example Value |
|--------------------------|---------------|
| Fixed Acidity            | 7.4           |
| Volatile Acidity         | 0.70          |
| Citric Acid              | 0.00          |
| Residual Sugar           | 1.9           |
| Chlorides                | 0.076         |
| Free Sulfur Dioxide      | 11.0          |
| Total Sulfur Dioxide     | 34.0          |
| Density                  | 0.9978        |
| pH                       | 3.51          |
| Sulphates                | 0.56          |
| Alcohol                  | 9.4           |
| Wine Type                | Red / White   |
---
#### Prediction Output
Once submitted, the model returns:
- **Label**: `Low`, `Medium`, or `High`
- **Class**: Corresponding numeric class (e.g., `0`, `1`, or `2`)
1:12
Code for my Try the Model
1:14
## Deployment Instructions
This app is deployed using **Render**, which hosts both the backend Flask application and the frontend interface. Follow the steps below to deploy the full `wine_quality_app` directory.
### Project Structure
```
Team3_Project4/
└── wine_quality_app/
    ├── app.py                  # Main Flask app
    ├── requirements.txt        # Python dependencies
    ├── Procfile                # Tells Render how to start the app
    ├── render.yaml             # (Optional) Auto-deploy config for Render
    ├── templates/              # HTML templates
    ├── static/                 # CSS, JavaScript, and image files
    ├── models/                 # Trained ML model file
```
---
### How to Deploy on Render
1. **Push the project to a GitHub repository** if it isn’t already.
2. **Create a Web Service** on [Render](https://render.com):
   - Select your GitHub repo.
   - Choose the `main` branch.
   - Set your environment to **Python 3**.
   - Configure the following:
     **Build Command:**
     ```
     cd wine_quality_app && pip install -r requirements.txt
     ```
     **Start Command:**
     ```
     cd wine_quality_app && gunicorn app:app
     ```
3. **(Optional)** — To automate the build setup, include this `render.yaml` in the root of your repo:
```yaml
services:
  - type: web
    name: wine-quality-app
    env: python
    buildCommand: cd wine_quality_app && pip install -r requirements.txt
    startCommand: cd wine_quality_app && gunicorn app:app
    region: oregon
    plan: free
    autoDeploy: true
```
> :repeat: Once configured, Render will automatically redeploy every time you push to the `main` branch.
---
### Accessing the Live Site
Once deployed, your app will be available at a link like:
```
https://wine-quality-app.onrender.com
```
> Use the live site to test the prediction model, explore interactive visualizations, and view the full project experience.
1:14
You should be able to copy and paste! I just don't want to mess up any branches but will check formatting before we submit!


Maya Morad
  1:22 PM
## GeoJSON Mapping with OpenStreetMap
To visualize winery locations across Portugal, we integrated **GeoJSON data** retrieved from [OpenStreetMap](https://www.openstreetmap.org/) using [Overpass Turbo](https://overpass-turbo.eu/). This allowed us to filter all locations tagged with `craft=winery` within the boundaries of Portugal.
The resulting dataset was exported as a structured `.geojson` file (`portugal_wineries.geojson`) containing:
- Winery names
- Coordinates
- Optional metadata (address, notes, etc.)
We used [Folium](https://python-visualization.github.io/folium/) — a Python mapping library built on top of Leaflet.js — to generate an interactive map directly in Python. Each winery was represented with a **:wine_glass: wine glass emoji marker** and included a popup displaying the winery's name and region (when available).
To embed the map into our site without breaking existing styles, we used Folium’s `_repr_html_()` method to render it as an inline HTML snippet. This map was then inserted into a styled card component within our Flask template to visually match the rest of the site.
> The final result: a dynamic, interactive map of Portuguese wineries that blends seamlessly into our front end — and invites users to explore wine country, one click at a time.
openstreetmap.orgopenstreetmap.org
OpenStreetMap
OpenStreetMap is a map of the world, created by people like you and free to use under an open license. (71 kB)
https://www.openstreetmap.org/

overpass-turbo.euoverpass-turbo.eu
overpass turbo
A web based data mining tool for OpenStreetMap which runs any kind of Overpass API query and shows the results on an interactive map.
