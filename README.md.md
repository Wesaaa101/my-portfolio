# Gladwell's Personal Portfolio — CSN 1101 Assignment 3

This is the Assignment 3 continuation of my portfolio for **CSN 1101: Web Technologies and Internet Applications** at KCA University.

## Technologies
- HTML5
- CSS3
- JavaScript
- GitHub REST API (public repositories; no API key required)

## Live websites
- **GitHub repository:** https://github.com/Wesaaa101/my-portfolio
- **GitHub Pages:** https://wesaaa101.github.io/my-portfolio/
- **Vercel:** https://my-portfolio-livid-three-19.vercel.app/

## Assignment 3 work
- Added a live GitHub API integration to `projects.html`.
- Used Fetch API and JSON to load public repositories.
- Added loading, success, empty-result and error states.
- Used `textContent`, `createElement`, and `replaceChildren` to insert dynamic content safely rather than inserting API/user text with `innerHTML`.
- No API key or secret is used.
- Added responsive styling and a mobile navigation toggle.
- Added `loading="lazy"` only where below-the-fold images are introduced in future updates. The main portrait is above the fold and is not lazy-loaded.
- The contact form is a front-end demonstration only. It validates the input in the browser and does not send or store messages.

## Lighthouse Performance scores
Run Lighthouse on the deployed website before and after your optimisation work, using the same device mode and similar conditions. Enter your **real measured results** below; do not guess or invent scores.

- **Before optimisation:** ____ / 100
- **After optimisation:** ____ / 100

## How to test
1. Open `projects.html` using a local development server or after deployment.
2. Confirm that “Loading projects…” appears while the request is in progress.
3. Confirm repository cards load from the GitHub API.
4. Click **Refresh data** to try the request again.
5. Test with the network disconnected to check the friendly error message.
6. Check both live deployments use HTTPS.
7. Run Lighthouse and update the scores above.

## Deployment
Upload/commit the updated files to the existing `main` branch of this repository. GitHub Pages and Vercel should redeploy from the updated repository. Confirm both live links work before submitting.

## Submission
Submit the repository URL, GitHub Pages URL and Vercel URL through the Assignment 3 submission link on the course page.
