import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
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
import { EventTour } from '../tour'
import '../assets/company.css'

import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  GooglePlusIcon,
  TwitterIcon,
  RedditIcon,
  EmailIcon
} from 'react-share'

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
    padding: 5
  }

})

class Event extends React.Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    eventData: PropTypes.object.isRequired
  }

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
      percent: 0,
      currentUser: this.props.currentUser
    }
    this.printDocument = this.printDocument.bind(this)
    this.renderNextCompany = this.renderNextCompany.bind(this)
    this.startProgressBar = this.startProgressBar.bind(this)
    this.newPDFPage = this.newPDFPage.bind(this)
    this.alignText = this.alignText.bind(this)
  }

  printDocument(eventData) {
    this.startProgressBar()
    const companies = eventData.related_companies
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
    var pg = 1
    pdf.setProperties({
      title: eventData.name + ' report',
      subject: eventData.name,
      author: 'EventStock',
      keywords: eventData.name + ', ' + eventData.keywords.toString().replace(/,/g, ', '),
      creator: 'EventStock'
    })
    this.newPDFPage(pdf, false, pg)
    var width = pdf.internal.pageSize.width / 1.5
    var height = pdf.internal.pageSize.height / 3

    const exportComplete = () => {
      this.setState({ percent: 100 })
    }

    const makePage = (pdf, pg) => {
      this.newPDFPage(pdf, true, pg)
    }

    html2canvas(summary)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'JPEG', 10, 10, summaryW, summaryH)
      this.renderNextCompany(info, 0, 45, pdf, function(pg) {
        html2canvas(stock)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png')
          if (info.length === 1) {
            pdf.addImage(imgData, 'JPEG', 10, 90, width, height)
          } else if (info.length === 2) {
            pdf.addImage(imgData, 'JPEG', 10, 135, width, height)
          } else {
            makePage(pdf, ++pg)
            pdf.addImage(imgData, 'JPEG', 10, 10, width, height)
          }
          html2canvas(map)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            if (info.length === 1) {
              pdf.addImage(imgData, 'JPEG', 10, 190, width, height)
            } else if (info.length === 2) {
              makePage(pdf, ++pg)
              pdf.addImage(imgData, 'JPEG', 10, 10, width, height)
            } else {
              pdf.addImage(imgData, 'JPEG', 10, 120, width, height)
            }
            exportComplete()
            pdf.save('event-report.pdf')
          })
        })
      }, pg)
    })
  }

  renderNextCompany(info, i, offset, pdf, callback, pg) {
    html2canvas(info[i].component)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      if ((i + 1) % 6 === 0) {
        offset = 10
        this.newPDFPage(pdf, true, ++pg)
      }
      pdf.addImage(imgData, 'JPEG', 10, offset, info[i].width, info[i].height)
      if (info[i + 1]) {
        this.renderNextCompany(info, i + 1, offset + 45, pdf, callback, pg)
      } else {
        callback(pg)
      }
    })
  }

  newPDFPage(pdf, add, pg) {
    if (add) pdf.addPage()
    pdf.setFontSize(10)
    pdf.text(10, 8, 'EventStock Event Report')
    this.alignText(moment(new Date()).format("DD/MM/YYYY"), 8, pdf, 'centre')
    this.alignText('Page ' + pg, 8, pdf, 'right')
  }

  alignText(text, y, pdf, centreOrRight) {
    var textWidth = pdf.getStringUnitWidth(text) * pdf.internal.getFontSize() / pdf.internal.scaleFactor
    var textOffset = (pdf.internal.pageSize.width - textWidth)
    if (centreOrRight === 'centre') {
      textOffset /= 2
    } else {
      textOffset -= 10
    }
    pdf.text(textOffset, y, text)
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
    const companies = this.props.eventData.related_companies
    const eventInfo = this.props.eventData
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
                        data.data.description = extractCompanySummary(extract, 450).replace(/\}+\)/, '')
                        if (!data.data.description || data.data.description.match(/^\s*$/)) {
                          data.data.description = 'This company has not provided a description of their operations. '
                          data.data.description += `Please visit the ${companyName} website for more information.`
                        } else {
                          data.data.description = companyName + ' ' + data.data.description
                        }
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
    const { infoJSON, stockJSON, newsJSON, loadingInfo, loadingStock, loadingNews, currentUser } = this.state
    const { classes, eventData } = this.props

    document.title = 'EventStock - ' + eventData.name
    return (
      <div>
        <Navigation isAdmin={currentUser.admin} tour={EventTour} />
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={8}>
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={1}>
                  <FacebookShareButton
                    url={document.location}
                    quote={eventData.name}
                    className="share-button">
                    <FacebookIcon
                      size={32}
                      round
                    />
                  </FacebookShareButton>
                </Grid>
                <Grid item xs={1}>
                  <TwitterShareButton
                    url={document.location}
                    title={eventData.name}
                    className="share-button">
                    <TwitterIcon
                      size={32}
                      round
                    />
                  </TwitterShareButton>
                </Grid>
                <Grid item xs={1}>
                  <GooglePlusShareButton
                    url={document.location}
                    className="share-button">
                    <GooglePlusIcon
                      size={32}
                      round
                    />
                  </GooglePlusShareButton>
                </Grid>
                <Grid item xs={1}>
                  <RedditShareButton
                    url={document.location}
                    title={eventData.name}
                    windowWidth={660}
                    windowHeight={460}
                    className="share-button">
                    <RedditIcon
                      size={32}
                      round
                    />
                  </RedditShareButton>
                </Grid>
                <Grid item xs={1}>
                  <EmailShareButton
                    url={document.location}
                    subject={eventData.name}
                    body={eventData.description}
                    className="share-button">
                    <EmailIcon
                      size={32}
                      round
                    />
                  </EmailShareButton>
                </Grid>
                <div className="report-tour"></div>
                <Grid item xs={1}>
                  <IconButton
                    tooltip="Generate Event Report"
                    onClick={() => this.printDocument(eventData)}
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
              <div id="summary">
                <EventSummary
                  name={eventData.name}
                  description={eventData.description}
                  start_date={`${moment(eventData.start_date * 1000).format('DD MMM YY')}`}
                  end_date={getDate(eventData.end_date)}
                />
              </div>
            </Grid>
            <div className="overview-tour"></div>
            <Grid item xs={12}>
              <Grid container spacing={16}>
                <div className="company-card-tour"></div>
                {_.map(_.keys(eventData.related_companies), (company, i) => (
                  <Grid item xs={4} key={Company}>
                    <span id={company}>
                      <Company
                        infoJSON={infoJSON[company]}
                        name={company}
                        loading={loadingInfo}
                        start={eventData.start_date * 1000}
                        end={eventData.end_date * 1000}
                        key={i}
                      />
                    </span>
                  </Grid>
              ))}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <div className="stock-chart-tour"></div>
              <div id="stock">
              <Stock stockJSON={stockJSON} startDate={this.state.startDate} endDate={this.state.endDate} loading={loadingStock} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="heat-map-tour"></div>
              <div id="map">
              <Map />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="news-articles-tour"></div>
              <NewsCard newsJSON={newsJSON} loading={loadingNews} />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withRouter(withRoot(withStyles(styles)(Event)))
