apiUrl = "https://newsapi.org/v2/everything?";
let apiKey = "aceb93e3c93540bcbd58127f27048c04";

// apiurl=https://newsapi.org/v2/everything?q=tesla&apiKey=aceb93e3c93540bcbd58127f27048c04

let headerShortcut = document.querySelector(".headerShortcut");

DataFetch = async (query) => {
  const response = await fetch(`${apiUrl}q=${query}&apiKey=${apiKey}`);
  const data = await response.json();
  bindData(data.articles);
};
window.addEventListener("load", DataFetch("India"));
async function fetchIndianNews() {
  const response = await fetch(`${apiUrl}q=India&apiKey=${apiKey}`);
  const data = await response.json();
  bindData(data.articles);
}
function fetchSportsNews() {
  DataFetch("Sports");
}
function fetchTechnologyNews() {
  DataFetch("Technology");
}
function fetchPoliticsNews() {
  DataFetch("Politics");
}
let searchbar = document.querySelector("#searchbar");
async function fetchSearchNews() {
  let query = searchbar.value;
  if (!query) {
    return;
  }
  DataFetch(`${query}`);
}

function bindData(articles) {
  const cardContainer = document.querySelector(".cardContainer");
  const cardTemplet = document.querySelector(".cardTemplet");
  cardContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cloneTempletNode = cardTemplet.content.cloneNode(true);
    fillDataInCard(cloneTempletNode, article);
    cardContainer.appendChild(cloneTempletNode);
  });
}
function fillDataInCard(cloneTempletNode, article) {
  const newsImg = cloneTempletNode.querySelector("#cardImage");
  newsImg.src = article.urlToImage;
  const newsTitle = cloneTempletNode.querySelector(".title");
  newsTitle.innerHTML = article.title;
  const newsDate = cloneTempletNode.querySelector(".date");
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsDate.innerHTML = date;
  goToLink = () => {
    window.location = `${article.url}`;
  };
}
let flag = true;
function changeTheme() {
  if (flag) {
    document.querySelector("body").style.cssText =
      "background:rgb(138, 138, 138);filter: brightness(0.8);color:black";

    flag = false;
  } else {
    document.querySelector("body").style.cssText =
      "background:white;color:black";
    flag = true;
  }
}
