import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Events from '../eventData'
// import { Grid, Row, Col } from 'react-flexbox-grid'
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { EventSummary } from '../components'
import { Article } from '../components'
import { Companie } from '../components'
import { Stock } from '../components'
import { Map } from '../components'

const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: '4%'
    },
    paper: {
      padding: theme.spacing.unit * 2,
      color: theme.palette.text.secondary,
    }
})

class Event extends React.Component {

  render () {
    const { classes, eventID } = this.props
    const EventData = Events[eventID]

    return (

      <div className={classes.root}>
        <Grid container spacing={24}>
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
            <Paper className={classes.paper}>
                <Companie
                    name="Facebook"
                />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <Companie
                    name="Google"
                />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <Companie
                    name="Amazon"
                />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
                <Stock
                    title="stock title"
                />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
                <Map
                    title="Map title"
                />
            </Paper>
          </Grid>
          <Grid item xs={12}>
              <Paper className={classes.paper}>
                    <Article
                      title="Article 1"
                      body="body of article 1"
                      source="source of article 1"
                    />
              </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Article
                  title="Article 2"
                  body="body of article 2"
                  source="source of article 2"
                />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Article
                  title="Article 3"
                  body="body of article 3"
                  source="source of article 3"
                />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Event))
