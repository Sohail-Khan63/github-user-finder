const searchBtn = document.querySelector(".searchBtn");
const UserInput = document.querySelector("#searchBox");
const UserName = document.querySelector(".name");
const avatorImg = document.querySelector(".avatorImg");
const userbio = document.querySelector(".bio");
const userLocation = document.querySelector(".location");
const userFollwers = document.querySelector(".followers");
const userFollowing = document.querySelector(".following");
const userRepos = document.querySelector(".repo");
const userGithubLink = document.querySelector("#github-url");
const userRepoUrl = document.querySelector("#repo-url");
const card = document.querySelector(".card");
const container = document.querySelector(".main-container");

// Create one persistent error message element
const errorMsg = document.createElement("h1");
errorMsg.classList.add("error");
card.appendChild(errorMsg); // Only append once

const getUserData = async () => {
  let githubUserName = UserInput.value.trim();
  const URL = `https://api.github.com/users/${githubUserName.toLowerCase()}`;

  if (githubUserName) {
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);

    if (data.message === "Not Found") {
      errorMsg.textContent = "No profile with this username";
      container.style.display = "none";
      UserInput.value = '';
    } else {
      errorMsg.textContent = "";
      // Populate profile info
      let name = data.name;
      let newImg = data.avatar_url;
      let bio = data.bio || "No bio available";
      let location = data.location || "Location not specified";

      avatorImg.src = newImg;
      userGithubLink.href = data.html_url;
      userRepoUrl.href = `https://github.com/${githubUserName.toLowerCase()}?tab=repositories`;
      userFollwers.textContent = `Followers :${data.followers}`;
      userFollowing.textContent = `Following :${data.following}`;
      userRepos.textContent = `Repos: ${data.public_repos}`;
      UserName.textContent = name;
      userbio.textContent = bio;
      userLocation.textContent = location;

      container.style.display = "block"; // Show profile info
      UserInput.value = '';
    }
  } else {
    alert("Please Enter Github User Name!");
  }
};

searchBtn.addEventListener("click", getUserData);
