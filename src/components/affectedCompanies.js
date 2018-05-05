import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'

const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: '4%'
    },
    name: {
        color: 'white',
        marginBottom: '0'
    }
})

class Companie extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  render () {
    const { name } = this.props
    const { classes, eventID } = this.props

    return (
      <div>
        <h1 className={classes.name}>{this.props.name}</h1>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Companie))
