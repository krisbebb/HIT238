
$(document).ready(function(){

  var questionData;
  var category = [];
  var question = [];
  var answer = [];
  var questionCount = 0;
  var gameLength;
  var score = 0;


  function launch(){
    score = 0;
    questionCount = 0;
     $.getJSON("https://opentdb.com/api.php?amount=10&type=boolean", function(questionData) {
        $("#load").text("Questions loaded!");
        gameLength = questionData.results.length;
        for (var i = 0; i < gameLength; i++) {
          category[i] = questionData.results[i].category;
          question[i] = questionData.results[i].question;
          answer[i] = questionData.results[i].correct_answer;
        }
      })
    };

  function nextQuestion(){
    if (questionCount >= gameLength) {
      gameOver();
    } else {
      $("#questionNumber").text("Question " + (questionCount + 1));
      $('#category').html(category[questionCount]);
      $('#question').html(question[questionCount]);
      $("#card").popup("open");
    }
  };

  function checkGuess(){
    var guess = ($(this).text());
    if (guess == answer[questionCount]) {
      $("#result").text("Correct!");
      score++;
    } else {
      $("#result").text("Incorrect!");
    };
    questionCount++;
    setTimeout(function() {
      $("#card").popup("close");
      $("#result").empty();
    }, 1000);
    setTimeout(function() {
      nextQuestion();
    }, 3000);
  };

  function gameOver() {
    $("#score").html("Thanks for playing! Your score was " + score);
    $("#endgame").popup("open");
  };

  function closeGame() {
    $("#endgame").popup("close");
    $("#load").text("Load new questions");
  };

  $("#load").click(launch);
  $("#go").click(nextQuestion);
  $(".submit").click(checkGuess);
  $("#quit").click(closeGame);

});
