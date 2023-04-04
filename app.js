let startQuizButton = document.querySelector(".startQuizButton");
let startQuizContainer = document.querySelector(".startQuizContainer");
let cardContainer = document.querySelector(".cardContainer");
let timerText = document.querySelector(".timerText");
let timerSecond = document.querySelector(".timerSecond");
let questionTitle = document.querySelector(".questionTitle");
let questionOptions = document.querySelector(".questionOptions");
let optionsCard = document.querySelectorAll(".optionsCard");
let questionİndex = document.querySelector(".questionİndex");
let btnNextQuesiton = document.querySelector(".btnNextQuesiton");
let scoreBox = document.querySelector(".scoreBox");
let quizReplayBtn = document.querySelector(".quizReplayBtn");
let quizQuitBtn = document.querySelector(".quizQuitBtn");
let scoreText = document.querySelector(".scoreText");
let timerLine = document.querySelector(".timerLine");

function Soru(soru, secenekler, dogruCevap) {
  this.soru = soru;
  this.secenekler = secenekler;
  this.dogruCevap = dogruCevap;
}
Soru.prototype.cevapKontrol = function (cevap) {
  if (cevap == this.dogruCevap) {
    return true;
  }
};
let sorular = [
  new Soru(
    "Hangisi javascript paket yönetim uygulasıdır?",
    { a: "Node.js", b: "Typescript", c: "Npm", d: "Nuget" },
    "c"
  ),
  new Soru(
    "Hangisi frontend kapsamında değerlendirilmez?",
    { a: "Css", b: "Html", c: "Javascript", d: "sql" },
    "d"
  ),
  new Soru(
    "Hangisi backend kapsamında değerlendirilir?",
    { a: "Node.js", b: "Typescript", c: "angular", d: "react" },
    "a"
  ),
  new Soru(
    "Hangisi javascript programlama dilini kullanmaz?",
    { a: "react", b: "angular", c: "vuejs", d: "asp.net" },
    "d"
  ),
];

function Quiz(sorular) {
  this.sorular = sorular;
  this.soruİndex = 0;
  this.dogruSayisi = 0;
}
Quiz.prototype.siradakiSoru = function () {
  return this.sorular[this.soruİndex];
};
let quiz = new Quiz(sorular);

startQuizButton.addEventListener("click", function (e) {
  e.preventDefault();
  cardContainer.classList.add("active");
  soruYukle();
});

function soruYukle() {
  if (quiz.soruİndex < sorular.length) {
    startTimer(10);
    startTimerLine(0);
    let questionİndexText = `${quiz.soruİndex + 1} / ${sorular.length}`;
    questionİndex.textContent = questionİndexText;
    let soruBasligi = `<p class="questionTitle">${quiz.soruİndex + 1}- ${
      quiz.siradakiSoru().soru
    }</p>`;
    questionTitle.innerHTML = soruBasligi;
    let soruSecenekleri = "";
    for (let secenek in quiz.siradakiSoru().secenekler) {
      soruSecenekleri += `<div class="optionsCard" onclick="cevapVer(this)">
                          <span class="optionContent">
                          <b>${secenek}</b>: 
                          ${quiz.siradakiSoru().secenekler[secenek]}
                          </span>
                         </div>`;
    }
    questionOptions.innerHTML = soruSecenekleri;
  } else {
    cardContainer.classList.remove("active");
    scoreBox.classList.add("active");
    scoreText.textContent = `Toplam ${sorular.length} sorudan ${quiz.dogruSayisi} doğru cevap verdiniz.`;
  }
}

function cevapVer(verilenCevap) {
  clearInterval(counter);
  clearInterval(counterLine);
  optionsCard = document.querySelectorAll(".optionsCard");
  let cevap = verilenCevap.querySelector("span b").textContent;
  let soru = quiz.siradakiSoru();
  questionOptions.classList.add("disabled");
  btnNextQuesiton.classList.add("btnActive");
  if (soru.cevapKontrol(cevap)) {
    verilenCevap.classList.add("optionsCardTrue");
    quiz.dogruSayisi++;
  } else {
    verilenCevap.classList.add("optionsCardFalse");
  }
  btnNextQuesiton.addEventListener("click", function () {
    btnNextQuesiton.classList.remove("btnActive");
  });
}

btnNextQuesiton.addEventListener("click", function (e) {
  e.preventDefault();
  questionOptions.classList.remove("disabled");
  quiz.soruİndex++;
  soruYukle();
});

quizReplayBtn.addEventListener("click", function () {
  scoreBox.classList.remove("active");
  quiz.soruİndex = 0;
  quiz.dogruSayisi = 0;
  startQuizButton.click();
});

quizQuitBtn.addEventListener("click", function () {
  location.reload();
});

let counter;

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timerSecond.textContent = time;
    time--;
    if (time < 0) {
      optionsCard = document.querySelectorAll(".optionsCard");
      clearInterval(counter);
      timerText.textContent = "Süre Bitti";
      for (let secenek of optionsCard) {
        let dogruCevap = secenek.querySelector("span b").textContent;
        if (quiz.siradakiSoru().cevapKontrol(dogruCevap)) {
          secenek.classList.add("optionsCardTrue");
          btnNextQuesiton.classList.add("btnActive");
          btnNextQuesiton.addEventListener("click", function () {
            btnNextQuesiton.classList.remove("btnActive");
          });
        } else {
        }
      }
    } else {
      timerText.textContent = "Kalan Süre";
    }
  }
}

let counterLine;

function startTimerLine(time) {
  let lineWith = 0;
  counterLine = setInterval(timer, 20);
  function timer() {
    lineWith += 1;
    timerLine.style.width = lineWith + "px";
    if (lineWith > 549) {
      clearInterval(counterLine);
    }
  }
}
