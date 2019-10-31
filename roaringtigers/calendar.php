<html>
    <head>
        <title>The Roaring Tigers | Calendar</title>
        <link rel="icon" href="img/icon.png">
        <link rel="stylesheet" href="style.css">
        <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic" rel="stylesheet">
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/calendar.js"></script>
    </head>
    <body>
        <div id="wrap">
            <div id="header-wrap">
                <img src="img/logo.png" alt="The Roaring Tigers">
            </div>
            <div id="content-wrap">
                <div id="nav">
                    <a href="index.php">Home</a>
                    <a href="roster.php">Roster</a>
                    <a class="active" href="calendar.php">Calendar</a>
                    <a href="apply.php">Apply</a>
                </div>
                <div id="body-wrap">
                    <table id="calendar">
                    </table>
                    <?php require "../../phpreq/connectToCalendarDB.php"; ?>
                </div>
            </div>
            <div id="footer-wrap">
                Copyright &#169; 2018 TheRoaringTigers. All rights reserved.
            </div>
        </div>
    </body>
</html>