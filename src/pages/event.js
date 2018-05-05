import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Events from '../eventData'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { EventSummary } from '../components'

const styles = theme => ({
  roots: {
    border: '1px'
  },
  grid: {
    margin: '10%'
    // marginLeft: '5%',
    // marginRight: '5%'
  },
  box: {
    border: 'solid 1px black',
    margin: '2%',
    padding: '5%'
  },
  maps: {
    margin: '2%',
    width: '100px',
    height: '200px'
    // border: 'solid 1px black',
    // padding: '5%'
  },
  stocks: {
    margin: '2%',
    width: '100px',
    height: '200px',
    border: 'solid 1px black',
    padding: '5%'
  }

})

class Event extends React.Component {

  render () {
    const { classes, eventID } = this.props
    const EventData = Events[eventID]

    return (

      <Grid fluid className={classes.grid}>
        <Row className={classes.row} around='xs'>
          <Col className={classes.box} xs>
            <EventSummary
              name={EventData.name}
              description={EventData.description}
              start_date={EventData.start_date}
              end_date={EventData.end_date}
            />
          </Col>
        </Row>

        <Row className={classes.row} around='xs'>
          <Col className={classes.box} xs>
            Effected Companie 1
          </Col>
          <Col className={classes.box} xs>
            Effected Companie 2
          </Col>
          <Col className={classes.box} xs>
            Effected Companie 3
          </Col>
        </Row>

        <Row className={classes.row} around='xs'>
          <Col className={classes.stocks} xs>
           Stocks
         </Col>
          <Col className={classes.maps} xs>
            Map
          </Col>
        </Row>
        <Row className={classes.row} around='xs'>
          <Col className={classes.box} xs>
                News Article 1
            </Col>
        </Row>
        <Row className={classes.row} around='xs'>
          <Col className={classes.box} xs>
                News Article 2
            </Col>
        </Row>
        <Row className={classes.row} around='xs'>
          <Col className={classes.box} xs>
                News Article 3
            </Col>
        </Row>
      </Grid>
    )
  }
}

export default withRoot(withStyles(styles)(Event))
