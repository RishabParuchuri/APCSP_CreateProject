function TextChange(id) {
    if (id == "fill") {
        document.getElementById("fill").innerHTML = "Fill In The Blank";
    }
    else if (id == "cipher") {
        document.getElementById("cipher").innerHTML = "Decrypt The Cipher";
    }
    else if (id == "anagram") {
        document.getElementById("anagram").innerHTML = "Crack The Anagram";
    }
}

function TextChangeBack(id) {
    if (id == "fill") {
        document.getElementById("fill").innerHTML = "Fill In The _____";
    }
    else if (id == "cipher") {
        document.getElementById("cipher").innerHTML = "Decrypt The %#$*&";
    }
    else if (id == "anagram") {
        document.getElementById("anagram").innerHTML = "Crack The Nagamar";
    }
}

function RandomWord() {
    var wordList = ["basketball", "pizza", "virus", "gravity", "calender", "computer", "ladder"];
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function InitializeGame() {
    mistakes = 0;
    GameResult = document.getElementById("GameResult");
    Puzzle = document.getElementById("puzzle");
    newword = '';
}

function CheckWord() {
    var UserGuess = document.getElementById("userGuess").value.toLowerCase();
    if (UserGuess == puzzleWord) {
        GameResult.innerHTML = "Congratulations! You solved the puzzle!";
        document.getElementById("submitguess").removeAttribute("onclick");
        document.getElementById("startover").innerHTML = "Play Again";
    }
    else if (mistakes == puzzleWord.length - 1 || newword.replace(/[^-]/g, "").length == 1) {
        GameResult.innerHTML = "You lost...";
        document.getElementById("submitguess").removeAttribute("onclick");
        Puzzle.innerHTML = "Solve it: ".concat(puzzleWord);
    }
    else {
        mistakes += 1;
        GameResult.innerHTML = "Not quite, try again!";
        if (window.location.pathname == "/fill.html") {
            for (i = 0; i < puzzleWord.length; i++) {
                if (newword[i] == "-") {
                    newword = newword.substr(0, i).concat(puzzleWord[i], newword.substr(i + 1));
                    Puzzle.innerHTML = "Solve it: ".concat(newword);
                    break;
                }
            }
        }
        else if (window.location.pathname == "/cipher.html") {
            GameResult.innerHTML = GameResult.innerHTML.concat("</br>The shift key is ", cipherShift);
            GameResult.innerHTML = GameResult.innerHTML.concat("</br></br> (Hint: ".concat(puzzleWord.substr(0, mistakes) + ")"));
        }
        else {
            GameResult.innerHTML = GameResult.innerHTML.concat("</br></br> (Hint: ".concat(puzzleWord.substr(0, mistakes) + ")"));
        }
    }
    document.getElementById("userGuess").value = ''
}

function BlankOut(word) {
    randomIndex = [];
    for (i = 0; i < (word.length / 2); i++) {
        randomIndex.push(Math.floor(Math.random() * word.length));
    }
    newword = word
    for (i = 0; i < randomIndex.length; i++) {
        newword = newword.substr(0, randomIndex[i]).concat("-", newword.substr(randomIndex[i] + 1));
    }
    Puzzle.innerHTML = "Solve it: ".concat(newword);
}

function FillInTheBlank() {
    InitializeGame();
    puzzleWord = RandomWord();
    BlankOut(puzzleWord);

}

function DecryptCipher() {
    InitializeGame();
    puzzleWord = RandomWord();
    MakeCipher(puzzleWord)
}

function MakeCipher(word) {
    cipherShift = Math.floor((Math.random() * 25) + 1);
    asciiList = []
    cipher = ''
    for (i = 0; i < word.length; i++) {
        asciiList.push(word.charCodeAt(i))
    }

    for (i = 0; i < asciiList.length; i++) {
        if (asciiList[i] + cipherShift > 122) {
            asciiList[i] = ((asciiList[i] + cipherShift) - 122) + 96
        }
        else {
            asciiList[i] = asciiList[i] + cipherShift
        }
        cipher = cipher.concat(String.fromCharCode(asciiList[i]))
    }
    Puzzle.innerHTML = "Solve it: ".concat(cipher);
}

function CrackAnagram() {
    InitializeGame();
    puzzleWord = RandomWord();
    MakeAnagram(puzzleWord)
}

function MakeAnagram(word) {
    RandomNumberList(word)
    AssignCharacter(word, randomIndexList);
    if (anagram == word) {
        MakeAnagram(puzzleWord)
    }
    Puzzle.innerHTML = "Solve it: ".concat(anagram)
}

function AssignCharacter(word, numberList) {
    anagram = '';
    for (i = 0; i < word.length; i++) {
        anagram = anagram.concat(word[numberList[i]]);
    }
    return anagram
}

function RandomNumberList(anagramWord) {
    randomIndexList = []
    while (randomIndexList.length < anagramWord.length) {
        newNumber = Math.floor(Math.random() * anagramWord.length)
        if (randomIndexList.includes(newNumber)) {
            continue
        }
        else {
            randomIndexList.push(newNumber)
        }
    }
    return randomIndexList
}