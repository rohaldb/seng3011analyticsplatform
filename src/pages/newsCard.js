import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Card, { CardHeader, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import _ from 'lodash'
import Paper from 'material-ui/Paper';
import { Article } from '../components'

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
        return <Article
          title={item.webTitle}
          date={item.webPublicationDate}
          body={item.fields.bodyText.substring(0, 300) + ' ... '}
          url={item.webUrl}
          />
      })
    )
  }
}

export default withStyles(styles)(NewsCard)
