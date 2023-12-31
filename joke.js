const joke = document.querySelector(".joke");
const jokeButton = document.querySelector("#jokeButton");
let linkFetch = document.getElementById("link");
const generateJokes = async () => {
  try {
    const response = await fetch(
      "https://hindi-jokes-api.onrender.com/jokes?api_key=754ceaa0d7baa346532a83fedc7e"
    );

    const data = await response.json();
    joke.innerHTML = data.jokeContent;
    let link = "";
    link = data.jokeContent;
    let newLink = `whatsapp://send?text=${link}`;
    linkFetch.href = newLink;
  } catch (error) {
    console.log(`error is ${error}`);
  }
};
let newLink = `whatsapp://send?text=${link}`;
linkFetch.href = newLink;
jokeButton.addEventListener("click", generateJokes);
generateJokes();
