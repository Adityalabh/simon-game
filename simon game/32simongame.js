
let gameseq = [];
let userseq = [];

let btns = ["red", "orange", "green", "purple"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (!started) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    sounds[btn.id].play();
    setTimeout(function() {
        btn.classList.remove("flash");
        sounds[btn.id].play();
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    sounds[btn.id].play()
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 700);
}

async function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameseq.push(randColor);
    console.log(gameseq);

    for (let i = 0; i < gameseq.length; i++) {
        let color = gameseq[i];
        let btn = document.querySelector(`.${color}`);
        await new Promise(resolve => {
            setTimeout(() => {
                gameFlash(btn);
                sounds[color].play(); 
                resolve();
            }, 350 * i);
        });
    }
}

let allBtns = document.querySelectorAll(".box");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length - 1);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
            if (level > highestScore) {
                highestScore = level;
            }
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key to start.`;
        document.body.style.backgroundColor = "red";
        document.addEventListener("keypress", resetTo); // Changed from 'keydown' to 'keypress' to match the start event
    }
}

function resetTo() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    document.body.style.backgroundColor = "white";
    document.removeEventListener("keypress", resetTo); // Remove the event listener
    console.log("The highest score is: " + highestScore);
}

let sounds = {
    red: new Audio('simon_sound.mp3'),
    orange: new Audio('simon_sound.mp3'),
    green: new Audio('simon_sound.mp3'),
    purple: new Audio('simon_sound.mp3')
};