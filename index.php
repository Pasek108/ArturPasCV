<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Artur Pas</title>

  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.1/css/all.css" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="./style.css" />
  <link rel="stylesheet" href="./Elements/Navbar/Css/navbar.css" />
  <link rel="stylesheet" href="./Elements/Background/Css/background.css" />
  <link rel="stylesheet" href="./Elements/About/Css/about.css" />
  <link rel="stylesheet" href="./Elements/About/Css/robot.css" />
  <link rel="stylesheet" href="./Elements/Projects/Css/projects.css" />
  <link rel="stylesheet" href="./Elements/Contact/Css/contact.css" />
  <link rel="stylesheet" href="./Elements/Game/Css/game.css" />
</head>

<body>
  <?php
  include "./Elements/Navbar/navbar.html";
  include "./Elements/Background/background.html";
  include "./Elements/About/about.html";
  include "./Elements/Projects/projects.html";
  include "./Elements/Contact/contact.html";
  include "./Elements/Game/game.html";
  ?>

  <script src="https://pixijs.download/v6.5.1/pixi.min.js"></script>
  <script src="./script.js"></script>
  <script src="./Elements/Background/Js/background.js"></script>
  <script src="./Elements/Navbar/Js/navbar.js"></script>
  <script src="./Elements/About/Js/about.js"></script>
  <script src="./Elements/Projects/Js/projects.js"></script>
  <script src="./Elements/Contact/Js/contact.js"></script>

  <script src="./Elements/About/Js/robot.js" async></script>
  <script src="./Elements/Game/Js/Platform.js" async></script>
  <!--<script src="./Elements/Game/Js/game.js" async></script>-->
</body>

</html>