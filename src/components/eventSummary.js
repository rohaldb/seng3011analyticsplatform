import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'

const styles = theme => ({
    name: {
        color: 'white',
        marginBottom: '0'
    },
    description: {
        marginTop: '0'
    },
    date: {
        fontSize: '80%'
    }
})

class EventSummary extends React.Component {



  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
  }

  render () {
    const { name, description, start_date, end_date } = this.props
    const { classes } = this.props

    return (
      <div>
        <h1 className={classes.name} >{name}</h1>
        <h3 className={classes.description} >{description}</h3>
        <h3 className={classes.date}>Date: {start_date} - {end_date}</h3>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(EventSummary))
