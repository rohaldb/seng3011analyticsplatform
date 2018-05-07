import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Grid from 'material-ui/Grid'

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

  render () {
    const { title, date, body, url } = this.props
    const { classes } = this.props
    return (
      <Grid container>
        <Grid item xs={12} style={{borderBottom: '2px solid #66bb6a'}}>
          <h2 className={classes.title}>{title}</h2>
          <h4 className={classes.date}>{date}</h4>
          <p className={classes.body} >{body}
            <a target='_blank' href={url}>Read More</a>
          </p>
        </Grid>
      </Grid>
    )
  }
}

export default withRoot(withStyles(styles)(Article))
