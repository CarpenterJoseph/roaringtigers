$(document).ready(function(){
    calendar();
    console.log("asd");
})

//date object
var d = new Date();
//current month(int)
var month = d.getMonth();
//current year
var year = d.getFullYear();
//number of days in this month
var numDays;
//first weekday of the month
var firstDay;
//month name
var monthName;
//number of rows
var numRows;
//data from database
var data = new Array();

function calendar(){
    getData();
    drawCalendar();
}

//gets info from sql query echoed to page and stores it in array, then removes it
function getData(){
    var numElements = $("#query").children().length;
    for(var i = 0; i < numElements; i++){
        dissect($("#query span:nth-child(" + (i + 1) + ")").attr('id'), $("#query span:nth-child(" + (i + 1) + ")").text());
    }
    $("#query").empty();
}

//draws calendar to page
function drawCalendar(){
    //sets all vars to current month
    numDays = 32 - new Date(year, month, 32).getDate();
    firstDay = new Date(year, month, 1).getDay();
    monthName = getMonthName(month);
    numRows = getNumRows();
    //adds month and year to table caption
    $("#calendar").append("<caption><button type='button' id='calLeftButton' onclick='backMonth()'>" + getMonthName(month - 1) + 
    "</button><button type='button' id='calRightButton' onclick='forwardMonth()'>" + 
    getMonthName(month + 1) + "</button><h3>" + monthName + " " + year + "</h3></caption>");
    //adds day labels to top of calendar
    $('#calendar').append("<tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr>");
    //current day(int starts at 1)
    var cur = 0;
    //loops through rows of table
    for(var y = 0; y < numRows; y++){
        //adds tr attribute to append string
        var row = "<tr>"
        //loops through columns of table
        for(var x = 0; x < 7; x++){
            //if first row and column is equal to or after first day of month add day and td attributes
            if(y == 0 && x >= firstDay){
                cur++;
                row += "<td class='filled' id='cal" + sqlDate(cur) + "'>" + cur + "</td>";
            //if after first row and current day is less than number of days left add day and td attributes
            }else if(y > 0 && cur < numDays){
                cur++;
                row += "<td class='filled' id='cal" + sqlDate(cur) + "'>" + cur + "</td>";
            //if none of these conditions are met just add empty td
            }else{
                row += "<td></td>";
            }
        }
        //ends table row
        row += "</tr>";
        //appends row string to table
        $("#calendar").append(row);
    }
    addEventsToCalendar();
    popUp();
}

function popUp(){
    //adds click function to calendar events
    $(".data-content").click(function(){
        console.log(1);
        removePopUp();
        var curEvID = $(this).attr("id"),
            curTitle,
            curDate,
            curTime,
            curDescription;
        for(var i = 0; i < data.length; i++){
            if(curEvID === data[i][0]){
                curTitle = data[i][2];
                curDate = abroadDate(data[i][1]),
                curDescription = data[i][3];
                curTime = data[i][4];
            }
        }
        //adds popup window and info to page
        $("body").prepend("<div id='popup-wrap'><h4 id='title'>" + curTitle + "</h4><h4 id='dateTime'>" + 
        curDate + " at " + curTime + " gmt" + "</h4><img id='exitPopup' src='img/x.png'><p id='description'>" + 
        curDescription + "</p></div>");
        //adds exit function to x in popup window
        $("#exitPopup").click(function(){
            //removes popup window
            removePopUp();
            $(this).removeClass("data-content-active");
        });
    });
}

function removePopUp(){
    $("#popup-wrap").remove();
}

function dissect(id, input){
    var ret = new Array();
    var br1loc = input.indexOf("{1}{}");
    var br2loc = input.indexOf("{}{2}");
    var br3loc = input.indexOf("{3}{}");
    ret[0] = id;
    ret[1] = input.slice(0, br1loc);
    ret[2] = input.slice(br1loc + 5, br2loc);
    ret[3] = input.slice(br2loc + 5, br3loc);
    ret[4] = input.slice(br3loc + 5, input.length);
    //removes 0 if time is below 10
    if(ret[4].substring(0, 1) === "0"){
        ret[4] = ret[4].substring(1, 5)
    }
    data.push(ret);
}

//date in a format used to compare it to sql dates
//yyyy-mm-dd
function sqlDate(day){
    var rMonth = month + 1, rDay = day;
    if(rMonth < 10){
        rMonth = "0" + rMonth;
    }
    if(rDay < 10){
        rDay = "0" + rDay;
    }
    return year + "-" + rMonth + "-" + rDay;
}

//used for description
//dd-mm-yy
function abroadDate(date){
    var ret = "";
    ret += date.slice(8,10)
    ret += "/";
    ret += date.slice(5,7);
    ret += "/";
    ret += date.slice(2,4);
    return ret;
}

//mm-dd-yy
function USDate(){

}

function addEventsToCalendar(){
    var cur;
    for (var i = 0; i < data.length; i++) {
        cur = "#cal" + data[i][1];
        $(cur).removeClass("filled");
        $(cur).addClass("data");
        $(cur).append("<div id='"+ data[i][0] +"' class='data-content'>" + data[i][2] + "</div>");
    }
}

function backMonth(){
    month--;
    if(month < 0){
        month = 11
        year--;
    }
    removePopUp();
    redDraw();
}

function forwardMonth(){
    month++;
    if(month > 11){
        month = 0;
        year++;
    }
    removePopUp();
    redDraw();
}

function redDraw(){
    $("#calendar").empty();
    drawCalendar();
}

function getMonthName(m){
    if(m < 0){
        m = 11;
    } else if(m > 11){
        m = 0;
    }
    var months = new Array();
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";
    return months[m];
}

function getNumRows(){
    var daysInFirstWeek = 7 - firstDay;
    var daysRemaining = numDays - daysInFirstWeek;
    return Math.ceil(1 + (daysRemaining / 7));
}