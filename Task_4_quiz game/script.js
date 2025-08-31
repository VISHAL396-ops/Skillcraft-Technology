// --- DOM ELEMENTS ---
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const playAgainBtn = document.getElementById('play-again-btn');

const questionText = document.getElementById('question-text');
const answerContainer = document.getElementById('answer-container');
const scoreText = document.getElementById('score-text');

// --- QUIZ DATA ---
const questions = [
    {
        question: "What is the capital of India?",
        type: 'single-select',
        options: ['Jaipur', 'New Delhi', 'Mumbai', 'Chennai'],
        answer: 'New Delhi'
    },
    {
        question: "Which of the following are primary colors? (Select all that apply)",
        type: 'multi-select',
        options: ['Red', 'Green', 'Blue', 'Yellow'],
        answer: ['Red', 'Blue', 'Yellow']
    },
    {
        question: "The first Prime Minister of India was Jawaharlal ____.",
        type: 'fill-in-the-blank',
        answer: 'Nehru'
    },
    {
        question: "Which planet is known as the Red Planet?",
        type: 'single-select',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        answer: 'Mars'
    }
];

// --- STATE VARIABLES ---
let currentQuestionIndex = 0;
let score = 0;

// --- FUNCTIONS ---
function startQuiz() {
    startScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    currentQuestionIndex = 0;
    score = 0;
    
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    answerContainer.innerHTML = ''; // Clear previous answers

    switch (currentQuestion.type) {
        case 'single-select':
            currentQuestion.options.forEach(option => {
                const label = document.createElement('label');
                label.className = 'answer-option';
                label.innerHTML = `
                    <input type="radio" name="answer" value="${option}">
                    <span>${option}</span>
                `;
                answerContainer.appendChild(label);
            });
            break;
        case 'multi-select':
            currentQuestion.options.forEach(option => {
                const label = document.createElement('label');
                label.className = 'answer-option';
                label.innerHTML = `
                    <input type="checkbox" name="answer" value="${option}">
                    <span>${option}</span>
                `;
                answerContainer.appendChild(label);
            });
            break;
        case 'fill-in-the-blank':
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'fill-in-blank-input';
            input.placeholder = 'Type your answer here';
            answerContainer.appendChild(input);
            break;
    }
}

function handleSubmit() {
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;

    switch (currentQuestion.type) {
        case 'single-select':
            const selectedRadio = document.querySelector('input[name="answer"]:checked');
            if (selectedRadio && selectedRadio.value === currentQuestion.answer) {
                isCorrect = true;
            }
            break;
        case 'multi-select':
            const selectedCheckboxes = document.querySelectorAll('input[name="answer"]:checked');
            const selectedAnswers = Array.from(selectedCheckboxes).map(cb => cb.value);
            // Check if arrays contain the same elements, regardless of order
            if (selectedAnswers.length === currentQuestion.answer.length &&
                selectedAnswers.every(answer => currentQuestion.answer.includes(answer))) {
                isCorrect = true;
            }
            break;
        case 'fill-in-the-blank':
            const userInput = document.getElementById('fill-in-blank-input').value;
            if (userInput.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
                isCorrect = true;
            }
            break;
    }

    if (isCorrect) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    scoreText.innerText = `${score} / ${questions.length}`;
}

// --- EVENT LISTENERS ---
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleSubmit);
playAgainBtn.addEventListener('click', startQuiz);