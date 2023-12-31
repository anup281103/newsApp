var correctOption = new Audio("RightOptionSound.mp3");
var wrongOption = new Audio("WrongOptionSound.mp3");

var quiz = {
  data: [
    {
      q: "Which of the following can read and render HTML web pages?",
      o: ["server", "head task", "browser", "empty"],
      a: 2,
    },
    {
      q: "Identify the incorrect HTML tag among the following?",
      o: ["< button >", "< list >", "< input >", "< textarea >"],
      a: 1,
    },
    {
      q: "Which of the following is used to transmit information on the world wide web?",
      o: ["HTTP", "HPTT", "HPPT", "HTPT"],
      a: 0,
    },
    {
      q: "In how many ways can CSS be written in?",
      o: ["1", "2", "3", "4"],
      a: 2,
    },
    {
      q: "How can we select an element with a specific ID in CSS?",
      o: ["#", ".", "^", "~"],
      a: 0,
    },
  ],

  hWrap: null,
  hQn: null,
  hAns: null,

  now: 0,
  score: 0,

  init: () => {
    quiz.hWrap = document.getElementById("quizWrap");

    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    quiz.draw();
  },

  draw: () => {
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => {
        quiz.select(label);
      });
      quiz.hAns.appendChild(label);
    }
  },

  select: (option) => {
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      correctOption.play();
      option.classList.add("correct");
    } else {
      wrongOption.play();
      option.classList.add("wrong");
    }

    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) {
        quiz.draw();
      } else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  },
};
window.addEventListener("load", quiz.init);
