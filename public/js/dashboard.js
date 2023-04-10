"use strict";
const $ = (selector) => document.querySelector(selector);

const postalRegEx =
  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

const onReset = (evt) => {
  //Reset each fields
  resetErrors();
  $("#device_name").value = "";
  $("#notification").checked = false;
  $("#off").checked="";
  $("#away").checked = "";
  $("#echo").checked="";
  $("#full").checked = "";
  $("#postal_code").value = "";
  $("#temperature").value = "";
  evt.preventDefault();
};

const resetErrors = () => {
    //Reset error messages
    $("#temperature_error").textContent = "";
    $("#postal_code_error").textContent = "";
};



const onSubmit = (evt) => {
    resetErrors();

    evt.preventDefault();

    let form_error = false;
    //arrange every errors in one form

    let Device_name = $("#device_name").value;
    let notification_on = $("#notification").checked;
    let lighting_mode = document.querySelectorAll("[name='lighting_mode']")
    let postal_code = $("#postal_code").value;
    let postal_code_error =$("#postal_code_error")
    let temperature = $("#temperature").value;
    let temperature_error = $("#temperature_error");


    for (let i = 0; i < lighting_mode.length; i++) {
        if (lighting_mode[i].checked) {
          //Set setting_lighting_mode to the value of the selected radio button
          $("#current_lighting_mode").textContent = lighting_mode[i].value;
        }
    }
  
    if (! postalRegEx.test(postal_code)){
        //Test if the postal code is vaild then if not show up the error message
        postal_code_error.textContent = "※ Invaild. The format is supposed to be A#A #A#";
        form_error = true;
    }

    if (isNaN(temperature) || temperature == "") {
        //Test if the temperature is number then if not show up the error message
        temperature_error.textContent = "※ Invaild";
        form_error = true;
    } else if (temperature > 25 || temperature < 10) {
        //check if the temperature in the range then if not show up the error message
        temperature_error.textContent ="Check your setting temperature again";
        form_error = true;
    } 

    if (!form_error){
        //as long as there's any errors, it cannot be submitted
        $("#current_name").textContent = Device_name;
        $("#current_notification").textContent = notification_on ? "On" : "Off";
        $("#current_postal_code").textContent = postal_code;
        $("#current_temperature").textContent = temperature;
        $("#dashboard_form").submit();
    }else{
        evt.preventDefault();
    }
};


document.addEventListener("DOMContentLoaded", () => {
    $("#date").textContent = new Date().toDateString();//add current date
    $("#reset").addEventListener("reset", onReset);//add reset form listener
    $("#submit").addEventListener("click", onSubmit);//add submit form listener
});