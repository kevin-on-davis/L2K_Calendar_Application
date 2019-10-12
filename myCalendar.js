// Defining variables

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
                myDays[day_cnt] = {"day" : day_cnt, "hours":myHours};
            }
            myMonths[mnth_cnt] = {"month": mnth_cnt, "mDays": myDays};
        }
        myYears[yr_cnt] = {
            "year" : yr_cnt,
            "months" : myMonths};
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
    for (i=0; i < 24; i++)
    {
        let currentTime = new Date();
        let act_hour = i + 1;
        myTime.setHours(i, 0, 0, 0);
        dspTime = myTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' });

        $(`<div class="card" id="time-block">${dspTime}<input class="card time-block" id="event" name="${dspTime}" type="text" value="" /></div>`).appendTo("#day-view");
        // myYears[theyear].myMonths[themonth].myDays[theday].myHours[i];

        if (currentTime.getHours()% 12 || 12 > act_hour && act_hour >= 9)
        {
            $("#time_block").css("background", "red");
        }
        else if (currentTime.getHours()% 12 || 12 > act_hour && act_hour < 9)
        {
            $("#time_block").css("background", "grey");
        }
        else if (currentTime.getHours()% 12 || 12 < act_hour && act_hour < 17)
        {
            $("#time_block").css("background", "lightgreen");
        }
    }

}


$( document ).ready( today );
