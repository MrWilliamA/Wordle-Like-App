/* eslint-disable */

// All interactions between the client and the API should be handled asynchronously 
//incorporate at least 3 separate event listeners.
//Set up a JSON server in your project to persist your app's interactivity. i.e. store scores

// split user text into array - capitalised
// compare the two, return true or false functions

// loop through each input and save variable
// each textbox max length is 1, make a function onkeyup event. In this function if length is equal or exceed to 1 then you need to write second textbox focus function calls.
// function moveOnMax(field, nextFieldID) { if (field.value.length >= field.maxLength) { nextFieldID.focus(); } }  
// when 'guess' btn is clicked a function compares the two words one array element at a time, if true = color the div, if false skip. set all used inputs to disabled.
// if word is write, disable all rows and alert(?) score i.e. number of rows.
// for each letter guessed, mark of that letter form keyboard
// if all guesses wrong reveal the word at the bottom


//make trello account
//make a good readme. link to trello account 
// add favicon

let randomWord = [];
let inputListNode = document.querySelectorAll('input');

let inputList = Array.prototype.slice.call(inputListNode);

console.log(inputList)

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
		'X-RapidAPI-Key': 'fb928f7295msh9c244083f4e0450p15ec8djsn6559e8e19e3b'
	}
};

const getRandomWord = async (word) => {
    fetch('https://wordsapiv1.p.rapidapi.com/words/?letters=5&random=true', options)
	.then(response => response.json())
	.then(response => {
         randomWord = response.word.toUpperCase().split("");

    })
	.catch(err => console.error(err));
};

getRandomWord();




  