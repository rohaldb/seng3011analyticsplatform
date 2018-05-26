import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Fade from 'material-ui/transitions/Fade'
import Grid from 'material-ui/Grid'
import IconButton from 'material-ui/IconButton'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import PrintIcon from 'react-material-icon-svg/dist/PrinterIcon'

import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  GooglePlusIcon,
  TwitterIcon,
  RedditIcon,
  EmailIcon
} from 'react-share'

const styles = theme => ({
  cardHeader: {
    background: 'linear-gradient(60deg, #ab47bc , #790e8b)'
  }
})

class EventSummary extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
  }

  render () {
    const { name, description, eventData, start_date, end_date } = this.props
    const { classes } = this.props

    return (
      <Fade in timeout={500}>
        <Card>
          <CardHeader
            title={name}
            className={classes.cardHeader}
          />
          <CardContent>
            <Typography variant="subheading">
              {description}
            </Typography>
            <Typography variant="body2">
              <div id="event-date">Date: {start_date} - {end_date}</div>
            </Typography>

            <Grid container direction="row" alignItems="center">
              <GridList style={{marginTop: '10px'}} className={classes.gridListHorizontal} cellHeight="auto" cols={6} spacing={16} >
                <GridListTile cols={1}>
                  <FacebookShareButton
                    url={String(document.location)}
                    quote={name}
                    className="share-button">
                    <FacebookIcon round size={48} />
                  </FacebookShareButton>
                </GridListTile>
                <GridListTile cols={1}>
                  <TwitterShareButton
                    url={String(document.location)}
                    title={name}
                    className="share-button">
                    <TwitterIcon round size={48} />
                  </TwitterShareButton>
                </GridListTile>
                <GridListTile cols={1}>
                  <GooglePlusShareButton
                    url={String(document.location)}
                    className="share-button">
                    <GooglePlusIcon round size={48} />
                  </GooglePlusShareButton>
                </GridListTile>
                <GridListTile cols={1}>
                  <RedditShareButton
                    url={String(document.location)}
                    title={name}
                    windowWidth={660}
                    windowHeight={460}
                    className="share-button">
                    <RedditIcon round size={48} />
                  </RedditShareButton>
                </GridListTile>
                <GridListTile cols={1}>
                  <EmailShareButton
                    url={String(document.location)}
                    subject={name}
                    body={description}
                    className="share-button">
                    <EmailIcon round size={48} />
                  </EmailShareButton>
                </GridListTile>
                <GridListTile cols={1}>
                  <div className="report-tour"></div>
                  <IconButton
                    tooltip="Generate Event Report"
                    onClick={() => this.props.printDocument(eventData)}
                    disableRipple={true}
                    styles={{height: '100%', width: '100%'}}
                  >
                    <PrintIcon />
                  </IconButton>
                </GridListTile>
              </GridList>
            </Grid>
          </CardContent>
        </Card>
      </Fade>
    )
  }
}

export default withRoot(withStyles(styles)(EventSummary))
