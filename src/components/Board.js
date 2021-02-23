import React from 'react';
import { Grid, Paper } from '@material-ui/core'

import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {

    
  }

  handleClick() {

  }

  render() {
    return (
        <div>
          <p>Hello World!</p>
    
          <Grid container justify="center" spacing={3}>
              {[0, 1, 2].map((value) => (
                <Grid key={value} >
                  {value}
                </Grid>
              ))}
          </Grid>
        </div>
      );
  }
  
}

const mapStateToProps = (state)=> {
  return state
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//       bootstrap: () => {
//         dispatch(loadProducts());
//       },
//       addNewCoffee(quantity, userId, coffeeId) {
//         dispatch(addNewCoffee(quantity, userId, coffeeId));
//       },
//       updateStock(stock, coffeeId) {
//         dispatch(updatedStock(stock, coffeeId));
//       },
//       putInGuestCart(obj) {
//         dispatch(putInGuestCart(obj));
//       },
//     };
//   };
  
export default connect(mapStateToProps, mapDispatchToProps)(Board);


