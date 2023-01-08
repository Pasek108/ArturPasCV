"use strict";

const open_game = document.querySelector(".profile");
open_game.addEventListener("click", () => alert("Sorry, this function is not yet complete :("));

/* ------------ changing text about me ------------ */
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const aboutme_text = document.querySelectorAll(".text-carousel .text");
let current_text_id = 0;

prev.addEventListener("click", () => {
  aboutme_text[current_text_id].classList.remove("active");
  current_text_id--;
  if (current_text_id < 0) current_text_id = aboutme_text.length - 1;
  aboutme_text[current_text_id].classList.add("active");
});

next.addEventListener("click", () => {
  aboutme_text[current_text_id].classList.remove("active");
  current_text_id = (current_text_id + 1) % aboutme_text.length;
  aboutme_text[current_text_id].classList.add("active");
});

/* ------------ cv options ------------ */

const cv_options = document.querySelectorAll(".links-menu .link");

for (let i = 0; i < cv_options.length; i++) {
  cv_options[i].addEventListener("click", () => {
    let is_active = cv_options[i].classList.contains("active");

    if (is_active) cv_options[i].classList.remove("active");
    else cv_options[i].classList.add("active");
  });
}
