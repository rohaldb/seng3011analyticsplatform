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
import Avatar from '@material-ui/core/Avatar';
import Dialog, {
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import _ from "lodash";

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
    start: PropTypes.number,
    end: PropTypes.number
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

  rawMarkup = (html) => {
    return { __html: html }
  }

  render () {
    const { name, loading, infoJSON, start, end } = this.props
    const { classes } = this.props

    return (
      <div>
        <Fade in timeout={500}>
          <Card className={infoJSON ? classes.card : null} onClick={() => infoJSON ? this.handleOpen() : null}>
            <CardHeader title={name} className={classes.cardHeader}
              avatar={<Avatar src={`https://logo.clearbit.com/${_.split(_.replace(_.toLower(name), /\s*the\s*/, ''), /\s+/)[0]}.com?size=50`} alt='' />
            }/>
              {loading ?
                <div style={{textAlign: 'center'}}>
                  <CircularProgress />
                </div>
              :
                infoJSON ?
                (
                <CardContent>
                  <div id={name}>
                  <Typography noWrap>
                    <b>{infoJSON.name} - {infoJSON.code}</b>
                  </Typography>
                  <Typography noWrap>
                    <b>Operations:</b> {infoJSON.category}
                  </Typography>
                  <Typography noWrap>
                    <b>Followers:</b> <NumericLabel>{infoJSON.fan_count}</NumericLabel>
                  </Typography>
                  <Typography noWrap>
                    <b>Website: </b>
                    {infoJSON.website.match(/^http/) ?
                      <a target="_blank" href={infoJSON.website}>{infoJSON.website}</a>
                    :
                      <span>{infoJSON.website}</span>
                    }
                  </Typography>
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

      {infoJSON ?
        <Dialog
            open={this.state.open}
            onClose={() => this.handleClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={false}
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{background: 'linear-gradient(60deg, #26c6da, #00acc1)'}}
            >
              {infoJSON.name} - {infoJSON.code}
          </DialogTitle>
          <DialogContent>
            <CardContent>
              <Typography noWrap>
                <b>Operations:</b> {infoJSON.category}
              </Typography>
              <Typography noWrap>
                <b>Followers:</b> <NumericLabel>{infoJSON.fan_count}</NumericLabel>
              </Typography>
              <Typography noWrap>
                <b>Website: </b>
                {infoJSON.website.match(/^http/) ?
                  <a target="_blank" href={infoJSON.website}>{infoJSON.website}</a>
                :
                  <span>{infoJSON.website}</span>
                }
              </Typography>
              <Typography noWrap>
                <b>Description:</b> <span dangerouslySetInnerHTML={this.rawMarkup(infoJSON.description)} />
              </Typography>
              <br></br>
              <Social posts={infoJSON.posts} start={start} end={end} />
            </CardContent>
          </DialogContent>
        </Dialog>
        : null }
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Company))
