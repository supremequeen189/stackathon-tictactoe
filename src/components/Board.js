// import React from 'react';
// import { Grid, Paper } from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles';

// import { connect } from "react-redux";

// import Square from './Square';

// // Material UI Styling
// function styling(theme) {
//     return {
//     // what is square??????
//         square: {
//             height: 100,
//             width: 100,
//             lineHeight: '100px',
//             fontSize: '48px'
//         }
//     }


// }

// class Board extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//   }

//   componentDidMount() {

    
//   }

//   handleClick() {

//   }

//   render() {
//       // let { board } = this.props;
//       let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//     return (
//         <div>
//             <p> hello world! </p>
//           <Grid container>
//                {board.map((square, boardIndex) => {
//                    <Grid key={boardIndex} item xs={12} spacing = {3}>square</Grid>

//                 })}       
//           </Grid>
//         </div>
//       );
//   }
  
// }

// const mapStateToProps = (state)=> {
//   return state
// };

// // const mapDispatchToProps = (dispatch) => {
// //     return {
// //       bootstrap: () => {
// //         dispatch(loadProducts());
// //       },
// //       addNewCoffee(quantity, userId, coffeeId) {
// //         dispatch(addNewCoffee(quantity, userId, coffeeId));
// //       },
// //       updateStock(stock, coffeeId) {
// //         dispatch(updatedStock(stock, coffeeId));
// //       },
// //       putInGuestCart(obj) {
// //         dispatch(putInGuestCart(obj));
// //       },
// //     };
// //   };
  
// export default Board;


