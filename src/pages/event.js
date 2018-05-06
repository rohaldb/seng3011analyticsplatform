import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Events from '../eventData'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import NewsCard from './newsCard'
import moment from 'moment'
import { CircularProgress } from 'material-ui/Progress'
import { EventSummary, Company, Stock, Map } from '../components'
import { getDate } from '../time'

const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: '4%'
    },
    paper: {
      padding: theme.spacing.unit * 2,
      color: theme.palette.text.secondary,
    }
})

class Event extends React.Component {

  constructor(props) {
    super(props)
    document.getElementById('global').style.overflow = 'hidden'
    this.state = {loading: false, responseJSON: null, items: 10, pagination: false}
  }

  getNews() {
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

    console.log(`fetching ${base}?${query}&${dates}&${params}&${apiKey}`)
    fetch(`${base}?${query}&${dates}&${params}&${apiKey}`)
    .then((response) => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data)
          this.setState({ responseJSON: data, loading: false })
        })
      }
    }).catch(error => console.error(error))
  }

  componentDidMount() {
    this.getNews()
    this.refs.iScroll.addEventListener("scroll", () => {
      if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
      this.refs.iScroll.scrollHeight) {
        this.loadMoreItems()
      }
    })
  }

  loadMoreItems() {
    this.setState({ pagination: true })
    setTimeout(() => {
      this.setState({ items: this.state.items + 3, pagination: false })
    }, 3000)
  }

  render () {
    const { responseJSON, items, loading } = this.state
    const { classes, eventID } = this.props
    const EventData = Events[eventID]
    document.title = 'EventStock - ' + EventData.name

    return (

      <div class="overlay" className={classes.root} ref="iScroll" style={{ height: document.documentElement.clientHeight-100,  overflow: "scroll" }}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
                  <EventSummary
                    name={EventData.name}
                    description={EventData.description}
                    start_date={`${moment(EventData.start_date * 1000).format('DD MMM YY')}`}
                    end_date={getDate(EventData.end_date)}
                  />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <Company
                    name="Facebook"
                />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <Company
                    name="Google"
                />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <Company
                    name="Amazon"
                />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
                <Stock
                    title="Stock"
                />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
                <Map
                    title="Map"
                />
            </Paper>
          </Grid>

          { loading ? <CircularProgress className={classes.margin}
            size={70} color="secondary" /> :
            responseJSON ?
            <NewsCard responseJSON={responseJSON} items={items}/> : null }

        </Grid>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Event))
