const SET_COMPUTER_OPPONENT = 'SET_COMPUTER_OPPONENT';
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
const computer = "computer";
const human = "human"

export const setComputerOpponent = () => {
    return {
        type: SET_COMPUTER_OPPONENT,
        computer
    }
}

export const resetGame = () => {
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

//thunk for if we have a human or two people
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

//thunk for if computer plays turn
export const playComputerTurn = (board, playerXPositions, playerOPositions, winner) => (dispatch) => {
    if (winner !== "") return;
     //generate random move from computer
        let openSpaces = board.filter((x) => { return typeof x === 'number' });
        let randomSpace = Math.floor(Math.random() * openSpaces.length);
        let computerMove = openSpaces[ randomSpace ];

     //push computer move to playerOPositions 
        playerOPositions.push(computerMove);
    
    //update computer's move to the board
        let newBoard = board;
        newBoard[computerMove] = 'O';

        // switch player
        dispatch(addMove('X', newBoard, playerXPositions, playerOPositions));
}

let initialState = {
    opponentMode: human,
    board: emptyBoard,
    currentPlayer: 'X',
    playerXPositions: [],
    playerOPositions: [],
    winner: ""
}
// Reducer
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_COMPUTER_OPPONENT:
            return {...state,
                    opponentMode: computer
                    }
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