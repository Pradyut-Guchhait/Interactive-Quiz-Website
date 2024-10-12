// Array of quiz questions, choices, and the index of the correct answer
const quizData = [
    {
        question: "What is the currency of Japan?",
        choices: ["Yen", "Won", "Dollar", "Euro"],
        correct: 0
    },
    {
        question: "Which element is the most abundant in the universe?",
        choices: ["Oxygen", "Hydrogen", "Carbon", "Helium"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correct: 2
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        correct: 2
    },
    {
        question: "What is the capital city of Canada?",
        choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        correct: 2
    }
];

// Initialize variables for the quiz
let currentQuestion = 0; // Index of the current question
let score = 0;           // User's score
let timeLeft = 60;      // Time left for the quiz
let timer;              // Timer variable

// Select elements from the DOM
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const quizContainer = document.getElementById("quiz-container");
const restartBtn = document.getElementById("restart-btn");

// Start the quiz
function startQuiz() {
    currentQuestion = 0; // Reset current question index
    score = 0;           // Reset score
    timeLeft = 60;      // Reset timer
    restartBtn.style.display = "none"; // Hide restart button
    timerEl.style.display = "block"; // Show timer
    scoreEl.textContent = "Score: 0"; // Update score display
    timerEl.style.color = "#546e7a"; // Reset timer color
    clearFeedback(); // Clear any previous feedback
    showQuestion(); // Show the first question
    startTimer();   // Start the timer
}

// Show the current question and choices
function showQuestion() {
    clearFeedback(); // Clear any previous feedback
    const question = quizData[currentQuestion]; // Get current question
    questionEl.textContent = question.question; // Display question

    choicesEl.innerHTML = ""; // Clear previous choices
    question.choices.forEach((choice, index) => {
        const button = document.createElement("button"); // Create a button for each choice
        button.textContent = choice; // Set button text
        button.onclick = () => selectAnswer(index); // Attach click event
        choicesEl.appendChild(button); // Add button to choices
    });

    // Add animation to quiz container
    quizContainer.style.animation = "pulse 0.5s ease";
    setTimeout(() => {
        quizContainer.style.animation = ""; // Reset animation
    }, 500);
}

// Handle answer selection
function selectAnswer(choiceIndex) {
    const question = quizData[currentQuestion]; // Get current question
    const isCorrect = choiceIndex === question.correct; // Check if the selected answer is correct
    
    showFeedback(isCorrect); // Show feedback on selection
    
    // Update score and background color based on the correctness
    if (isCorrect) {
        score++; // Increase score for correct answer
        scoreEl.textContent = `Score: ${score}`; // Update score display
        document.body.style.background = "linear-gradient(135deg, #e8f5e9, #c8e6c9)"; // Change background color for correct answer
    } else {
        document.body.style.background = "linear-gradient(135deg, #ffebee, #ffcdd2)"; // Change background color for incorrect answer
    }
    
    // Reset background color after a brief moment
    setTimeout(() => {
        document.body.style.background = "linear-gradient(135deg, #e0f7fa, #b2ebf2)";
    }, 1000);

    currentQuestion++; // Move to the next question
    // Show next question or end the quiz if there are no more questions
    if (currentQuestion < quizData.length) {
        setTimeout(showQuestion, 1500); // Show next question after delay
    } else {
        setTimeout(endQuiz, 1500); // End the quiz after delay
    }
}

// Show feedback for the selected answer
function showFeedback(isCorrect) {
    feedbackEl.className = isCorrect ? "correct" : "incorrect"; // Set class for feedback styling
    feedbackEl.textContent = isCorrect ? "Correct!" : "Incorrect!"; // Display feedback message
    setTimeout(clearFeedback, 1500); // Clear feedback after a short duration
}

// Clear feedback message
function clearFeedback() {
    feedbackEl.className = ""; // Reset feedback class
    feedbackEl.textContent = ""; // Clear feedback text
}

// Start the timer for the quiz
function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        timeLeft--; // Decrease time left
        timerEl.textContent = `Time: ${timeLeft}s`; // Update timer display
        // Change timer color when time is low
        if (timeLeft <= 10) {
            timerEl.style.color = "#e53935";
        }
        // End quiz when time runs out
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000); // Update timer every second
}

// End the quiz and show results
function endQuiz() {
    clearInterval(timer); // Stop the timer
    questionEl.textContent = `Quiz finished!`; // Display end message
    
    // Show user's score and correct answers
    choicesEl.innerHTML = `<p style="font-size: 24px; color: #1a237e;">Your score: ${score}/${quizData.length}</p>`;
    const answerList = quizData.map((q, index) => {
        return `<li>${q.question} - Correct Answer: ${q.choices[q.correct]}</li>`; // List each question with the correct answer
    }).join(''); // Join the answers into a single string
    
    // Display the correct answers
    choicesEl.innerHTML += `<p style="font-size: 20px; color: #1a237e;">Correct Answers:</p><ul>${answerList}</ul>`;
    
    clearFeedback(); // Clear feedback
    timerEl.style.display = "none"; // Hide timer
    restartBtn.style.display = "block"; // Show restart button
}

// Attach click event to the restart button
restartBtn.addEventListener("click", startQuiz);

// Start the quiz on page load
startQuiz();
