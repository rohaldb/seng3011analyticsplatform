import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Events from '../eventData'
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

  constructor (props) {
    super(props)
    document.getElementById('global').style.overflow = 'hidden'
    this.state = {loading: false, responseJSON: null, items: 10, pagination: false,
      stockJSON: {}, loadingStock: true, startDate: null, endDate: null, infoJSON: {}, loadingInfo: true,
      accessToken: 'EAACEdEose0cBAGLdq9PVkFpVRhOPGosIqjFue8zHi44MeS9ZBhYPWMGSZBxJ4qKSmY7HUUzsBaLZADYyEKTanmy0XBZCpcXpdvYFlgLXphNCuEA0jFcxHEHImIk4eE9ceZCwmoaIkohsUGwOPT3ZBowXqKyQdKI4jvzQRr8cIDWulLdu9vYtHL0kWaks1kXDwZD'}
  }

  getInfo() {
      const accessToken = this.state.accessToken
      const companies = Events[this.props.eventID].related_companies
      //console.log(companies)
      let companiesProcessed = 0
      for (let companyName in companies) {
          //console.log("COMPANY: " + companyName);
          if (companies.hasOwnProperty(companyName) && companies[companyName]) {

              let apiBase = `${companyName}?statistics=id,name,website,description,category,fan_count`
              fetch(`https://unassigned-api.herokuapp.com/api/${apiBase}&access_token=${accessToken}`)
              .then((response) => {
                  if (response.ok) {
                      response.json().then(data => {
                          let infoJSON = this.state.infoJSON
                          infoJSON[companyName] = data.data
                          console.log(infoJSON)
                          companiesProcessed++
                          if (companiesProcessed === Object.keys(companies).length) {
                            this.setState({ infoJSON: infoJSON, loadingInfo: false })
                          }

                      })
                  }
              })
              .catch(error => console.error(error)) // ??

          } else if (!companies[companyName]) { // null stock code
              companiesProcessed++
              if (companiesProcessed === Object.keys(companies).length) {
                this.setState({ loadingInfo: false })
              }
          }
      }
  }

  getNews () {
    this.setState({ loading: true })

    const eventInfo = Events[this.props.eventID]
    const start = new moment(eventInfo.start_date * 1000)
    const end = new moment(eventInfo.end_date * 1000)
    const keywords = eventInfo.keywords.toString().replace(/,/g, '%20AND%20')

    const base = 'https://content.guardianapis.com/search'
    const params = 'page-size=100&show-blocks=main&show-fields=bodyText'
    const apiKey = 'api-key=35b90e54-3944-4e4f-9b0e-a511d0dda44d'
    const query = `q=${keywords}`
    var dates = `from-date=${start.format('YYYY-MM-DD')}`
    if (eventInfo.end_date !== 'ongoing') {
      dates += `&to-date=${end.format('YYYY-MM-DD')}`
    }

    //console.log(`fetching ${base}?${query}&${dates}&${params}&${apiKey}`)
    fetch(`${base}?${query}&${dates}&${params}&${apiKey}`)
    .then((response) => {
      if (response.ok) {
        response.json().then(data => {
          //console.log(data)
          this.setState({ responseJSON: data, loading: false })
        })
      }
    }).catch(error => console.error(error))
  }

  getStockPrices () {
    const eventInfo = Events[this.props.eventID]
    const companies = eventInfo.related_companies
    let startDate = moment.unix(eventInfo.start_date)
    let endDate = eventInfo.end_date === 'ongoing' ? moment() : moment.unix(eventInfo.end_date) // Use today's date if ongoing
    console.log('START DATE: ' + startDate.format('dddd, MMMM Do YYYY, h:mm:ss a'))
    console.log('END DATE: ' + endDate.format('dddd, MMMM Do YYYY, h:mm:ss a'))

    this.setState({
      startDate,
      endDate
    })

    let companiesProcessed = 0
    for (let companyName in companies) {
      // console.log("COMPANY: " + companyName);
      if (companies.hasOwnProperty(companyName) && companies[companyName]) {
        const companyCode = companies[companyName]
        const base = 'https://www.alphavantage.co/query'
        const apiKey = '2V4IGWVZ6W8XS8AI'
        // TODO MAKE OUTPUTSIZE == full
        const params = `?function=TIME_SERIES_DAILY&outputsize=full&symbol=${companyCode}&apikey=${apiKey}`
        const url = base + params
        // console.log('FETCHING: ' + url);
        fetch(url).then(response => {
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
    this.getNews()
    this.getStockPrices()
    this.refs.iScroll.addEventListener('scroll', () => {
      if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
      this.refs.iScroll.scrollHeight) {
        this.loadMoreItems()
      }
    })
  }

  loadMoreItems () {
    this.setState({ pagination: true })
    setTimeout(() => {
      this.setState({ items: this.state.items + 3, pagination: false })
    }, 3000)
  }

  render () {
    const { responseJSON, items, loading, stockJSON, loadingStock, infoJSON, loadingInfo } = this.state
    const { classes, eventID } = this.props

    const EventData = Events[eventID]
    const eventInfo = Events[this.props.eventID]
    document.title = 'EventStock - ' + EventData.name
    return (
      <div>
        <Navigation style={{color: 'blue'}} />
        <div className={classes.root} ref='iScroll' style={{ height: document.documentElement.clientHeight - 100, overflow: 'scroll' }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <EventSummary
                name={EventData.name}
                description={EventData.description}
                start_date={`${moment(EventData.start_date * 1000).format('DD MMM YY')}`}
                end_date={getDate(EventData.end_date)}
                />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={16}>
              {_.map(_.keys(EventData.related_companies), (company, i) => (
                <Grid item xs={4} key={i}>
                  <Company infoJSON={infoJSON[company]} name={company} loading={loadingInfo} />
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
              <NewsCard responseJSON={responseJSON} items={items} loading={loading} />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Event))
