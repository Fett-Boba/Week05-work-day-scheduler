var container = document.querySelector(".container");
var userInput;
var userInputID;

// Update jumbotron with current date.
function updateJumbotron() {
    currentDay.innerHTML = getDate();    
}

// Get the date from Moment
function getDate() {
    return moment().format("dddd, MMM Do, YYYY");
}

// Get the hour from Moment
function getTime() {
    return moment().format("HH");
}

// Update past/present/future to grey, red, green when rendering 
// the initial page. Workday starts at 9:00 am, and ends aat 18:00
function updateColors() {
    currentTime = getTime();    
    for (var i = 9; i < 18; i++) {
        var color = document.getElementById("TA" + i.toString());
        if (i < currentTime) {
            color.classList.add("past");
        } else if (i == currentTime) {
            color.classList.add("present");
        } else {
            color.classList.add("future");
        }
    }
}

// Save user input by determining which save button they clicked, 
// and checking to make sure they had a text entry for that hour. 
function saveUserInput(event) {
    event.preventDefault();
    var clickedBtnHour = event.target.getAttribute('data-hour');
    if (clickedBtnHour != null && userInputID != undefined && userInput != undefined) {
        var btnHr = clickedBtnHour.substr(1,2);
        var inpHr = userInputID.substr(2,2);
        if (btnHr === inpHr) {
            localStorage.setItem(clickedBtnHour, userInput);      
        } else {
            window.alert("Invalid input. Please try again.");
        }
    }    
}

// Get user input field
function collectUserInput(event) {
    event.preventDefault();
    userInputID = event.target.getAttribute('id');
    userInput = document.getElementById(userInputID).value;   
}

// Pull values back from local storage to populate page on startup
// Workday starts at 9:00 am and ends at 18:00
// If there is saved data (Bnn:value), then render it to the page.
function renderFromLocalStorage() {
    for (var i = 9; i < 18; i++) {
        var savedData = localStorage.getItem("B" + i);
        if (savedData !== undefined || savedData != null) {
            var textareaID = document.getElementById("TA" + i);
            textareaID.innerHTML = savedData;
        }
    }
}

// Initialize and load local variables to the page at startup
updateJumbotron();
updateColors();
renderFromLocalStorage();

// Listeners
container.addEventListener("click", saveUserInput);
addEventListener("change", collectUserInput);
