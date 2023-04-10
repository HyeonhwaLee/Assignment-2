"use strict";

const $ = (selector) => document.querySelector(selector);

let timerCounter = 600;
let timer;

let min;
let sec;

const goToTerms = () => {
    timerCounter -= 1;

    min = parseInt(timerCounter/60)
    sec = parseInt(timerCounter%60)


    if(timerCounter>0){
        $("#seconds").textContent = timerCounter;

    }else{
        window.location.href = "terms"
    }
}


const acceptTerms = () => {
    clearInterval(timer);
    $("#terms").setAttribute("class","hidden");
}


const toggleQuestion = (evt) => {
    evt.currentTarget.classList.toggle("minus");
    let answerDiv = evt.currentTarget.nextElementSibling;
    answerDiv.classList.toggle("open");

}

document.addEventListener("DOMContentLoaded", () => {

    $("#seconds").textContent = timerCounter;
    //step1: check if user accepted terms
    const query = window.location.search;
    const urlParameters = new URLSearchParams(query);
    const accepted = urlParameters.get("accepted");
    //console.log(urlParameters.get("first_name")+ " is my name");
    // make sure using "&"

    $("#accept").addEventListener("click", acceptTerms);

    const h2Elements = document.querySelectorAll("h2"); //h2 is an element so there's not #

    for(let h2 of h2Elements){
        h2.addEventListener("click", toggleQuestion);
    }
    
    if(accepted){
        $("#terms").setAttribute("class","hidden");
    }else{
        timer = setInterval(goToTerms, 1000);
    }
});
