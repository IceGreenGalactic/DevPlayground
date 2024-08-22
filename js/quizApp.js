import { fetchQuestions } from "./api/get.js";

document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  let score = 0;
  let currentQuestionIndex = 0;
  let questions = [];

  // Fetches 10 questions from the Open Trivia Database
  fetchQuestions(10)
    .then((data) => {
      questions = data;
      showQuestion(currentQuestionIndex);
    })
    .catch((error) => console.error("Error fetching questions:", error));

  // Function to display a question
  function showQuestion(index) {
    quizContainer.innerHTML = ""; // Clear the container for the new question

    const question = questions[index];

    // Creates question element
    const questionElement = document.createElement("div");
    questionElement.classList.add("question", "card", "p-4", "mb-3");
    questionElement.innerHTML = `
            <h2 class="mb-3">Question ${index + 1}</h2>
            <p>${question.question}</p>
        `;

    // Combines correct and incorrect answers and shuffle them
    const answers = [...question.incorrect_answers, question.correct_answer];
    answers.sort(() => Math.random() - 0.5);

    // Creates answer options
    answers.forEach((answer) => {
      const answerElement = document.createElement("div");
      answerElement.classList.add(
        "form-check",
        "d-flex",
        "align-items-center",
        "mb-3"
      );
      answerElement.innerHTML = `
                <input class="form-check-input" type="radio" name="question${index}" value="${answer}">
                <label class="form-check-label">${answer}</label>
            `;
      questionElement.appendChild(answerElement);
    });

    // Creates a button to submit the answer (later it will change to "Next Question")
    const actionButton = document.createElement("button");
    actionButton.classList.add("btn", "btn-primary", "mt-3");
    actionButton.innerText = "Submit Answer";

    actionButton.addEventListener("click", function () {
      const selectedOption = questionElement.querySelector(
        'input[name="question' + index + '"]:checked'
      );
      if (selectedOption) {
        const isCorrect = selectedOption.value === question.correct_answer;
        selectedOption.parentElement.style.color = isCorrect ? "green" : "red";
        if (isCorrect) {
          score++;
        }

        // Shows the correct answer
        if (!isCorrect) {
          questionElement.querySelectorAll("input").forEach((input) => {
            if (input.value === question.correct_answer) {
              input.parentElement.style.color = "green";
            }
          });
        }

        // Change button to "Next Question" and update its behavior
        actionButton.innerText = "Next Question →";
        actionButton.classList.remove("btn-primary");
        actionButton.classList.add("btn-secondary");

        // Updates the button event listener for moving to the next question
        actionButton.onclick = function () {
          if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
          } else {
            showFinalScore();
          }
        };

        // Disables radio buttons to prevent changing answers
        questionElement
          .querySelectorAll("input")
          .forEach((input) => (input.disabled = true));
      } else {
        alert("Please select an answer!");
      }
    });

    questionElement.appendChild(actionButton);
    quizContainer.appendChild(questionElement);
  }

  // Function to display the final score
  function showFinalScore() {
    quizContainer.innerHTML = `
            <div class="card p-4">
                <h2>Your final score is: ${score} out of ${questions.length}</h2>
                <button class="btn btn-success mt-3" onclick="location.reload()">Restart Quiz</button>
            </div>
        `;
  }
});

// translates questions to norwegian (when api requests are not to many pr day)
// import { fetchQuestions } from "./api/get.js";
// import { translateText } from "./api/translate.js";

// document.addEventListener("DOMContentLoaded", function () {
//     const quizContainer = document.getElementById("quiz-container");
//     let score = 0;
//     let currentQuestionIndex = 0;
//     let questions = [];

//     // Fetches 10 questions from the Open Trivia Database
//     fetchQuestions(10)
//         .then(async (data) => {
//             questions = data;
//             console.log('Fetched questions:', questions); // Log fetched questions

//             // Translates all questions and answers
//             try {
//                 await Promise.all(questions.map(async (question) => {
//                     question.question = await translateText(question.question, 'no');
//                     console.log(`Translated question: ${question.question}`); // Log translated question
//                     question.incorrect_answers = await Promise.all(question.incorrect_answers.map(async (answer) => await translateText(answer, 'no')));
//                     console.log(`Translated incorrect answers: ${question.incorrect_answers}`); // Log translated incorrect answers
//                     question.correct_answer = await translateText(question.correct_answer, 'no');
//                     console.log(`Translated correct answer: ${question.correct_answer}`); // Log translated correct answer
//                 }));
//                 showQuestion(currentQuestionIndex);
//             } catch (error) {
//                 console.error('Error translating questions:', error);
//             }
//         })
//         .catch(error => console.error('Error fetching questions:', error));

//     // Function to display a question
//     function showQuestion(index) {
//         quizContainer.innerHTML = '';

//         const question = questions[index];

//         // Creates question element
//         const questionElement = document.createElement('div');
//         questionElement.classList.add('question', 'card', 'p-4', 'mb-3');
//         questionElement.innerHTML = `
//             <h2 class="mb-3">Question ${index + 1}</h2>
//             <p>${question.question}</p>
//         `;

//         // Combines correct and incorrect answers and shuffle them
//         const answers = [...question.incorrect_answers, question.correct_answer];
//         answers.sort(() => Math.random() - 0.5);

//         // Creates answer options
//         answers.forEach(answer => {
//             const answerElement = document.createElement('div');
//             answerElement.classList.add('form-check', 'mb-2');
//             answerElement.innerHTML = `
//                 <input class="form-check-input" type="radio" name="question${index}" value="${answer}">
//                 <label class="form-check-label">${answer}</label>
//             `;
//             questionElement.appendChild(answerElement);
//         });

//         // Creates a button to submit the answer (later it will change to "Next Question")
//         const actionButton = document.createElement('button');
//         actionButton.classList.add('btn', 'btn-primary', 'mt-3');
//         actionButton.innerText = 'Submit Answer';

//         actionButton.addEventListener('click', function () {
//             const selectedOption = questionElement.querySelector('input[name="question' + index + '"]:checked');
//             if (selectedOption) {
//                 const isCorrect = selectedOption.value === question.correct_answer;
//                 selectedOption.parentElement.style.color = isCorrect ? 'green' : 'red';
//                 if (isCorrect) {
//                     score++;
//                 }

//                 // Shows the correct answer
//                 if (!isCorrect) {
//                     questionElement.querySelectorAll('input').forEach(input => {
//                         if (input.value === question.correct_answer) {
//                             input.parentElement.style.color = 'green';
//                         }
//                     });
//                 }

//                 // Changes button to "Next Question" and updates its behavior
//                 actionButton.innerText = 'Next Question →';
//                 actionButton.classList.remove('btn-primary');
//                 actionButton.classList.add('btn-secondary');

//                 // Updates the button event listener for moving to the next question
//                 actionButton.onclick = function () {
//                     if (currentQuestionIndex < questions.length - 1) {
//                         currentQuestionIndex++;
//                         showQuestion(currentQuestionIndex);
//                     } else {
//                         showFinalScore();
//                     }
//                 };

//                 // Disables radio buttons to prevent changing answers
//                 questionElement.querySelectorAll('input').forEach(input => input.disabled = true);
//             } else {
//                 alert('Please select an answer!');
//             }
//         });

//         questionElement.appendChild(actionButton);
//         quizContainer.appendChild(questionElement);
//     }

//     // Function to display the final score
//     function showFinalScore() {
//         quizContainer.innerHTML = `
//             <div class="card p-4">
//                 <h2>Your final score is: ${score} out of ${questions.length}</h2>
//                 <button class="btn btn-success mt-3" onclick="location.reload()">Restart Quiz</button>
//             </div>
//         `;
//     }
// });
