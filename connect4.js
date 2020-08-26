for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const gridPosition = document.getElementById("row-" + i + "-column-" + j);
        //gridPosition.addEventListener("click", positionClick.bind(null, i, j));
    }
}

function resetClick(event) {
    console.log('clicked')
    document.getElementById("row-0-column-0").innerText = "❌"
}

// Bind the click event for the reset button.
const button0 = document.getElementById("button0");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const button5 = document.getElementById("button5");
const button6 = document.getElementById("button6");
button0.addEventListener("click", resetClick);
resetButton.addEventListener("click", resetClick);
resetButton.addEventListener("click", resetClick);
resetButton.addEventListener("click", resetClick);
resetButton.addEventListener("click", resetClick);