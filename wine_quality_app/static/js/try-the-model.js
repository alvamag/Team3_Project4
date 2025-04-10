document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JS loaded and running");
  
    // 🧪 Sample Values from /random-sample
    document.getElementById("sample-button").addEventListener("click", async function () {
      console.log("👉 Sample button clicked");
  
      try {
        const response = await fetch("/random-sample");
        const data = await response.json();
  
        document.getElementById("fixed_acidity_input").value = data.fixed_acidity;
        document.getElementById("volatile_acidity_input").value = data.volatile_acidity;
        document.getElementById("citric_acid_input").value = data.citric_acid;
        document.getElementById("residual_sugar_input").value = data.residual_sugar;
        document.getElementById("chlorides_input").value = data.chlorides;
        document.getElementById("free_sulfur_input").value = data.free_sulfur_dioxide;
        document.getElementById("total_sulfur_input").value = data.total_sulfur_dioxide;
        document.getElementById("density_input").value = data.density;
        document.getElementById("ph_input").value = data.ph;
        document.getElementById("sulphates_input").value = data.sulphates;
        document.getElementById("alcohol_input").value = data.alcohol;
        document.getElementById("wine_type_input").value = data.wine_type;
  
        console.log("✔️ Sample values populated:", data);
      } catch (err) {
        console.error("🚨 Failed to load sample values:", err);
        alert("Error fetching sample values.");
      }
    });
  
    // 🔮 Predict Quality from /predict
    document.getElementById("predict-button").addEventListener("click", async function () {
      console.log("👉 Predict button clicked");
  
      const data = {
        fixed_acidity: parseFloat(document.getElementById("fixed_acidity_input").value),
        volatile_acidity: parseFloat(document.getElementById("volatile_acidity_input").value),
        citric_acid: parseFloat(document.getElementById("citric_acid_input").value),
        residual_sugar: parseFloat(document.getElementById("residual_sugar_input").value),
        chlorides: parseFloat(document.getElementById("chlorides_input").value),
        free_sulfur_dioxide: parseFloat(document.getElementById("free_sulfur_dioxide_input").value),
        total_sulfur_dioxide: parseFloat(document.getElementById("total_sulfur_dioxide_input").value),
        density: parseFloat(document.getElementById("density_input").value),
        pH: parseFloat(document.getElementById("ph_input").value),
        sulphates: parseFloat(document.getElementById("sulphates_input").value),
        alcohol: parseFloat(document.getElementById("alcohol_input").value),
      };
  
      const wineType = document.getElementById("wine_type_input").value;
      data.type_red = wineType === "red" ? 0 : 1;
      data.type_white = wineType === "red" ? 1 : 0;
  
      if (Object.values(data).some(val => isNaN(val))) {
        alert("Please fill in all fields with valid numbers and select a wine type.");
        return;
      }
  
      try {
        const response = await fetch("/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
  
        const result = await response.json();
  
        document.getElementById("label-output").textContent = `Label: ${result.label_prediction}`;
        document.getElementById("class-output").textContent = `Class: ${result.numeric_prediction}`;
      } catch (err) {
        console.error("🚨 Prediction error:", err);
        alert("Prediction failed. Check the console for details.");
      }
    });
  });
  