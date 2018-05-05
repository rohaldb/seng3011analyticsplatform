import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Events from '../eventData'
// import { Grid, Row, Col } from 'react-flexbox-grid'
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { EventSummary } from '../components'

const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: '4%'
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
})

class Event extends React.Component {

  render () {
    const { classes, eventID } = this.props
    const EventData = Events[eventID]

    return (

      <div className={classes.root}>
        <Grid fluid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
                  <EventSummary
                    name={EventData.name}
                    description={EventData.description}
                    start_date={EventData.start_date}
                    end_date={EventData.end_date}
                  />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>Companie 1</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>Companie 2</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>Companie 3</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>Stocks</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>Heat Map</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Article 1</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Article 2</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Article 3</Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Event))
