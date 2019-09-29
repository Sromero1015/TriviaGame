// All questions and answers

const quizQuestions = [
    {
        question: "Diego Maradona scored the famous goal known as the 'hand of god' against which country?",
        choices: ["Brazil", "Spain", "Germany", "England"],
        correctAnswer: "England"
    },

    {
        question: "Pele was 17 years of age when he scored in the 1958 World Cup Final, who was the last teenager to score in a final since Pele?",
        choices: ["Thomas Muller", "Kylian Mbappe", "Ronaldo", "Diego Maradona"],
        correctAnswer: "Kylian Mbappe"
    },

    {
        question: "How many World Cup titles do Brazil currently have?",
        choices: ["5", "6", "3", "4"],
        correctAnswer: "5"
    },

    {
        question: "Which World Cup year was the 'VAR' system implemented?",
        choices: ["2018", "1998", "2014", "2014"],
        correctAnswer: "2018"
    },
    {
        question: "Which nation was the last to host AND win the World Cup?",
        choices: ["Germany", "England", "France", "Argentina"],
        correctAnswer: "France"
    },
    {
        question: "In the 2006 FIFA World Cup Final, Zinedine Zidane of France was given a red card and sent off for doing what?",
        choices: ["Spitting at an opposing player", "Headbutting an opposing player", "Diving", "Arguing with the referee"],
        correctAnswer: "Headbutting an opposing player"
    },
    {
        question: "Which nation managed the reach the 1998 FIFA World Cup Semifinal while only existing as a nation for under a decade?",
        choices: ["Serbia and Montenegro", "Slovenia", "Croatia", "Slovakia"],
        correctAnswer: "Croatia"
    },
    {
        question: "Who was the top goalscorer of the 2014 FIFA World Cup?",
        choices: ["Lionel Messi", "James Rodriguez", "Thomas Muller", "Neymar"],
        correctAnswer: "James Rodriguez"
    },
    {
        question: "Who missed the decisive penalty that cost Italy the 1994 World Cup, losing to Brazil?",
        choices: ["Roberto Baggio", "Paolo Maldini", "Franco Baresi", "Daniele Massaro"],
        correctAnswer: "Roberto Baggio"
    },
    

    {
        question: "In what year was the FIFA World Cup group stage expanded from 24 teams to 32?",
        choices: ["1994", "2002", "1998", "1990"],
        correctAnswer: "1998"
    }
];

const funImages = [
    './assets/images/slide.gif',
    './assets/images/hellYeah.gif',
    './assets/images/winning.gif',
    './assets/images/yeah.gif',
    './assets/images/you did it.gif'
];

const sadImages = [
    './assets/images/danm.gif',
    './assets/images/oops.gif',
    './assets/images/pretty bad.gif'
];

// Initial values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// If the timer is over, then go to the next question
function nextQuestion() {
    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        // TODO
        console.log('Game is over!!!!!');
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
    
}

// Start a 30 seconds timer for user to respond or choose an answer to each question
function timeUp() {
    clearInterval(timer);

    lost++;

    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
}

// Display the question and the choices to the browser
function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; // 
    const choices = quizQuestions[currentQuestion].choices; // 

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

// Either correct/wrong choice selected, go to the next question
// Event Delegation
$(document).on('click', '.choice', function() {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log('Winsss!!!!');
        preloadImage('win');
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        console.log('Lost!!!!');
        preloadImage('lost');
        setTimeout(nextQuestion, 3 * 1000);
    }
});


function displayResult() {
    const result = `
        <p>You get ${score} questions(s) right</p>
        <p>You missed ${lost} questions(s)</p>
        <p>Total questions ${quizQuestions.length} questions(s) right</p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}


$(document).on('click', '#reset', function() {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});


function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}


function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;
}


// Display a funny giphy for correct and wrong answers
function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === 'win') {
        $('#game').html(`
            <p class="preload-image">Congratulations, you pick the corrrect answer</p>
            <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
            <img src="${randomImage(funImages)}" />
        `);
    } else {
        $('#game').html(`
            <p class="preload-image">The correct answer was <b>${correctAnswer}</b></p>
            <p class="preload-image">You lost pretty bad</p>
            <img src="${randomImage(sadImages)}" />
        `);
    }
}

$('#start').click(function() {
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});