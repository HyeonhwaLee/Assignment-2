"use strict";

const $ = (selector) => document.querySelector(selector);

const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/;

const onReset = (evt) => {
  //Reset each fields
  resetErrors();

  $("#first_name").value = "";
  $("#last_name").value = "";
  $("#email").value = "";
  $("#password").value = "";
  $("#confirm_password").value = "";

  evt.preventDefault();
};

const resetErrors = () => {
  //Reset error messages
  $("#name_error").textContent = "";
  $("#password_error").textContent = "";
  $("#email_error").textContent = "";
  $("#birthday_error").textContent = "";
};

const onSubmit = (evt) => {
  resetErrors();
  let form_error_profile = false;
  //arrange every errors in one form

  let first_name = $("#first_name").value;
  let last_name = $("#last_name").value;
  let email = $("#email").value;
  let password = $("#password").value;
  let confirm_password = $("#confirm_password").value;
  let bday = new Date($("#birthday").value);
  let today = new Date();


  if(first_name=="" || last_name=="") {
     //check if the name is filled then if not show up the error message
    $("#name_error").textContent = "※ Check if you entered your full name";
    form_error_profile = true;
  }


  if(!passwordRegEx.test(password)) {
    //Test if the password is the right format then if not show up the error message
    $("#password_error").textContent = "※ Check your password";
    form_error_profile = true;
  }
  if(password!=confirm_password){
    //Test if the password and confirm password match then if not show up the error message
    $("#password_error").textContent = "※ Passwords do not match.";
    form_error_profile = true;
  }

  if(!emailRegEx.test(email)){
    //Test if the email is the right format then if not show up the error message
    $("#email_error").textContent = "※ Invaild";
    form_error_profile = true;
  }
  if (today.setHours(0, 0, 0, 0) < bday) {
    //if user's birthday is in the future then show up the error message
    $("#birthday_error").textContent = "※ Check again. It must be in the past.";
    form_error_profile = true;
  }

  if (!form_error_profile) {
    //as long as there's any errors, it cannot be submitted
    $("#first_name_updated").textContent = $("#first_name").value;
    $("#last_name_updated").textContent = $("#last_name").value;
    $("#email_updated").textContent = $("#email").value;
    $("#birthday_updated").textContent = bday.toDateString();

  }else{
    evt.preventDefault();
  }

  evt.preventDefault();
};

document.addEventListener("DOMContentLoaded", () => {
  $("#submit").addEventListener("click", onSubmit);//add submit form listener
  $("#reset").addEventListener("click", onReset);//add reset form listener
});
