import React from 'react';
import { Grid, Icon, Box, Button } from '@material-ui/core'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { _checkWinner, playTurn, resetGame, playComputerTurn } from './store/game'
import { connect } from 'react-redux';
class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      game: {
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
  }
  handleClick(board, currentPlayer, boardIndex, playerXPositions, playerOPositions, winner) {
    //check to make sure that that board space isn't already occupied
    if (typeof board[boardIndex] === 'number') {
      this.props.makeMove(board, this.props.currentPlayer, boardIndex, playerXPositions, playerOPositions);
      this.props.checkWinner(this.props.currentPlayer, playerXPositions, playerOPositions);
      console.log('handleClick state 1', this.state.winner)

      if (this.props.winner === "")  {
        this.props.computerMove(board, playerXPositions, playerOPositions, winner);
        this.props.checkWinner("O", playerXPositions, playerOPositions);
        console.log('handleClick state 2', this.state.winner)
      }
      
    }
    

  }
  handleReset() {
    this.props.newGame();
    this.setState({
      game: {
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
        return 'radio_button_unchecked' // O
      default:
        return '';
    }
  }
  render() {
    if (this.state === null)
      return <div></div>
    else {
      let { board, currentPlayer, playerXPositions, playerOPositions} = this.state.game;
      let winner = this.props.winner;
      console.log('props front end', this.props);
      const { handleClick, showPlayerIcon, handleReset} = this;
      return (
          <div>
            <h1>Let's Play Some Tic Tac Toe!</h1>
            <Grid id="top-row" container justify="center" spacing={1} style = {{ maxWidth: "700px"}}>
              {
                board.slice(0,3).map((value, boardIndex) => (
                    <Grid
                        key = {boardIndex}
                        item xs={3}
                        onClick = {winner === "" ? () => handleClick(board, currentPlayer, boardIndex, playerXPositions, playerOPositions, winner) : () => {}}
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
                        onClick = {winner === "" ? () => handleClick(board, currentPlayer, boardIndex+3, playerXPositions, playerOPositions, winner) : () => {}}
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
                        onClick = {winner === "" ? () => handleClick(board, currentPlayer, boardIndex+6, playerXPositions, playerOPositions, winner) : () => {}}
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
            <Button variant="contained" onClick={() => handleReset()}>Reset Game</Button>
              {(winner === "X" || winner === "O") ?
                  NotificationManager.success(
                      `Player ${winner} has triumphed!`,
                      "Congratulations, we have a winner!",
                      5000
                  ) : () => {}
              }
              <NotificationContainer/>
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
    newGame: () => dispatch(resetGame())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);