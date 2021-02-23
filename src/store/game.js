
const RESET_GAME = 'RESET_GAME';
const ADD_MOVE = 'ADD_MOVE';
const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';
const SET_WINNER = 'SET_WINNER';

const emptyBoard = ["","","","","","","","",""];
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const resetGame = () => {
    return {
        type: RESET_GAME,
        emptyBoard
    }
}

const addMove = (player, boardIndex) => {
    return {
        type: ADD_MOVE,
        payload: {player, boardIndex}
    }
}

const setCurrentPlayer = (player) => {
    return {
        type: SET_CURRENT_PLAYER,
        player
    }
}

const setWinner = (winner) => {
    return {
        type: SET_WINNER,
        winner
    }
}


// Thunk
export const checkWinner = (currentPlayer, playerXPositions, playerOPositions) => {
    let gameIsWon = false;
    let currentPlayerPositions = currentPlayer === 'X' ? playerXPositions : playerOPositions;

    for (let i = 0; i < winningConditions.length; i++) {
        gameIsWon = winningConditions[i].every((element) => { 
            return currentPlayerPositions.indexOf(element) !== -1 
        })
        if (gameIsWon) return true;
    }
    return false;
};


let initialState = {
    board: emptyBoard,
    currentPlayer: 'X',
    playerXPositions: [],
    playerOPositions: [],
    winner: ""
}

// Reducer
export default function(state = initialState, action) {
    switch (action.type) {
        case RESET_GAME:
            return state;
        case SET_CURRENT_PLAYER:
            let newState = {...state};
            newState.currentPlayer = action.player
            return newState;    
        case ADD_MOVE:
            let newState = {...state}
            newState.board[action.payload.boardIndex] = action.payload.player;

            if (action.payload.player === 'X') {
                newState.playerXPositions.push(action.payload.boardIndex);
            } else {
                newState.playerOPositions.push(action.payload.boardIndex)
            }
            return newState;       
        case SET_WINNER: 
            return action.winner;
        default:
            return state;
    }
}
