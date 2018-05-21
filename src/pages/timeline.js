import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import withRoot from '../withRoot'
import { CircularProgress } from 'material-ui/Progress'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { base } from '../config'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Grid, Chip, Typography, withStyles } from 'material-ui'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import { TimelineTour } from '../tour'
import { getDate } from '../time'
import { Navigation } from '../components'

import { Event } from 'material-ui-icons'

import AviationBG from '../assets/backgrounds/aviation.jpg'
import TechBG from '../assets/backgrounds/tech.jpg'

const styles = theme => ({
  root: {
    backgroundColor: 'rgb(227,227,227)',
    minHeight: '100vh'
  },
  chip: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontSize: ''
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      textDecorationColor: 'black'
    }
  },
  title: {
    color: theme.palette.primary.main,
    marginTop: '1em'
  },
  subTitle: {
    color: theme.palette.secondary.main
  },
  loader: {
    marginTop: 20,
    textAlign: 'center'
  },
  button: {
    marginTop: theme.spacing.unit * 2,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  drawerPaper: {
    position: 'relative',
    width: '20vw',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  expansionHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
})

const bgCols = [
  '#AB47B8',
  '#26c6da',
  '#ef5350',
  '#66bb6a'
]

class Timeline extends React.Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired
  }

  state = {
    currentUser: this.props.currentUser,
    eventData: {},
    filterStartDate: moment().subtract(5, 'y').format('YYYY-MM-DD'),
    filterEndDate: moment().format('YYYY-MM-DD'),
    filterCategories: {}, // filled in with categories from Firebase
    categoryIcons: {}, // filled in with data from Firebase
    drawerOpen: false
  }

  componentDidMount() {
    // Fetch categories from Firebase /categories
    base.fetch('categories_and_icons', {
      context: this,
    }).then((categories) => {
      let filterCategories = {}
      for (let key in categories) {
        if (categories.hasOwnProperty(key)) {
          filterCategories[key] = true
        }
      }
      this.setState({ filterCategories, categoryIcons: categories })
    }).then(() => {
      this.ref = base.syncState(`timeline`, {
        context: this,
        state: 'eventData',
      })
    })
    window.scrollTo(0, 0)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleCategoryChange = name => event => {
    let filterCategories = this.state.filterCategories
    filterCategories[name] = event.target.checked
    this.setState({ filterCategories })
  }

  filterAllCategories (option) {
    let filterCategories = this.state.filterCategories
    for (let category in filterCategories) {
      if (filterCategories.hasOwnProperty(category)) {
        filterCategories[category] = option
      }
    }
    this.setState({ filterCategories })
  }

  render () {
    const { classes } = this.props
    const { currentUser, eventData, filterStartDate, filterEndDate, filterCategories, categoryIcons } = this.state

    const drawer = (
      <Drawer
        open={this.state.drawerOpen}
        onClose={() => this.setState({drawerOpen: false})}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={"left"}
        style={{width: 375}}
      >
        <List style={{width: '100%'}}>
          <ListItem>
            <ListItemText primary="Date Range"/>
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={filterStartDate}
              onChange={this.handleChange('filterStartDate')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              required
              label="End Date"
              type="date"
              value={filterEndDate}
              onChange={this.handleChange('filterEndDate')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </ListItem>
        </List>
        <List style={{width: '100%'}}>
          <ListItem>
            <ListItemText primary="Categories">
            </ListItemText>
            <Button
              variant="raised"
              color="secondary"
              className={classes.button}
              onClick={() => this.filterAllCategories(true)}>
              All
            </Button>
            <Button
              variant="raised"
              color="secondary"
              className={classes.button}
              onClick={() => this.filterAllCategories(false)}>
              None
            </Button>
          </ListItem>
          { _.map(_.keys(filterCategories), (k, i) =>
            <ListItem key={i}>
              <ListItemIcon>
                {categoryIcons[k] ?
                  <i className="material-icons">
                    {categoryIcons[k]}
                  </i>
                  :
                  <i className="material-icons">
                    label
                  </i>
                }
              </ListItemIcon>
              <ListItemText primary={_.startCase(_.toLower(k))} />
              <ListItemSecondaryAction>
                <Switch
                  onChange={this.handleCategoryChange(k)}
                  checked={filterCategories[k]}
                />
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </Drawer>
    )

    //need to clean data up a bit
    let sortedEvents = {}
    _.map(_.pickBy(eventData, _.identity), (x,i) => sortedEvents[i] = x)

    // Filter by date
    sortedEvents = _.filter(sortedEvents, x => {
      let startDate = moment.unix(x.start_date)
      let filterStart = moment(filterStartDate, 'YYYY-MM-DD')
      let filterEnd = moment(filterEndDate, 'YYYY-MM-DD')
      return startDate.isBetween(filterStart, filterEnd, null, '[]') // Inclusive date range match
    })

    // Filter by category
    sortedEvents = _.filter(sortedEvents, x => {
      // Handle events with no category/category is not on Firebase list
      const categoryNotOnFirebase = !filterCategories.hasOwnProperty(_.toLower(x.category))
      const uncategorisedSelected = filterCategories['uncategorised'] === true
      let categoryToggled = filterCategories[_.toLower(x.category)] === true

      return categoryToggled || (categoryNotOnFirebase && uncategorisedSelected)
    })

    // Sort by start date
    sortedEvents = _.sortBy(sortedEvents, x => x.start_date).reverse()

    document.title = 'EventStock'

    return (
      <div>
        <Navigation isAdmin={currentUser.admin} backgroundImg={currentUser.fav} tour={TimelineTour} />
        <Grid container direction='row'>
          <Grid container direction='column' className={classes.root}>
            <div className={classes.appFrame}>
              {drawer}
              <main className={classes.content}>
                <Grid item container justify='center' direction='row'>
                  <Grid item xs={8}>
                    <Grid container alignItems='center' direction='column'>
                      <Grid item>
                        <div className="welcome-tour">
                          <Typography variant='display3' gutterBottom className={classes.title}>
                            EventStock
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item>
                        <Typography variant='subheading' gutterBottom className={classes.subTitle}>
                          Discover the impact of events on industries you're interested in
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container direction='row'>
                  <div className="browse-tour"></div>
                  <div className="filter-tour"></div>
                  <Grid item xs={12}>
                    <div style={{textAlign: 'center'}}>
                      <Button
                        variant="raised"
                        color="secondary"
                        className={classes.button}
                        onClick={() => this.setState({drawerOpen: true})}>
                        Filter Timeline
                      </Button>
                    </div>
                    { _.isEmpty(sortedEvents) ?
                      <div className={classes.loader}>
                        <CircularProgress size={60}/>
                      </div>
                      :
                      <div>
                        <VerticalTimeline>
                          { _.map(_.keys(sortedEvents), (k, i) =>
                            <VerticalTimelineElement
                              key={i}
                              className='vertical-timeline-element--work'
                              date={`${moment(sortedEvents[k].start_date * 1000).format('DD MMM YY')} - ${getDate(sortedEvents[k].end_date)}`}
                              iconStyle={{background: bgCols[i % bgCols.length], color: '#fff'}}
                              icon={<Event />}
                            >
                              <Link to={{
                                pathname: `event/${k}`,
                                state: {currentUser: currentUser, eventData: sortedEvents[k]}
                              }}
                                    className={classes.link}>
                                <Typography variant='title' className='vertical-timeline-element-title' gutterBottom>
                                  {sortedEvents[k].name}
                                </Typography>
                              </Link>
                              <Typography variant='subheading' className='vertical-timeline-element-subtitle' gutterBottom>
                                {sortedEvents[k].category}
                              </Typography>
                              <Typography gutterBottom>
                                {sortedEvents[k].description}
                              </Typography>
                              <div>
                                {_.map(sortedEvents[k].related_companies, (c, i) =>
                                  <Chip label={i} className={classes.chip} key={i} />
                                )}
                              </div>
                            </VerticalTimelineElement>
                          )}
                        </VerticalTimeline>
                      </div>
                    }
                  </Grid>
                </Grid>
              </main>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withRouter(withRoot(withStyles(styles)(Timeline)))
