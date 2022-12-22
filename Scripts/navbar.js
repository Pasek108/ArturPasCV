"use strict";

class Language {
  constructor() {
    this.container = document.querySelector(".lang");
    this.container.addEventListener("click", this.toggleLangMenu.bind(this));

    this.selector = this.container.querySelector(".selector");
    this.choosen_lang = this.selector.querySelector(".choosen-lang");

    this.options = this.container.querySelectorAll(".option");

    for (let i = 0; i < this.options.length; i++) {
      this.options[i].addEventListener("click", this.changeLanguage.bind(this));
    }
  }

  toggleLangMenu() {
    this.container.classList.toggle("active");
  }

  changeLanguage(evt) {
    for (let i = 0; i < this.options.length; i++) {
      this.choosen_lang.classList.remove(this.options[i].dataset.lang);
    }

    this.choosen_lang.classList.add(evt.currentTarget.dataset.lang);
    document.body.lang = evt.currentTarget.dataset.lang;
  }
}

class Navbar {
  static profession = document.querySelector(".navbar .profession");

  constructor() {
    this.container = document.querySelector(".navbar");
    this.lang = new Language();

    this.views = document.querySelectorAll(".view");
    this.options = this.container.querySelectorAll(".link");
    this.indicator = this.container.querySelector(".indicator");

    for (let i = 0; i < this.options.length; i++) {
      this.options[i].addEventListener("click", this.toggleOption.bind(this));
    }

    this.grid = this.container.querySelector(".grid");

    const grid_fragment = document.createDocumentFragment();
    for (let i = 0; i < 50; i++) grid_fragment.appendChild(document.createElement("div"));
    this.grid.appendChild(grid_fragment);
  }

  toggleOption(evt) {
    const option_id = evt.currentTarget.dataset.id;
    this.indicator.style.left = `${option_id * 11}rem`;

    for (let j = 0; j < this.views.length; j++) {
      this.views[j].classList.remove("active");
      this.views[j].style.transform = `translateX(${-100 * option_id}vw)`;
    }

    this.views[option_id].classList.add("active");
    stars_background.moveBackground(option_id);
  }
}

new Navbar();

