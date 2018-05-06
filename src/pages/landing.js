import React from 'react'
import withRoot from '../withRoot'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { Event } from 'material-ui-icons'
import _ from 'lodash'
import Events from '../eventData'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Grid, Chip, Typography, withStyles } from 'material-ui'
import { getDate } from '../time'

const styles = theme => ({
  root: {
    // need to fix the background
    backgroundColor: 'rgb(227,227,227)',
    minHeight: '100vh'
  },
  chip: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontSize: ''
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      textDecorationColor: 'black'
    }
  },
  title: {
    color: theme.palette.primary.main,
    marginTop: '1em'
  },
  subTitle: {
    color: theme.palette.secondary.main
  }
})

const bgCols = [
  'rgb(33, 150, 243)',
  'rgb(233, 30, 99)',
  '#4caf50',
  '#ff5722',
  '#ab47bc'
]

class Landing extends React.Component {

  constructor(props) {
    super(props)
    document.getElementById('global').style.overflow = 'scroll'
  }

  render () {
    const { classes } = this.props
    document.title = 'EventStock'

    return (
      <Grid container direction='column' className={classes.root}>
        <Grid item container justify='center' direction='row'>
          <Grid item xs={8}>
            <Grid container alignItems='center' direction='column'>
              <Grid item>
                <Typography variant='display3' gutterBottom className={classes.title}>
                  EventStock
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='subheading' gutterBottom className={classes.subTitle}>
                  This is where a website summary can go. We can put any info a user may want to see on arrival
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction='row'>
          <Grid item xs={12}>
            <VerticalTimeline>
              { _.map(_.keys(Events), (k, i) =>
                <VerticalTimelineElement
                  key={i}
                  className='vertical-timeline-element--work'
                  date={`${moment(Events[k].start_date * 1000).format('DD MMM YY')} - ${getDate(Events[k].end_date)}`}
                  iconStyle={{ background: bgCols[i % bgCols.length], color: '#fff' }}
                  icon={<Event />}
              >
                  <Link to={`event/${k}`} className={classes.link}>
                    <Typography variant='title' className='vertical-timeline-element-title' gutterBottom>
                      {Events[k].name}
                    </Typography>
                  </Link>
                  <Typography gutterBottom>
                    {Events[k].description}
                  </Typography>
                  <div>
                    {_.map(Events[k].related_companies, (c, i) =>
                      <Chip label={i} className={classes.chip} key={c} />
                )}
                  </div>
                </VerticalTimelineElement>
              )}
            </VerticalTimeline>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withRoot(withStyles(styles)(Landing))
