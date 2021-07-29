//establish a root element to attach dynamically generated pieces
//Strangest variable weirdness ever
var trackedTasks = [];

var timeBlockEl = $('#timeSchedule');
var currentDayEl = $('#currentDay');
var rightNow = moment().format('MMM DD, YYYY [at] hh:mm a');
//object to hold and render activities
debugger

let workTime = 16;
let merdian = 'am';
let startTime = 7;

function SaveActivity (clickedButton){

    //Naming convention is to have the index slice of and give the id name of the text field to save
    let x = "";
    let y = "";
    //always slice after the known '-' existence spot
    x = clickedButton.slice(clickedButton.indexOf('-')+1)
    y = clickedButton.match(/\d+/)[0];
    z = $('#'+x.toLocaleLowerCase()).val();

    //Take jquery of object by index value
    if(z !== ""){
        var localTaskTemp ={
            activity: z,
            hour: $('#time'+y)[0].innerHTML
        };
        trackedTasks.push(localTaskTemp);
        localStorage.setItem("taskTracker", JSON.stringify(trackedTasks));
    }
}
/**?
 * Finds the present day of the hour that matches the schdule
 * Assumes a time will be found for the present daily hour
 * however it will handle off early morning hours
 */
function colorCodeWorkHours(){
    
    var check1 = "";
    var present = 0;

    for(var i = 0; i <= workTime; i++){
        check1 = document.querySelector('#time'+i).textContent
        /*
            This code uses moment.js WEB API https://momentjs.com/docs/
            format('ha') - allows the time to be returned in:
                 h - 0, 1, etc , til 12
                 a - the meridan in lower case 
                 this bit finds the present moment of the day and marks it present
                 then records it in i
            */
        if(!(check1 > moment().format('ha')) && !(check1 < moment().format('ha'))) { 
            $('#activity'+i).addClass('present');
            present = i;
        } 
    }
    //now that present cell is known, transverse back through elements til the 0th reached
    //will always have to go back one
    for(var j = (present - 1); j >= 0; j--){
        $('#activity'+j).addClass('past');
        //using jquery to grab element and change the inner text
        // $('#activity'+j).text("The time has passed.").prop('disabled', true);
        // $('#save-Activity'+j).prop('disabled', true);
    }
    //assumes all cases going forward, but would miss 0 index while looping
    //checks if 0, if true paint all
    if(present === 0){
        $('#activity'+present).addClass('future')
    }//If moment on the daily calender corresponds then color all those cells forward of present
    for(var k = (present+1); k <= workTime; k++){
        $('#activity'+k).addClass('future');
    }

}

function init(){
   
    for(var i = 0; i <= workTime; i++){
        if(startTime === 12){
            merdian = 'pm';
        }
        if(startTime > 12){
            startTime = 1;
        }
        timeBlockEl.append('<section class="column"><label id="time'+i+'" class="col-2 time-block"></label><textarea id="activity'+i+'"type="text" class="form-control col-9" placeholder="Open Time" aria-label="Open Time" aria-describedby="button-addon2"></textarea><button class="btn btn-outline-secondary col-1 saveBtn" type="button" id="save-Activity'+i+'">Save</button></section>')
        $('#time'+i).text(startTime+merdian);
        startTime++;
    };

    var taskReturner = JSON.parse(localStorage.getItem("taskTracker"))
    debugger;
    
    //check there are items in local storage
    if(taskReturner !== null){
        trackedTasks = taskReturner;
    }
    setActivities();
}
//Register what button was clicked. Don't react to anything but button clicks
//if a button, find out which one and go to save event
timeBlockEl.click("click", function(event) {
    var target = $(event.target);
    if(target.is("button")){
       SaveActivity(event.target.attributes.id.nodeValue);
    }
})


function displayTime() {
    currentDayEl.text(rightNow);
}

function setActivities(){
   if(trackedTasks.length > 0 && trackedTasks !== null){
    //cycle through local stored items
        for(var j = 0; j < trackedTasks.length; j++){
            //cycle through activities till times match, then use that 
            for(var i = 0; i < workTime; i++){
                if($('#time'+i)[0].innerHTML == trackedTasks[j].hour){
                    $('#activity'+i).val(trackedTasks[j].activity);
                }
            }
        }
    }
}

//Functions that require running on page load
init();
setInterval(displayTime, 1000);
colorCodeWorkHours();
