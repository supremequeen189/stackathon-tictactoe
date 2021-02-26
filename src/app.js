import React from 'react';
import { Grid, Icon, Box, Button } from '@material-ui/core'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { _checkWinner, playTurn, resetGame, playComputerTurn, setComputerOpponent } from './store/game'
import { connect } from 'react-redux';


//Styling Fun
import Confetti from 'react-confetti'
import Snowfall from 'react-snowfall'
import ReactRain from 'react-rain-animation';
import "react-rain-animation/lib/style.css";


class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      game: {
        opponentMode: "human",
        board: [0,1,2,3,4,5,6,7,8],
        currentPlayer: 'X',
        playerXPositions: [],
        playerOPositions: [],
        winner: ""
      }
    }
    this.handleClick = this.handleClick.bind(this);
    this.showPlayerIcon = this.showPlayerIcon.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleComputerMode = this.handleComputerMode.bind(this);
    this.makeComputerMove = this.makeComputerMove.bind(this);
  }

  handleClick(board, currentPlayer, boardIndex, playerXPositions, playerOPositions, winner, opponentMode) {
    //check to make sure that that board space isn't already occupied
    if (typeof board[boardIndex] === 'number') {
      this.props.makeMove(board, this.props.currentPlayer, boardIndex, playerXPositions, playerOPositions);
      this.props.checkWinner(this.props.currentPlayer, playerXPositions, playerOPositions);
      console.log('handleClick state 1', this.state.winner)
    }
  }

  makeComputerMove(board, playerXPositions, playerOPositions, winner) {
    if (this.props.winner === "")  {
      this.props.computerMove(board, playerXPositions, playerOPositions, winner);
      this.props.checkWinner("O", playerXPositions, playerOPositions, winner);
    }
  }

  handleReset() {
    this.props.newGame();
    this.setState({
      game: {
        opponentMode: "human",
        board: [0,1,2,3,4,5,6,7,8],
        currentPlayer: 'X',
        playerXPositions: [],
        playerOPositions: [],
        winner: ""
      }
    })
  }

  handleComputerMode() {
    this.props.newGame();
    this.props.setComputer();
    this.setState({
      game: {
        opponentMode: "computer",
        board: [0,1,2,3,4,5,6,7,8],
        currentPlayer: 'X',
        playerXPositions: [],
        playerOPositions: [],
        winner: ""
      }
    })
  }

  showPlayerIcon(player) {
    switch (player) {
      case 'X':
        return 'clear' // X
      case 'O':
        return 'cloud_queue' // O
      default:
        return '';
    }
  }
  render() {
    if (this.state === null)
      return <div></div>
    else {  
      let { opponentMode, board, currentPlayer, playerXPositions, playerOPositions} = this.state.game;
      let winner = this.props.winner;
      console.log('props front end', opponentMode);
      const { handleClick, showPlayerIcon, handleReset, handleComputerMode, makeComputerMove } = this;
      // Computer move
      // make sure it's not the first move & we want the computer to move
      if (winner === "" && playerXPositions.length > playerOPositions.length && opponentMode === "computer") {
        makeComputerMove(board, playerXPositions, playerOPositions, winner)
      }

      return (
          <div className = 'app'>
            
            <h1>Let's Play Some Tic Tac Toe!</h1>
 
            {winner === "" ? <Snowfall /> : () => {}}

            <div className = 'grid-row'>
            <Grid id="top-row" container justify="center" spacing={1} style = {{ maxWidth: "700px"}}>
              {
                board.slice(0,3).map((value, boardIndex) => (
                    <Grid
                        key = {boardIndex}
                        item xs={3}
                        onClick = {winner === "" ? () => handleClick(board, currentPlayer, boardIndex, playerXPositions, playerOPositions, winner, opponentMode) : () => {}}
                    >
                      {
                        (value === 'X' || value === 'O')
                            ?
                            <Box textAlign="center" border = {1} height = {150}>
                              <Icon style={{ fontSize: 150 }}>{ showPlayerIcon(value) }</Icon>
                            </Box>
                            :
                            <Box fontSize={140} textAlign = "center" border = {1} height= {150}>{""}</Box>
                      }
                    </Grid>
                ))
              }
            </Grid>
  
            <Grid id="second-row" container justify="center" spacing={1} style = {{ maxWidth: "700px"}}>
              {
                board.slice(3,6).map((value, boardIndex) => (
                    <Grid
                        key = {boardIndex+3}
                        item xs={3}
                        onClick = {winner === "" ? () => handleClick(board, currentPlayer, boardIndex+3, playerXPositions, playerOPositions, winner, opponentMode) : () => {}}
                    >
                      {
                        (value === 'X' || value === 'O')
                            ?
                            <Box textAlign="center" border = {1} height = {150}>
                              <Icon style={{ fontSize: 150 }}>{ showPlayerIcon(value) }</Icon>
                            </Box>
                            :
                            <Box fontSize={140} textAlign = "center" border = {1} height= {150}>{""}</Box>
                      }
                    </Grid>
                ))
              }
            </Grid>


            <Grid id="third-row" container justify="center" spacing={1} style = {{ maxWidth: "700px"}}>
              {
                board.slice(6).map((value, boardIndex) => (
                    <Grid
                        key = {boardIndex+6}
                        item xs={3}
                        onClick = {winner === "" ? () => handleClick(board, currentPlayer, boardIndex+6, playerXPositions, playerOPositions, winner, opponentMode) : () => {}}
                    >
                      {
                        (value === 'X' || value === 'O')
                            ?
                            <Box textAlign="center" border = {1} height = {150}>
                              <Icon style={{ fontSize: 150 }}>{ showPlayerIcon(value) }</Icon>
                            </Box>
                            :
                            <Box fontSize={140} textAlign = "center" border = {1} height= {150}>{""}</Box>
                      }
                    </Grid>
                ))
              }
            </Grid>
            <br />
            </div>
            <br />

            <div className = "button">
              <Button className = "coolbuttonone" variant="contained" onClick={() => handleReset()}>Reset Game</Button>
            </div>
              <br />
            <div className = "coolbuttontwo">
              <Button className = "coolbuttontwo" variant="contained" onClick={() => handleComputerMode()}>Start Game with Computer</Button>
            </div>

              {(winner === "X" || (winner === "O" && opponentMode === "human" )) ?
                  <div>
                  {NotificationManager.success(
                      `Player ${winner} has triumphed!`,
                      "Wooohooo, we have a winner!",
                      5000
                  )} 
                  <Confetti
                  width={5000} numberOfPieces={400} gravity={0.4}
                  height={5000}
                />
                  </div>
                  : () => {}
              }
              <NotificationContainer/>

              {(opponentMode === "computer" && winner === "O") ?
                <div>
                  {NotificationManager.success(
                    `The computer has triumphed!`,
                    "Sadness, you lost!",
                    5000
                  )}
                  <ReactRain numDrops="500" /> 
                  </div>
                : ()=>{}
              }
          </div>
      );
    }
  }
};
function mapStateToProps(state) {
    return {
      board: state.game.board,
      currentPlayer: state.game.currentPlayer,
      playerXPositions: state.game.playerXPositions,
      playerOPositions: state.game.playerOPositions,
      winner: state.game.winner
    }
}
function mapDispatchToProps(dispatch) {
  return {
    computerMove: (board, playerXPositions, playerOPositions, winner) => dispatch(playComputerTurn(board, playerXPositions, playerOPositions, winner)),
    checkWinner: (currentPlayer, playerXPositions, playerOPositions) => dispatch(_checkWinner(currentPlayer, playerXPositions, playerOPositions)),
    makeMove: (board, currentPlayer, boardIndex, playerXPositions, playerOPositions) => dispatch(playTurn(board, currentPlayer, boardIndex, playerXPositions, playerOPositions)),
    newGame: () => dispatch(resetGame()),
    setComputer: () => dispatch(setComputerOpponent()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);