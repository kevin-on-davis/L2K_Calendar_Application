// Defining Vriables

planner_page = new Array();

// Construct Arrays
function build_calendar_array()
{
    function daysInMonth (year, month) { 
        return new Date(year, month, 0).getDate(); 
    } 
    // debugger;
    var myYears = new Array();
    for (yr_cnt = 2019; yr_cnt <= 2022; yr_cnt++)
    {
        var myMonths = new Array();
        for (mnth_cnt = 0; mnth_cnt < 12; mnth_cnt++)
        {
            var days_hldr = daysInMonth(yr_cnt, mnth_cnt+1);
            var myDays = new Array();
            for (day_cnt = 0; day_cnt < days_hldr; day_cnt++)
            {
                var myHours = new Array();
                for (hr_cnt = 0; hr_cnt < 24; hr_cnt++)
                {
                    myHours[hr_cnt] = hr_cnt;
                }
                myDays[day_cnt] = [myHours];
            }
            myMonths[mnth_cnt] = [myDays];
        }
        myYears[yr_cnt] = [myMonths];
    }
    return myYears;
}

function showDay(theyear, themonth, theday)
{
    $("#day-view").empty();
    debugger;
    var arr_hldr = build_calendar_array();
    if (!localStorage.myDayPlanner)
    {
        localStorage.setItem("myDayPlanner", JSON.stringify(build_calendar_array()));
        myCalendar = JSON.parse(localStorage.getItem("myDayPlanner"));
    }
    else
    {
        myCalendar = JSON.parse(localStorage.getItem("myDayPlanner"));
    };

    for (i=0; i < 24; i++)
    {
        $(`<input id="event" type="text" value="${myCalendar[theyear].myMonths[themonth].myDays[theday].myHours[i]}" />`).appendTo("day-view");
        // myYears[theyear].myMonths[themonth].myDays[theday].myHours[i];
    }
}

function today()
{
    var currentDate = new Date();
    // showDay(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay());
    // for (i=0; i < 24; i++)
    // {
    //     $(`<input id="event" type="text" value="${myCalendar[theyear].myMonths[themonth].myDays[theday].myHours[i]}" />`).appendTo("day-view");
    //     // myYears[theyear].myMonths[themonth].myDays[theday].myHours[i];
    // }

    let myTime = new Date();
    let dspTime;
    for (i=0; i <= 24; i++)
    {
        let currentTime = new Date();
        let act_hour = i + 1;
        myTime.setHours(i, 0, 0, 0);
        dspTime = myTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
        debugger;
        $(`<div class="card ${setTimeBlockColour(currentTime.getHours(), i)}" id="time-block">${dspTime}<input class="card time-block" id="event" name="time-slot" type="text" value="" /><button id="save_btn" class="saveBtn" onclick="save_event(${i})">Save Entry</button></div>`).appendTo("#day-view");
        // myYears[theyear].myMonths[themonth].myDays[theday].myHours[i];

        // if (currentTime.getHours() > act_hour && act_hour >= 9)
        // {
        //     $("#time-block").css("background", "red");
        // }
        // else if (currentTime.getHours() > act_hour && act_hour < 9)
        // {
        //     $("#time-block").css("background", "grey");
        // }
        // else if (currentTime.getHours() < act_hour && act_hour < 17)
        // {
        //     $("#time-block").css("background", "lightgreen");
        // }

        planner_page[i] = {"hour":i, "event":$("#event input[name=time-slot]").val()}



    }

}

function setTimeBlockColour(currentHour, timeBlockHour)
{
    if (currentHour > timeBlockHour && timeBlockHour >= 9)
    {
        return "past";
    }
    else if (currentHour > timeBlockHour && timeBlockHour < 9)
    {
        return "past";
    }
    else if (currentHour == timeBlockHour)
    {
        return "present";
    }
    else if (currentHour < timeBlockHour && timeBlockHour < 17)
    {
        return "future";
    }
    else
    {
        return "future";        
    }
};

function save_event()
{
 alert(i)
};

$( document ).ready( today );
