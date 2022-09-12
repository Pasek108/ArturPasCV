"use strict";

const robot = document.querySelector(".robot");
const robot_activator = robot.querySelector(".activator");
const robot_activator_image = robot_activator.querySelector(".image");
const robot_message = robot.querySelector(".message");
const robot_image = robot_message.querySelector(".image");
const close_robot = robot_message.querySelector(".close");

const robot_found = localStorage.getItem("robot_found");
const robot_ticker = createTicker(moveRobot, 1);

if (robot_found == null) {
  localStorage.setItem("robot_found", "no");
  initRobot();
} else if (robot_found === "no") initRobot();

function initRobot() {
  robot.style.display = "block";
  robot_ticker.start();
  robot_activator.addEventListener("click", showRobotMessage);
  close_robot.addEventListener("click", animateRobotAndClose);
}

function moveRobot() {
  const position = robot_activator.getBoundingClientRect();

  let new_y = 0;
  let new_x = 0;

  if (position.top <= 0) {
    new_y = screen.height;
    new_x = random(-200, screen.width);
  } else if (position.top >= screen.height) {
    new_y = 0;
    new_x = random(-200, screen.width);
  } else if (position.left <= -200) {
    new_y = random(0, screen.height);
    new_x = screen.width;
  } else if (position.left >= screen.width) {
    new_y = random(0, screen.height);
    new_x = -200;
  } else return;

  if (new_x < position.left) {
    robot_activator_image.classList.remove("spin-right");
    robot_activator_image.classList.add("spin-left");
  } else {
    robot_activator_image.classList.remove("spin-left");
    robot_activator_image.classList.add("spin-right");
  }

  robot_activator.style.top = `${new_y}px`;
  robot_activator.style.left = `${new_x}px`;
}

function showRobotMessage() {
  robot.classList.add("active");
  robot_ticker.stop();
  robot_activator.style.display = "none";
  robot_message.classList.add("active");
}

function animateRobotAndClose() {
  robot_image.classList.remove("idle");
  robot_image.classList.add("fly");
  robot_image.style.top = "-35vw";
  localStorage.setItem("robot_found", "yes");
  setTimeout(() => robot_message.classList.remove("active"), 2000);
  setTimeout(() => (robot.style.display = "none"), 2250);
}
