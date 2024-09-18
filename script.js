// Constructor for SoccerTriviaGame
function triviaQuestion(question, answer, explanation) { 
  this.question = question;
  this.answer = answer;
  this.explanation = explanation;
}

// Array of Soccer Trivia Questions
const questions = [
  new triviaQuestion("Brazil has won the FIFA World Cup five times.", true, "Brazil won the world cup in 1958, 1962, 1970, 1994, and 2002."),
  new triviaQuestion("Cristiano Ronaldo has never won a UEFA Champions League title.", false, "Ronaldo was the first player to win five Champions League finals, lifting the trophy with Manchester United in 2008 and Real Madrid in 2014, 2016, 2017, and 2018."),
  new triviaQuestion("The 2022 FIFA World Cup was hosted by Qatar.", true, "Qatar hosted the FIFA World Cup in 2022, making it the first Middle Eastern country to host the event."),
  new triviaQuestion("Lionel Messi has played for FC Barcelona his entire career.", false, "Lionel Messi left FC Barcelona in 2021 and joined Paris Saint-Germain (PSG)."),
  new triviaQuestion("The FIFA Women's World Cup started in 1991.", true, "The first FIFA Women’s World Cup took place in 1991 in China."),
  new triviaQuestion("The Golden Boot is awarded to the best goalkeeper in a FIFA World Cup.", false, "The Golden Boot is awarded to the top scorer of the tournament. The award for the best goalkeeper is the Golden Glove."),
  new triviaQuestion("France won the 1998 FIFA World Cup by defeating Brazil in the final.", true, "Yes, France won the 1998 FIFA World Cup, defeating Brazil 3-0 in the final, held in France."),
  new triviaQuestion("Manchester City has won more English Premier League titles than Manchester United.", false, "Manchester United has won more Premier League titles (20 as of 2023), whereas Manchester City has fewer titles."),
  new triviaQuestion("Diego Maradona is famous for scoring the Hand of God goal in the 1986 World Cup.", true, "Diego Maradona scored the infamous Hand of God goal against England in the quarterfinals of the 1986 FIFA World Cup."),
  new triviaQuestion("Pele won three FIFA World Cups as a player.", true, "Pele is the only player to have won three FIFA World Cups (1958, 1962, and 1970)."),
  new triviaQuestion("The UEFA European Championship is held every two years.", false, "The UEFA European Championship is held every four years, similar to the FIFA World Cup."),
  new triviaQuestion("The United States has won the most FIFA Women's World Cup titles.", true, "The U.S. Women’s National Team has won the most titles (4), in 1991, 1999, 2015, and 2019."),
  new triviaQuestion("Real Madrid’s home stadium is called the Camp Nou.", false, "Real Madrid's home stadium is called the Santiago Bernabéu. The Camp Nou is the stadium of Real Madrid’s rival, FC Barcelona."),
  new triviaQuestion("Kylian Mbappé scored in the 2018 FIFA World Cup final at the age of 19.", true, "Kylian Mbappé scored in the 2018 FIFA World Cup final, helping France secure a 4-2 victory over Croatia. He was only 19 years old at the time."),
  new triviaQuestion("The 2006 FIFA World Cup final between Italy and France ended with a penalty shootout.", true, "The 2006 FIFA World Cup final ended in a 1-1 draw after extra time, and Italy won 5-3 on penalties against France."),
];

// Soccer Trivia Game Object  that has as its properties questions, score, and current question index( so that current question is displayed) this will be my constructor 
const triviaGame = {
  questions: questions, // Assign the custom questions array to the object
  score: 0,
  currentQuestionIndex: 0,

  // Display the current question
  displayQuestion: function() {
      const questionElement = document.getElementById("question");
      const finalImg = document.querySelector("#final-img")
      const buttonsContainer = document.querySelector(".buttons")

      if (this.currentQuestionIndex < this.questions.length) {
          questionElement.textContent = this.questions[this.currentQuestionIndex].question;
      } else {
          questionElement.textContent = "You have completed the trivia!";
          document.querySelector('.card').classList.remove('card-flipped'); // Reset flip if finished
          // get rid of true/false buttons
          buttonsContainer.classList.add("hidden")
          // display img based on score
          if (this.score > 4) {
            finalImg.src = "https://media1.tenor.com/images/d5d11390699ef5776613e3fd6dc2719c/tenor.gif?itemid=11052297"
            finalImg.alt = "fireworks"
          } else if (this.score > 5) {
            finalImg.src = ""
            finalImg.alt = ""
          } else {
            finalImg.src = "https://media1.tenor.com/m/AQ4Dbn0fceYAAAAd/ouch-slow-mo.gif"
            finalImg.alt = "Man getting hit in the face with a soccer ball"
            questionElement.textContent = "You failed!";
          }
      }
  },

  // Check answer, show result, and flip the card
  checkAnswer: function(userAnswer) {
      if (this.currentQuestionIndex < this.questions.length) {
          const currentQuestion = this.questions[this.currentQuestionIndex];
          const resultTitle = document.getElementById("answer-title");
          const resultText = document.getElementById("answer-result");
          if (userAnswer === currentQuestion.answer) {
              this.score++;
              resultTitle.textContent = "Correct!";
              resultText.textContent = currentQuestion.explanation;
          } else {
              resultTitle.textContent = "Wrong!";
              resultText.textContent = currentQuestion.explanation;
          }
          document.getElementById("score").textContent = this.score;
          document.querySelector('.card').classList.add('card-flipped'); // Flip the card
      }
  },

  // Move to the next question after showing result
  nextQuestion: function() {
      this.currentQuestionIndex++;
      document.querySelector('.card').classList.remove('card-flipped'); // Unflip the card
      this.displayQuestion(); // Show the next question
  },

  // Reset the game state
  resetGame: function() {
      const buttonsContainer = document.querySelector(".buttons")
      const finalImg = document.querySelector("#final-img")

      this.score = 0;
      this.currentQuestionIndex = 0;
      document.getElementById("score").textContent = this.score;
      this.displayQuestion();
      document.querySelector('.card').classList.remove('card-flipped'); // Reset card flip
      buttonsContainer.classList.remove("hidden") // bring buttons back after final screen
      finalImg.src = "" // reset image src to empty
      finalImg.alt = "" // reset image alt to empty
  }
};

// Initialize the game by displaying the first question
triviaGame.displayQuestion();

// Event listeners for True/False buttons
document.getElementById("true-btn").addEventListener("click", function() {
  triviaGame.checkAnswer(true);
});

document.getElementById("false-btn").addEventListener("click", function() {
  triviaGame.checkAnswer(false);
});

// Event listener for Next Question button
document.getElementById("next-btn").addEventListener("click", function() {
  triviaGame.nextQuestion();
});

// Event listener for Reset button
document.getElementById("reset-btn").addEventListener("click", function() {
  triviaGame.resetGame();
});
