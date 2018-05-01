import React from 'react'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'

const styles = theme => ({
  root: {
    textAlign: 'center'
  }
})

class Index extends React.Component {

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography variant='display1' gutterBottom>
          Material-UI
        </Typography>
        <Typography variant='subheading' gutterBottom>
          example project
        </Typography>
        <Button variant='raised' color='secondary' onClick={this.handleClick}>
          Super Secret Password
        </Button>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Index))
