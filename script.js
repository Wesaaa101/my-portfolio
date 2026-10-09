/* CSN 1101 Assignment 3
   Live GitHub API integration, safe DOM updates, and small page interactions. */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  // Mobile navigation toggle.
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      navLinks.classList.toggle("nav-open", !isExpanded);
    });
  }

  // Assignment 3: live GitHub API. No API key is required for public repositories.
  const repoList = document.getElementById("repo-list");
  const repoStatus = document.getElementById("repo-status");
  const retryButton = document.getElementById("retry-repos");

  async function loadRepositories() {
    if (!repoList || !repoStatus) return;

    repoList.replaceChildren();
    repoStatus.textContent = "Loading projects…";
    repoStatus.className = "status-message";

    try {
      const response = await fetch(
        "https://api.github.com/users/Wesaaa101/repos?sort=updated&per_page=100",
        { headers: { Accept: "application/vnd.github+json" } }
      );

      if (!response.ok) {
        throw new Error(`GitHub returned status ${response.status}`);
      }

      const repositories = await response.json();
      if (!Array.isArray(repositories)) {
        throw new Error("The API response was not a repository list.");
      }

      if (repositories.length === 0) {
        repoStatus.textContent = "No public repositories were found yet.";
        return;
      }

      repositories.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      repositories.forEach((repository) => {
        const card = document.createElement("article");
        card.className = "repo-card";

        const topLine = document.createElement("div");
        topLine.className = "repo-card-top";

        const icon = document.createElement("span");
        icon.className = "repo-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = "</>";

        const name = document.createElement("h3");
        name.textContent = repository.name || "Untitled repository";
        topLine.append(icon, name);

        const description = document.createElement("p");
        description.className = "repo-description";
        description.textContent = repository.description || "No description has been added to this repository yet.";

        const metadata = document.createElement("div");
        metadata.className = "repo-meta";
        const language = document.createElement("span");
        language.textContent = repository.language || "Language not specified";
        const stars = document.createElement("span");
        stars.textContent = `★ ${Number(repository.stargazers_count) || 0}`;
        metadata.append(language, stars);

        const link = document.createElement("a");
        link.className = "text-link";
        link.href = repository.html_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "View repository ↗";

        card.append(topLine, description, metadata, link);
        repoList.append(card);
      });

      repoStatus.textContent = `Showing ${repositories.length} public ${repositories.length === 1 ? "repository" : "repositories"} from GitHub.`;
    } catch (error) {
      console.error("Unable to load GitHub repositories:", error);
      repoList.replaceChildren();
      repoStatus.textContent = "We couldn't load the projects right now. Please check your connection and try again.";
      repoStatus.className = "status-message error-message";
    }
  }

  if (repoList && repoStatus) {
    loadRepositories();
    if (retryButton) {
      retryButton.addEventListener("click", loadRepositories);
    }
  }

  // Contact form demonstration: safe text insertion. This does not send or store messages.
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const nameInput = document.getElementById("visitor-name");
      const messageInput = document.getElementById("visitor-message");
      const name = nameInput ? nameInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name || !message) {
        formStatus.textContent = "Please enter your name and a message.";
        return;
      }

      formStatus.textContent = `Thanks, ${name}. Your message passed the browser-side check. This demo does not send it anywhere.`;
      contactForm.reset();
    });
  }
});
