document.addEventListener("DOMContentLoaded", function () {
  // === Handle Form Submission for "Try the Model" ===
    document.getElementById("predict-button").addEventListener("click", function () {
      // Collect input values from the form
      const wineData = {
        fixedAcidity: document.getElementById("fixed_acidity_input").value,
        volatileAcidity: document.getElementById("volatile_acidity_input").value,
        citricAcid: document.getElementById("citric_acid_input").value,
        residualSugar: document.getElementById("residual_sugar_input").value,
        chlorides: document.getElementById("chlorides_input").value,
        freeSulfurDioxide: document.getElementById("free_sulfur_input").value,
        totalSulfurDioxide: document.getElementById("total_sulfur_input").value,
        density: document.getElementById("density_input").value,
        pH: document.getElementById("ph_input").value,
        sulphates: document.getElementById("sulphates_input").value,
        alcohol: document.getElementById("alcohol_input").value
      };
  
      console.log(wineData);  // Log the input data to check if it is correct
  
      // Make sure all fields are filled
      if (Object.values(wineData).some((value) => value === "")) {
        alert("Please fill in all input fields.");
        return;
      }
  
      // If form is valid, send the data to Flask for prediction
      fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(wineData)
      })
      .then(response => response.json())  // The prediction will be returned as JSON
      .then(data => {
        console.log(data);  // Log the response data to see what Flask returns
        document.getElementById("prediction-message").textContent =
          `The predicted wine quality is: ${data.prediction}`;
        document.getElementById("prediction-modal").style.display = "flex";
      })
      .catch(error => {
        console.error("Error:", error);
        alert("There was an error processing your request. Please try again.");
      });
    });
  
    // Close prediction modal
    document.getElementById("close-modal").addEventListener("click", function () {
      document.getElementById("prediction-modal").style.display = "none";
    });
  
    // Retry prediction (reset the form)
    document.getElementById("retry-button").addEventListener("click", function () {
      document.getElementById("contact-form").reset(); // Reset form fields
      document.getElementById("prediction-modal").style.display = "none"; // Hide modal
    });
  });
  