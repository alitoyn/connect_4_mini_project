# Connect 4 Mini Project
This project is a recreation of connect 4 for the Infinity Works Academy

The server controls all of the game data and serves it to the front end.
When the user presses a button, the front end must request a new game state from the server.

# API Endpoints

## `/`
### GET
An example implementation of a front end linked to the Connect 4 API can be found here

## `/info`
### GET
This will return some welcome text to confirm the server is running

## `/login`
### POST 
On successful login, a game state object will be returned holding the data associated with the user.  
If a username is sent that doesn't exist, a new user will be created using the given password.
```javascript
// Request
{
    "username": "coolusername123",
    "password": "SuperSecurePassword"
}

// Response
{
    "board": ['...large array of arrays...'],
    "name": "coolusername123",
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
When called, this endpoint resets the current game in progress. A game state object will be returned with an empty board and the winner/draw keys set to `false`. This will be similar to the above example.

## `/reset-scores`
### GET
When called, this endpoint resets the current game as well as the accumulated scores for both players.

## `/move`
### POST
This endpoint should be passed a body containing the column the user would like to place a token. If the request is valid an updated game state will be returned (similar to above), if not an error code will be returned.

#### Example Body
```javascript
{
    "button": "0" // up to the number of columns in play
}
```
## `/move` - Endpoint Errors  
**Out of range**  
If the value for `"button"` is out of range for the current board, a `406` error will be returned with the message:  
`The selected column is out of range `

**Column is full**  
If the column selected is full, a `406` error will be returned with the message:  
`The selected column is full`

**There is already a winner**  
If a user is attempting to place a token after there is already a winner, a `406` error will be returned with the message:  
`There is a winner, please reset the game`

