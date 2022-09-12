"use strict";

/* ------------ shrink on scroll ------------ */
const profession = document.querySelector(".navbar .profession");

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    profession.style.height = "0";
  } else {
    profession.style.height = "1.5rem";
  }
});

/* ------------ nav options ------------ */
const pages = document.querySelectorAll(".page");
const nav_options = document.querySelectorAll(".nav-link");
const nav_indicator = document.querySelector(".nav-indicator");

for (let i = 0; i < nav_options.length; i++) {
  nav_options[i].addEventListener("click", toggleOption);
}

function toggleOption(evt) {
  const option_id = this.dataset.id;
  nav_indicator.style.left = `${option_id * 11}rem`;

  for (let j = 0; j < pages.length; j++) {
    pages[j].classList.remove("active");
    pages[j].style.transform = `translateX(${-100 * option_id}vw)`;
  }

  pages[option_id].classList.add("active");
  moveBackground(option_id);
}
