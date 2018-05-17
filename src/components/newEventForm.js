import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import { fb } from '../config'
import PropTypes from 'prop-types'
import Dialog, {
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'

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

  addEvent = () => {
    fb.database().ref('timeline/' + Math.random().toString(36).substr(2, 5)).set({
      description: 'description',
      start_date: 'start_date',
      end_date : 'end_date',
      keywords: {
        0: 'zero',
        1: 'one'
      },
      name: 'name',
      related_companies: {
        'ben': 'rohald'
      }
    });

    this.handleClose()
  }

  render () {
    const { classes } = this.props

    return (
      <Dialog open={this.props.isOpen} onClose={this.handleClose} aria-labelledby="simple-dialog-title" >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <DialogContent> 
          <Button onClick={() => this.addEvent()}>Add Event</Button>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withRoot(withStyles(styles)(NewEventForm))
