let timer;
let time = 0;
let isTyping = false;
let textToType = document.getElementById('text-to-type').innerText;
let typingArea = document.getElementById('typing-area');
let timerDisplay = document.getElementById('timer');
let wpmDisplay = document.getElementById('wpm');
let accuracyDisplay = document.getElementById('accuracy');
let resetBtn = document.getElementById('reset-btn');

function startTimer() {
  timer = setInterval(function() {
    time++;
    timerDisplay.textContent = `Time: ${time}s`;
  }, 1000);
}

function calculateWPM() {
  let typedText = typingArea.value.trim();
  let wordCount = typedText.split(' ').length;
  return Math.round((wordCount / time) * 60);
}

function calculateAccuracy() {
  let typedText = typingArea.value.trim();
  let correctCount = 0;
  let words = textToType.split(' ');
  let typedWords = typedText.split(' ');

  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === words[i]) {
      correctCount++;
    }
  }

  return Math.round((correctCount / words.length) * 100);
}

function checkTyping() {
  let typedText = typingArea.value;
  if (!isTyping && typedText.length > 0) {
    isTyping = true;
    startTimer();
  }

  let wpm = calculateWPM();
  let accuracy = calculateAccuracy();
  wpmDisplay.textContent = `Words per minute: ${wpm}`;
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;

  if (typedText === textToType) {
    clearInterval(timer);
    alert('You completed the test!');
  }
}

function resetTest() {
  typingArea.value = '';
  time = 0;
  isTyping = false;
  clearInterval(timer);
  timerDisplay.textContent = 'Time: 0s';
  wpmDisplay.textContent = 'Words per minute: 0';
  accuracyDisplay.textContent = 'Accuracy: 0%';
  typingArea.focus();
}

typingArea.addEventListener('input', checkTyping);
resetBtn.addEventListener('click', resetTest);
