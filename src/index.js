// All interactions between the client and the API should be handled asynchronously
// incorporate at least 3 separate event listeners.
// add one for keyboard clicks, make them clickable?
// add one for restart button
// disable numbers from fetch? and spaces
// update trello account
// make a good readme. link to trello account

let randomWord = '';
const inputListNode = document.querySelectorAll('input');

const inputList = Array.prototype.slice.call(inputListNode);

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
    'X-RapidAPI-Key': 'fb928f7295msh9c244083f4e0450p15ec8djsn6559e8e19e3b',
  },
};

const getRandomWord = async () => {
  fetch(
    'https://wordsapiv1.p.rapidapi.com/words/?letters=5&random=true&letterPattern=[^-_]',
    options,
  )
    .then((response) => response.json())
    .then((response) => {
      randomWord = response.word
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .toUpperCase();
      console.log(randomWord);
    })
    .catch((err) => console.error(err));
};

getRandomWord();

function moveOnMax(nextFieldID) {
  const maxLength = 1;
  const nextId = parseInt(nextFieldID.match(/\d+/)[0], 10) + 1;

  const nextInput = document.getElementById(`input${nextId}`);

  const excludedInputs = ['input6', 'input11', 'input16', 'input21', 'input26'];

  const inputsCompared = nextFieldID != 'input30' ? excludedInputs.includes(nextInput.id) : 'input6';

  if (maxLength >= 1 || !inputsCompared) {
    if (!inputsCompared) {
      nextInput.focus();
    }
  }
}

let finalScore = 0;

let scoreObj = {
  score: 0,
  date: 0,
};

function finishGame(finalScore = 0) {
  const passMarkDisplay = document.querySelector('#passMark span');
  if (finalScore > 0) {
    passMarkDisplay.innerText = ' SUCCESS!';
    passMarkDisplay.classList.add('success');
  } else {
    passMarkDisplay.innerText = ' FAIL!';
    passMarkDisplay.classList.add('fail');
  }

  scoreObj = {
    score: finalScore,
    date: new Date().toDateString(),
  };

  document.getElementById('userScore').innerText = finalScore;
  document.getElementById('mainBoard').style.pointerEvents = 'none';
  document.getElementById('finishedBox').classList.add('show');
  document.getElementById('answer').innerText = randomWord;
}

function rightAsnwer(thisInput) {
  const finishRow = thisInput.parentElement.parentElement.id;
  finalScore = finishRow.split('').pop();

  finishGame(finalScore);
}

function wrongAnswer(guessArray, randomWord, rows) {
  const inputColour = rows.children;
  if (rows.id == 'row6') {
    finishGame();
  }

  for (let i = 0; i < 5; i++) {
    const foundArray = [guessArray[i]];
    const found = foundArray.some((r) => randomWord.includes(r));
    if (guessArray[i] === randomWord[i]) {
      inputColour[i].style.backgroundColor = 'rgb(5 120 5)'; // green
      document.querySelectorAll('.keyboardLine span').forEach(
        (el) => {
          if (el.innerHTML == guessArray[i]) {
            el.classList.add('guessedRight');
          }
        },
      );
    } else {
      let cellColor = 'rgb(161 25 25)'; // red
      if (found) { cellColor = 'rgb(243 243 51)'; } // yellow
      inputColour[i].style.backgroundColor = cellColor;

      if (!found) {
        document.querySelectorAll('.keyboardLine span').forEach(
          (el) => {
            if (el.innerHTML == guessArray[i]) {
              el.classList.add('guessedWrong');
            }
          },
        );
      }
    }
  }
}

const checkAnswer = (thisInput) => {
  if (thisInput === document.activeElement) {
    const rows = thisInput.parentElement.parentElement;

    const allInputs = rows.querySelectorAll('input');

    const btnsArr = Array.prototype.slice.call(allInputs);

    const guessArray = [];
    btnsArr.forEach((inputValue) => {
      guessArray.push(inputValue.value.toUpperCase());
    });
    const guess = guessArray.join('');

    if (guess === randomWord) {
      rightAsnwer(thisInput);
    } else {
      wrongAnswer(guessArray, randomWord, rows);
    }
  }
};

const rowsOff = document.querySelectorAll('.inputRow');
const rowDivided = [...rowsOff];

function disableEnableRows() {
  rowDivided.forEach((row) => {
    row.classList.add('disabled');
  });
}

function moveNextRow(thisInput) {
  const finishInput = parseInt(thisInput.id.split('').pop());
  // const nextRowInputId = `input${finishInput}`;
  const nextRow = document.getElementById(`row${idNum}`);

  if (finishInput % 5 === 0 && thisInput.id != 'input30') {
    disableEnableRows();
    nextRow.classList.remove('disabled');
    const nextRowInput = document.querySelector(`#${nextRow.id} input`);
    nextRowInput.focus();
  } else if (thisInput.id == 'input30') {
    checkAnswer(thisInput);
  }
}

let idNum = 1;

for (let i = 0; i < inputList.length; i++) {
  // eslint-disable-next-line no-loop-func
  inputList[i].addEventListener('keyup', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const thisInput = event.target;
    // const thisInputValue = event.target.value;
    const nextInput = event.target.getAttribute('id');
    if (thisInput.value != ' ' && event.keyCode != 8) {
      moveOnMax(nextInput);
      if (event.key === 'Enter') {
        // eslint-disable-next-line no-plusplus
        idNum++;
        checkAnswer(thisInput);
        moveNextRow(thisInput);
      }
    }
  });
}

const newScoreBtn = document.getElementById('newScore');

newScoreBtn.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  postScore(scoreObj);
});

function postScore(scoreObj) {
  fetch('http://localhost:3000/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      date: scoreObj.date,
      score: scoreObj.score,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      alert('There was an error');
      console.log(error.message);
    });
}

function createScoreList(score) { 
  const row = document.createElement('tr');
  row.append(`${score.date} - score: ${score.score}`);
  document.querySelector('#pastScores table').prepend(row);
  if (score.score == 0) {
    row.classList.add('fail');
  } else {
    row.classList.add('success');
  }
}


function getScores() {
  return fetch('http://localhost:3000/scores')
    .then(res => res.json());
}

const viewPastScores = document.getElementById('viewScores');

viewPastScores.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  document.getElementById('pastScores').classList.add('show');
  getScores().then(scores => {
    scores.forEach(score => {
      createScoreList(score);
    });
  });
});

const closeScores = document.getElementById('closeScores');
closeScores.addEventListener('click', (event) => {
document.getElementById('pastScores').classList.remove("show")

})
