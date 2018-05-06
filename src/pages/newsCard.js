import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import { Article } from '../components'
import { prettyDate } from '../time'

// Styles should go here CSS should go here
const styles = theme => ({
  jsonPane: {
    textAlign: 'left',
  },
  card: {
    margin: theme.spacing.unit
  }
})

class NewsCard extends Component {

  static propTypes = {
    responseJSON: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
  }

  displayItems(data, num) {
    var items = []
    data.map(function(item, i) {
      const timestamp = prettyDate(new Date(item.webPublicationDate))
      if (num-- >= 0) {
        items.push(<Article
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
    const { responseJSON, items, classes } = this.props
    const data = responseJSON.response.results

    return (
      <div>
        {this.displayItems(data, items)}
         <CircularProgress className={classes.margin}
         size={70} color="secondary" />
      </div>
    )

  }
}

export default withStyles(styles)(NewsCard)
