
let gamePattern = [];
let userClickedPattern = []; 
const buttonColours = ["red", "blue", "green", "yellow"];
const buttons = document.querySelectorAll(".btn")
const h1 = document.querySelector("#level-title")
let level = 0
document.addEventListener("keypress", handleKeypress) 


function nextSequence() {
    
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    
    const randButtonColour = document.querySelector(`#${randomChosenColour}`)
    /* These animations automatically chain onto one another. */
    Velocity(randButtonColour, { opacity: 0.2 }, 100);
    Velocity(randButtonColour, { opacity: 1 }, 100);
    playSound(randomChosenColour);
    level ++
    h1.innerText = `Level ${level}`
    userClickedPattern = [];
}


function handleKeypress () {
    nextSequence();
    document.removeEventListener("keypress", handleKeypress)
}

function startOver() {
    document.addEventListener("keypress", handleKeypress)
    level = 0
    gamePattern = []; 
}


for(let i=0; i< buttons.length; i++) {
    buttons[i].onclick = function () {
        const userChosenColour = this.id
        userClickedPattern.push(userChosenColour)
        playSound(userChosenColour)
        animatePress(userChosenColour)
        checkAnswer(userClickedPattern.length - 1)
    } 
}


function playSound(name) {
    new Audio (`sounds/${name}.mp3`).play()
}

function animatePress(currentColour) {
    let button = document.querySelector(`#${currentColour}`)
    button.classList.add("pressed")
    setTimeout(() => (button.classList.remove("pressed")), 100)
}

function checkAnswer(currentlevel) {
    if(userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => (nextSequence()), 1000)   
        }
    } else {
        playSound("wrong")
        document.body.classList.add("game-over")
        setTimeout(()=> (document.body.classList.remove("game-over")), 200)
        h1.innerText = `Game Over, Press Any Key to Restart`
        startOver();
    }
}











