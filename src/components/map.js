import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'

const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: '4%'
    },
    title: {
        color: 'white',
        textAlign: 'center'
    }
})

class Map extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render () {
    const { title } = this.props
    const { classes } = this.props

    return (
      <div>
        <h1 className={classes.title}>{title}</h1>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Map))
