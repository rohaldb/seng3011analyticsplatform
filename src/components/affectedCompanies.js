import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Fade from 'material-ui/transitions/Fade'
import Typography from 'material-ui/Typography'
import _ from 'lodash'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'


const styles = theme => ({
  cardHeader: {
    background: 'linear-gradient(60deg, #26c6da, #00acc1)'
  },
  button: {
    margin: theme.spacing.unit,
    color: 'linear-gradient(60deg, #26c6da, #00acc1)'
  },
  input: {
    display: 'none',
  },
  card: {
    cursor: 'pointer'
  }
})

class Company extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    infoJSON: PropTypes.object,
  }

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  render () {
    const { name, loading, infoJSON } = this.props
    const { classes } = this.props

    return (
      <div>
        <Fade in timeout={500}>
          <Card className={infoJSON ? classes.card : null} onClick={() => infoJSON ? this.handleOpen() : null}>
            <CardHeader title={name} className={classes.cardHeader}/>
              {infoJSON ?
              (
              <CardContent>
                <Typography>
                  <b>{infoJSON.name}</b>
                  <br></br>
                  <b>Operations:</b> {infoJSON.category}
                  <br></br>
                  <b>Followers:</b> {infoJSON.fan_count}
                  <br></br>
                  <b>Website:</b> {infoJSON.website}
                </Typography>
                </CardContent>
              ):
              <CardContent>
                <Typography>
                  <i> No information for {name} can be retrieved at this point in time. We apologise for any inconvenience. </i>
                </Typography>
              </CardContent>
              }
          </Card>
        </Fade>

      <Dialog
          open={() => this.state.open()}
          onClose={() => this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={this.state.open}
        >
          <DialogTitle id="alert-dialog-title">{"Company Information"}</DialogTitle>
          <DialogContent>
            {_.map(_.keys(infoJSON), (key, i) =>
                key !== 'id'?
                (<Typography color="inherit" key={i}>
                <b>{key}: </b> {infoJSON[key]}
                </Typography>)
              : null
            )}
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Company))
