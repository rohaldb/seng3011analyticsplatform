import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import { Article } from '../components'
import { prettyDate } from '../time'
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button';
import Fade from 'material-ui/transitions/Fade'

// Styles should go here CSS should go here
const styles = theme => ({
  cardHeader: {
    background: 'linear-gradient(60deg, #66bb6a, #338a3e)'
  },
  card: {
    margin: theme.spacing.unit
  },
  button: {
    backgroundColor: '#66bb6a',
    margin: theme.spacing.unit * 2
  }
})

class NewsCard extends Component {

  state = {
    numItems: 7
  }

  static propTypes = {
    responseJSON: PropTypes.object,
    loading: PropTypes.bool.isRequired,
  }

  addItems = () => {
    this.setState({numItems: this.state.numItems + 5 })
  }

  displayItems(data) {

    let num = this.state.numItems
    var items = []
    data.map(function(item, i) {
      const timestamp = prettyDate(new Date(item.webPublicationDate))
      if (num-- >= 0) {
        items.push(<Article key={num}
          title={item.webTitle}
          date={timestamp}
          body={item.fields.bodyText.substring(0, 350).replace(/\s[^\s]*$/, '').replace(/\s*[^a-z]+$/i, '') + ' ... '}
          url={item.webUrl}
          />
        )
      }
      return 0
    })
    return items
  }

  render () {
    const { responseJSON, classes, loading } = this.props
    const data = responseJSON ? responseJSON.response.results : null

    return (
      <Fade in timeout={500}>
        <Card>
          <CardHeader title="Related News" className={classes.cardHeader}/>
          <CardContent>
            {!data ?
              <div style={{textAlign: 'center'}}>
                <CircularProgress/>
              </div>
              :
              this.displayItems(data)
            }
          </CardContent>
          <CardActions>
            <div style={{margin: 'auto'}}>
              <Button variant="raised" className={classes.button} size="large" onClick={() => this.addItems()}>Show More</Button>
            </div>
          </CardActions>
        </Card>
      </Fade>
    )

  }
}

export default withStyles(styles)(NewsCard)
