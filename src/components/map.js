import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import Fade from 'material-ui/transitions/Fade'
import HeatMap from 'react-heatmap-grid'
import Highcharts from 'highcharts';

const styles = theme => ({
  cardHeader: {
    background: 'linear-gradient(60deg, #ef5350, #e53935)'
  },
  map: {
      // paddingTop: '4px',
      paddingRight: '10%',
      margin: '0',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      textAlign: 'center'
  },
  MapMap343: {
      textAlign: 'center',
  }
})

const yLabels = new Array(14).fill(0).map((_, i) => `${i}`);
const xLabels = ['Facebook', 'Google', 'Amazon'];
const data = new Array(yLabels.length)
  .fill(0)
  .map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)))

class Map extends React.Component {

  render () {
      
    const { classes } = this.props


    return (
      <Fade in timeout={500}>
        <Card>
          <CardHeader
            title='Global Impact: Articles on Companies'
            className={classes.cardHeader}
          />
          <CardContent className={classes.map}>
              <HeatMap
                xLabels={xLabels}
                yLabels={yLabels}
                data={data}
              />
          </CardContent>
        </Card>
      </Fade>
    )
  }
}

export default withRoot(withStyles(styles)(Map))
