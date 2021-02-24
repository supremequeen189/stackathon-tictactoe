import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';


/**
 * Assign player icons from material UI icons
 */
function playerIcon(player) {
    // There will only be 2 players: X and O
   return player === 'X' ? 'clear' : 'lens'; 

}


function styling(theme) {
    return {
        icon: {
            fontSize: '2em'
        }
    }
}

/**
 * Square component is a square on the board. It will be blank,
 * have an X, or have an O.
 */
class Square extends React.Component {
    constructor(props) {
        super(props) 

        }

        
        render() {
            let { player } = this.props;
            return (
                <Icon> {playerIcon(player)} </Icon>
                )
            }
    }

    export default withStyles(styling)(Square);




    




