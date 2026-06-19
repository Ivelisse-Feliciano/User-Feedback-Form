// User Feedback Form
// Code Project #1
// Ivelisse Feliciano

const form = document.getElementById("feedback-form");
const feedbackDisplay = document.getElementById("feedback-display");
const charCount = document.getElementById("char-count");
const tooltip = document.getElementById("tooltip");
const successMessage = document.getElementById("success-message");

// Event delegation for input fields
form.addEventListener("input", function(event) {
  event.stopPropagation();

  if (event.target.id === "comments") {
    charCount.textContent = "Characters: " + event.target.value.length;
  }
});

// Mouseover tooltip using event delegation
form.addEventListener("mouseover", function(event) {
  event.stopPropagation();

  if (event.target.matches("input, textarea")) {
    tooltip.textContent = event.target.dataset.tooltip;
    tooltip.style.display = "block";
  }
});

// Mouse movement event
form.addEventListener("mousemove", function(event) {
  tooltip.style.left = event.pageX + 15 + "px";
  tooltip.style.top = event.pageY + 15 + "px";
});

// Hide tooltip
form.addEventListener("mouseout", function(event) {
  event.stopPropagation();

  if (event.target.matches("input, textarea")) {
    tooltip.style.display = "none";
  }
});

// Submit event
form.addEventListener("submit", function(event) {
  event.preventDefault();
  event.stopPropagation();

  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const comments = document.getElementById("comments");

  let isValid = true;

  clearErrors();

  if (name.value.trim() === "") {
    showError(name, "Name is required.");
    isValid = false;
  }

  if (phone.value.trim() === "") {
  showError(phone, "Phone number is required.");
  isValid = false;
}

  if (email.value.trim() === "") {
    showError(email, "Email is required.");
    isValid = false;
  }

  if (comments.value.trim() === "") {
    showError(comments, "Comments are required.");
    isValid = false;
  }

  if (isValid) {
    const entry = document.createElement("div");
    entry.classList.add("feedback-entry");

    entry.innerHTML = `
      <h3>${name.value}</h3>
      
      <p><strong>Phone:</strong> ${phone.value}</p>
      <p><strong>Email:</strong> ${email.value}</p>
      <p><strong>Comments:</strong> ${comments.value}</p>
    `;

    feedbackDisplay.appendChild(entry);

    form.reset();
    charCount.textContent = "Characters: 0";
  }
});

// Function to show validation messages
function showError(input, message) {
  const errorMessage = input.parentElement.querySelector(".error");
  errorMessage.textContent = message;
}

// Function to clear previous errors
function clearErrors() {
  const errors = document.querySelectorAll(".error");

  errors.forEach(function(error) {
    error.textContent = "";
  });
}

// Stop background clicks from triggering form events
document.body.addEventListener("click", function() {
  console.log("Background clicked");
});

form.addEventListener("click", function(event) {
  event.stopPropagation();
});