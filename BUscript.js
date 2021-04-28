var container = document.querySelector(".container");
var currentDay = document.querySelector("#currentDay");

var timeBlockHour = 0;   // This is for a 24 hour calendar day... one could make it less, but then its hard to test
var timeBlockDiv;
var rowDiv;

function createHtmlElements() {
    var currentTime = getTime();
    currentDay.innerHTML = getDate();
    for (var i = 0; i < 24; i++) {
        createTimeBlocks();
        createRows();
        createTextareas("hour");
        if (timeBlockHour < currentTime) {
            createTextareas("past");    
        } else if (timeBlockHour == currentTime) {
            createTextareas("present");
        } else {
            createTextareas("future");
        }
        createSaveBtn("saveBtn", timeBlockHour);
        timeBlockHour++;
    }    
}

function getDate() {
    return moment().format("dddd, MMM Do, YYYY");
}

function getTime() {
    return moment().format("HH");
}

function formatAmPm(hour) {
    return moment(hour, "HH").format("h A");
}

function createTimeBlocks() {
    timeBlockDiv = document.createElement("div");
    timeBlockDiv.classList.add("time-block");
    container.appendChild(timeBlockDiv);
}

function createRows() {
    rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    timeBlockDiv.appendChild(rowDiv);
}

function createTextareas(classParm) {
    var textareaDiv = document.createElement("textarea");
    textareaDiv.classList.add(classParm);   
    if (classParm === "hour") {        
        textareaDiv.innerHTML = formatAmPm(timeBlockHour);
        textareaDiv.setAttribute("disabled", true);
    } else {
        textareaDiv.setAttribute("id", "TA" + timeBlockHour);
        textareaDiv.innerHTML = "xxx";
    }
    rowDiv.appendChild(textareaDiv);
}

function createSaveBtn(classParm) {      
    var saveBtn = document.createElement("button");
    saveBtn.classList.add(classParm);
    saveBtn.setAttribute("data-hour", timeBlockHour.toString());
    // YUCK.  adding style=  makes the hover stop working..., but the icon is now clickable
    saveBtn.innerHTML = '<i class="fa fa-save" style="pointer-events:none;"></i>';
    rowDiv.appendChild(saveBtn);
}

function saveUserInput(event) {
    event.preventDefault();

    var saveClickedHour = event.target.getAttribute('data-hour');
    var userInput = document.getElementById("TA" + saveClickedHour).value;
    
    console.log(saveClickedHour);

    if (userInput !== null) {
        console.log("we have data");
        console.log(userInput);
    } else {
        console.log("no data");
    }

}

// Lay down initial page
createHtmlElements();

// Save button event listener
container.addEventListener("click", saveUserInput);
