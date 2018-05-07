import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Fade from 'material-ui/transitions/Fade'

const styles = theme => ({
  cardHeader: {
    background: 'linear-gradient(60deg, #ab47bc , #790e8b)'
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
      <Fade in timeout={500}>
        <Card>
          <CardHeader
            title={name}
            className={classes.cardHeader}
          />
          <CardContent>
            <Typography variant="subheading">
              {description}
            </Typography>
            <Typography variant="body2">
              Date: {start_date} - {end_date}
            </Typography>
          </CardContent>
        </Card>
      </Fade>
    )
  }
}

export default withRoot(withStyles(styles)(EventSummary))
