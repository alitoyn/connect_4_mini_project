# API Plan
## Server Side
- manipulating game state
- win conditions
- creating game ids
- authentication?
- check state sent is valid and expected

## Client Side
- state of game 
- DOM manipulation
- user input (column, reset etc.)


## Endpoints - multi player
- POST /createRoom
- POST, GET /updateState
- PUT /joinRoom
- GET /userID

## Endpoints - single player
- POST /game/move (put token in column)
- GET /game/state
- POST /game/reset
