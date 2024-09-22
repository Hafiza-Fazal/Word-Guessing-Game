var words = [
    { word: "math", hint: "I involve numbers and operations, and I'm essential for solving problems in science and finance. What am I?." },
    { word: "english", hint: "I’m a global language used in many countries, known for my diverse vocabulary and literature. What am I?" },
    { word: "urdu", hint: "I’m a language spoken primarily in Pakistan and India, and I use a script derived from Persian. What am I?" },
    { word: "science", hint: "I study the natural world through observation and experimentation, and I include fields like biology, chemistry, and physics. What am I?" },
    { word: "gk", hint: "I involve facts and information about a wide range of topics, from history to geography, and I help you understand the world better. What am I?" }
];

var selectedWord = words[Math.floor(Math.random() * words.length)];
var randomWord = selectedWord.word;
var hint = selectedWord.hint;
var attempts = 5;
var guessedLetters = [];
var displayWord = Array(randomWord.length).fill("_");

function updateDisplayWord() {
    document.getElementById("word").innerHTML = displayWord.join(" ");
}

function checkGuess() {
    var userGuess = document.getElementById("guess").value.toLowerCase();

    if (guessedLetters.includes(userGuess) ) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong Guess",
          });
        document.getElementById("guess").value = "";
        return;
    }else if(userGuess.length !== 1){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "empty",
          });
          document.getElementById("guess").value = "";
        return;
    }

    guessedLetters.push(userGuess);

    if (randomWord.includes(userGuess)) {
        for (var i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === userGuess) {
                displayWord[i] = userGuess;
            }
        }
        //alert("Good guess!");
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Good guess!",
            showConfirmButton: false,
            timer: 1000
          });
    } else {
        attempts--;
        //alert("Wrong guess! You have " + attempts + " attempts left.");
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong guess! You have " + attempts + " attempts left.",
          });
    }

    if (attempts === 0) {
        alert("Game over! The word was: " + randomWord);
        document.getElementById("guess").disabled = true;
    } else if (displayWord.join("") === randomWord) {
       // alert("Congratulations! You've guessed the word: " + randomWord);
       Swal.fire({
        title: "Sweet!",
        text: "Congratulations! You've guessed the word: " + randomWord,
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
        document.getElementById("guess").disabled = true;
    }

    updateDisplayWord();
    document.getElementById("guess").value = "";
}

function giveHint() {
    //alert("Hint: " + hint);
    let timerInterval;
Swal.fire({
  title: "Hint: " + hint,
  //text:"Hint: " + hint,
  html: "I will close in <b></b> milliseconds.",
  timer: 4000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
  }
});
}

updateDisplayWord();

