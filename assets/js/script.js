$(document).ready(function(){
    var tasks= [];

    //listen for the save button
    $(".saveBtn").on("click", function(){
        var value = $(this).siblings(".description").val();
        var time = $(this).parent().attr("id");
        var dateAdd = moment().format("dddd, MMMM Do");

        tasks = {
            value:"",
            time:"",
            dateAdd: "",
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    function reminder() {
        var currentHr = moment().hours();

     //loop for time blocks
        $(".time-block").each(function(){
            var blockTime = parseInt($(this).attr("id").split("-")[1]);
            
            //if current hour is > the block hour
            if(currentHr > blockTime) {
                $(this).addClass("past");
            }
            //if the current time is equal then to remove the 'past' and add 'present'
            else if(currentHr === blockTime){
                $(this).removeClass("past");
                $(this).addClass("present");
            }
            //if no the either remove the 'present' and add the 'future'
            else{
                $(this).removeClass("past");
                $(this).removeClass("present");
                $(this).addClass("future");
            }
        });
    }
    reminder();

    //interval to check if current time needs to be updated
    //reminder() will execute every 30 sec
    var secondsLeft = 30;
    function setTime() {
        setInterval(function(){
            secondsLeft--;

            if(secondsLeft === 0){
                reminder();
                secondsLeft = 30;
            }
        }, 1000);
    }
    setTime();

    //reset to a new day
    var currentDay = moment().format("dddd, MMMM, Do");
    for(var i = 0; i < tasks.length; i++) {
        if(currentDay.isAfter(tasks[i].date)){
            tasks[i].description ="";
            tasks[i].time ="";
            tasks[i].date ="";
            tasks.length = 0;
        }
    }
  //load saved data from localStorage
  var savedTasks = JSON.parse(localStorage.getItem("tasks"));

  if(savedTasks !== null){
      tasks = savedTasks;
  }

  for(var i = 0; i < tasks.length; i++){
      var userTasks = tasks[i].description;
      $("#" + tasks[i].time).children(".description").text(userTasks);
  }
  //display on the page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
  