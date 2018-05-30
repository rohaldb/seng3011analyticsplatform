import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import { Article } from '../components'
import { prettyDate } from '../time'
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Fade from 'material-ui/transitions/Fade'

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
    newsJSON: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

  addItems = () => {
    this.setState({numItems: this.state.numItems + 5 })
  }

  displayItems = (data) => {
    let num = this.state.numItems
    var items = []
    data.map(function(item, i) {
      const timestamp = prettyDate(new Date(item.webPublicationDate))
      if (num-- >= 0) {
        var bodyText = item.blocks.body.length > 0 ? item.blocks.body[0].bodyHtml : ''

        /* remove hyperlinks from body */
        bodyText = bodyText.replace(/<\s*\/?\s*a\s[^>]*>/gi, '')

        /* make headings smaller */
        bodyText = bodyText.replace(/<\s*(\/?)\s*h[0-9]\s*>/gi, '<$1h5>')

        /* make images half-scale */
        bodyText = bodyText.replace(/<\s*img\s([^>]+)>/g, function(match, capture) {
          var ret = capture.replace(/\sheight\s*=\s*"\s*([0-9]+)\s*"\s/gi, function(m, cap) {
            return ' height="' + cap / 2 + '" '
          })
          ret = ret.replace(/\swidth\s*=\s*"\s*([0-9]+)\s*"\s/gi, function(m, cap) {
            return ' width="' + cap / 2 + '" '
          })
          return '<img ' + ret + '>'
        })

        items.push(
          <Article key={num}
          title={item.webTitle}
          date={timestamp}
          body={item.fields.bodyText.substring(0, 1000).replace(/\s[^\s]*$/, '').replace(/\s*[^a-z]+$/i, '') + ' ... '}
          url={item.webUrl}
          img={item.fields.thumbnail}
          bodyText={bodyText}
          />
        )
      }
      return 0
    })
    return items
  }

  render () {
    const { newsJSON, loading, classes } = this.props

    return (
      <Fade in timeout={500}>
        <Card>
          <CardHeader title="Related News" className={classes.cardHeader} />
          <CardContent>
            {loading ?
              <div style={{textAlign: 'center'}}>
                <CircularProgress />
              </div>
            :
              this.displayItems(newsJSON.response.results)
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
