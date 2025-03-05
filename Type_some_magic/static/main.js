const words = ["apple", "banana", "cherry", "dog", "elephant", "friend", "grape", "happy", "ice", "jungle", 
    "kite", "lemon", "monkey", "night", "orange", "piano", "queen", "rabbit", "sun", "tiger", 
    "umbrella", "violin", "window", "xylophone", "yellow", "zebra", "adventure", "brave", "courage", "dream"];

let selectedWords = [];
let currentIndex = 0;
let typedCharacters = "";
let startTime = null;
let wpm_show = document.getElementById("wpm");
wpm_show.style.display="none";

function getRandomWords(count) {
return words.sort(() => Math.random() - 0.5).slice(0, count).join(" ");
}

function displayWords() {
const wordContainer = document.getElementById("word-container");
wordContainer.innerHTML = "";

selectedWords.split("").forEach((char, index) => {
const span = document.createElement("span");
span.textContent = char;
span.classList.add("letter", "faded");
if (char === " ") span.style.marginRight = "10px"; // Add space handling
wordContainer.appendChild(span);
});

// Add cursor bar
const cursor = document.createElement("span");
cursor.id = "cursor";
cursor.textContent = "|"; 
wordContainer.insertBefore(cursor, wordContainer.firstChild);
updateCursor();
}

document.addEventListener("DOMContentLoaded", () => {
selectedWords = getRandomWords(5);
displayWords();

document.addEventListener("keydown", (event) => {
if (!startTime) startTime = new Date(); // Start timer on first key press
if (event.key === "Backspace") {
 typedCharacters = typedCharacters.slice(0, -1);
} else if (event.key.length === 1) {
 typedCharacters += event.key;
}

updateTyping();
updateCursor();
});
});

function updateTyping() {
const letters = document.querySelectorAll(".letter");
typedCharacters.split("").forEach((char, index) => {
if (letters[index]) {
 if (char === selectedWords[index]) {
     letters[index].classList.remove("incorrect");
     letters[index].classList.add("correct");
 } else {
     letters[index].classList.remove("correct");
     letters[index].classList.add("incorrect");
 }
 letters[index].classList.remove("faded");
}
});

// Fade the next character
if (letters[typedCharacters.length]) {
letters[typedCharacters.length].classList.remove("faded");
}

if (typedCharacters.length === selectedWords.length) {
calculateWPM();
}
}

function updateCursor() {
const letters = document.querySelectorAll(".letter");
const cursor = document.getElementById("cursor");

if (typedCharacters.length < letters.length) {
const nextLetter = letters[typedCharacters.length];
nextLetter.parentNode.insertBefore(cursor, nextLetter);
} else {
letters[letters.length - 1].after(cursor);
}
}

function calculateWPM() {
    let endTime = new Date();
    let timeTaken = (endTime - startTime) / 60000; // Convert ms to minutes
    let wpm = Math.round(selectedWords.split(" ").length / timeTaken);
    wpm_show.style.display = "block"
    wpm_show.innerText = "WPM: " + wpm;
    // Fetch message based on WPM
    fetch(`/submit?wpm=${wpm}`)
        .then(response => response.json())
        .then(data => {
            let result = document.getElementById("result");
            result.innerHTML = data.message;
             // Green if success, red if fail
        })
        .catch(error => console.error("Error:", error));
}
