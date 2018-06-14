// Name: Yu Du
//
// This is the main.js for the main page which handles the snow.


"use strict";

/**
* The main function to start this js file.
*/
(function() {
    
    const MODELS_BASE_URL = "main.php";
    
    /**
    * Returns the element that has the ID attribute with the specified value.
    * @param {string} id - element ID
    * @return {object} DOM object associated with id.
    */
    function $(id) {
        return document.getElementById(id);
    }
    
    /**
    * Happens after all the content resources have
    * been loaded.
    */
    window.onload = function() {
        setInterval(newSnowBall, 200);
        setInterval(fall, 50);
        getModels();
    };
    
    function getModels(){
        fetch(MODELS_BASE_URL + "?name=Cara", {credentials: "include"})
            .then(checkStatus)
            .then(displayModels)
            .catch(console.log());
    }
    
    function displayModels(text) {
        $("model_container").innerText = text;
    }
    
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.text();
        } else {
            return response.text().then(Promise.reject.bind(Promise));
        }
    }
    
    
    function newSnowBall() {
        let div = document.createElement("div");
        let diameter = randomDiam();
        div.classList.add("snowball");
        div.style.left = randomNum(1300 - diameter) + "px";
        div.style.top = 0 + "px";
        div.style.height = diameter + "px";
        div.style.width = diameter + "px";
        $("main").appendChild(div);
    }
    
    function fall(div, speed, diameter) {
        let snowballs = document.querySelectorAll(".snowball");
        for (let i = 0; i < snowballs.length; i++) {
            let snowball = snowballs[i];
            let diameter = parseInt(snowball.style.height);
            let speed = 5;
            let yLoc = parseInt(snowball.style.top);
            yLoc += speed;
            if (yLoc < 1000) {
                snowball.style.top = yLoc + "px";
            } else {
                snowball.remove();
            }
        }
    }
    
    function randomDiam() {
        let diams = [5, 8, 12];
        return diams[Math.floor(Math.random() * diams.length)];
    }
    
    function randomNum(maxValue) {
        return Math.random() * maxValue;
    }
    
    
    
})();