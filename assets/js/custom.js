document.addEventListener("DOMContentLoaded", function () {
  var contactForm = document.getElementById("contact-form");
  var outputDiv = document.getElementById("contact-output");
  var popup = document.getElementById("form-success-popup");
  var popupCloseBtn = document.getElementById("popup-close-btn");
  var submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

  function getErrorElement(inputEl) {
    if (!inputEl) return null;
    var next = inputEl.nextElementSibling;
    if (next && next.classList.contains("field-error")) {
      return next;
    }
    var div = document.createElement("div");
    div.className = "field-error";
    inputEl.parentNode.appendChild(div);
    return div;
  }

  function setFieldState(inputEl, message) {
    if (!inputEl) return false;
    var err = getErrorElement(inputEl);
    if (!err) return false;
    if (message) {
      err.textContent = message;
      inputEl.classList.add("is-invalid");
      inputEl.classList.remove("is-valid");
      return false;
    } else {
      err.textContent = "";
      inputEl.classList.remove("is-invalid");
      inputEl.classList.add("is-valid");
      return true;
    }
  }

  function validateNameField(id, label) {
    var el = document.getElementById(id);
    if (!el) return false;
    var value = el.value.trim();
    if (!value) {
      return setFieldState(el, label + " cannot be empty");
    }
    var re = /^[A-Za-z\s'-]+$/;
    if (!re.test(value)) {
      return setFieldState(el, label + " must contain only letters");
    }
    return setFieldState(el, "");
  }

  function validateEmail() {
    var el = document.getElementById("contact-email");
    if (!el) return false;
    var value = el.value.trim();
    if (!value) {
      return setFieldState(el, "Email cannot be empty");
    }
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) {
      return setFieldState(el, "Email format is not valid");
    }
    return setFieldState(el, "");
  }

  function validateAddress() {
    var el = document.getElementById("contact-address");
    if (!el) return false;
    var value = el.value.trim();
    if (!value) {
      return setFieldState(el, "Address cannot be empty");
    }
    if (value.length < 4) {
      return setFieldState(el, "Address is too short");
    }
    return setFieldState(el, "");
  }

  function validateRatingField(id, label) {
    var el = document.getElementById(id);
    if (!el) return false;
    var value = el.value.trim();
    if (!value) {
      return setFieldState(el, label + " cannot be empty");
    }
    var num = parseFloat(value);
    if (isNaN(num) || num < 1 || num > 10) {
      return setFieldState(el, label + " must be between 1 and 10");
    }
    return setFieldState(el, "");
  }

  function handlePhoneMask() {
  var el = document.getElementById("contact-phone");
  if (!el) return;

  var digits = el.value.replace(/\D/g, "");

  if (digits.startsWith("370")) {
    digits = digits.slice(3);
  }

  if (digits.length > 8) {
    digits = digits.slice(0, 8);
  }

  var formatted = "";
  if (digits.length > 0) {
    formatted = "+370 ";
    if (digits.length <= 3) {
      formatted += digits;
    } else {
      formatted += digits.slice(0, 3) + " " + digits.slice(3);
    }
  }

  el.value = formatted;
}


  function validatePhone() {
  var el = document.getElementById("contact-phone");
  if (!el) return false;

  var digits = el.value.replace(/\D/g, "");

  if (digits.startsWith("370")) {
    digits = digits.slice(3);
  }

  if (!digits) {
    return setFieldState(el, "Phone number cannot be empty");
  }

  if (digits.length !== 8 || digits.charAt(0) !== "6") {
    return setFieldState(el, "Phone must be like +370 6xx xxxxx");
  }

  return setFieldState(el, "");
}


  function validateForm() {
    var v1 = validateNameField("contact-name", "Name");
    var v2 = validateNameField("contact-surname", "Surname");
    var v3 = validateEmail();
    var v4 = validatePhone();
    var v5 = validateAddress();
    var v6 = validateRatingField("rating-1", "Rating 1");
    var v7 = validateRatingField("rating-2", "Rating 2");
    var v8 = validateRatingField("rating-3", "Rating 3");
    var allValid = v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8;
    if (submitBtn) {
      submitBtn.disabled = !allValid;
    }
    return allValid;
  }

  var nameInput = document.getElementById("contact-name");
  var surnameInput = document.getElementById("contact-surname");
  var emailInput = document.getElementById("contact-email");
  var phoneInput = document.getElementById("contact-phone");
  var addressInput = document.getElementById("contact-address");
  var rating1Input = document.getElementById("rating-1");
  var rating2Input = document.getElementById("rating-2");
  var rating3Input = document.getElementById("rating-3");

  if (nameInput) {
    nameInput.addEventListener("input", function () {
      validateNameField("contact-name", "Name");
      validateForm();
    });
  }

  if (surnameInput) {
    surnameInput.addEventListener("input", function () {
      validateNameField("contact-surname", "Surname");
      validateForm();
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", function () {
      validateEmail();
      validateForm();
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      handlePhoneMask();
      validatePhone();
      validateForm();
    });
  }

  if (addressInput) {
    addressInput.addEventListener("input", function () {
      validateAddress();
      validateForm();
    });
  }

  if (rating1Input) {
    rating1Input.addEventListener("input", function () {
      validateRatingField("rating-1", "Rating 1");
      validateForm();
    });
  }

  if (rating2Input) {
    rating2Input.addEventListener("input", function () {
      validateRatingField("rating-2", "Rating 2");
      validateForm();
    });
  }

  if (rating3Input) {
    rating3Input.addEventListener("input", function () {
      validateRatingField("rating-3", "Rating 3");
      validateForm();
    });
  }

  if (popupCloseBtn && popup) {
    popupCloseBtn.addEventListener("click", function () {
      popup.classList.remove("show");
    });
  }

  if (!contactForm) {
    return;
  }

  validateForm();

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    var name = document.getElementById("contact-name").value.trim();
    var surname = document.getElementById("contact-surname").value.trim();
    var email = document.getElementById("contact-email").value.trim();
    var phone = document.getElementById("contact-phone").value.trim();
    var address = document.getElementById("contact-address").value.trim();

    var r1 = parseFloat(document.getElementById("rating-1").value) || 0;
    var r2 = parseFloat(document.getElementById("rating-2").value) || 0;
    var r3 = parseFloat(document.getElementById("rating-3").value) || 0;

    var average = (r1 + r2 + r3) / 3;
    average = Math.round(average * 10) / 10;

    var formData = {
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      address: address,
      rating1: r1,
      rating2: r2,
      rating3: r3,
      averageRating: average
    };

    console.log("Contact form data:", formData);

    if (outputDiv) {
      var html = "";
      html += "<p><strong>Name:</strong> " + name + "</p>";
      html += "<p><strong>Surname:</strong> " + surname + "</p>";
      html += "<p><strong>Email:</strong> " + email + "</p>";
      html += "<p><strong>Phone number:</strong> " + phone + "</p>";
      html += "<p><strong>Address:</strong> " + address + "</p>";
      html += "<p><strong>Rating 1:</strong> " + r1 + "</p>";
      html += "<p><strong>Rating 2:</strong> " + r2 + "</p>";
      html += "<p><strong>Rating 3:</strong> " + r3 + "</p>";
      html += '<p><strong>Average rating:</strong> ' +
        '<span id="average-value" class="average-rating-value">' +
        average +
        "</span></p>";
      outputDiv.innerHTML = html;
    }

    setAverageColor(average);

    if (popup) {
      popup.classList.add("show");
    }
  });

  function setAverageColor(avg) {
    var avgElement = document.getElementById("average-value");
    if (!avgElement) {
      return;
    }
    avgElement.className = "average-rating-value";
    if (avg >= 0 && avg < 4) {
      avgElement.classList.add("avg-low");
    } else if (avg >= 4 && avg < 7) {
      avgElement.classList.add("avg-mid");
    } else if (avg >= 7 && avg <= 10) {
      avgElement.classList.add("avg-high");
    }
  }
});
