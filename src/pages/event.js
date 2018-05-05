import React from 'react'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import Events from '../eventData'
import { Grid, Row, Col } from 'react-flexbox-grid';

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
    color: 'blue',
    border: 'solid 1px black',
    margin: '10px',
    padding: '10%'
  }
})

class Event extends React.Component {

  render () {
    const { classes, eventID } = this.props
    const EventData = Events[eventID]

    // return (
    //   <div className={classes.root}>
    //     <h1>{EventData.name}</h1>
    //     <h3>{EventData.description}</h3>
    //     <h3>start: {EventData.start_date}</h3>
    //     <h3>end: {EventData.end_date}</h3>
    //     <h3>related companies: {EventData.related_companies.join(', ')}</h3>
    //   </div>
    // );
    return (

      <Grid fluid className={classes.grid}>
        <Row className={classes.row} around="xs">
          <Col className={classes.box} xs>
            description
          </Col>
         </Row>

         <Row className={classes.row} around="xs">
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

        <Row className={classes.row} around="xs">
         <Col className={classes.box} xs>
           Stocks
         </Col>
         <Col className={classes.box} xs>
            Maps
         </Col>
        </Row>
        <Row className={classes.row} around="xs">
            <Col className={classes.box} xs>
                Stocks
            </Col>
        </Row>
        <Row className={classes.row} around="xs">
            <Col className={classes.box} xs>
                Stocks
            </Col>
        </Row>
        <Row className={classes.row} around="xs">
            <Col className={classes.box} xs>
                Stocks
            </Col>
        </Row>
    </Grid>
    );
  }
}

export default withRoot(withStyles(styles)(Event))
