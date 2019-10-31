<?php
    //code from https://www.w3schools.com/php/php_mysql_select.asp
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "trtsquad_calendar";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    } 

    // $sql = "SELECT MAX(eventID) FROM events";
    // $result = $conn->query($sql);
    // $row = $result->fetch_assoc();

    echo "<div id=\"query\">";
    // echo $row["MAX(eventID)"] . "</br>";
    
    $sql = "SELECT * FROM events";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row with corresponing attributes for data extraction
        while($row = $result->fetch_assoc()){
            echo "<span id=\"ev" . $row["eventID"] . "\">" . $row["eventDate"] . 
                "{1}{}" . $row["eventName"] .  "{}{2}" . $row["eventDesc"] . 
                "{3}{}" . $row["eventTime"] . "</span><br>";
        }
        echo "</div>";
    }else{
        echo "0 results, notify admin.";
    }
    $conn->close();
?>