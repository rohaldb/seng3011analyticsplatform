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
        marginBottom: '0'
    },
    body: {
        marginTop: '1px'
    }
})

class Article extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }

  render () {
    const { title, body, source } = this.props
    const { classes, eventID } = this.props

    return (
      <div>
        <h1 className={classes.title}>{this.props.title}</h1>
        <p className={classes.body}>{this.props.body}</p>
        <p>source</p>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Article))
