let category = $("#category");
let difficulty = $("input[name='difficulty']");
let noOfQuistions = $("#noOfQuistions");
let quistionsContainer;
let userAnswer;
let data;
let quistoins;
let QNumber = 0;
let score = 0;


$(".start").click(function () {

  category = category.val();
  difficulty = [...difficulty].filter((difficulty) => difficulty.checked)[0].value;
  noOfQuistions = noOfQuistions.val();
  getQuiz(noOfQuistions, category, difficulty);

  $(".start-quiz").fadeOut(800, function () {
    $(".submit-quiz").fadeIn(800);
  });

  setTimeout(() => {
    getAnswers()
  }, 3000);

});

async function getQuiz(noOfQuistions, category, difficulty) {

  data = await fetch(`https://opentdb.com/api.php?amount=${noOfQuistions}&category=${category}&difficulty=${difficulty}&type=multiple`)
  data = await data.json();
  quistoins = data.results;
};

function getAnswers() {
  let theAnswers = [quistoins[QNumber].correct_answer, ...quistoins[QNumber].incorrect_answers];
  theAnswers = shuffle(theAnswers);
  quistionsContainer = `
                <div class="q-number py-2 px-2 rounded-pill h5 d-flex justify-content-center"> ${QNumber + 1} Of ${quistoins.length} Questions</div>
                <p class=" h4 mt-lg-5 mt-4 mb-2 px-1"><span class="h4 text-danger"> Q : </span>${quistoins[QNumber].question}</p>
                <div class="d-flex justify-content-start my-1 ">
                    <input class="mx-3" type="radio" name="answer" value="${theAnswers[0]}" id="${theAnswers[0]}">
                    <label for="${theAnswers[0]}">${theAnswers[0]}</label>
                </div>
                <div class="d-flex justify-content-start my-1">
                    <input class="mx-3" type="radio" name="answer" value="${theAnswers[1]}" id="${theAnswers[1]}">
                    <label for="${theAnswers[1]}">${theAnswers[1]}</label>
                </div>
                <div class="d-flex justify-content-start my-1">
                    <input class="mx-3" type="radio" name="answer" value="${theAnswers[2]}" id="${theAnswers[2]}">
                    <label for="${theAnswers[2]}">${theAnswers[2]}</label>
                </div>
                <div class="d-flex justify-content-start my-1">
                    <input class="mx-3" type="radio" name="answer" value="${theAnswers[3]}" id="${theAnswers[3]}">
                    <label for="${theAnswers[3]}">${theAnswers[3]}</label>
                </div>
    `
  $(".theChangedQ").html(quistionsContainer);
  userAnswer = $("input[name='answer']");

};

$(".submit").click(function () {
  userAnswer = [...userAnswer].filter((userAnswer) => userAnswer.checked)[0].value;
  if (userAnswer == quistoins[QNumber].correct_answer) {
    score++;
  }
  QNumber++;
  if (QNumber != noOfQuistions) {
    getAnswers();
  }
  getScore();
})

function getScore() {
  if (QNumber == noOfQuistions) {
    $(".submit-quiz").html(`
    <p class="text-center h2 text-dark my-4">Your Score : </p>
    <p class="text-center h2 text-dark my-4">${score} / ${noOfQuistions}</p>
    <button class="btn btn-danger rounded-pill try-agian mt-4 w-100">Try Again</button>
    `);
    $(".try-agian").click(function () {

      location.reload();

    });
  }
};



function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}