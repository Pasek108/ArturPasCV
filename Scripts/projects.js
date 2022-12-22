"use strict";

class Projects {
  constructor() {
    this.container = document.querySelector(".projects");
    this.container.addEventListener("scroll", () => {
      if (this.container.scrollTop > 10) Navbar.profession.style.height = "0";
      else Navbar.profession.style.height = null;
    });

    this.languages = this.container.querySelectorAll(".lang-name");
    for (let i = 0; i < this.languages.length; i++) {
      this.languages[i].addEventListener("click", this.toggleSkillGroup.bind(this));
    }

    this.active_skills = [this.languages[0]];

    this.indicator = this.container.querySelector(".indicator");
    this.skills_groups = this.container.querySelectorAll(".skills-group");

    this.skills = this.container.querySelectorAll(".skill");
    for (let i = 0; i < this.skills.length; i++) {
      this.skills[i].addEventListener("click", this.addSkillToFilter.bind(this));
    }

    this.divider_title = this.container.querySelector(".divider .title");
    this.projects_group = this.container.querySelector(".projects-group");
    this.addProjects(this.active_skills);
  }

  toggleSkillGroup(evt) {
    const option_id = evt.target.dataset.id;
    this.indicator.style.left = `${option_id * 8}rem`;

    for (let j = 0; j < this.skills_groups.length; j++) this.skills_groups[j].classList.remove("active");
    for (let j = 0; j < this.skills.length; j++) this.skills[j].classList.remove("active");

    this.skills_groups[option_id].classList.add("active");
    this.active_skills = [this.languages[option_id]];

    this.updateFilter();
  }

  addSkillToFilter(evt) {
    const clicked_skill_id = evt.target.dataset.id;

    if (this.active_skills[clicked_skill_id] == evt.target) {
      evt.target.classList.remove("active");
      this.active_skills[clicked_skill_id] = null;
    } else {
      if (this.active_skills[clicked_skill_id] != null) {
        this.active_skills[clicked_skill_id].classList.remove("active");
      }

      evt.target.classList.toggle("active");
      this.active_skills[clicked_skill_id] = evt.target;
    }
    
    this.updateFilter();
  }

  updateFilter() {
    this.divider_title.innerText = this.active_skills[0].innerText;

    for (let i = 1; i < this.active_skills.length; i++) {
      if (this.active_skills[i] == null) continue;
      this.divider_title.innerText += " + " + this.active_skills[i].innerText;
    }

    this.addProjects(this.active_skills);
  }


  addProjects() {
    this.projects_group.classList.remove("empty");
    this.projects_group.innerHTML = "";

    for (let i = 0; i < projects_data.length; i++) {
      let have_active_skill = false;

      for (let j = 0; j < this.active_skills.length; j++) {
        if (this.active_skills[j] == null) continue;

        let skill_name = this.active_skills[j].innerHTML;
        if (skill_name == "JavaScript") skill_name = "JS";

        if (projects_data[i].skills.includes(skill_name)) {
          have_active_skill = true;
          break;
        }
      }

      if (!have_active_skill) continue;
      new Project(projects_data[i], this.projects_group);
    }
  }
}

class Project {
  constructor(project_data, parent) {
    parent.appendChild(this.generateProject(project_data));
  }

  generateProject(project_data) {
    const container = createNewDOM("div", "project");
  
    const image = createNewDOM("div", "image");
    image.style.backgroundImage = `url(${project_data.image})`;
  
    const git_link = createNewDOM("a", "git-link", "Otwórz projekt");
    git_link.href = project_data.git;
    git_link.target = "_blank";
    image.appendChild(git_link);
  
    const info = createNewDOM("div", "info");
    const header = createNewDOM("header");
    const title = createNewDOM("div", "title");
  
    const link = createNewDOM("a", "", project_data.name);
    link.href = project_data.href;
    link.target = "_blank";
    title.appendChild(link);
  
    const skills = createNewDOM("div", "skills");
  
    for (let i = 0; i < project_data.skills.length; i++) {
      const skill = createNewDOM("div", "skill");
      skill.innerText = project_data.skills[i];
      skills.appendChild(skill);
    }
  
    header.appendChild(title);
    header.appendChild(skills);
  
    const description = createNewDOM("div", "description", project_data.description);
  
    info.appendChild(header);
    info.appendChild(description);
  
    container.appendChild(image);
    container.appendChild(info);
  
    return container;
  }
}

const projects = new Projects();
