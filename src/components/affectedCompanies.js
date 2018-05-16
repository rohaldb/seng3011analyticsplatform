import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Fade from 'material-ui/transitions/Fade'
import { CircularProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'
import NumericLabel from 'react-pretty-numbers'
import Social from './social'
import Dialog, {
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'

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
    open: false
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render () {
    const { name, loading, infoJSON } = this.props
    const { classes } = this.props

    return (
      <div>
        <Fade in timeout={500}>
          <Card className={infoJSON ? classes.card : null} onClick={() => infoJSON ? this.handleOpen() : null}>
            <CardHeader title={name} className={classes.cardHeader} />
              {loading ?
                <div style={{textAlign: 'center'}}>
                  <CircularProgress />
                </div>
              :
                [infoJSON ?
                (
                <CardContent>
                  <Typography>
                    <b>{infoJSON.name}</b>
                    <br></br>
                    <b>Operations:</b> {infoJSON.category}
                    <br></br>
                    <b>Followers:</b> <NumericLabel>{infoJSON.fan_count}</NumericLabel>
                    <br></br>
                    <b>Website:</b> <a target="_blank" href={infoJSON.website}>{infoJSON.website}</a>
                  </Typography>
                </CardContent>
                ):
                <CardContent>
                  <Typography>
                    <i> No information for {name} can be retrieved at this point in time. We apologise for any inconvenience. </i>
                  </Typography>
                </CardContent>
                ]
              }
          </Card>
        </Fade>

      <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title">{"Company Information"}</DialogTitle>
          <DialogContent>
                {infoJSON ?
                (
                <CardContent>
                  <Typography>
                    <b>{infoJSON.name}</b>
                    <br></br>
                    <b>Operations:</b> {infoJSON.category}
                    <br></br>
                    <b>Followers:</b> <NumericLabel>{infoJSON.fan_count}</NumericLabel>
                    <br></br>
                    <b>Website:</b> <a target="_blank" href={infoJSON.website}>{infoJSON.website}</a>
                    <br></br>
                    <b>Description:</b> {infoJSON.description}
                  </Typography>
                  <Social posts={infoJSON.posts} />
                </CardContent>
                ):
                <CardContent>
                  <Typography>
                    <i> No information for {name} can be retrieved at this point in time. We apologise for any inconvenience. </i>
                  </Typography>
                </CardContent>
                }
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Company))
