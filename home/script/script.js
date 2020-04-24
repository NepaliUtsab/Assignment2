(function () {
  'use strict';
  window.addEventListener('load', function () {

    var head = this.document.querySelector('head');

    //Checking user session
    var savedUser = JSON.parse(sessionStorage.getItem("current-user"));
    var savedEmail = (savedUser != null) ? savedUser["email"] : null;

    console.log(savedEmail);

    if (savedEmail == null) {
      showGuestUserNav();
    } else {

      showSavedUserNav();

    }
    console.log(savedEmail);

  }, false);
})();

function showLogin() {
  implementValidateInputEmail();
  implementValidateInputPassword();
}

// Validate email on when email field is focused and/or user starts typing
function implementValidateInputEmail() {
  var loginEmail = document.querySelector("#login-form #loginEmail");
  loginEmail.onfocus = function () {
    if (!loginEmail.classList.contains('is-valid') && !loginEmail.classList.contains('is-invalid')) {
      loginEmail.classList.remove('is-valid');
      loginEmail.classList.remove('is-invalid');
      if (validateEmail(loginEmail.classList.value)) {
        loginEmail.classList.add('is-valid');
      } else {
        loginEmail.classList.add('is-invalid');
      }
    }
  }

  loginEmail.onkeyup = function () {
    loginEmail.classList.remove('is-valid');
    loginEmail.classList.remove('is-invalid');
    if (loginEmail.value.length != 0 && validateEmail(loginEmail.value)) {
      loginEmail.classList.add('is-valid');
      submitButton.classList.add('disabled');
      submitButton.classList.remove('disabled');
    } else {
      loginEmail.classList.add('is-invalid');
      submitButton.classList.add('disabled');
    }
  }
}

//validate password length
function implementValidateInputPassword() {
  var loginPass = document.querySelector("#login-form #loginPassword");
  loginPass.onfocus = function () {
    loginPass.classList.remove('is-valid');
    loginPass.classList.remove('is-invalid');
    if (loginPass.value.length >= 8) {
      loginPass.classList.add('is-valid');
    } else {
      loginPass.classList.add('is-invalid');
    }
  }

  loginPass.onkeyup = function () {
    loginPass.classList.remove('is-valid');
    loginPass.classList.remove('is-invalid');
    if (loginPass.value.length >= 8) {
      loginPass.classList.add('is-valid');
      submitButton.classList.remove('disabled');
    } else {
      loginPass.classList.add('is-invalid');
      submitButton.classList.add('disabled');
    }
  }
}

function validateEmail(emailId) {
  var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,5})+$/;
  console.log(`length != 0 (${emailId.length != 0}) AND email match (${emailId.match(emailFormat)})`);
  if (emailId.length != 0 && emailId.match(emailFormat)) {
    console.log(`valueIf: ${emailId}`);
    return true;
  }
  console.log(`valueElse: ${emailId}`);
  console.log(`lengthElse: ${emailId.length}`);
  return false;
}

//Login User function
function loginUser() {

  var loginEmail = document.querySelector("#login-form #loginEmail");
  var loginPass = document.querySelector("#login-form #loginPassword");
  var submitButton = document.querySelector("#login-form .btn");
  console.log(validateEmail(loginEmail.value));
  if (validateEmail(loginEmail.value) && loginPass.value.length >= 8) {
    var userMap = {
      "email": loginEmail.value,
      "password": loginPass.value
    };
    
    // window.open("index.html", "_self");
    submitButton.classList.remove('disabled');
    return true;
  } else {
    loginEmail.classList.add("is-invalid");
    loginPass.classList.add("is-invalid");
    submitButton.classList.add('disabled');
    return false;
  }
}

// Register User function
function registerUser() {
  var registerEmail = document.querySelector("#register-form #registerEmail");
  var registerPass = document.querySelector("#register-form #registerPassword");
  var registerRePass = document.querySelector("#register-form #registerRePassword");
  var form = document.querySelector("#register-form");
  registerEmail.classList.remove("is-invalid");
  registerPass.classList.remove("is-invalid");
  registerRePass.classList.remove("is-invalid");
  console.log(form);
  if (registerRePass.value !== registerPass.value) {
    registerRePass.setCustomValidity("Not valid");
    console.log("PASSWORD NOT VALID");
  } else {
    registerRePass.setCustomValidity("");
  }
  form.classList.add("was-validated");
  if (form.checkValidity() === true) {
    var userMap = {
      "email": registerEmail.value,
      "password": registerPass.value
    };
    sessionStorage.setItem("current-user", JSON.stringify(userMap));
    console.log(userMap["email"]);
    return true;
  } else {
    return false;
  }
}

//show and hide nav user
function showGuestUserNav() {
  console.log("Guest");
  console.log(document.querySelector("#navbar-login").classList.contains("d-none"));
  document.querySelector("#navbar-pricing").classList.remove("d-none");
  document.querySelector("#navbar-login").classList.remove("d-none");
  document.querySelector("#navbar-register").classList.remove("d-none");
  document.querySelector("#navbar-mycollab").classList.add("d-none");
  document.querySelector("#navbar-profile-img").classList.add("d-none");


}

//show and hide nav user
function showSavedUserNav() {
  console.log("User");
  console.log(document.querySelector("#navbar-pricing").classList.contains("d-none"));

  console.log("inside");
  document.querySelector("#navbar-pricing").classList.add("d-none");
  document.querySelector("#navbar-login").classList.add("d-none");
  document.querySelector("#navbar-register").classList.add("d-none");
  document.querySelector("#navbar-mycollab").classList.remove("d-none");
  document.querySelector("#navbar-profile-img").classList.remove("d-none");


}

function logout(){
  window.alert("Are you sure you want to logout?");
  sessionStorage.setItem("current-user", "");
  window.open(`index.html`, '_self');
}

function getRecommended(pills_id) {
  // var code = "";
  // var titleTempArray = ["Popular", "Rock Genre", "Recently Added"];

  // for (var i = 0; i < 3; i++) {
  //   code += `<div class="container-fluid text-white div-title py-2" style="background-color: black;">
  //             <div class="container my-2">
  //                   <h4>${titleTempArray[Math.floor(Math.random() * 3)]}</h4>
  //             </div>
  //             </div>
  //             <div class="container mt-2">
  //             <div class="row">`
  //   for (var j = 0; j < 4; j++) {
  //     code += `<div class="col-md-3 my-1">
  //                 <div class="card">
  //                     <img class="card-img-top" src="images/akbum_art.jpg" alt="Card image cap">
  //                     <div class="card-body">
  //                         <h5 class="card-title">Title : Song title 1</h5>
  //                         <h5 class="card-title">Aurthor : Utsab Malakar</h5>
  //                         <h5 class="card-title">Genre : Rock</h5>
  //                     </div>
  //                 </div>
  //             </div>`;
  //   }
  //   code += `</div></div>`
  // }
  // document.querySelector(`#${pills_id}`).innerHTML = code;
}

//Save my collab
function saveCollab() {
  var form = document.querySelector("#create-collab-form");
  form.classList.add("was-validated");
  if(form.checkValidity() == true){
    return true;
  }else{ 
    return false;
  }
}