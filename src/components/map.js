import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Fade from 'material-ui/transitions/Fade'

const styles = theme => ({
  cardHeader: {
    background: 'linear-gradient(60deg, #ef5350, #e53935)'
  }
})

class Map extends React.Component {

  render () {
    const { title } = this.props
    const { classes } = this.props

    return (
      <Fade in timeout={500}>
        <Card>
          <CardHeader
            title='Global Impact'
            className={classes.cardHeader}
          />
          <CardContent>
            place heat map here
          </CardContent>
        </Card>
      </Fade>
    )
  }
}

export default withRoot(withStyles(styles)(Map))
