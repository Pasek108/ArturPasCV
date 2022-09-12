"use strict";

const skills_groups = document.querySelectorAll(".skills .skills-group");
const skills_tabs = document.querySelectorAll(".tabs .group-name");
const skills_tabs_indicator = document.querySelector(".tabs .indicator");

for (let i = 0; i < skills_tabs.length; i++) {
  skills_tabs[i].addEventListener("click", toggleSkillsTab);
}

function toggleSkillsTab(evt) {
  const option_id = this.dataset.id;
  skills_tabs_indicator.style.left = `${option_id * 8}rem`;

  for (let j = 0; j < skills_groups.length; j++) {
    skills_groups[j].classList.remove("active");
  }

  skills_groups[option_id].classList.add("active");
}

let dragged = null;
const skills = document.querySelectorAll(".projects>header .skill");
for (let i = 0; i < skills.length; i++) {
  skills[i].addEventListener("dragstart", () => (dragged = skills[i]));
}

const target = document.querySelector(".dropzone");
target.addEventListener("dragover", (event) => event.preventDefault());
target.addEventListener("drop", (event) => {
  event.preventDefault();
  target.innerText = dragged.innerText;
  addProjects(dragged.dataset.value);
});

const projects_group = document.querySelector(".projects-group");

function addProjects(skill) {
  projects_group.classList.remove("empty");
  projects_group.innerHTML = "";

  for (let i = 0; i < projects.length; i++) {
    if (!projects[i].skills.includes(skill)) continue;

    const project = generateProject(projects[i]);
    projects_group.appendChild(project);
  }
}

function generateProject(project) {
  const container = document.createElement("div");
  container.className = "project";

  const image = document.createElement("div");
  image.className = "image";
  image.style.backgroundImage = `url(${project.image})`;

  const git_link = document.createElement("a");
  git_link.className = "git-link";
  git_link.href = project.git;
  git_link.target = "_blank";
  git_link.innerText = "Otwórz projekt";

  image.appendChild(git_link);

  const info = document.createElement("div");
  info.className = "info";

  const header = document.createElement("header");

  const title = document.createElement("div");
  title.className = "title";

  const link = document.createElement("a");
  link.href = project.href;
  link.target = "_blank";
  link.innerText = project.name;

  title.appendChild(link);

  const skills = document.createElement("div");
  skills.className = "skills";

  for (let i = 0; i < project.skills.length; i++) {
    const skill = document.createElement("div");
    skill.className = "skill";
    skill.innerText = project.skills[i];
    skills.appendChild(skill);
  }

  header.appendChild(title);
  header.appendChild(skills);

  const description = document.createElement("div");
  description.className = "description";
  description.innerText = project.description;

  info.appendChild(header);
  info.appendChild(description);

  container.appendChild(image);
  container.appendChild(info);

  return container;
}

const projects = [
  {
    image: "./Images/Projects/connect_game.png",
    name: "ConnectGame",
    href: "https://pas-artur.000webhostapp.com/connect-game/index.html",
    git: "https://github.com/Pasek108/ConnectGame",
    skills: ["HTML", "CSS", "JS"],
    description: "Gra logiczna, w której celem gracza jest odtworzenie poprawnej sieci połączeń między blokami na siatce",
  },
  {
    image: "./Images/Projects/deer-killer.png",
    name: "DeerKiller",
    href: "https://pas-artur.000webhostapp.com/deer-killer/",
    git: "https://github.com/Pasek108/Deer-Killer",
    skills: ["HTML", "CSS", "JS"],
    description: "Gra zręcznościowa polegająca na zdobyciu jak największej liczby punktów za jednym podejściem mając 3 życia",
  },
  {
    image: "./Images/Projects/befunge93-interpreter.png",
    name: "BeFunge93 interpreter",
    href: "https://pas-artur.000webhostapp.com/befunge93-interpreter/",
    git: "https://github.com/Pasek108/BeFunge-93-Interpreter",
    skills: ["HTML", "LESS", "JS"],
    description: "Internetowy interpreter ezoterycznego języka BeFunge93 stworzonego przez Chris Pressey'a w 1993 roku",
  },
  {
    image: "./Images/Projects/weather.png",
    name: "Pogoda",
    href: "https://pogoda-open-weather.netlify.app",
    git: "https://github.com/Pasek108/Pogoda",
    skills: ["HTML", "CSS", "REACT"],
    description: "Pogoda w React napisana z użyciem Open Weather API oraz Geonames API",
  },
  {
    image: "./Images/Projects/countries-api.png",
    name: "Countries API",
    href: "https://pas-artur.000webhostapp.com/countries-rest-api/",
    git: "https://github.com/Pasek108/countries-rest-api",
    skills: ["HTML", "LESS", "JS"],
    description: "Strona do przeglądania krajów oraz gra w ich rozpoznawanie napisana z użyciem REST Countries API",
  },
  {
    image: "./Images/Projects/rock-paper-scissors.png",
    name: "Rock Paper Scissors",
    href: "https://pas-artur.000webhostapp.com/rock-paper-scissors/",
    git: "https://github.com/Pasek108/rock-paper-scissors",
    skills: ["HTML", "LESS", "JS"],
    description: 'Gra w "kamień, papier, nożyce" oraz "kamień, papier, nożyce, jaszczurka, spock"',
  },
];
