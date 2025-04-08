document.addEventListener("DOMContentLoaded", function () {
    // === Age Verification Logic ===
    const verified = localStorage.getItem("verified");
    const agePopup = document.getElementById("age-popup");
    const enterBtn = document.getElementById("enter-btn");
    const exitBtn = document.getElementById("exit-btn");
  
    // Debugging: Check what is in localStorage
    console.log("Age Verified (localStorage):", localStorage.getItem('verified'));  // Log the value
  
    // If already verified, hide the popup
    if (verified === "true" && agePopup) {
      agePopup.style.display = "none";  // Hide the popup if the user is already verified
    }
  
    // Handle age verification button clicks
    if (enterBtn) {
      enterBtn.addEventListener("click", function () {
        localStorage.setItem("verified", "true"); // Save flag to localStorage
        console.log("Age Verified:", localStorage.getItem('verified'));  // Log after setting
        if (agePopup) agePopup.style.display = "none";  // Hide the popup
      });
    }
  
    // Redirect if the "No, take me back" button is clicked
    if (exitBtn) {
      exitBtn.addEventListener("click", function () {
        window.location.href = "https://motts.com"; // You can change this to any URL you'd like
      });
    }
  
    // === Image Gallery Slider ===
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
  
    // Function to show the current slide
    function showSlide(index) {
      // Hide all slides
      slides.forEach((slide) => slide.classList.remove('active'));
      dots.forEach((dot) => dot.classList.remove('active'));
  
      // Show the current slide and its dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }
  
    // Show the first slide by default
    showSlide(currentSlideIndex);
  
    // Next slide function (move forward)
    function moveSlide(step) {
      currentSlideIndex = (currentSlideIndex + step + totalSlides) % totalSlides;  // Loop back at the ends
      showSlide(currentSlideIndex);
    }
  
    // Function to jump to a specific slide when a dot is clicked
    function currentSlide(index) {
      currentSlideIndex = index;
      showSlide(currentSlideIndex);
    }
  
    // Automatically move to the next slide every 8 seconds
    setInterval(() => {
      moveSlide(1);  // Move to the next slide
    }, 8000);
  
    // Event listeners for the dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => currentSlide(index));  // Jump to specific slide
    });
  
    // === Contact Form Confirmation ===
    const contactForm = document.getElementById("contact-form");
    const confirmationPopup = document.getElementById("confirmation-popup");
    const closePopup = document.getElementById("close-popup");
  
    // Contact form submission event
    if (contactForm && confirmationPopup && closePopup) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission
  
        // Show confirmation popup
        confirmationPopup.style.display = "flex";
  
        // Optionally reset the form
        contactForm.reset();
      });
  
      // Close confirmation popup when the close button is clicked
      closePopup.addEventListener("click", function () {
        confirmationPopup.style.display = "none";
      });
    }
  
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
  
    // === Accordion Logic for Resources and About ===
    const accordionBtns = document.querySelectorAll('.accordion-btn');
  
    // Add event listeners to toggle the accordion content
    accordionBtns.forEach(button => {
      button.addEventListener('click', function () {
        // Toggle the active class to show/hide the content
        this.classList.toggle('active');
  
        const accordionContent = this.nextElementSibling;
  
        if (accordionContent.style.maxHeight) {
          // If content is open, close it
          accordionContent.style.maxHeight = null;
        } else {
          // If content is closed, open it
          accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        }
      });
    });
  });
  