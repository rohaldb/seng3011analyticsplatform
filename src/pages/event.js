import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Grid from 'material-ui/Grid'
import moment from 'moment'
import { EventSummary, Company, Stock, Map, NewsCard, Navigation } from '../components'
import { getDate } from '../time'
import _ from 'lodash'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: '4%',
    backgroundColor: 'rgb(227,227,227)',
    overlay: true
  },
  paper: {
    padding: theme.spacing.unit * 2
  },
  navBar: {
    textAlign: 'center'
  }

})

class Event extends React.Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    eventData: PropTypes.object.isRequired
  }

  state = {
    pagination: false,
    infoJSON: {},
    stockJSON: {},
    newsJSON: {},
    loadingInfo: true,
    loadingStock: true,
    loadingNews: true,
    startDate: null,
    endDate: null,
    currentUser: this.props.currentUser
  }

  getInfo () {
    const companies = this.props.eventData.related_companies
    // console.log(companies)
    let companiesProcessed = 0
    for (let companyName in companies) {
      // console.log("COMPANY: " + companyName)
      if (companies.hasOwnProperty(companyName) && companies[companyName]) {
        const companyCode = companies[companyName]
        let apiBase = `${companyCode}?statistics=id,name,website,description,category,fan_count`
        fetch(`https://unassigned-api.herokuapp.com/api/${apiBase}&workaround=true`)
          //eslint-disable-next-line
          .then((response) => {
            if (response.ok) {
              response.json().then(data => {
                let infoJSON = this.state.infoJSON
                if (data.data.website && !data.data.website.match(/^http/)) data.data.website = 'http://' + data.data.website
                if (!data.data.description) data.data.description = 'No description available'
                infoJSON[companyName] = data.data
                console.log(infoJSON)
                companiesProcessed++
                if (companiesProcessed === Object.keys(companies).length) {
                  this.setState({ infoJSON: infoJSON, loadingInfo: false })
                }
              })
            }
          }).catch(error => console.error(error))
      } else if (!companies[companyName]) { // null stock code
        companiesProcessed++
        if (companiesProcessed === Object.keys(companies).length) {
          this.setState({ loadingInfo: false })
        }
      }
    }
  }

  getNews () {
    const eventInfo = this.props.eventData
    const start = new moment(eventInfo.start_date * 1000)
    const end = new moment(eventInfo.end_date * 1000)
    const keywords = eventInfo.keywords.toString().replace(/,/g, '%20AND%20')

    const base = 'https://content.guardianapis.com/search'
    const params = 'page-size=100&show-blocks=main,body&show-fields=bodyText,thumbnail'
    const apiKey = 'api-key=35b90e54-3944-4e4f-9b0e-a511d0dda44d'
    const query = `q=${keywords}`
    var dates = `from-date=${start.format('YYYY-MM-DD')}`
    if (eventInfo.end_date !== 'ongoing') {
      dates += `&to-date=${end.format('YYYY-MM-DD')}`
    }

    // console.log(`fetching ${base}?${query}&${dates}&${params}&${apiKey}`)
    fetch(`${base}?${query}&${dates}&${params}&${apiKey}`)
    .then((response) => {
      if (response.ok) {
        response.json().then(data => {
          // console.log(data)
          this.setState({ newsJSON: data, loadingNews: false })
        })
      }
    }).catch(error => console.error(error))
  }

  getStockPrices () {
    const eventInfo = this.props.eventData
    const companies = eventInfo.related_companies
    let startDate = moment.unix(eventInfo.start_date)
    let endDate = eventInfo.end_date === 'ongoing' ? moment() : moment.unix(eventInfo.end_date) // Use today's date if ongoing
    // console.log('START DATE: ' + startDate.format('dddd, MMMM Do YYYY, h:mm:ss a'))
    // console.log('END DATE: ' + endDate.format('dddd, MMMM Do YYYY, h:mm:ss a'))

    this.setState({
      startDate,
      endDate
    })

    let companiesProcessed = 0
    for (let companyName in companies) {
      // console.log("COMPANY: " + companyName)
      if (companies.hasOwnProperty(companyName) && companies[companyName]) {
        const companyCode = companies[companyName]
        const base = 'https://www.alphavantage.co/query'
        const apiKey = '2V4IGWVZ6W8XS8AI'
        // TODO MAKE OUTPUTSIZE == full
        const params = `?function=TIME_SERIES_DAILY&outputsize=full&symbol=${companyCode}&apikey=${apiKey}`
        const url = base + params
        // console.log('FETCHING: ' + url)
        fetch(url)
          //eslint-disable-next-line
          .then((response) => {
            if (response.ok) {
              response.json().then(data => {
                data = Object.values(data)[1]
                let newData = []
                for (let date in data) {
                  if (data.hasOwnProperty(date)) {
                    newData.unshift({
                      date: date,
                      'value': parseFloat(data[date]['4. close']),
                      'open': parseFloat(data[date]['1. open']),
                      'high': parseFloat(data[date]['2. high']),
                      'low': parseFloat(data[date]['3. low']),
                      'close': parseFloat(data[date]['4. close']),
                      'volume': parseFloat(data[date]['5. volume'])
                    })
                  }
                }
                let stockJSON = this.state.stockJSON
                stockJSON[companyName] = newData

                companiesProcessed++
                if (companiesProcessed === Object.keys(companies).length) {
                  this.setState({ stockJSON: stockJSON, loadingStock: false })
                }
              })
            }
          })
      } else if (!companies[companyName]) { // null stock code
        companiesProcessed++
        if (companiesProcessed === Object.keys(companies).length) {
          this.setState({ loadingStock: false })
        }
      }
    }
  }

  componentDidMount () {
    this.getInfo()
    this.getStockPrices()
    this.getNews()
    window.scrollTo(0, 0)
  }

  render () {
    const { infoJSON, stockJSON, newsJSON, loadingInfo, loadingStock, loadingNews, currentUser } = this.state
    const { classes, eventID, eventData } = this.props

    document.title = 'EventStock - ' + eventData.name
    return (
      <div>
        <Navigation isAdmin={currentUser.admin}/>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <EventSummary
                name={eventData.name}
                description={eventData.description}
                start_date={`${moment(eventData.start_date * 1000).format('DD MMM YY')}`}
                end_date={getDate(eventData.end_date)}
                />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={16}>
                {_.map(_.keys(eventData.related_companies), (company, i) => (
                  <Grid item xs={4} key={i}>
                    <Company infoJSON={infoJSON[company]} name={company} loading={loadingInfo} key={i} />
                  </Grid>
              ))}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Stock stockJSON={stockJSON} startDate={this.state.startDate} endDate={this.state.endDate} loading={loadingStock} />
            </Grid>
            <Grid item xs={6}>
              <Map
            />
            </Grid>
            <Grid item xs={12}>
              <NewsCard newsJSON={newsJSON} loading={loadingNews} />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withRouter(withRoot(withStyles(styles)(Event)))
