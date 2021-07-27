//establish a root element to attach dynamically generated pieces
var timeBlockEl = $('#timeSchedule');
var currentDayEl = $('#currentDay');

//object to hold and render activities
var taskTracker = [
    {
        hour: "",
        activity: "",
    }
];
var workTime = 8;
var startTime = 8;

function SaveActivity (){

}

function SetWorkHours(){

}

function init(){
    for(var i = 0; i <= workTime; i++){
        timeBlockEl.append('<input type="text" class="form-control" placeholder="Open Time" aria-label="Open Time" aria-describedby="button-addon2"><button class="btn btn-outline-secondary saveBtn" type="button" id="button-addon'+i+'">Save</button>')
    };


}

init();