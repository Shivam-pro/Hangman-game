const hint_text = document.querySelector(".hint-text");
const correct = document.querySelectorAll(".correct");
const words = document.querySelector(".words");
const letter = document.querySelectorAll(".letter");
const alphabets = document.querySelectorAll(".alphabets");
const game_items = document.querySelector(".game-items");
const value = document.querySelector(".value");
const game_lose = document.querySelector(".game-lose");
const game_win = document.querySelector(".game-win");
const image = document.querySelector(".hang-image");

let Word = "";
let Hint = "";
let incorrect = 0;
let eventListenerAdded = false;

function game_content() {
    let randnum = Math.floor(Math.random() * 65);
    let html = `<div class="letter"></div>`;
    Word = wordList[randnum].word;
    Hint = wordList[randnum].hint;
    hint_text.innerHTML = Hint;
    words.innerHTML = "";
    Array.from(correct).forEach(element => {
        element.innerHTML = Word;
    });
    for (let i = 0; i < Word.length; i++) {
        words.innerHTML += html;
    }
    console.log(Word);
    console.log(Hint);
    if (!eventListenerAdded) {
        run_game();
        eventListenerAdded = true;
    }
}

function run_game() {
    game_items.addEventListener("click", (e) => {
        if (e.target.classList.contains("alphabets")) {
            e.target.style.backgroundColor = "rgb(14 14 174 / 40%)";
            let index = [];
            let guess = "";
            for (let i = 0; i < Word.length; i++) {
                if (e.target.innerHTML.toLowerCase() === Word[i].toLowerCase()) {
                    index.push(i);
                }
            }
            for (let i = 0; i < index.length; i++) {
                words.children[index[i]].innerHTML = e.target.innerHTML;
            }
            for (let i = 0; i < Word.length; i++) {
                guess += words.children[i].innerHTML;
            }
            if (!index.length) {
                incorrect++;
                value.innerHTML = incorrect;
                image.src = `images/hangman-${incorrect}.svg`
            }
            if (incorrect == 6) {
                lose();
            }
            if (guess.toLowerCase() === Word.toLowerCase()) {
                win();
            }
        }
    });
}

function lose() {
    game_lose.style.display = "flex";
}

function win() {
    game_win.style.display = "flex";
}

game_content();

function play() {
    game_lose.style.display = "none";
    game_win.style.display = "none";
    Word = "";
    Hint = "";
    incorrect = 0;
    words.innerHTML = "";
    value.innerHTML = incorrect;
    image.src = "images/hangman-0.svg"
    Array.from(alphabets).forEach(ele => {
        ele.style.backgroundColor = "rgb(14 14 174 / 68%)";
    });
    game_content();
}
