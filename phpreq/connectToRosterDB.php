<?php
    //code from https://www.w3schools.com/php/php_mysql_select.asp
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "trtsquad_roster";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    } 

    echo "<div id=\"query\">";
    
    $sql = "SELECT * FROM members";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row with corresponing attributes for data extraction
        while($row = $result->fetch_assoc()){
            echo "<span id=\"mem" . $row["memberID"] . "\">" . $row["memberName"] . 
                "{1}{}" . $row["memberJoinDate"] .  "{}{2}" . $row["memberNat"] . "</span>";
        }
        echo "</div>";
    }else{
        echo "0 results, notify admin.";
    }
    $conn->close();
?>