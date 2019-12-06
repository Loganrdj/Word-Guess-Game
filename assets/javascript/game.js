var arrAnswers = ["Rocket League", "Sea of Thieves", "Call of Duty", "League of Legends", "Teamfight Tactics", "Dota", "Starcraft", "World of Warcraft", "Fortnite", "Minecraft", "Grand Theft Auto", "HearthStone", "Counter Strike", "FIFA", "Pokemon", "Escape From Tarkov", "Rust", "DayZ", "Poker", "Payday", "Diablo", "Black Desert Online", "Monster Hunter", "Celeste", "Gang Beasts", "PUBG", "Halo"];
var userGuessArr = [];
var totalguesses = 0;
var guesscounter = 4;
var tempAnswer = arrAnswers[Math.floor(Math.random()*arrAnswers.length)];
var tempAnswerArr = [];
var blankAnswerArr = [];

/* this adds the answer in its entirety into an array and changes it to lowercase for testing */
for (let i = 0; i < tempAnswer.length; i++){
    tempAnswerArr.push(tempAnswer.charAt(i).toLowerCase());
}

/* this function validates whether or not the user is pressing a valid key */
function checkKey(keypress){
    var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    if(alphabet.includes(keypress)){
        return true;
    } else {
        return false;
    }
}

/* this function takes the array and replaces the letters with underscores and spaces */
function setBlanks(arr1,arr2){
    for(let i = 0; i < arr1.length; i++){
        if(arr1[i] != " "){
            arr2[i] = "_";
        } else {
            arr2[i] = " ";
        }
    }
}

/* 
This was an attempt to get the reset function without reloading the webpage—but failed
function resetGame(tempAnswer, totalguesses, guesscounter, userGuessArr, blankAnswerArr, tempAnswerArr){
    var tempAnswer = arrAnswers[Math.floor(Math.random()*arrAnswers.length)];
    console.log(tempAnswer);
    tempAnswerArr = [];
    for (let i = 0; i < tempAnswer.length; i++){
        tempAnswerArr.push(tempAnswer.charAt(i).toLowerCase());
    }
    var blankAnswerArr = [];
    var totalguesses = 0;
    var guesscounter = 4;
    var userGuessArr = [];
    setBlanks(tempAnswerArr,blankAnswerArr);
    console.log(blankAnswerArr);
    document.getElementById("guesscount").innerHTML = "You have " + guesscounter + " guesses remaining!";   
    document.getElementById("userguess").innerHTML = "[" + userGuessArr + "]";  //Add incorrect letter to array
    document.getElementById("answer").innerHTML = blankAnswerArr.toString();
}
*/


document.onkeyup = function(event) {
    
    //Assign user's guess into a variable
    var userGuess = event.key;

    // Check to see if a user has pressed a button to start the game
    if(event.key && (checkKey(event.key) == true) && totalguesses == 0){
        
        //Remove blinking button
        document.getElementById("blinking").style.visibility = "hidden";

        //Set answer to blanks && use let to utilize scope
        setBlanks(tempAnswerArr,blankAnswerArr);


        // var tempDisplay = blankAnswerArr.toString()

        var tempDisplay = blankAnswerArr.toString().replace(/ /g, "&nbsp");

        document.getElementById("answer").innerHTML = tempDisplay.toString().replace(/,/g, " ");
        // console.log(tempDisplay.toString().replace(/,/g, " "));
        // console.log(blankAnswerArr.toString());


        //Total guesses is used to get rid of the blinking as well as count the first guess attempt as starting the game
        totalguesses += 1;

    } else if(event.key && (checkKey(event.key) == true) && totalguesses != 0){
        /* If guess is RIGHT ------------------- */
        if(tempAnswerArr.includes(userGuess)){ 
            var tempLetterArray = [];
            for(let i = 0; i < tempAnswerArr.length; i++){
                if(userGuess == tempAnswerArr[i]){
                    tempLetterArray.push(i);
                }
            }

            for(let j = 0; j < tempLetterArray.length; j++){
                blankAnswerArr[tempLetterArray[j]] = userGuess;
            }

            var tempDisplay = blankAnswerArr.toString().replace(/ /g, "&nbsp");
            document.getElementById("answer").innerHTML = tempDisplay.toString().replace(/,/g, " "); //Outputs the wording to the homepage

            if (!blankAnswerArr.includes("_")){
                alert("Congratulations! You've figured out this game! The Answer was " + tempAnswer);
                // resetGame(tempAnswer, totalguesses, guesscounter, userGuessArr, blankAnswerArr, tempAnswerArr)
                location.reload(true);
            }
        }

        /* If guess is WRONG -------------------- */
        else if (!userGuessArr.includes(userGuess)){
            userGuessArr.push(userGuess);                                               //Add user's guess to array
            guesscounter -= 1;                                                          //Subtract 1 point from user's remaining guesses and update user
            document.getElementById("guesscount").innerHTML = "You have " + guesscounter + " guesses remaining!";   
            document.getElementById("userguess").innerHTML = "[" + userGuessArr + "]";  //Add incorrect letter to array

            if(guesscounter < 0){ //Check to see if user has lost game
                alert("You have lost this game! The correct answer was " + tempAnswer);
                // resetGame(tempAnswer, totalguesses, guesscounter, userGuessArr, blankAnswerArr, tempAnswerArr)
                location.reload(true);
            }
        } 
    }
}




