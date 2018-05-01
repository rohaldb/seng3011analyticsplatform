import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { Event } from 'material-ui-icons'
import _ from 'lodash'

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
          { _.map([1, 1, 1, 1, 1], (x, i) =>
            <VerticalTimelineElement
              key={i}
              className='vertical-timeline-element--work'
              date='2011 - present'
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<Event />}
    >
              <h3 className='vertical-timeline-element-title'>Event Title</h3>
              <h4 className='vertical-timeline-element-subtitle'>Miami, FL</h4>
              <p>
        Creative Direction, User Experience, Visual Design, Project Management, Team Leading
      </p>
            </VerticalTimelineElement>
          )}
        </VerticalTimeline>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Landing))
