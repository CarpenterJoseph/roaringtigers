$(document).ready(function(){
    roster();
});

var data = new Array;

function roster(){
    getData()
    console.log(data);
    drawRoster();
}

function drawRoster(){
    for(var i = 0; i < data.length; i++){
        if(i === data.length - 1){
            $("#body-wrap").append("<div id='roster-wrap' style='margin-bottom: 0'><img id='roster-image' src='img/flags/" + data[i][3] + ".png'><h4 id='roster-name'>||TRT|| " + data[i][1] + "</h4><h4 id='roster-date'>Joined: " + data[i][2] + "</h4></div>");
        }else{
            $("#body-wrap").append("<div id='roster-wrap'><img id='roster-image' src='img/flags/" + data[i][3] + ".png'><h4 id='roster-name'>||TRT|| " + data[i][1] + "</h4><h4 id='roster-date'>Joined: " + data[i][2] + "</h4></div>");
        }
    }
}   

function getData(){
    var numElements = $("#query").children().length;
    for(var i = 0; i < numElements; i++){
        dissect($("#query span:nth-child(" + (i + 1) + ")").attr('id'), $("#query span:nth-child(" + (i + 1) + ")").text());
    }
    $("#query").empty();
}

function dissect(id, input){
    var ret = new Array();
    var br1loc = input.indexOf("{1}{}");
    var br2loc = input.indexOf("{}{2}");
    ret[0] = id;
    ret[1] = input.slice(0, br1loc);
    ret[2] = adjustDate(input.slice(br1loc + 5, br2loc));
    ret[3] = input.slice(br2loc + 5, input.length);
    data.push(ret);
}

function adjustDate(date){
    var ret = "";
    ret += getMonthName(date.slice(5, 7));
    ret += " "
    ret += date.slice(0, 4);
    return ret;
}

function getMonthName(m){
    m = m - 1;
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