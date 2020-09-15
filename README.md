# Connect 4 Mini Project
This project is a recreation of connect 4 for the Infinity Works Academy

The server controls all of the game data and serves it to the front end.
When the user presses a button, the front end must request a new game state from the server.

# API Endpoints

## `/info`
### GET
This will return some welcome text to confirm the server is running

## `/state`
### GET 
This returns the current state of the game as a JSON object. 
```javascript
{
    "board": ['...large array of arrays...'],
    "rows": 6,
    "cols": 7,
    "turnCount": 0,
    "winner": false,
    "draw": false,
    "winCondition": 4,
    "player1Score": 0,
    "player2Score": 0
}
```
## `/reset`
### GET
This endpoint should be called when the user wants to reset the game. A gamestate will be returned with a blank board and the winner/draw keys set to `false`. This will be similar to the above example.


## `/move`
### POST
This endpoint should be passed a body containing the column the user would like to place a token. If the request is valid an updated game state will be returned (similar to above), if not an error code will be sent.

#### Example Body
```javascript
{
    "button": "0" // up to the number of columns in play
}
```
## `/move` Endpoint Errors  
**Out of range**  
If the value for ```"button"``` is out of range for the current board, a ```406``` error will be returned with the message:  
```The selected column is out of range ```

**Column is full**  
If the column selected by the user is full, a ```406``` error will be returned with the message:  
`The selected column is full`

**There is already a winner**  
If a user is attempting to place a token after there is already a winner, a `406` error will be returned with the message:  
`There is a winner, please reset the game`

