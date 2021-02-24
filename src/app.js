import React from 'react';
import { Grid } from '@material-ui/core'
import { render } from 'react-dom';
import { _checkWinner, playTurn, setNextPlayer, updateBoard } from './store/game'
import { connect } from 'react-redux';


class App extends React.Component {
  constructor (props) {
    console.log('constructor')
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
  }

// boardIndex should be in event somewhere
  handleClick(board, currentPlayer, boardIndex, playerXPositions, playerOPositions, winner) {
    this.props.makeMove(board, currentPlayer, boardIndex, playerXPositions, playerOPositions);
    this.props.checkWinner(currentPlayer, playerXPositions, playerOPositions);
    console.log('handleClick',this.state)


  }

  render() {
    if (this.state === null) 
      return <div></div>
    else {
      let { board, currentPlayer, playerXPositions, playerOPositions, winner } = this.state.game;
      // console.log('state in front', this.state.game)
      const { handleClick } = this;
      return (
        <div>
          <p> hello world! </p>                 
          <Grid container justify="center" spacing={3}>
            {board.map((value, boardIndex) => (
              <Grid key={boardIndex} onClick = {() => handleClick(board, currentPlayer, boardIndex, playerXPositions, playerOPositions, winner)}>
                {value} 
              </Grid>
            ))}
          </Grid>
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
      winner: state.winner
    }
}


function mapDispatchToProps(dispatch) {
  return {
    checkWinner: (currentPlayer, playerXPositions, playerOPositions) => dispatch(_checkWinner(currentPlayer, playerXPositions, playerOPositions)),
    makeMove: (board, currentPlayer, boardIndex, playerXPositions, playerOPositions) => dispatch(playTurn(board, currentPlayer, boardIndex, playerXPositions, playerOPositions)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
