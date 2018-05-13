import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { CardContent } from 'material-ui/Card'
import Dialog, {
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: '4%',
    fontFamily: 'Roboto'
  },
  title: {
    marginBottom: '0'
  },
  body: {
    marginTop: '1px',
    fontFamily: 'Roboto'
  }
})

class Article extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
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

  showArticle = (url) => {
    window.open(url, "_blank")
  }

  render () {
    const { title, date, body, url, img, bodyText } = this.props
    const { classes } = this.props
    return (
      <div>
        <Grid container>
          <Grid item xs={12} style={{borderBottom: '2px solid #66bb6a'}}>
            <h2 className={classes.title}>{title}</h2>
            <h4 className={classes.date}>{date}</h4>
            <img className={classes.img} src={img} alt="" style={{float: 'left', 'margin-top': '0px', 'margin-right': '25px', 'margin-bottom': '10px'}}></img>
            <p className={classes.body}>{body}</p>
            <div style={{margin: 'auto'}}>
              <Button variant="raised" className={classes.button} size="large" onClick={() => this.handleOpen()}>View Article</Button>
              <Button variant="raised" className={classes.button} size="large" onClick={()=> this.showArticle(url)}>Full Article</Button>
            </div>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <b>{date}</b>
            <CardContent>
              <Typography>
               <span dangerouslySetInnerHTML={this.rawMarkup(bodyText)} />
              </Typography>
            </CardContent>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Article))
