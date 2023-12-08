//import { isValidEmail } from "../utils/isValidEmail.js";

const errors = { error_msg: "" };

console.log("hey");

console.log("Handler Start");

// Callback from submit button (token)
function onSubmit(token) {
  fetch("/recaptcha", {
    method: "POST",
    body: JSON.stringify({ recaptcha: token }),
  })
    .then((response) => response.json())
    .then((gResponse) => {
      if (gResponse.sucess) {
      } else {
      }
    });
}

// get all data in form and return object
function getFormData(form) {
  var elements = form.elements;
  var honeypot;

  var fields = Object.keys(elements)
    .filter(function (k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    })
    .map(function (k) {
      if (elements[k].name !== undefined) {
        return elements[k].name;
        // special case for Edge's html collection
      } else if (elements[k].length > 0) {
        return elements[k].item(0).name;
      }
    })
    .filter(function (item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

  var formData = {};
  fields.forEach(function (name) {
    var element = elements[name];

    // singular form elements just have one value
    formData[name] = element.value;

    // when our element has multiple items, get their values
    if (element.length) {
      var data = [];
      for (var i = 0; i < element.length; i++) {
        var item = element.item(i);
        if (item.checked || item.selected) {
          data.push(item.value);
        }
      }
      formData[name] = data.join(", ");
    }
  });

  // add form-specific values into the data
  formData.formDataNameOrder = JSON.stringify(fields);
  formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
  formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

  return { data: formData, honeypot: honeypot };
}

function handleFormSubmit(event) {
  //console.log("handling form submit...");

  var name_error_holder = document.getElementById("name_error");
  var email_error_holder = document.getElementById("email_error");
  var message_error_holder = document.getElementById("message_error");

  var name_input = document.getElementById("name_input");
  var email_input = document.getElementById("email_input");
  var message_input = document.getElementById("message_input");

  name_error_holder.style.display = "none";
  email_error_holder.style.display = "none";
  message_error_holder.style.display = "none";

  resetHighlightInput(name_input);
  resetHighlightInput(email_input);
  resetHighlightInput(message_input);

  errors.error_msg = "";

  // handles form submit without any jquery
  event.preventDefault(); // we are submitting via xhr below
  var form = event.target;
  var formData = getFormData(form);
  var data = formData.data;

  // If a honeypot field is filled, assume it was done so by a spam bot.
  if (formData.honeypot) {
    return false;
  }

  // If data is missing => error
  if (typeof data["name"] !== "string" || data["name"].length < 1) {
    console.log("name error");
    name_error_holder.innerHTML = "이름을 입력해주세요.";
    name_error_holder.style.display = "block";

    highlightInput(name_input);

    errors["error_msg"] = "error";
  }

  if (typeof data["email"] !== "string" || !isValidEmail(data["email"])) {
    console.log("email error");
    if (data["email"].length < 1) {
      email_error_holder.innerHTML = "이메일을 입력해주세요.";
    } else {
      email_error_holder.innerHTML = "올바른 이메일을 입력해주세요.";
    }
    email_error_holder.style.display = "block";

    highlightInput(email_input);

    errors["error_msg"] = "error";
  }
  if (typeof data["message"] !== "string" || data["message"].length < 1) {
    message_error_holder.innerHTML = "내용을 입력해주세요.";
    message_error_holder.style.display = "block";

    highlightInput(message_input);

    errors["error_msg"] = "error";
  }

  const hasErrors = Object.values(errors).some((msg) => msg);

  if (!hasErrors) {
    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset();
        var formElements = form.querySelector(".form-elements");
        if (formElements) {
          formElements.style.display = "none"; // hide form
        }
        var thankYouMessage = form.querySelector(".thankyou_message");
        if (thankYouMessage) {
          thankYouMessage.style.display = "block";
        }
      }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data)
      .map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      })
      .join("&");
    xhr.send(encoded);
  }
}

function highlightInput(element) {
  element.classList.add("bg-red-50");
  element.classList.add("border");
  element.classList.add("border-red-500");
  element.classList.add("placeholder-red-700");
}

function resetHighlightInput(element) {
  element.classList.remove("bg-red-50");
  element.classList.remove("border");
  element.classList.remove("border-red-500");
  element.classList.remove("placeholder-red-700");
}

function loaded() {
  //console.log("loaded and binding form submit");
  // bind to the submit event of our form
  var forms = document.querySelectorAll("form.gform");
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", handleFormSubmit, false);
  }
}

document.addEventListener("DOMContentLoaded", loaded, false);

function disableAllButtons(form) {
  var buttons = form.querySelectorAll("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

function isValidEmail(input) {
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (regex.test(input)) {
    console.log("Valid Email Address!");

    return true;
  } else {
    console.log("Invalid email address!");

    return false;
  }
}
