const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the capital of France?",
        choice1: "Berlin",
        choice2: "Madrid",
        choice3: "Paris",
        choice4: "Rome",
        answer: 3,
    },
    {
        question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
        choice1: "Oxygen",
        choice2: "Carbon Dioxide",
        choice3: "Nitrogen",
        choice4: "Hydrogen",
        answer: 2,
    },
    {
        question: "Who wrote the play Romeo and Juliet?",
        choice1: "Charles Dickens",
        choice2: "William Shakespeare",
        choice3: "Mark Twain",
        choice4: "George Orwell",
        answer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        choice1: "Venus",
        choice2: "Jupiter",
        choice3: "Mars",
        choice4: "Saturn",
        answer: 3,
    },
    {
        question: "What is the chemical symbol for water?",
        choice1: "H2O",
        choice2: "CO2",
        choice3: "O2",
        choice4: "NaCl",
        answer: 1,
    },
];

//constants:
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
      return window.location.assign("/end.html"); 
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice"+ number];

    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
       
        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS)
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
};

startGame();