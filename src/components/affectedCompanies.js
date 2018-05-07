import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Card, { CardContent, CardHeader } from 'material-ui/Card'

const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: '4%'
    },
    name: {
        textAlign: 'center',
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
      <Card>
        <CardHeader title={name}/>
        <CardContent>
          Place brief company info here. Clicking on me should display a modal with full company info. @will
        </CardContent>
      </Card>
    )
  }
}

export default withRoot(withStyles(styles)(Companie))
