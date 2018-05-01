import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { Event } from 'material-ui-icons'
import _ from 'lodash'
import Events from '../eventData'
import { Link } from 'react-router-dom'
import moment from 'moment'

const styles = theme => ({
  root: {
    // need to fix the background
    backgroundColor: '#eee'
  }
})

class Landing extends React.Component {

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <VerticalTimeline>
          { _.map(_.keys(Events), (k, i) =>
            <VerticalTimelineElement
              key={i}
              className='vertical-timeline-element--work'
              date={`${moment(Events[k].start_date).format('DD MMM YY')} - ${moment(Events[k].end_date).format('DD MMM YY')}`}
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<Event />}
          >
              <Link to={`/event/${k}`}>
                <h3 className='vertical-timeline-element-title'>{Events[k].name}</h3>
              </Link>
              <p>{Events[k].description}</p>
            </VerticalTimelineElement>
          )}
        </VerticalTimeline>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Landing))
