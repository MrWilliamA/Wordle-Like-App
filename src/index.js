/* eslint-disable */

// All interactions between the client and the API should be handled asynchronously
//incorporate at least 3 separate event listeners.
//Set up a JSON server in your project to persist your app's interactivity. i.e. store scores
// install eslint and clean things up

// input cant be blank
// if score is 6 check if failed or not. If failed score should be 0
// if all guesses wrong reveal the word at the bottom
// make keyboard clickable? ore remove pointer events if no time
// save score to JSON

//update trello account
//make a good readme. link to trello account

let randomWord = "";
let inputListNode = document.querySelectorAll("input");

let inputList = Array.prototype.slice.call(inputListNode);

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    "X-RapidAPI-Key": "fb928f7295msh9c244083f4e0450p15ec8djsn6559e8e19e3b",
  },
};

const getRandomWord = async (word) => {
  fetch(
    "https://wordsapiv1.p.rapidapi.com/words/?letters=5&random=true&letterPattern=[^-_]",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      randomWord = response.word
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toUpperCase()
      console.log(randomWord);
    })
    .catch((err) => console.error(err));
};

getRandomWord();

function moveOnMax(nextFieldID) {
  const maxLength = 1;
  let nextId = parseInt(nextFieldID.match(/\d+/)[0], 10) + 1;

  let nextInput = document.getElementById(`input${nextId}`);

  let excludedInputs = ["input6", "input11", "input16", "input21", "input26"];

  let inputsCompared =
    nextFieldID != "input30" ? excludedInputs.includes(nextInput.id) : "input6";

  if (maxLength >= 1 || !inputsCompared) {
    if (!inputsCompared) {
      nextInput.focus();
    }
  }
}

function rightAsnwer(thisInput) {

  console.log(thisInput);

  const finishRow = thisInput.parentElement.parentElement.id;

  const score = finishRow.split('').pop();
  const showScore = document.getElementById('userScore').innerText = score;
  const disableInputs = (document.getElementById("mainBoard").style.pointerEvents = "none");
  const finished = document.getElementById("finishedBox").classList.add("show");
  const answer = document.getElementById("answer").innerText = randomWord;
  
}

function wrongAnswer(guessArray, randomWord, rows) {
  const inputColour = rows.children;
  for (let i = 0; i < 5; i++) {
    const foundArray = [guessArray[i]];
    const found = foundArray.some((r) => randomWord.includes(r));
    if (guessArray[i] === randomWord[i]) {
      inputColour[i].style.backgroundColor = 'rgb(5 120 5)'; //green
      document.querySelectorAll('.keyboardLine span').forEach(
        (el) => {
          if (el.innerHTML == guessArray[i]) {
            el.classList.add('guessedRight');
          }
        },
      );
    } else {
      let cellColor = 'rgb(161 25 25)'; // red
      if (found) { cellColor = 'rgb(243 243 51)'; } //yellow
      inputColour[i].style.backgroundColor = cellColor;
      
      if(!found) {
      document.querySelectorAll('.keyboardLine span').forEach(
        (el) => {
          if (el.innerHTML == guessArray[i]) {
            el.classList.add('guessedWrong');
          }
        },
      );
    };

    };
  };
  };

const checkAnswer = (thisInput) => {
  if (thisInput === document.activeElement) {
    const rows = thisInput.parentElement.parentElement;

    const test = rows.querySelectorAll(`input`);

    let btnsArr = Array.prototype.slice.call(test);

    let guessArray = [];
    btnsArr.forEach((inputValue) => {
      guessArray.push(inputValue.value.toUpperCase());
    });
    const guess = guessArray.join("");

    if (guess === randomWord) {
      rightAsnwer(thisInput);
    } else {
      wrongAnswer(guessArray, randomWord, rows);
    }
  }
};


const rowsOff = document.querySelectorAll(".inputRow");
let rowDivided = [...rowsOff];

function disableEnableRows() {
  rowDivided.forEach((row) => {
    row.classList.add("disabled");
  });
}

function moveNextRow(thisInput){
  
  const finishInput = parseInt(thisInput.id.split('').pop());
  const nextRowInputId = `input${finishInput}`;
  const nextRow = document.getElementById(`row${idNum}`)

  console.log(thisInput)
  if(finishInput % 5 === 0 && thisInput.id != 'input30'){
     disableEnableRows();
     nextRow.classList.remove("disabled");
     console.log(nextRow.id)
     const nextRowInput = document.querySelector(`#${nextRow.id} input`)
     nextRowInput.focus();
  } else if(thisInput.id == 'input30'){
    rightAsnwer(thisInput);
  }
 
}

let idNum = 1;

for (let i = 0; i < inputList.length; i++) {
  inputList[i].addEventListener("keyup", function (event) {
    let thisInput = event.target;
    let thisInputValue = event.target.value;
    let nextInput = event.target.getAttribute("id");
    console.log(thisInput)
    moveOnMax(nextInput);

    if (event.key === "Enter") {
      idNum++;
      checkAnswer(thisInput);
      moveNextRow(thisInput);
      
  }
});
}
