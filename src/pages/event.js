import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Events from '../eventData'

const styles = theme => ({
  root: {}
})

class Event extends React.Component {

  render () {
    const { classes, eventID } = this.props
    const EventData = Events[eventID]

    return (
      <div className={classes.root}>
        <h1>{EventData.name}</h1>
        <h3>{EventData.description}</h3>
        <h3>start: {EventData.start_date}</h3>
        <h3>end: {EventData.end_date}</h3>
        <h3>related companies: {EventData.related_companies.join(', ')}</h3>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Event))
