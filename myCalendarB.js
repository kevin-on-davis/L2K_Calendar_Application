// Defining Variables
var currentDate = new Date();
var currYear = currentDate.getFullYear();
var currMonth = currentDate.getMonth()+1;
var currDay =  currentDate.getDate();

var btn_prevday = $("#prev_day");
var btn_nextday = $("#next_day");
var btn_prevmnth = $("#prev_mnth");
var btn_nextmnth = $("#next_mnth");
var btn_prevyear = $("#prev_year");
var btn_nextyear = $("#next_year");

planner_page = new Object();

// Defining Listeners
btn_prevday.on("click", goToPreviousDay);
btn_nextday.on("click", goToNextDay);

btn_prevmnth.on("click", goToPreviousMonth);
btn_nextmnth.on("click", goToNextMonth);

btn_prevyear.on("click", goToPreviousYear);
btn_nextyear.on("click", goToNextYear);

// Construct Arrays
// function build_calendar_array()
// {
//     function daysInMonth (year, month) { 
//         return new Date(year, month, 0).getDate(); 
//     };

//     function build_years(year_start, year_end)
//     {
//         let myYears = new Array();
//         for (yr_cnt = 0; yr_cnt <= year_end; yr_cnt++)
//         {
//             myYears[yr_cnt] = build_months(yr_cnt);
//         }
//         return myYears;
//     };

//     function build_months()
//     {
//         // debugger;
//         let myMonths = new Array();
//         for (mnth_cnt = 0; mnth_cnt < 12; mnth_cnt++)
//         {
//             myMonths[mnth_cnt] = build_days(yr_cnt, mnth_cnt+1);
//         }
//         return myMonths;
//     };

//     function build_days(year, month)
//     {
//         let myDays = new Array();
//         for (day_cnt =0; day_cnt < daysInMonth(year, month); day_cnt++)
//         {
//             myDays[day_cnt] = build_hours();
//         }
//         return myDays;
//     };

//     function build_hours()
//     {
//         let myHours = new Array();
//         for (i=0; i < 24; i++)
//         {
//             myHours[i] = "Kevin - "+i;
//         }
//         return myHours;
//     };
//     return build_years(2019, 2020);
// }

function build_hours()
{
    let myHours = new Array();
    for (i=0; i < 24; i++)
    {
        myHours[i] = "";
    }
    return myHours;
};

function showDay(theyear, themonth, theday)
{
    // $("#calendar-header").html(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $("#calendar-header").html(moment(currentDate).format('MMMM Do, YYYY'));
    let myTime = new Date();
    let currentTime = new Date();

    $("#day-view").empty();
    // debugger;
    if (!localStorage.myElaborateCalendar)
    {
        alert(moment().format('YYYYMMDD'));
        planner_page = [Number(moment().format('YYYYMMDD')), build_hours()];
        // localStorage.setItem("myElaborateCalendar", planner_page);
        // myCalendar = JSON.parse(localStorage.getItem("myElaborateCalendar"));
    }
    // else
    // {
    //     myCalendar = JSON.parse(localStorage.getItem("myElaborateCalendar"));
    // };


    for (i=0; i < 24; i++)
    {
        myTime.setHours(i, 0, 0, 0);
        let dspTime = myTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
        $(`<div class="card ${setTimeBlockColour(currentTime.getHours(), i)}" style="font-style:italic" id="time-block">${dspTime}<input class="card time-block" id="event" name="${i}" type="text" value="" placeholder="Free Time Slot" onchange="post_event()"/><button id="save_btn" class="saveBtn" value="${i}" onclick="save_event()">Save Entry</button></div>`).appendTo("#day-view");
    };
    rightNow = setInterval(showCurrentDate, 1000);
}



function setTimeBlockColour(currentHour, timeBlockHour)
{
    if (currentHour > timeBlockHour && (timeBlockHour >= 9 && timeBlockHour <= 17))
    {
        return "past";
    }
    else if (timeBlockHour < 9)
    {
        return "nonworkhour";
    }
    else if (currentHour == timeBlockHour)
    {
        return "present";
    }
    else if (currentHour < timeBlockHour && timeBlockHour <= 17)
    {
        return "future";
    }
    else if (timeBlockHour > 17)
    {
        return "nonworkhour";        
    }

};

function showCurrentDate()
{
    $("#calendar-header").html(moment(currentDate).format('MMMM Do, YYYY'));
};

function goToPreviousDay()
{
    currentDate = moment(currentDate).subtract(1, 'day');
    currYear = currentDate.getFullYear();
    currMonth = currentDate.getMonth()+1;
    currDay =  currentDate.getDate();
    showDay(currYear, currentMonth, currentDay);
};

function goToNextDay()
{
    currentDate = moment(currentDate).add(1, 'day');
    currYear = currentDate.getFullYear();
    currMonth = currentDate.getMonth()+1;
    currDay =  currentDate.getDate();
    showDay(currYear, currentMonth, currentDay);
};

function goToPreviousMonth()
{
    currentDate = moment(currentDate).subtract(1, 'month');
    currYear = currentDate.getFullYear();
    currMonth = currentDate.getMonth()+1;
    currDay =  currentDate.getDate();
    showDay(currYear, currentMonth, currentDay);
};

function goToNextMonth()
{
    currentDate = moment(currentDate).add(1, 'month');
    currYear = currentDate.getFullYear();
    currMonth = currentDate.getMonth()+1;
    currDay =  currentDate.getDate();
    showDay(currYear, currentMonth, currentDay);
};

function goToPreviousYear()
{
    currentDate = moment(currentDate).subtract(1, 'year');
    currYear = currentDate.getFullYear();
    currMonth = currentDate.getMonth()+1;
    currDay =  currentDate.getDate();
    showDay(currYear, currentMonth, currentDay);
};

function goToNextYear()
{
    currentDate = moment(currentDate).add(1, 'year');
    currYear = currentDate.getFullYear();
    currMonth = currentDate.getMonth()+1;
    currDay =  currentDate.getDate();
    showDay(currYear, currentMonth, currentDay);
};


function post_event(theyear, themonth, theday)
{
    event.preventDefault();
    alert(`${theyear} ${themonth} ${theday} ${event.target.name} `+ event.target.value);
    myCalendar[theyear][themonth][theday][event.target.name].event = event.target.value;
    alert(myCalendar[theyear][themonth][theday][event.target.name].event);
};

function save_event(theyear, themonth, theday)
{
    event.preventDefault();
    alert("Target "+ event.target.value);
    currPage[theyear][themonth][theday][event.target.value].event =  myCalendar[theyear][themonth][theday][event.target.value].event;
    localStorage.setItem("myElaborateCalendar", JSON.stringify(currPage));

    myCalendar = JSON.parse(localStorage.getItem("myElaborateCalendar"));
    currPage = JSON.parse(localStorage.getItem("myElaborateCalendar"));

};

$( document ).ready(function()
{
    showDay(currYear, currMonth, currDay);
});
