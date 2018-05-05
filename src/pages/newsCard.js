import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Card, { CardHeader, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import moment from 'moment'
import _ from 'lodash'
import Paper from 'material-ui/Paper'
import { Article } from '../components'
import { prettyDate } from './time'

// Styles should go here CSS should go here
const styles = theme => ({
  jsonPane: {
    textAlign: 'left',
  },
  card: {
    margin: theme.spacing.unit
  }
});

class NewsCard extends Component {

  static propTypes = {
    responseJSON: PropTypes.object.isRequired,
  }

  render () {
    const { responseJSON, classes } = this.props
    const data = responseJSON.response.results

    return (
      data.map(function(item, i) {
        const timestamp = prettyDate(new Date(item.webPublicationDate))
        return <Article
          title={item.webTitle}
          date={timestamp}
          body={item.fields.bodyText.substring(0, 350).replace(/\s[^\s]*$/, '').replace(/\s*[^a-z]+$/i, '') + ' ... '}
          url={item.webUrl}
          />
      })
    )

  }
}

export default withStyles(styles)(NewsCard)
