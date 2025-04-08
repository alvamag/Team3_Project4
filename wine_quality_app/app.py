from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Route for the homepage (index.html)
@app.route('/')
def home():
    return render_template('index.html')

# Route for the about page (about.html)
@app.route('/about')
def about():
    return render_template('about.html')

# Route for the "The Process" page (the-process.html)
@app.route('/the-process')
def the_process():
    return render_template('the-process.html')

# Route for the visualizations page (visualizations.html)
@app.route('/visualizations')
def visualizations():
    return render_template('visualizations.html')

# Route for the "Try the Model" page (try-the-model.html)
@app.route('/try-the-model')
def try_the_model():
    return render_template('try-the-model.html')

# Route for the resources page (resources.html)source venv/bin/activate

@app.route('/resources')
def resources():
    return render_template('resources.html')

# Route for the contact page (contact.html)
@app.route('/contact')
def contact():
    return render_template('contact.html')

# Prediction route for the "Try the Model" form (API)
@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    data = request.get_json()  # Data comes as a JSON object
    
    # Since we're not using the ML model, we'll mock a prediction
    # Replace this with your actual prediction logic later.
    prediction = "Good Quality Wine"  # Placeholder prediction value
    
    # Return the "mocked" prediction as a JSON response
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
