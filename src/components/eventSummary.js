import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'

const styles = theme => ({
})

class EventSummary extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start_date: PropTypes.number.isRequired,
    end_date: PropTypes.number.isRequired,
  }

  render () {
    const { name, description, start_date, end_date } = this.props

    return (
      <div>
        <h1>{name}</h1>
        <h3>{description}</h3>
        <h3>start: {start_date}</h3>
        <h3>end: {end_date}</h3>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(EventSummary))
