import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Events from '../eventData'
import Grid from 'material-ui/Grid'
import moment from 'moment'
import { EventSummary, Company, Stock, Map, NewsCard, Navigation } from '../components'
import { getDate } from '../time'
import { extractCompanySummary } from '../info'
import _ from 'lodash'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import IconButton from 'material-ui/IconButton'
import PrintIcon from 'react-material-icon-svg/dist/PrinterIcon'
import { Line } from 'rc-progress'

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
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  }

})

class Event extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      pagination: false,
      infoJSON: {},
      stockJSON: {},
      newsJSON: {},
      loadingInfo: true,
      loadingStock: true,
      loadingNews: true,
      startDate: null,
      endDate: null,
      percent: 0
    }
    this.printDocument = this.printDocument.bind(this)
    this.renderNextCompany = this.renderNextCompany.bind(this)
    this.startProgressBar = this.startProgressBar.bind(this)
  }

  printDocument() {
    this.startProgressBar()
    const companies = Events[this.props.eventID].related_companies
    const summary = document.getElementById('summary')
    const summaryW = document.getElementById('summary').offsetWidth / 7
    const summaryH = document.getElementById('summary').offsetHeight / 7
    var info = []
    for (let name in companies) {
      const company = document.getElementById(name)
      const companyW = document.getElementById(name).offsetWidth / 6
      const companyH = document.getElementById(name).offsetHeight / 6
      info.push({'component': company, 'width': companyW, 'height': companyH})
    }
    const stock = document.getElementById('stock')
    const map = document.getElementById('map')
    const pdf = new jsPDF()
    var width = pdf.internal.pageSize.width / 1.5
    var height = pdf.internal.pageSize.height / 3

    const exportComplete = () => {
      this.setState({ percent: 100 })
    }

    html2canvas(summary)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'JPEG', 10, 10, summaryW, summaryH)
      this.renderNextCompany(info, 0, 45, pdf, function() {
        html2canvas(stock)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png')
          if (info.length === 1) {
            pdf.addImage(imgData, 'JPEG', 10, 90, width, height)
          } else if (info.length === 2) {
            pdf.addImage(imgData, 'JPEG', 10, 135, width, height)
          } else {
            pdf.addPage()
            pdf.addImage(imgData, 'JPEG', 10, 10, width, height)
          }
          html2canvas(map)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            if (info.length === 1) {
              pdf.addImage(imgData, 'JPEG', 10, 190, width, height)
            } else if (info.length === 2) {
              pdf.addPage()
              pdf.addImage(imgData, 'JPEG', 10, 10, width, height)
            } else {
              pdf.addImage(imgData, 'JPEG', 10, 120, width, height)
            }
            exportComplete()
            pdf.save('event-report.pdf')
          })
        })
      })
    })
  }

  renderNextCompany(info, i, offset, pdf, callback) {
    html2canvas(info[i].component)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      if ((i + 1) % 6 === 0) {
        offset = 10
        pdf.addPage()
      }
      pdf.addImage(imgData, 'JPEG', 10, offset, info[i].width, info[i].height)
      if (info[i + 1]) {
        this.renderNextCompany(info, i + 1, offset + 45, pdf, callback)
      } else {
        callback()
      }
    })
  }

  startProgressBar() {
    const percent = this.state.percent + 20
    if (percent >= 100) {
      clearTimeout(this.tm)
    } else {
      this.setState({ percent })
      this.tm = setTimeout(this.startProgressBar, 1)
    }
  }

  getInfo () {
    const companies = Events[this.props.eventID].related_companies
    const eventInfo = Events[this.props.eventID]
    const start = new moment(eventInfo.start_date * 1000)
    const end = new moment(eventInfo.end_date * 1000)
    var dates = `start_date=${start.format('YYYY-MM-DD')}`
    if (eventInfo.end_date !== 'ongoing') {
      dates += `&end_date=${end.format('YYYY-MM-DD')}`
    }
    let companiesProcessed = 0
    for (let companyName in companies) {
      if (companies.hasOwnProperty(companyName) && companies[companyName]) {
        const companyCode = companies[companyName]
        let params = `statistics=id,name,website,description,category,fan_count,posts{likes,comments,created_time}&${dates}&workaround=true`
        console.log(`https://unassigned-api.herokuapp.com/api/${companyCode}?${params}`)
        fetch(`https://unassigned-api.herokuapp.com/api/${companyCode}?${params}`)
          // eslint-disable-next-line
          .then((response) => {
            if (response.ok) {
              response.json().then(data => {
                // console.log(data)
                let infoJSON = this.state.infoJSON
                if (data.data.website && !data.data.website.match(/^http/)) data.data.website = "http://" + data.data.website
                if (!data.data.description) {
                  var url = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts'
                  url += '&format=json&exintro=&explaintext=&titles=' + companyName + '&rvprop=content&redirects&callback=?'
                  fetch(url).then((response) => {
                    if (response.ok) {
                      response.text().then(res => {
                        // console.log(res)
                        var extract = res.substring(res.indexOf('extract'), res.length)
                        data.data.description = companyName + ' ' + extractCompanySummary(extract, 450).replace(/\}+\)/, '')
                        data.data.code = companyCode
                        infoJSON[companyName] = data.data
                        console.log(infoJSON)
                        companiesProcessed++
                        if (companiesProcessed === Object.keys(companies).length) {
                          this.setState({ infoJSON: infoJSON, loadingInfo: false })
                        }
                      })
                    }
                  })
                } else {
                  data.data.code = companyCode
                  infoJSON[companyName] = data.data
                  console.log(infoJSON)
                  companiesProcessed++
                  if (companiesProcessed === Object.keys(companies).length) {
                    this.setState({ infoJSON: infoJSON, loadingInfo: false })
                  }
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
    const eventInfo = Events[this.props.eventID]
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
      // console.log("COMPANY: " + companyName)
      if (companies.hasOwnProperty(companyName) && companies[companyName]) {
        const companyCode = companies[companyName]
        console.log(companyCode)
        const base = 'https://www.alphavantage.co/query'
        const apiKey = '2V4IGWVZ6W8XS8AI'
        // TODO MAKE OUTPUTSIZE == full
        const params = `?function=TIME_SERIES_DAILY&outputsize=full&symbol=${companyCode}&apikey=${apiKey}`
        const url = base + params
        // console.log('FETCHING: ' + url)
        fetch(url)
          // eslint-disable-next-line
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
    const { infoJSON, stockJSON, newsJSON, loadingInfo, loadingStock, loadingNews } = this.state
    const { classes, eventID } = this.props

    const EventData = Events[eventID]
    document.title = 'EventStock - ' + EventData.name
    return (
      <div>
        <Navigation style={{color: 'blue'}} />
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div id="summary">
                <EventSummary
                  name={EventData.name}
                  description={EventData.description}
                  start_date={`${moment(EventData.start_date * 1000).format('DD MMM YY')}`}
                  end_date={getDate(EventData.end_date)}
                />
              </div>
            </Grid>
            <Grid item xs={7}>
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  <IconButton
                    tooltip="Generate Event Report"
                    onClick={() => this.printDocument()}
                    style={styles.large}
                  >
                    <PrintIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={5}>
                  {this.state.percent > 0 && this.state.percent < 100 ?
                    <Line strokeWidth="1" trailColor="#e3e3e3" percent={this.state.percent} />
                  : null
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={16}>
                {_.map(_.keys(EventData.related_companies), (company, i) => (
                  <Grid item xs={4} key={Company}>
                    <span id={company}>
                      <Company infoJSON={infoJSON[company]} name={company} loading={loadingInfo} key={i} />
                    </span>
                  </Grid>
              ))}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <div id="stock">
              <Stock stockJSON={stockJSON} startDate={this.state.startDate} endDate={this.state.endDate} loading={loadingStock} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div id="map">
              <Map />
              </div>
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

export default withRoot(withStyles(styles)(Event))
