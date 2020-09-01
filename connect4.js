const rows = 6;
const cols = 7;
let connectN = 4;
let playerCount = 0;
const grid = $("grid")
let winner = false;

//. grid initialiser
for (let i = 0; i < rows; i++) {
    elementID_row = "row-" + i

    $('#grid').prepend(
        $("<div></div>")
        .addClass("row")
        .attr('id', elementID_row)
    )

    for (let j = 0; j < cols; j++) {
        elementID_col = "row-" + i + "-column-" + j
        $('#' + elementID_row).append(
            $('<div></div>')
            .addClass("col-1")
            .attr('id', elementID_col)
        )
    }
}

// setup
let board = getBoard()

for (let i = 0; i < cols; i++) {
    let button = document.createElement("button")
    button.id = "button" + i
    button.className = "btn btn-primary btn-lg"
        // button.innerText = "🖖"
    document.getElementById("button-row").appendChild(button)

}

updateHTML(board)

for (i = 0; i < cols; i++) {
    let button_grab = document.getElementById("button" + i);
    button_grab.addEventListener("click", buttonClick);

}

const reset = document.getElementById("reset");
reset.addEventListener("click", buttonClick);