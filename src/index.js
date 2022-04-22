/* eslint-disable */

// All interactions between the client and the API should be handled asynchronously 
//incorporate at least 3 separate event listeners.
//Set up a JSON server in your project to persist your app's interactivity. i.e. store scores
// install eslint and clean things up



// for each letter guessed, mark of that letter form keyboard
// if all guesses wrong reveal the word at the bottom
// if enter is pressed, move focus to next row
// count how many rows are used and save it as score
// append score to dom
// make keyboard clickable? ore remove pointer events if no time

//update trello account
//make a good readme. link to trello account 
// add favicon

let randomWord = [];
let inputListNode = document.querySelectorAll('input');

let inputList = Array.prototype.slice.call(inputListNode);

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
		'X-RapidAPI-Key': 'fb928f7295msh9c244083f4e0450p15ec8djsn6559e8e19e3b'
	}
};

// const getRandomWord = async (word) => {
//     fetch('https://wordsapiv1.p.rapidapi.com/words/?letters=5&random=true', options)
// 	.then(response => response.json())
// 	.then(response => {

//         const excludedCharacters = ['-', '_', '/'];

//         let n = excludedCharacters.includes(response);

//         if(!n ) {
//          randomWord = response.word.toUpperCase().split("");
//         } else {
//             console.log("faulty word");
//         }

//         })
// 	.catch(err => console.error(err));
// };

// getRandomWord();

//========//
// function getRandomWord() {
//     return fetch('https://wordsapiv1.p.rapidapi.com/words/?letters=5&random=true')
//       .then(response => response.json())
//       .then(response => {
//           return unfilteredWord = response.word;
//       }
//   }

//   function filterWord(){
//     const excludedCharacters = ['-', '_', '/'];
//     let n = excludedCharacters.includes(response);
    
//     if(!n ) {
//         randomWord = response.word.toUpperCase().split("");
//     } else {
//         getRandomWord();
//     }
    
//   }
//   filterWord();

//=======//

const getRandomWord = async (word) => {
    fetch('https://wordsapiv1.p.rapidapi.com/words/?letters=5&random=true&letterPattern=[^\-\_]', options)
	.then(response => response.json())
	.then(response => {
        randomWord = response.word.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase().split("");
        console.log(randomWord)
        })
	.catch(err => console.error(err));
};

getRandomWord();


function moveOnMax(nextFieldID) { 
    const maxLength = 1;
    let nextId =  parseInt(nextFieldID.match(/\d+/)[0], 10) + 1;

    let nextInput = document.getElementById(`input${nextId}`);
    
    let excludedInputs = ['input6', 'input11', 'input16', 'input21', 'input26',]
    
    let inputsCompared = (nextFieldID != "input30") ? excludedInputs.includes(nextInput.id) : "input6";

    if (maxLength => 1 || !inputsCompared) { 
        if(!inputsCompared) {
            nextInput.focus(); 
        }
    } 

}  

function rightAsnwer(thisInput) {
    const disableInputs = document.getElementById("mainBoard").style.pointerEvents = "none";
    const finished =  document.getElementById("finishedBox").classList.add("show");
}

function wrongAnswer(guessArray, randomWord, rows) {
    
    const inputColour = rows.children;

    for(let i = 0; i < 5; i++ ) {
        if(guessArray[i] === randomWord[i]) {
            inputColour[i].style.backgroundColor = "rgb(5 120 5)";
            console.log(guessArray[i])


            // get keyboard element b innertext?
            // const keyboard = document.querySelectorAll('.keyboardLine span').innerHTML;

            const keyboard = [].map.call(document.querySelectorAll('.keyboardLine span'), function(el) {
                if(el.innerHTML == guessArray[i]){
                    el.classList.add("guessedRight");;
                }
            })
            
            

        } else {
            inputColour[i].style.backgroundColor = "rgb(161 25 25)";
            const keyboard = [].map.call(document.querySelectorAll('.keyboardLine span'), function(el) {
                if(el.innerHTML == guessArray[i]){
                    el.classList.add("guessedWrong");;
                }
            })
            
        }
    }

}

const checkAnswer = (thisInput) => {
    if (thisInput === document.activeElement) {
            
        const rows = thisInput.parentElement.parentElement;

        const test = rows.querySelectorAll(`input`);

        let btnsArr = Array.prototype.slice.call(test);
    
        let guessArray = [];
        btnsArr.forEach((inputValue) => {        
            guessArray.push(inputValue.value.toUpperCase());            
        });
        const guess = guessArray.join('');
        const answer = randomWord.join('');

        if(guess === answer) {
            rightAsnwer(thisInput);
        } else {
            wrongAnswer(guessArray, randomWord, rows);
        }
    } 
 }

for (let i = 0 ; i < inputList.length; i++) {

    inputList[i].addEventListener("keyup", function(event){
        let thisInput = event.target
        let thisInputValue = event.target.value;
        let nextInput = event.target.getAttribute('id');

        moveOnMax(nextInput);

        if (event.key === 'Enter') {
            checkAnswer(thisInput);
                   
        const rowsOff = document.querySelectorAll(".inputRow");
        let rowDivided = [ ...rowsOff ];

        function disableEnableRows() {
            rowDivided.forEach(row => {
            row.classList.add("disabled");
        });

};

            switch(thisInput.id) {
                case "input5":
                    disableEnableRows();
                    rowDivided[1].classList.remove("disabled")
                    break;
                case "input10":
                    disableEnableRows();
                    rowDivided[2].classList.remove("disabled")
                    break;
                case "input15":
                    disableEnableRows();
                    rowDivided[3].classList.remove("disabled")
                    break;
                case "input20":
                    disableEnableRows();
                    rowDivided[4].classList.remove("disabled")
                    break;
                case "input25":
                    disableEnableRows();
                    rowDivided[5].classList.remove("disabled")
                    break;
                case "input30":
                    disableEnableRows();
                    rightAsnwer();
                    break;
            }
        };
    });
}

