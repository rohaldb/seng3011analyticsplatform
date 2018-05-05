import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Events from '../eventData'
// import { Grid, Row, Col } from 'react-flexbox-grid'
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { EventSummary, Article, Company, Stock, Map } from '../components'
import moment from 'moment'

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
                    start_date={`${moment(EventData.start_date).format('DD MMM YY')}`}
                    end_date={`${moment(EventData.end_date).format('DD MMM YY')}`}
                  />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <Company
                    name="Facebook"
                />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <Company
                    name="Google"
                />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <Company
                    name="Amazon"
                />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
                <Stock
                    title="Stock"
                />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
                <Map
                    title="Map"
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
