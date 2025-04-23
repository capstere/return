// Star Wars Intro Sequence Control
window.addEventListener('load', function() {
  const introText = document.getElementById('intro-text');
  const crawl = document.querySelector('.crawl');

  // 1. Fade out the "A long time ago..." text after 3 seconds
  setTimeout(() => {
    introText.classList.add('fade-out');
  }, 3000);

  // 2. Start the crawl animation after 5 seconds (allow intro text to fade)
  setTimeout(() => {
    crawl.classList.add('animate');
  }, 5000);

  // 3. When crawl animation ends, transition to main interactive content
  crawl.addEventListener('animationend', () => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
  });
});

// Quiz Logic and Interactive Elements
const questions = [
  { text: "Vad heter Han Solos rymdskepp?",
    options: ["Millennium Falcon", "Imperial Destroyer", "Enterprise"],
    correct: 0 },
  { text: "Vem är far till Luke Skywalker?",
    options: ["Darth Vader", "Kejsare Palpatine", "Han Solo"],
    correct: 0 },
  { text: "På vilken planet tränar Yoda Luke?",
    options: ["Dagobah", "Tatooine", "Hoth"],
    correct: 0 }
];
let currentQuestion = 0;
let score = 0;

// Function to show next question
function nextQuestion() {
  if (currentQuestion >= questions.length) {
    finishQuiz();
    return;
  }
  const q = questions[currentQuestion];
  // Display question text
  document.getElementById('question-text').innerText = q.text;
  // Create option buttons
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = ""; // clear previous options
  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.addEventListener('click', () => answerQuestion(index));
    optionsDiv.appendChild(btn);
  });
}

// Function to handle an answer click
function answerQuestion(choiceIndex) {
  const q = questions[currentQuestion];
  if (choiceIndex === q.correct) {
    score++;
    document.getElementById('saberSound').play();   // Play lightsaber (correct)
  } else {
    document.getElementById('blasterSound').play(); // Play blaster (incorrect)
  }
  currentQuestion++;
  // Proceed to next question after a short delay
  setTimeout(nextQuestion, 800);
}

// Function to finish the quiz and show result
function finishQuiz() {
  document.getElementById('question-container').style.display = 'none';
  const resultEl = document.getElementById('result');
  const total = questions.length;
  resultEl.innerText = `Du fick ${score} av ${total} rätt. `;
  // Add a fun comment based on performance
  if (score === total) {
    resultEl.innerText += "Perfekt! Kraften är stark hos dig.";
  } else if (score > 0) {
    resultEl.innerText += "Bra jobbat! Men du har ännu mer att lära.";
  } else {
    resultEl.innerText += "Inga rätt... den Mörka sidan må vara stark i dig!";
  }
  // Trigger epic finale: spaceship flyby
  document.getElementById('spaceship').classList.add('flyby');
}

// Event listeners for lightsaber choice buttons (Jedi/Sith selection)
document.querySelectorAll('.saber-choice').forEach(button => {
  button.addEventListener('click', () => {
    const color = button.getAttribute('data-color');
    const saberEl = document.getElementById('lightsaber');
    // Activate chosen lightsaber
    saberEl.classList.add(color, 'on');
    document.getElementById('saberSound').play();
    // After short delay, hide saber and start quiz
    setTimeout(() => { 
      saberEl.style.display = 'none'; 
    }, 1500);
    // Hide intro text and buttons, show first question
    document.getElementById('quiz-intro').style.display = 'none';
    document.querySelectorAll('.saber-choice').forEach(btn => btn.style.display = 'none');
    document.getElementById('question-container').style.display = 'block';
    // Start background music (since user interacted, this should play)
    document.getElementById('music').play();
    // Show the first question
    nextQuestion();
  });
});
