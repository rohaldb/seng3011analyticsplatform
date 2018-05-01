import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'

const styles = theme => ({
  root: {}
})

class Event extends React.Component {

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <h1>This is an events page with id { this.props.eventID }</h1>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Event))
