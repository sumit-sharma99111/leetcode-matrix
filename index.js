const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("username");

const loader = document.getElementById("loader");
const result = document.getElementById("result");

const easySolved = document.getElementById("easySolved");
const mediumSolved = document.getElementById("mediumSolved");
const hardSolved = document.getElementById("hardSolved");
const totalSolved = document.getElementById("totalSolved");
const ranking = document.getElementById("ranking");
const acceptance = document.getElementById("acceptance");
const userTitle = document.getElementById("userTitle");

searchBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();

  if (username === "") {
    alert("Please enter a LeetCode username");
    return;
  }

  fetchStats(username);
});

async function fetchStats(username) {
  loader.classList.remove("hidden");
  result.classList.add("hidden");

  try {
    const response = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`
    );

    const data = await response.json();

    loader.classList.add("hidden");

    if (data.status === "error") {
      alert("User not found");
      return;
    }

    userTitle.innerText = `@${username}`;

    easySolved.innerText = data.easySolved;
    mediumSolved.innerText = data.mediumSolved;
    hardSolved.innerText = data.hardSolved;

    totalSolved.innerText = data.totalSolved;
    ranking.innerText = data.ranking;
    acceptance.innerText = data.acceptanceRate + "%";

    result.classList.remove("hidden");
  } catch (error) {
    loader.classList.add("hidden");
    alert("Something went wrong");
    console.error(error);
  }
}
