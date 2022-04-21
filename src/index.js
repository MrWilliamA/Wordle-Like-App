/* eslint-disable */

// All interactions between the client and the API should be handled asynchronously 
//incorporate at least 3 separate event listeners.
//Set up a JSON server in your project to persist your app's interactivity. i.e. store scores
// install eslint and clean things up


// loop through each input and save variable
// when 'guess' btn is clicked a function compares the two words one array element at a time, if true = color the div, if false skip. set all used inputs to disabled.
// if word is write, disable all rows and alert(?) score i.e. number of rows.
// for each letter guessed, mark of that letter form keyboard
// if all guesses wrong reveal the word at the bottom


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
    fetch('https://wordsapiv1.p.rapidapi.com/words/?letters=5&random=true', options)
	.then(response => response.json())
	.then(response => {
        randomWord = response.word.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase().split("");
        console.log(randomWord)
        })
	.catch(err => console.error(err));
};

getRandomWord();


function moveOnMax(field, nextFieldID) { 
    const maxLength = 1;
    let nextId =  parseInt(nextFieldID.match(/\d+/)[0], 10) + 1;
    
    let nextInput = document.getElementById(`input${nextId}`);
    
    if (field.length >= maxLength) { 
        nextInput.focus(); 
    } 
}  

function rightAsnwer(thisInput) {
    const disableInputs = document.getElementById("mainBoard").style.pointerEvents = "none";
    const finished =  document.getElementById("finishedBox").classList.add("show");
}

function wrongAnswer(guessArray, randomWord, thisInput) {

    for(let i = 0; i < 5; i++ ) {
        if(guessArray[i] === randomWord[i]) {
            inputList[i].style.backgroundColor = "#057805";
        } else {
            inputList[i].style.backgroundColor = "#a11919";
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
            wrongAnswer(guessArray, randomWord, thisInput);
        }
    } 
 }

for (let i = 0 ; i < inputList.length; i++) {

    inputList[i].addEventListener("keyup", function(event){
        let thisInput = event.target
        let thisInputValue = event.target.value;
        let nextInput = event.target.getAttribute('id');

        moveOnMax(thisInputValue, nextInput);
        // change this so it only happens when enter is pressed, or guess button clicked
        if (event.key === 'Enter') {
            checkAnswer(thisInput);
            

            const rows = thisInput.parentElement.parentElement;
            console.log(rows)
            //if this is the last input, reveal next row and freeze current row with: .style.pointerEvents = "none";
            if(thisInput == false) {
                console.log('last one')
            }
        }
    });

};
