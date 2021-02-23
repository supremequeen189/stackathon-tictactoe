import React from 'react';
import { Grid, Paper } from '@material-ui/core'



const App = () => {
  return (
    <div>
      <p>Hello World!</p>
      {/* <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >Hi!</Grid> */}
      <Grid container justify="center" spacing={3}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} >
              {value}
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

// const mapStateToProps = (state)=> {
//   return {
//       product: state.product
//   };
// };

export default App;
