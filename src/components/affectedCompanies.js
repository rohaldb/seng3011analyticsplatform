import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Fade from 'material-ui/transitions/Fade'

const styles = theme => ({
  cardHeader: {
    background: 'linear-gradient(60deg, #26c6da, #00acc1)'
  }
})

class Companie extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  render () {
    const { name } = this.props
    const { classes } = this.props

    return (
      <Fade in timeout={500}>
        <Card>
          <CardHeader title={name} className={classes.cardHeader}/>
          <CardContent>
            Place brief company info here. Clicking on me should display a modal with full company info. @will
          </CardContent>
        </Card>
      </Fade>
    )
  }
}

export default withRoot(withStyles(styles)(Companie))
