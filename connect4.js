for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 7; j++) {
        document.getElementById("row-" + i + "-column-" + j).innerText = "🔵"
    }
}

document.getElementById('main').style = ''

function resetClick(event, col) {
    console.log('clicked')
    document.getElementById("row-0-column-0").innerText = "🟣"
}

function resetClick1(event, col) {
    console.log('clicked')
    document.getElementById("row-0-column-1").innerText = "🟣"
}

function resetClick2(event, col) {
    console.log('clicked')
    document.getElementById("row-0-column-2").innerText = "🟣"
}

function resetClick3(event, col) {
    console.log('clicked')
    document.getElementById("row-0-column-3").innerText = "🟣"
}

function resetClick4(event, col) {
    console.log('clicked')
    document.getElementById("row-0-column-4").innerText = "🟣"
}

function resetClick5(event, col) {
    console.log('clicked')
    document.getElementById("row-0-column-5").innerText = "🟣"
}

function resetClick6(event, col) {
    console.log('clicked')
    document.getElementById("row-0-column-6").innerText = "🟣"
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
button1.addEventListener("click", resetClick1);
button2.addEventListener("click", resetClick2);
button3.addEventListener("click", resetClick3);
button4.addEventListener("click", resetClick4);
button5.addEventListener("click", resetClick5);
button6.addEventListener("click", resetClick6);