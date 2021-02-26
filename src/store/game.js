const RESET_GAME = 'RESET_GAME';
const ADD_MOVE = 'ADD_MOVE';
const SET_NEXT_PLAYER = 'SET_NEXT_PLAYER';
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
export const resetGame = () => {
    console.log("RESETTING GAME")
    return {
        type: RESET_GAME,
        emptyBoard
    }
}
export const addMove = (currentPlayer, board, playerXPositions, playerOPositions) => {
    return {
        type: ADD_MOVE,
        payload: {currentPlayer, board, playerXPositions, playerOPositions}
    }
}
export const setNextPlayer = (currentPlayer) => {
    return {
        type: SET_NEXT_PLAYER,
        currentPlayer
    }
}
export const setWinner = (winner) => {
    return {
        type: SET_WINNER,
        payload: {winner}
    }
}
// Thunks
export const _checkWinner = (currentPlayer, playerXPositions, playerOPositions) => (dispatch) => {
    let gameIsWon = false;
    let currentPlayerPositions = currentPlayer === 'X' ? playerXPositions : playerOPositions;
    for (let i = 0; i < winningConditions.length; i++) {
        gameIsWon = winningConditions[i].every((element) => {
            return currentPlayerPositions.indexOf(element) !== -1
        })
        if (gameIsWon) {
            dispatch(setWinner(currentPlayer))
            break;
        };
    }
};
export const playTurn = (board, currentPlayer, boardIndex, playerXPositions, playerOPositions) => (dispatch) => {
    // makeMove: (currentPlayer, boardIndex) => dispatch(addMove(currentPlayer, boardIndex)),
     // make a copy of the board and update the appropriate value
        let newBoard = board;
     // update the board's value with the latest move
        newBoard[boardIndex] = currentPlayer
        if (currentPlayer === 'X') {
            playerXPositions.push(boardIndex);
        } else {
            playerOPositions.push(boardIndex);
        }
        // switch player
        let nextPlayer = currentPlayer === 'X' ? 'O' : 'X'
        dispatch(addMove(nextPlayer, newBoard, playerXPositions, playerOPositions));
       // dispatch(setNextPlayer(nextPlayer))
}
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
            return initialState;
        case SET_NEXT_PLAYER:
            return {...state,
                    currentPlayer: action.currentPlayer
                    }
        case ADD_MOVE:
            return {...state,
                    currentPlayer: action.payload.currentPlayer,
                    board: action.payload.board,
                    playerXPositions: action.payload.playerXPositions,
                    playerOPositions: action.payload.playerOPositions
                    }
        case SET_WINNER:
            return {...state,
                winner: action.payload.winner
            }
        default:
            return state;
    }
}