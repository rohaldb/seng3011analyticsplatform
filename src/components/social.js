import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import PropTypes from 'prop-types'
import Fade from 'material-ui/transitions/Fade'
import moment from 'moment'
import 'amstock3/amcharts/amcharts.js'
import 'amstock3/amcharts/serial.js'
import 'amstock3/amcharts/amstock.js'
import AmCharts from '@amcharts/amcharts3-react'
import 'amstock3/amcharts/themes/light.js'

const styles = theme => ({
  cardHeader: {
    background: 'linear-gradient(60deg, #ef5350, #e53935)'
  }
})

class Social extends React.Component {

  static propTypes = {
    posts: PropTypes.object.isRequired,
    start: PropTypes.object.isRequired,
    end: PropTypes.object.isRequired,
  }

  configGraph = (chartData) => {
    return {
      "type": "serial",
      "theme": "light",
      "legend": {
          "useGraphSettings": true
      },
      "dataProvider": chartData,
      "synchronizeGrid": true,
      "valueAxes": [{
          "id":"v1",
          "axisColor": "#FF6600",
          "axisThickness": 2,
          "axisAlpha": 1,
          "position": "left"
      }, {
          "id":"v2",
          "axisColor": "#FCD202",
          "axisThickness": 2,
          "axisAlpha": 1,
          "position": "right"
      }, {
          "id":"v3",
          "axisColor": "#B0DE09",
          "axisThickness": 2,
          "gridAlpha": 0,
          "offset": 50,
          "axisAlpha": 1,
          "position": "left"
      }],
      "graphs": [{
          "valueAxis": "v1",
          "lineColor": "#FF6600",
          "bullet": "round",
          "bulletBorderThickness": 1,
          "hideBulletsCount": 30,
          "title": "Posts",
          "valueField": "posts",
      "fillAlphas": 0
      }, {
          "valueAxis": "v2",
          "lineColor": "#FCD202",
          "bullet": "square",
          "bulletBorderThickness": 1,
          "hideBulletsCount": 30,
          "title": "Average Comments",
          "valueField": "comments",
      "fillAlphas": 0
      }, {
          "valueAxis": "v3",
          "lineColor": "#B0DE09",
          "bullet": "triangleUp",
          "bulletBorderThickness": 1,
          "hideBulletsCount": 30,
          "title": "Average Likes",
          "valueField": "likes",
      "fillAlphas": 0
      }],
      "chartScrollbar": {},
      "chartCursor": {
          "cursorPosition": "mouse"
      },
      "categoryField": "date",
      "categoryAxis": {
          "parseDates": true,
          "axisColor": "#DADADA",
          "minorGridEnabled": true
      },
      "export": {
        "enabled": true,
          "position": "bottom-right"
      }
    }
  }

  declareConfig = (posts, start, end) => {
    var chartData = {}
    var currDate = moment(start)
    var maxDate = moment(end)
    while (currDate <= maxDate) {
      chartData[moment(currDate).format('YYYY-MM-DD')] = {
        'posts': 0,
        'likes': 0,
        'comments': 0
      }
      currDate = moment(currDate).add(1, 'days')
    }
    for (let post in posts) {
      var entry = posts[post]['created_time'].substring(0, 10)
      if (chartData[entry]) {
        chartData[entry].posts += 1
        chartData[entry].posts += posts[post]['likes']
        chartData[entry].posts += posts[post]['comments']
      } else {
        var dat = {
          'posts': 1,
          'likes': posts[post]['likes'],
          'comments': posts[post]['comments']
        }
        chartData[entry] = dat
      }
    }
    var chartArr = []
    for (var i in chartData) {
      chartArr.push({
        'date': i,
        'posts': chartData[i].posts,
        'likes': Math.ceil(chartData[i].likes / chartData[i].posts),
        'comments': Math.ceil(chartData[i].comments / chartData[i].posts)
      })
    }
    // console.log('chartData: ' + JSON.stringify(chartData) + '\n' + JSON.stringify(chartArr))
    const config = this.configGraph(chartArr)
    return config
  }

  render () {
    const { posts, start, end } = this.props

    return (
      <Fade in timeout={500}>
        <AmCharts.React className="lineChart" style={{ width: "100%", height: "750px" }} options={this.declareConfig(posts, start, end)} />
      </Fade>
    )
  }

}

export default withRoot(withStyles(styles)(Social))
