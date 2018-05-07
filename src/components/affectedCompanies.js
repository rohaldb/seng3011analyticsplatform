import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Fade from 'material-ui/transitions/Fade'
import Typography from 'material-ui/Typography'
import _ from 'lodash'
import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'




const styles = theme => ({
  cardHeader: {
    background: 'linear-gradient(60deg, #26c6da, #00acc1)'
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
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
    const actions = [
      <Button raised
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <button
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    const { name, loading, infoJSON } = this.props
    const { classes } = this.props
    //console.log(infoJSON)
    return (
      <Fade in timeout={500}>
        <Card>
          <CardHeader title={name} className={classes.cardHeader}/>
            {infoJSON ?
            (
            <CardContent>
              <Typography>
                <b>{infoJSON.name}</b>
                <p></p>
                <b>Operations:</b> {infoJSON.category}
                <br></br>
                <b>Followers:</b> {infoJSON.fan_count}
                <br></br>
                <b>Website:</b> {infoJSON.website}
              </Typography>
                <div>
                  <Button variant="raised" color="primary" label="More Info" onClick={this.handleOpen} />
                    <Dialog
                      title="Dialog With Actions"
                      actions={actions}
                      modal={false}
                      open={this.state.open}
                      onRequestClose={this.handleClose}
                    >
                    {_.map(_.keys(infoJSON), (key, i) =>
                        key !== 'id'?
                        (<Typography color="inherit" key={i}>
                        <b>{key}: </b> {infoJSON[key]}
                        </Typography>)
                      : null
                    )}
                  </Dialog>
                </div>
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
    )
  }
}

export default withRoot(withStyles(styles)(Company))
