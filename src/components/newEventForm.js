import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Dialog, {
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'

const styles = {
}

class NewEventForm extends React.Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeCallback: PropTypes.func.isRequired
  }

  handleClose = () => {
    this.props.closeCallback()
  }

  render () {
    const { classes } = this.props

    return (
      <Dialog open={this.props.isOpen} onClose={this.handleClose} aria-labelledby="simple-dialog-title" >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      </Dialog>
    )
  }
}

export default withRoot(withStyles(styles)(NewEventForm))
