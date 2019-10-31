<html>
    <head>
        <title>The Roaring Tigers | Roster</title>
        <link rel="icon" href="img/icon.png">
        <link rel="stylesheet" href="style.css">
        <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic" rel="stylesheet">
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/roster.js"></script>
    </head>
    <body>
        <div id="wrap">
            <div id="header-wrap">
                <img src="img/logo.png" alt="The Roaring Tigers">
            </div>
            <div id="content-wrap">
                <div id="nav">
                    <a href="index.php">Home</a>
                    <a class="active" href="roster.php">Roster</a>
                    <a href="calendar.php">Calendar</a>
                    <a href="apply">Apply</a>
                </div>
                <div id="body-wrap" class="body-margin-default">
                    <h3>Roster</h3>
                    <?php require "../../phpreq/connectToRosterDB.php"; ?>
                </div>
            </div>
            <div id="footer-wrap">
                Copyright &#169; 2018 TheRoaringTigers. All rights reserved.
            </div>
        </div>
    </body>
</html>